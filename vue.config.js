module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  configureWebpack: {
    output: {
      filename: 'js/'+'[name].[hash:4].js',
      chunkFilename: 'js/'+'[name].[hash:4].js'
    },
  },
  css: {
    extract: {
      filename: 'css/[name].[hash:4].css',
      chunkFilename: 'css/[name].[hash:4].css',
    },
  },
};