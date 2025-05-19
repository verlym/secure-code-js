// jest.config.js
module.exports = {
  // ... other Jest configurations
  collectCoverage: true,
  coverageDirectory: 'coverage', // Default coverage directory
  coverageReporters: ['lcov', 'text-summary'], // lcov is important for SonarCloud
};