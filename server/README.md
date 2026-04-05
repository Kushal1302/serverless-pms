# 🚀 Serverless Patient Management System (PMS)

A fully serverless backend system built using Node.js and AWS services, supporting patient CRUD operations, authentication, and advanced search capabilities.

---

## 🧰 Tech Stack

* **Node.js** (Hono framework)
* **AWS Lambda**
* **API Gateway**
* **DynamoDB** (Primary database)
* **Amazon Cognito** (Authentication)
* **Amazon OpenSearch Service** (Search engine)
* **GitHub Actions** (CI/CD)
* **ESLint + Prettier** (Code quality)

---

## 🧠 Architecture Overview

Client → API Gateway → Lambda (Hono App)
                  ↓
                DynamoDB (Storage)
                ↓
              OpenSearch (Search)

Authentication handled via Cognito using JWT tokens.

---

## 🔐 Authentication Flow

1. User logs in via Cognito
2. Receives `AccessToken`
3. Token passed in headers:

```
Authorization: Bearer <AccessToken>
```

4. Backend verifies token using `aws-jwt-verify`

---

## 📦 Features

* ✅ Create, Read, Update, Delete patients
* 🔐 Secure APIs using Cognito JWT authentication
* 🔍 Search patients by medical conditions using OpenSearch
* ⚡ Serverless deployment (Lambda + API Gateway)
* 🔄 CI/CD pipeline using GitHub Actions
* 🧹 Code quality enforced with ESLint & Prettier

---

## 📁 Project Structure

```
server/
│── src/
│   ├── modules/
│   │   └── patient/
│   │       ├── patient.controller.ts
│   │       ├── patient.service.ts
│   │       ├── patient.routes.ts
│   │       └── patient.schema.ts
│   ├── middleware/
│   │       └── auth.middleware.ts
│   ├── lib/
│   │       └── opensearch.ts
│   ├── utils/
│   │       └── response.ts
│   └── index.ts
│
├── dist/
├── .env
└── package.json
```

---

## ⚙️ Local Setup

### 1. Clone Repository

```
git clone <your-repo-url>
cd server
```

---

### 2. Install Dependencies

```
npm install
```

---

### 3. Environment Variables

Create `.env` file:

```
PORT=3000
DYNAMO_TABLE=Patients
AWS_REGION=eu-central-1
OPENSEARCH_URL=your-opensearch-endpoint
COGNITO_USER_POOL_ID=your_user_pool_id
COGNITO_CLIENT_ID=your_client_id
```

---

### 4. Run Locally

```
npm run dev
```

Open:

```
http://localhost:3000
```

---

## ☁️ Deployment

* Code is bundled using **esbuild**
* Deployed to **AWS Lambda**
* API exposed via **API Gateway**
* Automated deployment using **GitHub Actions**

---

## 🔄 CI/CD Pipeline

On every push to `main`:

1. Install dependencies
2. Run ESLint
3. Check Prettier formatting
4. Build project
5. Zip build
6. Deploy to AWS Lambda

---

## 📡 API Endpoints

### 🔐 Authentication (Cognito)

```
POST https://cognito-idp.eu-central-1.amazonaws.com/
```

---

### ➕ Create Patient

```
POST /patients
```

---

### 📥 Get Patient

```
GET /patients/:id
```

---

### ✏️ Update Patient

```
PUT /patients/:id
```

---

### 🗑️ Delete Patient

```
DELETE /patients/:id
```

---

### 🔍 Search Patients

```
GET /patients/search?condition=Diabetes
```

---

## 🔍 Design Decisions

* **DynamoDB** used for fast and scalable storage
* **OpenSearch** used for condition-based search (since DynamoDB does not support efficient array queries)
* **Cognito** used for secure and scalable authentication
* **JWT middleware** ensures stateless authentication
* **Serverless architecture** reduces infrastructure overhead

---

## ⚠️ Notes

* OpenSearch access policy is simplified for development
* In production, IAM-based access and request signing should be used

---

## 🧪 Postman Collection

A Postman collection is included to test all APIs.

---

## 📚 References

JWT verification guide:
https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html

---

## 💬 Author

Built by Kushal Kumar 🚀
