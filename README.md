# Final Project API of **QuanNH**, vehicle management and ticket booking

<p>

<img src="https://img.shields.io/badge/Backend-NodeJS-green?style=for-the-badge&logo=node.js">
<img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge">
<img src="https://img.shields.io/badge/DataBase-MongoDB-lightgreen?style=for-the-badge&logo=mongoDB">

</p>

## Quick start

<ol>
    <li>Install latest versions for Node.js, yarn, Typescript and NPM </li>
    <li>Clone repository: <code>git clone https://github.com/Quannh126/bookingkbe</code></li>
    <li>Install dependencies: Run <code>yarn install</code> inside the project folder</li>
    <li>Create env fire follow keys and values below. </li>
    <li>Start dev server: After the install finishes, run <code>yarn server</code>. A browser window will open on http://localhost:5000 where you''ll see the live preview</li>
</ol>

#### Configure environment variable

```
MONGODB_URL = "Path to Mongodb url"
JWT_KEY = "Random string must matching with JWT_KEY in your front-end server"
REFRESH_KEY = "Random string must matching with REFRESH_KEY in your front-end server"
NODE_ENV = "environment: 'production' or 'development'"
PAGE_SIZE = "size of page in some table"

REGION='REGION of S3 server'
S3_ACCESS_KEY='Access key of s3'
SECRET_ACCESS_KEY ='S3 config'
BUCKET_NAME='Name of your bucket in s3'

vnp_TmnCode ='VNPay Tmncode'
vnp_HashSecret = 'VNPay HashSecret'
vnp_Url='URL payment page'
vnp_ReturnUrl='Return URL after complete payment method'
vnp_SecureHashType = 'Type of hash'
vnp_Api='Api VNPay'
```

#### VNpay

Vnpay configuration can be found at [Guideline document VNpay payment gate](https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop/)
