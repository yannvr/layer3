// filepath: /Users/yannvallery-radot/dev/iview/layer3/jest.config.cjs
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/src/fileMock.ts',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
