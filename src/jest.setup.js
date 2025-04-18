


require("jest-fetch-mock").enableMocks();
module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    transformIgnorePatterns: [
      "/node_modules/(?!@adobe/css-tools)"
    ],
  };
  