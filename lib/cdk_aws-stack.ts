import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as snsSubscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CdkAwsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Retrieve your S3 bucket names
    const sourceBucketName = 'ayushbansal1-source';
    const destinationBucketName = 'ayushbansal1-destination';
    const cloudFrontBucketName = 'ayushbansal1-cloudfront';
    
    const sourceBucket = s3.Bucket.fromBucketName(this, 'SourceBucket', sourceBucketName);
    const destinationBucket = s3.Bucket.fromBucketName(this, 'DestinationBucket', destinationBucketName);
    const cloudFrontBucket = s3.Bucket.fromBucketName(this, 'CloudFrontBucket', cloudFrontBucketName);
    // Create the Lambda function
    const lambdaFn = lambda.Function.fromFunctionArn(this, 'MyLambdaFunction', 'arn:aws:lambda:us-east-1:280022023954:function:ayushbansal-imageprocessor');

    // Retrieve the existing SNS topic
    const topic = sns.Topic.fromTopicArn(this, 'SNSTopic', 'arn:aws:sns:us-east-1:280022023954:ayushbansal-sns');

    // Subscribe Lambda function to the existing SNS topic
    // topic.addSubscription(new snsSubscriptions.LambdaSubscription(lambdaFn));

    // Retrieve the existing API Gateway
    const api = apigateway.RestApi.fromRestApiAttributes(this, 'MyApi', {
      restApiId: '2mmzzo4mdf',
      rootResourceId: 'ynj2axse6c',
    });

    // Create the API Gateway resource and method
    // const resource = api.root.addResource('my-resource');
    // const integration = new apigateway.LambdaIntegration(lambdaFn);
    // resource.addMethod('POST', integration);

    // // Output the API Gateway endpoint URL
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: 'https://2mmzzo4mdf.execute-api.us-east-1.amazonaws.com/track-4',
    });
  }
}
