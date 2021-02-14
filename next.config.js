require("dotenv").config();

const {
  DATABASE_URL,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_SECRET,
  AUTH0_SCOPE,
  AUTH0_COOKIE,
  BACK_END_ADDRESS,
} = process.env;


module.exports = {
  publicRuntimeConfig: {
    BACKEND_URL: `${BACK_END_ADDRESS}/api/graphql`
  },
  // this config will never be exposed to the client
  serverRuntimeConfig: {
    auth: {
      domain: AUTH0_DOMAIN,
      clientId: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      scope: AUTH0_SCOPE,
      redirectUri: `${BACK_END_ADDRESS}/api/callbcak`,
      postLogoutRedirectUri:`${BACK_END_ADDRESS}/`,
    },
    cookieSecret: AUTH0_COOKIE
  }
};