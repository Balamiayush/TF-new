export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";

export const publicEnv = {
  POCKETBASE_BASE_URL: process.env.NEXT_PUBLIC_POCKETBASE_URL || "",
};

export const serverEnv = {
  RESEND_API_KEY: process.env.RESEND_API_KEY || "",
  FROM_EMAIL: process.env.FROM_EMAIL || "",
  TO_EMAIL: process.env.TO_EMAIL || "",
};
