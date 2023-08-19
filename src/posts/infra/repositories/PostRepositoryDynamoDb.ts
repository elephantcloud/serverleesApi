import { Post, PostRepository } from "../domain/Post";
import { DynamoDB } from "aws-sdk";

export class PostRepositoryDynamoDB implements PostRepository {
  private dynamoDB: DynamoDB.DocumentClient;
  private tableName: string;

  constructor(tableName: string) {
    this.dynamoDB = new DynamoDB.DocumentClient();
    this.tableName = tableName;
  }

  async getById(id: string): Promise<Post | undefined> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: { id },
    };

    const result = await this.dynamoDB.get(params).promise();
    return result.Item as Post;
  }

  async getAll(): Promise<Post[]> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    const result = await this.dynamoDB.scan(params).promise();
    return result.Items as Post[];
  }

  async create(post: Post): Promise<Post> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: post,
    };

    await this.dynamoDB.put(params).promise();
    return post;
  }

  async update(post: Post): Promise<Post> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: post,
    };

    await this.dynamoDB.put(params).promise();
    return post;
  }

  async delete(id: string): Promise<void> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: { id },
    };

    await this.dynamoDB.delete(params).promise();
  }
}
