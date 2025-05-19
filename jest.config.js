module.exports = {
  // ... other Jest configurations
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary'],
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'reports/junit' }],
  ],
};