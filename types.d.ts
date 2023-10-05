declare module "*.ico" {
  const value: any;
  export default value;
}

type Env = {
  API_KEY?: string;
  APP_ID?: string;
  AUTH_DOMAIN?: string;
  MESSAGING_SENDER_ID?: string;
  PROJECT_ID?: string;
  STORAGE_BUCKET?: string;
  VAPID_KEY?: string;
}