import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime, Architecture } from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export function createListPostsLambda(
  scope: Construct,
  postsTable: cdk.aws_dynamodb.Table
) {
  const listPosts = new NodejsFunction(scope, "listPosts", {
    runtime: Runtime.NODEJS_18_X,
    entry: "src/posts/infrastructure/handlers/list.ts",
    handler: "handler",
    architecture: Architecture.ARM_64,
    environment: {
      CATEGORIES_TABLE_NAME: postsTable.tableName,
    },
  });

  listPosts.addToRolePolicy(
    new cdk.aws_iam.PolicyStatement({
      actions: ["dynamodb:Scan", "dynamodb:Query"],
      resources: [postsTable.tableArn],
    })
  );

  return listPosts;
}
