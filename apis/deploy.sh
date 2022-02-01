bucketName="harish-deploy-artifacts"
bucketIndex="lambda/practice-my-kid"

stackName="practice-my-kid"
region="us-west-2"

echo 'Creating the package with "sam package" command'
sam package --template-file template.yaml --output-template-file template_output.yaml --s3-bucket $bucketName --s3-prefix $bucketIndex

if [ $? -eq 0 ]; then
    echo 'Package creation successful'
else
    echo 'Error creating the package with aws sam command line tools. Please make sure to install aws cli and sam tools'
fi

echo 'Deploying the package with "aws cloudformation deploy" command'
aws cloudformation deploy --region $region --template-file template_output.yaml --stack-name $stackName --capabilities CAPABILITY_IAM

if [ $? -eq 0 ]; then
    echo 'Deploy of the package completed'
else
    echo 'Failed to deploy the lambda to aws. Please check the output for the errors'
fi