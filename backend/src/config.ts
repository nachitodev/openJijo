export default function getConfig() {
  const {
    PORT: port,
    DATABASE_URL: databaseUrl,
    PUBLIC_KEY: publicKey,
    PRIVATE_KEY: privateKey,
    COOKIE_SECRET: cookieSecret,
  } = process.env;

  return { port, databaseUrl, publicKey, privateKey, cookieSecret };
}
