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



class UserRegistrationRequest():

    def __init__(self):
        print("User Registration Request Initialization")

    def process(self, method, queryParams, body):
        print("UserRegistrationRequest Process body:{} queryParams:{}".format(body, queryParams))
        retVal = {}

        if method != HTTP_METHOD_POST:
            print('Not a POST request. Not supported..')
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_HTTP_METHOD
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVLAID_HTTP_METHOD
            return HTTP_STATUS_CODE_METHOD_NOT_IMPLEMENTED, retVal

        if not body or JSON_KEY_USER_NAME not in body or JSON_KEY_PASSWORD not in body or JSON_KEY_KIDS_NAMES not in body or len(body[JSON_KEY_KIDS_NAMES]) == 0 :
            print('Mandatory parameters are missing in the request')
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_INPUT
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVALID_INPUT
            return HTTP_STATUS_CODE_BAD_REQUEST, retVal

        kidsInfo = []
        for kidsName in body[JSON_KEY_KIDS_NAMES]:
            kidsInfo.append({
                DYNAMO_KEY_KIDS_NAME: kidsName,
                DYNAMO_KEY_KIDS_ID: str(uuid4())
            })
        
        userName = body[JSON_KEY_USER_NAME]
        password = body[JSON_KEY_PASSWORD]
        userId = str(uuid4())

        dynamoUtils = DynamoUtils()
        item = dynamoUtils.getItem(DYNAMO_TABLE_NAME_USERS, key={DYNAMO_KEY_USER_NAME: userName})
        if item:
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = USER_REGISTRATION_ERROR_CODE_USER_EXISTS
            retVal[JSON_KEY_ERROR_DESCRIPTION] = USER_REGISTRATION_ERROR_MESSAGE_USER_EXISTS
            return HTTP_STATUS_CODE_RESOURCE_ALREAY_EXISTS, retVal
            
        response = dynamoUtils.putItem(DYNAMO_TABLE_NAME_USERS, {
            DYNAMO_KEY_USER_NAME: userName,
            DYNAMO_KEY_PASSWORD: password,
            DYNAMO_KEY_USER_ID: userId,
            DYNAMO_KEY_KIDS_INFORMATION: kidsInfo
        })

        retVal[JSON_KEY_IS_SUCCESS] = True
        retVal[JSON_KEY_USER_NAME] = userName
        retVal[JSON_KEY_MESSAGE] = USER_REGISTRATION_MESSAGE_SUCCESSFUL
        retVal[JSON_KEY_KIDS_INFORMATION] = kidsInfo
        accessToken = create_access_token(userId=userId)
        retVal[JSON_KEY_ACCESS_TOKEN] = accessToken
        retVal[JSON_KEY_KIDS_INFORMATION] = kidsInfo

        return HTTP_STATUS_CODE_CREATED, retVal


