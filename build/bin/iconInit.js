'use strict';
/**
 * 读取icon的字体库文件，自动生成样例文件
 * 根据 icon.scss 样式文件中的选择器，通过正则匹配的方式，匹配出所有的 icon 名称，
 * 然后将所有 icon 名组成的数组写入到 /examples/icon.json 文件中
 * 该文件在官网的 icon 图标页用来自动生成所有的 icon 图标
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
  // 每个节点的选择器
  var selector = node.selector || '';
  // 正则匹配 .el-icon-add:before  => add
  var reg = new RegExp(/\.el-icon-([^:]+):before/);
  var arr = selector.match(reg);

  if (arr && arr[1]) {
    classList.push(arr[1]);
    // console.log('iconInit.js 添加:',selector);
  }
});

// 倒序处理
classList.reverse(); // 希望按 css 文件顺序倒序排列

// 写入文件
fs.writeFile(path.resolve(__dirname, '../../examples/icon.json'), JSON.stringify(classList), () => {
  console.log('iconInit.js 生成文件: /examples/icon.json');
});
