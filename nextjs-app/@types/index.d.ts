namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY: string;
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;
    MAGIC_SECRET: string;

    EMAIL_SERVER: string;
    EMAIL_FROM: string;
    APPLE_ID: string;
    APPLE_TEAM_ID: string;
    APPLE_PRIVATE_KEY: string;
    APPLE_KEY_ID: string;
    AUTH0_ID: string;
    AUTH0_SECRET: string;
    AUTH0_DOMAIN: string;
    FACEBOOK_ID: string;
    FACEBOOK_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    TWITTER_ID: string;
    TWITTER_SECRET: string;
    DATABASE_URL: string;

    SESSION_SECRET: string;
    PRIVATE_KEY: string;
    BACKEND_API_KEY: string;
  }
}

declare module "*.jpg" {
  const path: string;
  export default path;
}

declare module "*.png" {
  const path: string;
  export default path;
}

declare module "@userfront/react" {
  const userfront: {
    init: (id: string) => void;
    build: (options: { toolId: string }) => React.Element;
    tokens: {
      accessTokenName: string;
    };
    logout: () => void;
  };
  export default userfront;
  export type JwtPayload = {
    userId: string;
    authorization: string;
  };
}
