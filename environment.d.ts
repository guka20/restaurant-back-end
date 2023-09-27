declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_HOST?: string;
    DATABASE_PORT?: number;
    DATABASE_USER?: string;
    DATABASE_PASS?: string;
    DATABASE_NAME?: string;
    ENVIRONMENT: Environment;
  }
  export type Environment = 'DEVELOPMENT';
}
