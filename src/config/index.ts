import path from "path";

import * as dotenv from "dotenv";

const x = path.join(__dirname, "../../.env");

dotenv.config({ path: x });

const serverConfig =
{
    port: process.env.PORT || "5000",
    host: process.env.HOST || "0.0.0.0",
    appVersion: process.env.npm_package_version,
    releaseStage: process.env.NODE_ENV,
    envType: process.env.NODE_ENV || "local",
    domain: ".com",
    keys: {
        JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN_SECRET || "",
        JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN_SECRET || "",
        JWT_OTHER_TOKEN: process.env.JWT_OTHER_TOKEN || "",
    },
    dbHost: process.env.DB_HOST || "",
    dbUserName: process.env.DB_USER || "",
    dbPassword: process.env.DB_PASSWORD || "",
    dbName: process.env.DB_NAME || "",
    fbAppId: process.env.FB_APP_ID || "",
    fbAppSecret: process.env.FB_APP_SECRET || "",
    googleAppId: process.env.GOOGLE_APP_ID || "",
    googleAppSecret: process.env.GOOGLE_APP_SECRET || "",
    redirectUri: process.env.REDIRECT_URI || "",
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
    fbGraphApiUrl: "https://graph.facebook.com",
    fbVersion: "v18.0",
    tiktokAppId: process.env.TIKTOK_APP_ID || "",
    tiktokApiUrl: "https://business-api.tiktok.com/open_api",
    // tiktokApiUrl: "https://sandbox-ads.tiktok.com/open_api",
    tiktokAppSecret: process.env.TIKTOK_APP_SECRET || "",
    tiktokVersion: "v1.3",
    // tiktokVersion: "v1.2",
    googleApiUrl: "https://oauth2.googleapis.com",
    googleAdsApiUrl: "https://googleads.googleapis.com",
    googleVersion: "v16",
    googleDeveloperToken: process.env.GOOGLE_DEVELOPER_TOKEN || "",
    googleClientId: process.env.GOOGLE_APP_ID || "",
    googleClientSecret: process.env.GOOGLE_APP_SECRET || "",
    paymentRedirectUrl: process.env.PAYMENT_REDIRECT_URL,
    redisUrl: process.env.REDIS_URL || "",
    openAPIExchangeRate: process.env.OPEN_API_EXCHANGE_RATE || "",
};

export {
    serverConfig,
};

