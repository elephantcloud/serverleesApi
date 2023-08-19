import * as cdk from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { createListPostsLambda } from "../posts/infra/stack/list";

export class BackendStack extends cdk.Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const postsTable = new cdk.aws_dynamodb.Table(this, "Posts", {
      partitionKey: {
        name: "pk",
        type: cdk.aws_dynamodb.AttributeType.STRING,
      },
    });

    const api = new apigw.RestApi(this, "BlogApi");

    const listPosts = createListPostsLambda(this, postsTable);
    const posts = api.root.addResource("posts");
    posts.addMethod("GET", new apigw.LambdaIntegration(listPosts), {});
  }
}
