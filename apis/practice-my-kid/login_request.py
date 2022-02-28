from boto3.dynamodb.conditions import Key
from dynamo_utils import DynamoUtils
from http_codes import *
from json_keys import *
from error_codes import *
from dynamo_keys import *
from consts import *
from uuid import uuid4
from datetime import datetime
from utils import *
import boto3



class LoginRequest:

    def __init__(self):
        print("Login Request Initialization")

    def process(self, method, queryParams, body):
        print("LoginRequest Process body:{} queryParams:{}".format(body, queryParams))
        retVal = {}

        if method != HTTP_METHOD_POST:
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_HTTP_METHOD
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVLAID_HTTP_METHOD
            return HTTP_STATUS_CODE_METHOD_NOT_IMPLEMENTED, retVal

        if not body or JSON_KEY_USER_NAME not in body or JSON_KEY_PASSWORD not in body:
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_INPUT
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVALID_INPUT
            return HTTP_STATUS_CODE_BAD_REQUEST, retVal

        userName = body[JSON_KEY_USER_NAME]
        password = body[JSON_KEY_PASSWORD]

        dynamoUtils = DynamoUtils()
        item = dynamoUtils.getItem(DYNAMO_TABLE_NAME_USERS, key={DYNAMO_KEY_USER_NAME: userName})

        if not item:
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = LOGIN_ERROR_CODE_USER_DOES_NOT_EXIST
            retVal[JSON_KEY_ERROR_DESCRIPTION] = LOGIN_ERROR_MESSAGE_USER_DOES_NOT_EXIST
            return HTTP_STATUS_CODE_RESOURCE_NOT_FOUND, retVal

        if not DYNAMO_KEY_PASSWORD in item or not item[DYNAMO_KEY_PASSWORD]:
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = LOGIN_ERROR_CODE_PASSWORD_NOT_SET
            retVal[JSON_KEY_ERROR_DESCRIPTION] = LOGIN_ERROR_MESSAGE_PASSWORD_NOT_SET
            return HTTP_STATUS_CODE_UNAUTHORIZED, retVal

        if password != item[DYNAMO_KEY_PASSWORD]:
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = LOGIN_ERROR_CODE_INVALID_PASSWORD
            retVal[JSON_KEY_ERROR_DESCRIPTION] = LOGIN_ERROR_MESSAGE_INVALID_PASSWORD
            return HTTP_STATUS_CODE_UNAUTHORIZED, retVal

        accessToken = create_access_token(userId=item[DYNAMO_KEY_USER_ID], userName=item[DYNAMO_KEY_USER_NAME])
        retVal[JSON_KEY_IS_SUCCESS] = True
        retVal[JSON_KEY_KIDS_INFORMATION] = item[DYNAMO_KEY_KIDS_INFORMATION]
        retVal[JSON_KEY_ACCESS_TOKEN] = accessToken

        return HTTP_STATUS_CODE_SUCCESS, retVal


