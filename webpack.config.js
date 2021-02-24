const path = require('path')
const dotenv = require('dotenv-webpack')

module.exports = {
    mode: "production",
    entry: "./src/engine.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/build.js'
    },
    plugins: [
        new dotenv({
            path:'./.env'
        })
    ]
}