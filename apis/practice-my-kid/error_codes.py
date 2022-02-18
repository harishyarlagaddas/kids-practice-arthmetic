GENERAL_ERROR_CODE_INVALID_HTTP_METHOD = 1001
GENERAL_ERROR_MESSAGE_INVLAID_HTTP_METHOD = 'This Http method is not supported for this request'
GENERAL_ERROR_MESSAGE_INTERNAL_SERVER_ERROR = 'Internal server error. Please report it or try again later...'
GENERAL_ERROR_CODE_INVALID_INPUT = 1002
GENERAL_ERROR_MESSAGE_INVALID_INPUT = 'Invalid input. Mandatory parameters missing.. Please check the api documentation..'
GENERAL_ERROR_CODE_ACCESS_TOKEN_INVALID = 1003
GENERAL_ERROR_MESSAGE_ACCESS_TOKEN_INVALID = 'Invalid auth token. May be expired. Please refresh your auth token by logging in again'

LOGIN_ERROR_CODE_USER_DOES_NOT_EXIST = 2002
LOGIN_ERROR_MESSAGE_USER_DOES_NOT_EXIST = 'This user does not exist in the system. Please create new user'
LOGIN_ERROR_CODE_INVALID_PASSWORD = 2003
LOGIN_ERROR_MESSAGE_INVALID_PASSWORD = 'Username and password does not match. Please login with correct credentials'
LOGIN_ERROR_CODE_PASSWORD_NOT_SET = 2004
LOGIN_ERROR_MESSAGE_PASSWORD_NOT_SET = 'Password is not set for this user. Please set the password before logging in'

VALIDATE_ACCESS_TOKEN_SUCCESS_MESSAGE = 'Acesstoken is valid. Please go ahead and use it further...'
VALIDATE_ACCESS_TOKEN_ERROR_CODE_INVALID_ACCESS_TOKEN = 3001
VALIDATE_ACCESS_TOKEN_ERROR_MESSAGE_INVALID_ACCESS_TOKEN = 'Accesstoken invalid or expired. Please login again to get new access token'

USER_REGISTRATION_MESSAGE_SUCCESSFUL = 'User created successfully..'
USER_REGISTRATION_ERROR_CODE_USER_EXISTS = 4001
USER_REGISTRATION_ERROR_MESSAGE_USER_EXISTS = 'User already exists with this userName. Please user different user name or login with this user name'
USER_REGISTRATION_ERROR_CODE_INVALID_KIDS_INFO = 4002
USER_REGISTRATION_ERROR_MESSAGE_INVALID_KIDS_INFO = 'Kids information is invalid in the input..'

TEST_INSERT_SUCCESS_MESSAGE = 'Test information stored successfully'