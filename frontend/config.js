const baseConfig = {
  serverIp: /*"http://localhost",*/ "http://109.123.237.36",
  serverPort: 5000,
};

const serverApiAddress = () => {
  return `${baseConfig.serverIp}:${baseConfig.serverPort}`;
};

export const config = {
  apiPoint: {
    logOut: `${serverApiAddress()}/api/logout`,
    getMovieInfo: `${serverApiAddress()}/api/getMovieInfo/`,
    fileAvailable: `${serverApiAddress()}/api/fileAvailable/`,
    fetchQuery: `${serverApiAddress()}/api/fetchQuery/`,
    whatsAuth: {
      otp: `${serverApiAddress()}/api/auth/whatsapp`,
      otpVerify: `${serverApiAddress()}/api/auth/otpverify`,
    },
    openXfile: `${serverApiAddress()}/api/watchOnline/uniqueHash/`,
    home: `${serverApiAddress()}/api/home`,
  },
};
