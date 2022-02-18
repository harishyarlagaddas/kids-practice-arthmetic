
export AWS_PRFILE=harish-yarlagaddas

echo "Removing the build directory"
rm -rf build

echo "Building the app with 'npm run build'"
npm run build

echo "copying the files under build folder to S3"
aws s3 cp build/ s3://my-kids-practice/ --recursive --exclude '.*'