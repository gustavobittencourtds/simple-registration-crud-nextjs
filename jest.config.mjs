import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["core-js"],
  
};


export default createJestConfig(customJestConfig);