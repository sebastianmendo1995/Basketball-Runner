const path = require('path');

module.exports = {
    entry: './src/baskeball_runner.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};