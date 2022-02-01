from boto3.dynamodb.conditions import Key
from dynamo_utils import DynamoUtils
from http_codes import *
from json_keys import *
from error_codes import *
from dynamo_keys import *
from consts import *
import boto3



class ValidateAccessTokenRequest():

    def __init__(self):
        print("Validate Access Token Request Initialization")

    def process(self, method, queryParams, body):
        print("ValidateAccessTokenRequest Process body:{} queryParams:{}".format(body, queryParams))
        retVal = {}

        if method != HTTP_METHOD_POST:
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_HTTP_METHOD
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVLAID_HTTP_METHOD
            return HTTP_STATUS_CODE_METHOD_NOT_IMPLEMENTED, retVal

        if not body or JSON_KEY_ACCESS_TOKEN not in body:
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_INPUT
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVALID_INPUT
            return HTTP_STATUS_CODE_BAD_REQUEST, retVal

        accessToken = body[JSON_KEY_ACCESS_TOKEN]

        dynamoUtils = DynamoUtils()
        item = dynamoUtils.getItem(DYNAMO_TABLE_NAME_ACCESS_TOKENS, key={DYNAMO_KEY_ACCESS_TOKEN: accessToken})

        if not item:
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = VALIDATE_ACCESS_TOKEN_ERROR_CODE_INVALID_ACCESS_TOKEN
            retVal[JSON_KEY_ERROR_DESCRIPTION] = VALIDATE_ACCESS_TOKEN_ERROR_MESSAGE_INVALID_ACCESS_TOKEN
            return HTTP_STATUS_CODE_RESOURCE_NOT_FOUND, retVal

        retVal[JSON_KEY_IS_SUCCESS] = True
        retVal[JSON_KEY_MESSAGE] = VALIDATE_ACCESS_TOKEN_SUCCESS_MESSAGE
        
        return HTTP_STATUS_CODE_SUCCESS, retVal


