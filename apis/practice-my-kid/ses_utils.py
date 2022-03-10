from email.message import Message
from re import sub
import string
import boto3

AUTHORIZATION_CODE_EMAIL_ADDRESS = 'practicemykidsmail@gmail.com'
AUTHORIZATION_CODE_SUBJECT = 'Your temporary authorization code'
AUTHORIZATION_CODE_BODY = 'Your temporary code for practicemykids is %s. This code is valid for only 20 minutes.'

class SESUtils :
    def __init__(self) :
        print('SESUtils Initialization...')
        self.sesClient = boto3.client('ses')

    def sendAuthCodeEmail(self, email, code) :
        response = self.sesClient.send_email(
            Source = AUTHORIZATION_CODE_EMAIL_ADDRESS,
            Destination = {
                'ToAddresses': [email]
            },
            Message = {
                'Body': {
                    'Text': {
                        'Charset': 'UTF-8',
                        'Data': AUTHORIZATION_CODE_BODY.replace('%s',code)
                    }
                },
                'Subject': {
                    'Charset': 'UTF-8',
                    'Data': AUTHORIZATION_CODE_SUBJECT
                }
            }
        )

        print('mail sent to address: '+email)
        print(response)