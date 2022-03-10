from random import random
from boto3.dynamodb.conditions import Key
from dynamo_utils import DynamoUtils
from ses_utils import SESUtils
from http_codes import *
from json_keys import *
from error_codes import *
from dynamo_keys import *
from consts import *
from uuid import uuid4
from datetime import datetime
from utils import *
import string
import random
import boto3



class EmailSendCodeRequest:

    def __init__(self):
        print("EmailSendCodeRequest Initialization")

    def process(self, method, queryParams, body):
        print("EmailSendCodeRequest Process body:{} queryParams:{}".format(body, queryParams))
        retVal = {}

        if method != HTTP_METHOD_POST:
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_HTTP_METHOD
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVLAID_HTTP_METHOD
            return HTTP_STATUS_CODE_METHOD_NOT_IMPLEMENTED, retVal

        if not body or JSON_KEY_USER_NAME not in body :
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_INPUT
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVALID_INPUT
            return HTTP_STATUS_CODE_BAD_REQUEST, retVal

        userName = body[JSON_KEY_USER_NAME]

        dynamoUtils = DynamoUtils()
        item = dynamoUtils.getItem(DYNAMO_TABLE_NAME_USERS, key={DYNAMO_KEY_USER_NAME: userName})

        if not item:
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = VERIFY_EMAIL_ERROR_CODE_NO_ACCOUNT
            retVal[JSON_KEY_ERROR_DESCRIPTION] = VERIFY_EMAIL_ERROR_MESSAGE_NO_ACCOUNT
            return HTTP_STATUS_CODE_RESOURCE_NOT_FOUND, retVal

        authCode = ''.join(random.choice(string.ascii_letters) for x in range(8))
        sesUtils = SESUtils()
        response = sesUtils.sendAuthCodeEmail(userName, authCode)

        codeItem = {
            DYNAMO_KEY_AUTHORIZATION_CODE: authCode,
            DYNAMO_KEY_USER_NAME: item[DYNAMO_KEY_USER_NAME],
            DYNAMO_KEY_USER_ID: item[DYNAMO_KEY_USER_ID],
            DYNAMO_KEY_EXPIRE_AT: int(datetime.utcnow().timestamp()) + TEMP_AUTH_CODE_VALIDITY
        }
        codeResponse = dynamoUtils.putItem(DYNAMO_TABLE_NAME_CODES, codeItem)

        retVal[JSON_KEY_IS_SUCCESS] = True
        retVal[JSON_KEY_MESSAGE] = VERIFY_EMAIL_SUCCESSFUL_MESSAGE

        return HTTP_STATUS_CODE_SUCCESS, retVal


