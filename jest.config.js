module.exports = {
  setupFiles: ['./test-setup.js'],
  setupFilesAfterEnv: ['jest-expect-message'],
  testPathIgnorePatterns: ['/node_modules/', '/__utils__/'],
};
