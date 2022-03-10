DATE_TIME_FORMAT_STRING = '%d-%b-%Y (%H:%M:%S.%f)'
ACCESS_TOKEN_VALIDITY = 12 * 60 * 60 # 12 hours
ACCESS_TOKEN_REFRESH_TIME_LIMIT = 4 * 60 * 60 # if access token validity is less than 4 hours, then refresh and issue another token
ACCESS_TOKEN_REFRESH_COUNT = 2 # Number of times you can refresh the accesstoken based off previous access token. After that user has to login again..
TEMP_AUTH_CODE_VALIDITY = 20 * 60 # 20 minutes