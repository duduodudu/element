/**
 * 处理样式文件
 */
var fs = require('fs');
var path = require('path');
// json
var Components = require('../../components.json');
var themes = [
  'theme-chalk'
];
// 组件包数据
Components = Object.keys(Components);
// packages
var basepath = path.resolve(__dirname, '../../packages/');

/**
 * 判断文件是否存在
 * @param filePath
 * @returns {boolean|*}
 */
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

// 遍历主题
themes.forEach((theme) => {
  // 是否为 theme-chalk ，用于判断是否scss文件或者css文件
  var isSCSS = theme !== 'theme-default';
  var indexContent = isSCSS ? '@import "./base.scss";\n' : '@import "./base.css";\n';
  // 遍历组件数组
  Components.forEach(function(key) {
    // 不做处理
    if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;
    // 组件名.scss checkbox-button.scss
    var fileName = key + (isSCSS ? '.scss' : '.css');
    // import模板字符串
    indexContent += '@import "./' + fileName + '";\n';
    //  完整路径 packages/theme-chalk/src/checkbox-button.scss
    var filePath = path.resolve(basepath, theme, 'src', fileName);
    // 判断文件是否存在，如果不存在创建一个空的文件
    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8');
      console.log(theme, ' 创建遗漏的 ', fileName, ' 文件');
    }
  });
  // 生成 index 文件
  fs.writeFileSync(path.resolve(basepath, theme, 'src', isSCSS ? 'index.scss' : 'index.css'), indexContent);
});
