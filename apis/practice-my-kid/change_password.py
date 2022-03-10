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



class ChangePasswordRequest():

    def __init__(self):
        print("Change Password Request Initialization")

    def process(self, method, queryParams, body, user):
        print("ChangePasswordRequest Process body:{} queryParams:{}".format(body, queryParams))
        retVal = {}

        if method != HTTP_METHOD_POST:
            print('Not a POST request. Not supported..')
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_HTTP_METHOD
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVLAID_HTTP_METHOD
            return HTTP_STATUS_CODE_METHOD_NOT_IMPLEMENTED, retVal

        if not body or not (JSON_KEY_PASSWORD in body or JSON_KEY_TEMPORARY_AUTH_CODE in body) or JSON_KEY_NEW_PASSWORD not in body:
            print('Mandatory parameters are missing in the request')
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_INPUT
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVALID_INPUT
            return HTTP_STATUS_CODE_BAD_REQUEST, retVal

        if JSON_KEY_PASSWORD in body and user[DYNAMO_KEY_PASSWORD] != body[JSON_KEY_PASSWORD]:
            print('password is not correct.. Please try again with valid password.')
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = CHANGE_PASSWORD_ERROR_CODE_INCORRCT_PASSWORD
            retVal[JSON_KEY_ERROR_DESCRIPTION] = CHANGE_PASSWORD_ERROR_MESSAGE_INCORRCT_PASSWORD
            return HTTP_STATUS_CODE_UNAUTHORIZED, retVal

        dynamoUtils = DynamoUtils()
        if (JSON_KEY_TEMPORARY_AUTH_CODE in body):
            print('cheking for the correctness of the auth code..')
            codeItem = dynamoUtils.getItem(DYNAMO_TABLE_NAME_CODES, key={DYNAMO_KEY_AUTHORIZATION_CODE:body[JSON_KEY_TEMPORARY_AUTH_CODE]})
            if not codeItem:
                retVal[JSON_KEY_IS_SUCCESS] = False
                retVal[JSON_KEY_ERROR_CODE] =  CHANGE_PASSWORD_ERROR_CODE_AUTH_CODE_EXPIRED
                retVal[JSON_KEY_ERROR_DESCRIPTION] = CHANGE_PASSWORD_ERROR_MESSAGE_AUTH_CODE_EXPIRED
                return HTTP_STATUS_CODE_UNAUTHORIZED, retVal
            
            if codeItem[JSON_KEY_USER_NAME] != user[JSON_KEY_USER_NAME]:
                retVal[JSON_KEY_IS_SUCCESS] = False
                retVal[JSON_KEY_ERROR_CODE] = CHANGE_PASSWORD_ERROR_CODE_AUTH_CODE_INVALID
                retVal[JSON_KEY_ERROR_DESCRIPTION] = CHANGE_PASSWORD_ERROR_MESSAGE_AUTH_CODE_INVALID
                return HTTP_STATUS_CODE_UNAUTHORIZED, retVal

        print('updating to new password...')
        user[DYNAMO_KEY_PASSWORD] = body[JSON_KEY_NEW_PASSWORD]
        
        response = dynamoUtils.putItem(tableName=DYNAMO_TABLE_NAME_USERS, item=user)
        print(response)

        retVal[JSON_KEY_IS_SUCCESS] = True
        retVal[JSON_KEY_MESSAGE] = CHANGE_PASSWORD_SUCCESSFUL_MESSAGE
        return HTTP_STATUS_CODE_SUCCESS, retVal


