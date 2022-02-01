import boto3
import time
from botocore.exceptions import ClientError


RETRY_EXCEPTIONS = ('ProvisionedThroughputExceededException', 'ThrottlingException')

class DynamoUtils:
    def __init__(self):
        print('dynamo initializations')
        self.dynamodb = boto3.resource('dynamodb')
        #self.client = boto3.client('dynamodb')

    def getItem(self, tableName, key):
        print('dynamo getItem tableName: {}, Key: {}'.format(tableName, key))
        print('Type of key: {}'.format(type(key)))
        dbTable = self.dynamodb.Table(tableName)
        response = dbTable.get_item(Key=key)
        print('dynamo getItem response: {}'.format(response))
        if response and 'Item' in response:
            return response['Item']
        return None

    def putItem(self, tableName, item):
        print('dynmo putItem tableName: {}, item: {}'.format(tableName, item))
        dbTable = self.dynamodb.Table(tableName)
        response = dbTable.put_item(Item = item)
        return response
    

    # def queryItems(self, tableName, keyConditionExpression):
    #     print('dynamo queryItems tableName: {} keyConditionExpression: {}'.format(tableName, keyConditionExpression))
    #     dbTable = self.dynamodb.Table(tableName)

    #     exclusiveStartKey = None
    #     retItems = []
    #     retries = 0
    #     while 1:
    #         try:
    #             if exclusiveStartKey:
    #                 print('dynamo queryItems querying with exclusiveStartKey: {}'.format(exclusiveStartKey))
    #                 response = dbTable.query(
    #                     IndexName=DYNAMO_INDEX_MENU_ITEMS,
    #                     KeyConditionExpression=keyConditionExpression,
    #                     ExclusiveStartKey=exclusiveStartKey
    #                 );
    #             else:
    #                 print('dynamo queryItems querying for the first time')
    #                 response = dbTable.query(
    #                     IndexName = DYNAMO_INDEX_MENU_ITEMS,
    #                     KeyConditionExpression=keyConditionExpression
    #                 );

    #             if DYNAMO_RESPONSE_ITEMS in response:
    #                 items = response[DYNAMO_RESPONSE_ITEMS]
    #                 retItems.extend(items)

    #             if DYNAMO_RESPONSE_LAST_EVALUATED_KEY in response:
    #                 exclusiveStartKey = response[DYNAMO_RESPONSE_LAST_EVALUATED_KEY]
    #                 continue

    #             print('dynamo queryItems retrieved all the items')
    #             return retItems
    #         except ClientError as ex:
    #             if ex.response['Error']['Code'] not in RETRY_EXCEPTIONS:
    #                 print('Exception while querying dynamo. Exception: {}'.format(ex))
    #                 return retItems

    #             print('dynamo queryItems provisioned throughput exception. Will sleep and retry again..')
    #             time.sleep(2 ** retries)
    #             retries += 1

