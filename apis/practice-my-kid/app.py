from decimal import Decimal
import json
from http_codes import *
from error_codes import *
from json_keys import *
from utils import *
from login_request import LoginRequest
from validate_access_token import ValidateAccessTokenRequest
from user_registration import UserRegistrationRequest
from test_request import TestsRequest
import traceback

# import requests

PATH_PARAM_LOGIN = "login"
PATH_PARAM_ACCESS_TOKEN = 'access_token'
PATH_PARAM_REGISTRATION = 'register'
PATH_PARAM_TEST = 'tests'
PATH_PARAM_ADD_KID = 'add_kid'

def lambda_handler(event, context):
    try:
        method = event['httpMethod']
        body = event['body']
        queryParams = event['queryStringParameters']
        pathParameters = event['pathParameters']
        headers = event['headers']

        if (method == HTTP_METHOD_OPTIONS) :
            print('It is options request. Returning success response for cross origin request access')
            return {
                "statusCode": HTTP_STATUS_CODE_SUCCESS,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
                    "Access-Control-Allow-Methods": "GET,POST"
                }
            }

        api = None
        if pathParameters:
            api = pathParameters['api']

        print('api={}'.format(api))

        statusCode = HTTP_STATUS_CODE_SUCCESS
        retVal = {}

        if (api == PATH_PARAM_LOGIN):
            print('Path indicates it as login request')
            loginRequest = LoginRequest()
            statusCode, retVal = loginRequest.process(method=method, queryParams=queryParams, body=json.loads(body))
        elif (api == PATH_PARAM_ACCESS_TOKEN):
            print('Path indicates it is access token request')
            validateAccessTokenRequest = ValidateAccessTokenRequest()
            statusCode, retVal = validateAccessTokenRequest.process(method=method, queryParams=queryParams, body=json.loads(body))
        elif (api == PATH_PARAM_REGISTRATION):
            print('Path indicates it as registration request')
            userRegistrationRequest = UserRegistrationRequest()
            statusCode, retVal = userRegistrationRequest.process(method=method, queryParams=queryParams, body=json.loads(body))
        elif (api == PATH_PARAM_TEST) :
            print('Path indicates it as Tests request')
            if (HTTP_HEADER_AUTHORIZATION not in headers) :
                print('There is no authorization header.')
                statusCode = HTTP_STATUS_CODE_UNAUTHORIZED
                retVal = {
                    JSON_KEY_IS_SUCCESS: False,
                    JSON_KEY_ERROR_CODE: GENERAL_ERROR_CODE_ACCESS_TOKEN_INVALID,
                    JSON_KEY_ERROR_DESCRIPTION: GENERAL_ERROR_MESSAGE_ACCESS_TOKEN_INVALID
                }
            else:
                userId = validate_access_token(headers[HTTP_HEADER_AUTHORIZATION])
                if not userId:
                    print('Looks like accesstoken is expired')
                    statusCode = HTTP_STATUS_CODE_UNAUTHORIZED
                    retVal = {
                        JSON_KEY_IS_SUCCESS: False,
                        JSON_KEY_ERROR_CODE: GENERAL_ERROR_CODE_ACCESS_TOKEN_INVALID,
                        JSON_KEY_ERROR_DESCRIPTION: GENERAL_ERROR_MESSAGE_ACCESS_TOKEN_INVALID
                    }
                else:
                    testsRequest = TestsRequest()
                    if not body:
                        body = '{}'  #Just to pass empty value of body to TestsRequest
                    statusCode, retVal = testsRequest.process(method=method, queryParams=queryParams, body= json.loads(body), userId=userId)
        elif (api == PATH_PARAM_ADD_KID) :
            print('Path indicates it as Add Kid request')
            if (HTTP_HEADER_AUTHORIZATION not in headers) :
                print('There is no authorization header.')
                statusCode = HTTP_STATUS_CODE_UNAUTHORIZED
                retVal = {
                    JSON_KEY_IS_SUCCESS: False,
                    JSON_KEY_ERROR_CODE: GENERAL_ERROR_CODE_ACCESS_TOKEN_INVALID,
                    JSON_KEY_ERROR_DESCRIPTION: GENERAL_ERROR_MESSAGE_ACCESS_TOKEN_INVALID
                }
            else:
                userId = validate_access_token(headers[HTTP_HEADER_AUTHORIZATION])
                if not userId:
                    print('Looks like accesstoken is expired')
                    statusCode = HTTP_STATUS_CODE_UNAUTHORIZED
                    retVal = {
                        JSON_KEY_IS_SUCCESS: False,
                        JSON_KEY_ERROR_CODE: GENERAL_ERROR_CODE_ACCESS_TOKEN_INVALID,
                        JSON_KEY_ERROR_DESCRIPTION: GENERAL_ERROR_MESSAGE_ACCESS_TOKEN_INVALID
                    }
                else:
                    testsRequest = TestsRequest()
                    if not body:
                        body = '{}'  #Just to pass empty value of body to TestsRequest
                    statusCode, retVal = testsRequest.process(method=method, queryParams=queryParams, body= json.loads(body), userId=userId)
        else:
            print('This path is not implemented yet.. Path: {}'.format(api))
            statusCode = HTTP_STATUS_CODE_METHOD_NOT_IMPLEMENTED
            retVal = {
                JSON_KEY_IS_SUCCESS: False,
                JSON_KEY_ERROR_CODE: GENERAL_ERROR_CODE_INVALID_HTTP_METHOD,
                JSON_KEY_ERROR_DESCRIPTION: GENERAL_ERROR_MESSAGE_INVLAID_HTTP_METHOD
            }

        return {
            "statusCode": statusCode,
            "body": json.dumps(retVal, default=decimal_default),
            "headers": {
                "Access-Control-Allow-Origin": "*"
            }
        }
    except Exception as e:
        print('Exception while processing the request. Exception: '+str(e))
        traceback.print_exc()

        return {
            "statusCode": HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR,
            "body": GENERAL_ERROR_MESSAGE_INTERNAL_SERVER_ERROR,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            }
        }

def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError
