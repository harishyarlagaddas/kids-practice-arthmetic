import json
from http_codes import *
from error_codes import *
from login_request import LoginRequest
from validate_access_token import ValidateAccessTokenRequest
from user_registration import UserRegistrationRequest
import traceback

# import requests

PATH_PARAM_LOGIN = "login"
PATH_PARAM_ACCESS_TOKEN = 'access_token'
PATH_PARAM_REGISTRATION = 'register'

def lambda_handler(event, context):
    try:
        method = event['httpMethod']
        body = event['body']
        queryParams = event['queryStringParameters']
        pathParameters = event['pathParameters']

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
        else:
            print('This path is not implemented yet.. Path: {}'.format(api))

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
