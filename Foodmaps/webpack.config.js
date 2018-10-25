const path = require('path');
const webpack = require('webpack');
const typescript = require('typescript');
const { AotPlugin } = require('@ngtools/webpack').AotPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const rules = [
    { test: /\.html$/, loader: 'html-loader' },
    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=assets/[name].[ext]' },
    { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
    { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] }

];

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => module.context && /node_modules/.test(module.context)
    })
];
console.log(process.env.NODE_ENV);
// Does not work, ever
if (process.env.NODE_ENV === 'production') {
    console.log('STARTING PRODUCTION BUILD');
    rules.push({
        test: /\.ts$/, loaders: ['@ngtools/webpack']
    });
    plugins.push(
        new AotPlugin({
            tsConfigPath: './tsconfig.json',
            entryModule: 'src/app/app.module#AppModule'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            beautify: false,
            mangle: {
                screw_ie8: true
            },
            compress: {
                unused: true,
                dead_code: true,
                drop_debugger: true,
                conditionals: true,
                evaluate: true,
                drop_console: true,
                sequences: true,
                booleans: true,
                screw_ie8: true,
                warnings: false
            },
            comments: false
        }),
    );
} else {
    console.log('STARTING DEV BUILD');

    rules.push({
        test: /\.ts$/,
        loaders: [
            'awesome-typescript-loader', 'angular-router-loader', 'angular2-template-loader'
        ]
    });
    plugins.push(
        new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.resolve(__dirname, './notfound')),
        //new OptimizeCssAssetsPlugin({
        //    assetNameRegExp: /\.optimize\.css$/g,
        //    cssProcessor: require('cssnano'),
        //    cssProcessorOptions: { discardComments: { removeAll: true } },
        //    canPrint: true
        //}),            
        //new UglifyJsPlugin({
        //    uglifyOptions: {
        //        ecma: 8,
        //        warnings: false,
        //        compress: true,
        //        mangle: true,
        //        compress: {
        //            sequences: true,
        //            dead_code: true,
        //            conditionals: true,
        //            booleans: true,
        //            unused: true,
        //            if_return: true,
        //            join_vars: true,
        //            drop_console: true
        //        },

        //        output: {
        //            comments: false,
        //            beautify: false,
        //        },
        //        toplevel: false,
        //        nameCache: null,
        //        ie8: false,
        //        keep_classnames: undefined,
        //        keep_fnames: false,
        //        safari10: false,
        //    }
        //})
       
    );
}

module.exports = {
    cache: true,
    context: __dirname,
    devtool: 'sourcemap',
    entry: {
        app: ['zone.js/dist/zone', './src/main.ts']
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name]-chunk.js',
        publicPath: 'build/',
        path: path.resolve(__dirname, 'wwwroot/build')
    },
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: false,
        setImmediate: false
    },
    module: {
        rules
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            'src',
            'node_modules'
        ]
    },
    plugins
};