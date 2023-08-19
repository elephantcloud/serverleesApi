#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { BackendStack } from "../src/api-stack/api-stack";

const app = new cdk.App();
new BackendStack(app, "MyBlog", {});
