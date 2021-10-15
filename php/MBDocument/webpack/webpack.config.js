const path = require('path')
const webpack = require('webpack')
const banner = `
███╗░░░███╗██████╗░██████╗░░█████╗░░█████╗░██╗░░░██╗███╗░░░███╗███████╗███╗░░██╗████████╗
████╗░████║██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║░░░██║████╗░████║██╔════╝████╗░██║╚══██╔══╝
██╔████╔██║██████╦╝██║░░██║██║░░██║██║░░╚═╝██║░░░██║██╔████╔██║█████╗░░██╔██╗██║░░░██║░░░
██║╚██╔╝██║██╔══██╗██║░░██║██║░░██║██║░░██╗██║░░░██║██║╚██╔╝██║██╔══╝░░██║╚████║░░░██║░░░
██║░╚═╝░██║██████╦╝██████╔╝╚█████╔╝╚█████╔╝╚██████╔╝██║░╚═╝░██║███████╗██║░╚███║░░░██║░░░
╚═╝░░░░░╚═╝╚═════╝░╚═════╝░░╚════╝░░╚════╝░░╚═════╝░╚═╝░░░░░╚═╝╚══════╝╚═╝░░╚══╝░░░╚═╝░░░`

module.exports = (env) => {
    if (env == 'development') {
        return {
            mode: 'development',
            entry: ["@babel/polyfill", './src/main.js'],
            output: {
                filename: 'mbDocument.js',
                path: path.resolve(__dirname, 'public/assets/'),
            },
            devServer: {
                contentBase: path.join(__dirname, 'public/'),
                compress: true,
                host: '0.0.0.0',
                port: 9000,
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    include: /(src)/,
                    use: {
                        loader: 'babel-loader',

                        options: {
                            presets: ['@babel/preset-env', {
                                'plugins': ['@babel/plugin-proposal-class-properties']
                            }],
                        },
                    },
                }]
            },
            plugins: [
                new webpack.BannerPlugin(banner),
                new webpack.DefinePlugin({
                    'process.env': {
                        API_ENDPOINT: JSON.stringify("http://0.0.0.0:8080/api/"),
                        API_TIME_OUT: 6000
                    }
                })
            ]
        }
    } else {
        return {
            mode: 'production',
            entry: ["@babel/polyfill", './src/main.js'],
            output: {
                filename: 'mbDocument.js',
                path: path.resolve(__dirname, 'public'),
            },
            devServer: {
                contentBase: path.join(__dirname, 'public'),
                compress: true,
                host: '0.0.0.0',
                port: 9000,
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    include: /(src)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', {
                                'plugins': ['@babel/plugin-proposal-class-properties']
                            }],
                        },
                    },
                }]
            },
            plugins: [
                new webpack.BannerPlugin(banner),
                new webpack.DefinePlugin({
                    'process.env': {
                        API_ENDPOINT: JSON.stringify("http://localhost:8080/api/"),
                        API_TIME_OUT: 6000
                    }
                })
            ]
        }
    }
}