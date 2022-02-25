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



class AddKidRequest():

    def __init__(self):
        print("Add Kid Request Initialization")

    def process(self, method, queryParams, body, userName):
        print("AddKidRequest Process body:{} queryParams:{}".format(body, queryParams))
        retVal = {}

        if method != HTTP_METHOD_POST:
            print('Not a POST request. Not supported..')
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_HTTP_METHOD
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVLAID_HTTP_METHOD
            return HTTP_STATUS_CODE_METHOD_NOT_IMPLEMENTED, retVal

        if not body or JSON_KEY_KIDS_NAME not in body :
            print('Mandatory parameters are missing in the request')
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_INPUT
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVALID_INPUT
            return HTTP_STATUS_CODE_BAD_REQUEST, retVal

        kidsInfo = {
            DYNAMO_KEY_KIDS_NAME: body[JSON_KEY_KIDS_NAME],
            DYNAMO_KEY_KIDS_ID: str(uuid4())
        }
        
        dynamoUtils = DynamoUtils()
        item = dynamoUtils.getItem(DYNAMO_TABLE_NAME_USERS, key={DYNAMO_KEY_USER_NAME: userName})
        if not item:
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_ACCESS_TOKEN_INVALID
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_ACCESS_TOKEN_INVALID
            return HTTP_STATUS_CODE_UNAUTHORIZED, retVal
            
        kidsInfoFromDynamo = item[DYNAMO_KEY_KIDS_INFORMATION]
        kidsInfoFromDynamo.append(kidsInfo)
        item[DYNAMO_KEY_KIDS_INFORMATION] = kidsInfoFromDynamo
        response = dynamoUtils.putItem(DYNAMO_TABLE_NAME_USERS, item)

        return HTTP_STATUS_CODE_CREATED, kidsInfo


