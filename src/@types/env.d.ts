declare namespace NodeJS {
  export interface ProcessEnv {
    APP_WEB_URL?: string;
    NODE_ENV?: string;
    APP_SECRET?: string;
    MONGODB_URL?: string;
  }
}
