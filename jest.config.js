module.exports = {
    testMatch: ['**/src/**/?(*.)+(spec|test).js'],
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    },
    collectCoverageFrom: [
        '**/src/**/*.js',
        '!**/node_modules/**',
        '!**/src/**/?(*.)+spec.js',
        '!**/dist/index.js',
    ],
}
