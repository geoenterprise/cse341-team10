module.exports = {
    preset: '@shelf/jest-mongodb',  // Use the jest-mongodb preset
    testEnvironment: 'node',        // Use Node.js as the environment for tests
    setupFiles: ['dotenv/config'], // Optional: if you're using dotenv to manage environment variables
};