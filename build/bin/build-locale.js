/**
 * 生成语言翻译文件
 * esm => umd 风格
 */
var fs = require('fs');
var save = require('file-save');
var resolve = require('path').resolve;
var basename = require('path').basename;
// 读取语言目录
var localePath = resolve(__dirname, '../../src/locale/lang');
var fileList = fs.readdirSync(localePath);

// 转换方法
var transform = function(filename, name, cb) {
  // es module => umd 风格
  require('babel-core').transformFile(resolve(localePath, filename), {
    plugins: [
      'add-module-exports',
      ['transform-es2015-modules-umd', {loose: true}]
    ],
    moduleId: name
  }, cb);
};
// 遍历文件列表
fileList
    // 处理js文件
  .filter(function(file) {
    return /\.js$/.test(file);
  })
  .forEach(function(file) {
    var name = basename(file, '.js');

    transform(file, name, function(err, result) {
      if (err) {
        console.error(err);
      } else {
        var code = result.code;

        code = code
          .replace('define(\'', 'define(\'element/locale/')
          .replace('global.', 'global.ELEMENT.lang = global.ELEMENT.lang || {}; \n    global.ELEMENT.lang.');
        // 输出路径
        save(resolve(__dirname, '../../lib/umd/locale', file)).write(code);

        console.log(file);
      }
    });
  });
