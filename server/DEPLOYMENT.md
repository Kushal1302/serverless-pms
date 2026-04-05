## Deployment Plan

This project follows a fully serverless deployment architecture using AWS services.

---

### 1. Build Process

* Code is written in TypeScript using Node.js
* Bundling is done using **esbuild**
* Output is generated in the `dist/` folder

```bash
npm run build
```

---

### 2. Packaging

* The build output (`dist/`) is zipped into a deployment package

```bash
zip -r function.zip dist
```

---

### 3. AWS Lambda Deployment

* The zipped package is uploaded to AWS Lambda
* Lambda function acts as the backend server
* Entry point: `handler`

---

### 4. API Gateway Integration

* API Gateway exposes HTTP endpoints
* Routes are mapped to Lambda function
* All requests are proxied to the Hono application

---

### 5. Authentication (Cognito)

* AWS Cognito is used for user authentication
* Clients obtain an `AccessToken` via login
* Token is passed in `Authorization` header
* Middleware verifies JWT before allowing access

---

### 6. Database (DynamoDB)

* DynamoDB stores patient records
* Used for high-performance, scalable storage

---

### 7. Search (OpenSearch)

* OpenSearch is used for condition-based search
* Patient data is indexed during creation
* Search queries are executed on OpenSearch

---

### 8. CI/CD Pipeline (GitHub Actions)

On every push to `main` branch:

1. Install dependencies
2. Run ESLint checks
3. Run Prettier formatting check
4. Run tests (Jest)
5. Build project
6. Package application
7. Deploy to AWS Lambda

---

### 9. Environment Configuration

Environment variables used:

* `DYNAMO_TABLE`
* `AWS_REGION`
* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `AWS_OPENSEARCH_URL`
* `AWS_COGNITO_USER_POOL_ID`
* `AWS_COGNITO_APP_CLIENT_ID`

---

### 10. Monitoring & Logging

* Logs are available via AWS CloudWatch
* Used for debugging and monitoring API requests

---

### 11. Security Considerations

* JWT-based authentication using Cognito

---

### 12. Deployment Flow Summary

```text
Developer → GitHub Push → GitHub Actions → Build → Deploy → AWS Lambda → API Gateway → Client
```
