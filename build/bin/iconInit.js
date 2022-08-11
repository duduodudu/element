'use strict';
/**
 * 读取icon的字体库文件，自动生成样例文件
 */
var postcss = require('postcss');
var fs = require('fs');
var path = require('path');
// 读取icon样式文件
var fontFile = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon.scss'), 'utf8');
// 得到样式节点
var nodes = postcss.parse(fontFile).nodes;
var classList = [];

// 遍历样式节点
nodes.forEach((node) => {
  //
  var selector = node.selector || '';
  var reg = new RegExp(/\.el-icon-([^:]+):before/);
  var arr = selector.match(reg);

  if (arr && arr[1]) {
    classList.push(arr[1]);
  }
});

classList.reverse(); // 希望按 css 文件顺序倒序排列

fs.writeFile(path.resolve(__dirname, '../../examples/icon.json'), JSON.stringify(classList), () => {});
