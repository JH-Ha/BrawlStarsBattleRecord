const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent'); // CSS Module의 고유 className을 만들 때 필요한 옵션
const webpack = require('webpack');
const getClientEnvironment = require('./env');

const publicUrl = paths.publicUrlOrPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

const cssRegex = /.css$/;
const cssModuleRegex = /.module.css$/;
const sassRegex = /.(scss|sass)$/;
const sassModuleRegex = /.module.(scss|sass)$/;

module.exports = {
    mode: 'production',
    entry: paths.ssrIndexJs,
    target: 'node',
    output: {
        path: paths.ssrBuild,
        filename: 'server.js',
        chunkFilename: 'js/[name].chunk.js',
        publicPath: paths.publicUrlOrPath,
    },
    module: {
        rules: [
            {
                oneOf: [
                    // 자바스크립트를 위한 처리
                    // 기존 webpack.config.js를 참고하여 작성
                    {
                        test: /.(js|mjs|jsx|ts|tsx)$/,
                        include: paths.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {
                            customize: require.resolve(
                                'babel-preset-react-app/webpack-overrides'
                            ),
                            plugins: [
                                [
                                    require.resolve('babel-plugin-named-asset-import'),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent: '@svgr/webpack?-svgo![path]'
                                            }
                                        }
                                    }
                                ]
                            ],
                            cacheDirectory: true,
                            cacheCompression: false,
                            compact: false
                        }
                    },
                    // CSS를 위한 처리
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        //  onlyLocals: true 옵션을 설정해야 실제 CSS 파일을 생성하지 않습니다.
                        loader: require.resolve('css-loader'),
                        options: {
                            modules: {
                                exportOnlyLocals: false,
                            }
                        }
                    },
                    // CSS Module을 위한 처리
                    {
                        test: cssModuleRegex,
                        loader: require.resolve('css-loader'),
                        options: {
                            modules: true,
                            onlyLocals: true,
                            getLocalIdent: getCSSModuleLocalIdent
                        }
                    },
                    // Sass를 위한 처리
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    modules: {
                                        exportOnlyLocals: false,
                                    }
                                }
                            },
                            require.resolve('sass-loader')
                        ]
                    },
                    // Sass + CSS Module을 위한 처리
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    modules: true,
                                    onlyLocals: true,
                                    getLocalIdent: getCSSModuleLocalIdent
                                }
                            },
                            require.resolve('sass-loader')
                        ]
                    },
                    // url-loader를 위한 설정
                    {
                        test: [/.bmp$/, /.gif$/, /.jpe?g$/, /.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            emitFile: false, // 파일을 따로 저장하지 않는 옵션
                            limit: 10000, // 원래는 9.76KB가 넘어가면 파일로 저장하는데
                            // emitFile 값이 false일 때는 경로만 준비하고 파일은 저장하지 않습니다.
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    },
                    // 위에서 설정된 확장자를 제외한 파일들은
                    // file-loader를 사용합니다.
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/.(js|mjs|jsx|ts|tsx)$/, /.html$/, /.json$/],
                        options: {
                            emitFile: false, // 파일을 따로 저장하지 않는 옵션
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: ['node_modules']
    },
    // externals: [nodeExternals()],
    plugins: [
        new webpack.DefinePlugin(env.stringified) //환경변수를 주입해줍니다
    ]
}