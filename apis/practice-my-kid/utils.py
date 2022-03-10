# Create and insert the access token for the specified userId and return back the created access token.
from boto3.dynamodb.conditions import Key
from uuid import uuid4
from consts import *
from datetime import datetime, timedelta
from dynamo_keys import *
from dynamo_utils import DynamoUtils
from ses_utils import SESUtils


def create_access_token(userId, userName, refresh_count = 0) :
    dynamoUtils = DynamoUtils()
    accessToken = str(uuid4())
    timestamp = datetime.utcnow().strftime(DATE_TIME_FORMAT_STRING)
    expireAt = int(datetime.utcnow().timestamp()) + ACCESS_TOKEN_VALIDITY
    response = dynamoUtils.putItem(DYNAMO_TABLE_NAME_ACCESS_TOKENS, {
        DYNAMO_KEY_ACCESS_TOKEN: accessToken,
        DYNAMO_KEY_USER_ID: userId,
        DYNAMO_KEY_USER_NAME: userName,
        DYNAMO_KEY_CREATED_AT: timestamp,
        DYNAMO_KEY_LAST_ACCESSED_AT: timestamp,
        DYNAMO_KEY_ACCESS_TOKEN_REFRESH_COUNT: refresh_count,
        DYNAMO_KEY_EXPIRE_AT: expireAt
    })
    return accessToken

def get_access_token(accessToken) :
    dynamoUtils = DynamoUtils()
    item = dynamoUtils.getItem(DYNAMO_TABLE_NAME_ACCESS_TOKENS, key={DYNAMO_KEY_ACCESS_TOKEN: accessToken})
    return item

def validate_access_token(accessToken) :
    item = get_access_token(accessToken=accessToken)
    return item is not None

def get_user_from_access_token(accessToken) :
    dynamoUtils = DynamoUtils()
    item = dynamoUtils.getItem(DYNAMO_TABLE_NAME_ACCESS_TOKENS, key={DYNAMO_KEY_ACCESS_TOKEN: accessToken})
    if not item:
        print('get_user_from_access_token not able to get userName. May be accessToken invalid..')
        return None

    user = dynamoUtils.getItem(DYNAMO_TABLE_NAME_USERS, key={DYNAMO_KEY_USER_NAME: item[DYNAMO_KEY_USER_NAME]})
    return user

def get_user_from_user_name(userName) :
    dynamoUtils = DynamoUtils()
    user = dynamoUtils.getItem(DYNAMO_TABLE_NAME_USERS, key={DYNAMO_KEY_USER_NAME: userName})
    return user
