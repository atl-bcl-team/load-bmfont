const path = require('path');
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    target: 'node',
    mode: 'production',
    resolve: {
        fallback: {
            "buffer": require.resolve('buffer')        
        }
    },
    optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,

				// only minimize .min.js files
				include: /\.min\.js$/,
				extractComments: 'some'
			}),
		],
	},
	entry: {
		'/load-font.module': './src/load-font.js',
		'/load-font.module.min': './src/load-font.js',
	},
    output: {
		filename: '[name].js',
        clean: true,
        chunkFormat: 'module',
		library: {
			type: 'module',
		}
    },
    experiments: {
        outputModule: true
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, ''),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        }, ]
    }
};