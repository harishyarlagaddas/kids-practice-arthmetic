from boto3.dynamodb.conditions import Key
from dynamo_utils import DynamoUtils
from http_codes import *
from json_keys import *
from error_codes import *
from dynamo_keys import *
from consts import *
from utils import *
import boto3



class TestsRequest:

    def __init__(self):
        print("Test Request Initialization")

    def process(self, method, queryParams, body, userId):
        print("TestRequest Process body:{} queryParams:{} userId: {}".format(body, queryParams, userId))
        
        if (method == HTTP_METHOD_POST) :
            return self.storeTest(body=body, userId = userId)
        elif (method == HTTP_METHOD_GET) :
            return self.getTests(queryParams, userId=userId)
        else:
            print('TestResult Method not supported..')
            return HTTP_STATUS_CODE_METHOD_NOT_IMPLEMENTED, {}

    def getTests(self, queryParams, userId) :
        print('TestResult getTests userId: {}'.format(userId))
        
        retVal = {}
        if (HTTP_QUERY_PARAM_KIDS_ID not in queryParams) :
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_INPUT
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVALID_INPUT
            return HTTP_STATUS_CODE_BAD_REQUEST, retVal

        kidsId = queryParams[HTTP_QUERY_PARAM_KIDS_ID]
        dynamo_utils = DynamoUtils()
        items = dynamo_utils.queryItems(
            tableName = DYNAMO_TABLE_NAME_QUESTIONS, 
            keyConditionExpression = Key(DYNAMO_KEY_KIDS_ID).eq(kidsId), 
            count = 100
        )

        retVal[JSON_KEY_IS_SUCCESS] = True
        retVal[JSON_KEY_KIDS_ID] = kidsId
        retVal[JSON_KEY_TESTS] = items
        return HTTP_STATUS_CODE_SUCCESS, retVal


    def storeTest(self, body, userId) :
        print('TestResult storeTest userId: {}'.format(userId))
        test_dynamo = {}
        retVal = {}
        if (JSON_KEY_KIDS_ID not in body or JSON_KEY_TEST_TIME not in body or JSON_KEY_TIME_TAKEN not in body
            or JSON_KEY_CORRECT_ANSWERS not in body or JSON_KEY_TOTAL_QUESTIONS not in body 
            or JSON_KEY_OPERAND1_MAX_VALUE not in body or JSON_KEY_OPERAND2_MAX_VALUE not in body
            or JSON_KEY_QUESTIONS not in body or JSON_KEY_OPERATION not in body) :
            retVal[JSON_KEY_IS_SUCCESS] = False
            retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_INPUT
            retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVALID_INPUT
            return HTTP_STATUS_CODE_BAD_REQUEST, retVal

        test_dynamo[DYNAMO_KEY_USER_ID] = userId
        test_dynamo[DYNAMO_KEY_KIDS_ID] = body[JSON_KEY_KIDS_ID]
        test_dynamo[DYNAMO_KEY_TEST_TIME] = body[JSON_KEY_TEST_TIME]
        test_dynamo[DYNAMO_KEY_TIME_TAKEN] = body[JSON_KEY_TIME_TAKEN]
        test_dynamo[DYNAMO_KEY_CORRECT_ANSWERS] = body[JSON_KEY_CORRECT_ANSWERS]
        test_dynamo[DYNAMO_KEY_TOTAL_QUESTIONS] = body[JSON_KEY_TOTAL_QUESTIONS]
        test_dynamo[DYNAMO_KEY_OPERATION] = body[JSON_KEY_OPERATION]
        test_dynamo[DYNAMO_KEY_OPERAND1_MAX_VALUE] = body[JSON_KEY_OPERAND1_MAX_VALUE]
        test_dynamo[DYNAMO_KEY_OPERAND2_MAX_VALUE] = body[JSON_KEY_OPERAND2_MAX_VALUE]

        questions = body[JSON_KEY_QUESTIONS]
        questions_dynamo = []
        for question in questions:
            print('TestResult storeTest question: {}'.format(question))
            if (JSON_KEY_QUESTION_OPERAND_1 not in question or JSON_KEY_QUESTION_OPERAND_2 not in question
                or JSON_KEY_QUESTION_OPERATOR not in question or JSON_KEY_QUESTION_ANSWER not in question
                or JSON_KEY_QUESTION_CORRECT_ANSWER not in question) :
                retVal[JSON_KEY_IS_SUCCESS] = False
                retVal[JSON_KEY_ERROR_CODE] = GENERAL_ERROR_CODE_INVALID_INPUT
                retVal[JSON_KEY_ERROR_DESCRIPTION] = GENERAL_ERROR_MESSAGE_INVALID_INPUT
                return HTTP_STATUS_CODE_BAD_REQUEST, retVal

            dynamo_question = {}
            dynamo_question[DYNAMO_KEY_QUESTION_OPERAND_1] = question[JSON_KEY_QUESTION_OPERAND_1]
            dynamo_question[DYNAMO_KEY_QUESTION_OPERAND_2] = question[JSON_KEY_QUESTION_OPERAND_2]
            dynamo_question[DYNAMO_KEY_QUESTION_OPERATOR] = question[JSON_KEY_QUESTION_OPERATOR]
            dynamo_question[DYNAMO_KEY_QUESTION_ANSWER] = question[JSON_KEY_QUESTION_ANSWER]
            dynamo_question[DYNAMO_KEY_QUESTION_CORRECT_ANSWER] = question[JSON_KEY_QUESTION_CORRECT_ANSWER]

            questions_dynamo.append(dynamo_question)

        test_dynamo[DYNAMO_KEY_QUESTIONS] = questions_dynamo

        dynamo_utils = DynamoUtils()
        response = dynamo_utils.putItem(DYNAMO_TABLE_NAME_QUESTIONS, test_dynamo)

        retVal[JSON_KEY_IS_SUCCESS] = True
        retVal[JSON_KEY_MESSAGE] = TEST_INSERT_SUCCESS_MESSAGE
        return HTTP_STATUS_CODE_SUCCESS, retVal
