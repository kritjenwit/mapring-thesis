export interface JWTPayload {
  userid: string;
  role: string;
}

export interface EnvironmentsType {
  DB_HOST: string;
  DB_USER: string;
  DB_PASS: string;
  DB_PORT: number;
  DB_NAME: string;
}
