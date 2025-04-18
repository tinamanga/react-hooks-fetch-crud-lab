


require("jest-fetch-mock").enableMocks();
module.exports = {
    transformIgnorePatterns: [
        "/node_modules/(?!@adobe/css-tools)"  
      ],
      transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
      }
  };
  