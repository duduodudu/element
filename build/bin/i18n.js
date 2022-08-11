'use strict';
/**
 * 根据官网页面的翻译配置文件，根据模板内容生成对应的vue文件
 * 用于渲染官方
 */
var fs = require('fs');
var path = require('path');
// 语言配置文件
var langConfig = require('../../examples/i18n/page.json');
// 遍历所有语言
langConfig.forEach(lang => {
  // lang: zh-CN
  try {
    // examples/pages/zh-CN
    fs.statSync(path.resolve(__dirname, `../../examples/pages/${ lang.lang }`));
  } catch (e) {
    // 创建目录
    fs.mkdirSync(path.resolve(__dirname, `../../examples/pages/${ lang.lang }`));
  }

  // 遍历所有的页面，根据page.tpl 模板文件，生成vue文件
  Object.keys(lang.pages).forEach(page => {
    // 模板文件路径 index
    // examples/pages/template/index.tpl
    var templatePath = path.resolve(__dirname, `../../examples/pages/template/${ page }.tpl`);
    // 输出文件路径
    // examples/pages/zh-CN/index.vue
    var outputPath = path.resolve(__dirname, `../../examples/pages/${ lang.lang }/${ page }.vue`);
    // 读取模板文件内容
    var content = fs.readFileSync(templatePath, 'utf8');
    // 匹配的内容，需要替换的字段，键值对配置
    var pairs = lang.pages[page];

    // 根据正则匹配 <%= key > 去替换对应的文本内容
    Object.keys(pairs).forEach(key => {
      content = content.replace(new RegExp(`<%=\\s*${ key }\\s*>`, 'g'), pairs[key]);
    });

    // 写入文件
    fs.writeFileSync(outputPath, content);
    console.info('i18n 生成文件:',outputPath);
  });
});
