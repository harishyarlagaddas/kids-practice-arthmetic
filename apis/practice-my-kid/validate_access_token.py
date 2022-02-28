from boto3.dynamodb.conditions import Key
from dynamo_utils import DynamoUtils
from http_codes import *
from json_keys import *
from error_codes import *
from dynamo_keys import *
from consts import *
from datetime import datetime
from utils import *
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

        item = get_access_token(accessToken)

        if not item:
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = VALIDATE_ACCESS_TOKEN_ERROR_CODE_INVALID_ACCESS_TOKEN
            retVal[JSON_KEY_ERROR_DESCRIPTION] = VALIDATE_ACCESS_TOKEN_ERROR_MESSAGE_INVALID_ACCESS_TOKEN
            return HTTP_STATUS_CODE_RESOURCE_NOT_FOUND, retVal

        expireAt = item[DYNAMO_KEY_EXPIRE_AT].to_integral_value()
        refreshCount = item[DYNAMO_KEY_ACCESS_TOKEN_REFRESH_COUNT]
        currentTime = int(datetime.utcnow().timestamp())
        differenceInSeconds = expireAt - currentTime
        if differenceInSeconds <= ACCESS_TOKEN_REFRESH_TIME_LIMIT and refreshCount <= ACCESS_TOKEN_REFRESH_COUNT :
            accessToken = create_access_token(userId=item[DYNAMO_KEY_USER_ID], userName=item[DYNAMO_KEY_USER_NAME], refresh_count=refreshCount)
            retVal[JSON_KEY_IS_SUCCESS] = True
            retVal[JSON_KEY_ACCESS_TOKEN] = accessToken
        elif differenceInSeconds > ACCESS_TOKEN_REFRESH_TIME_LIMIT :
            retVal[JSON_KEY_IS_SUCCESS] = True
            retVal[JSON_KEY_ACCESS_TOKEN] = item[DYNAMO_KEY_ACCESS_TOKEN]
        else :
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = VALIDATE_ACCESS_TOKEN_ERROR_CODE_INVALID_ACCESS_TOKEN
            retVal[JSON_KEY_ERROR_DESCRIPTION] = VALIDATE_ACCESS_TOKEN_ERROR_MESSAGE_INVALID_ACCESS_TOKEN
            return HTTP_STATUS_CODE_RESOURCE_NOT_FOUND, retVal
        
        return HTTP_STATUS_CODE_SUCCESS, retVal


