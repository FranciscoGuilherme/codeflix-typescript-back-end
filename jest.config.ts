export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  rootDir: "src",
  testRegex: ".*\\..*spec\\.ts$",
  transform: {
    "^.+\\.ts?$": ["@swc/jest"]
  },
  moduleNameMapper: {
    '^@seedwork/(.*)$': '<rootDir>/@seedwork/$1',
  }
};
