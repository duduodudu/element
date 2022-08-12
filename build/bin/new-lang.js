'use strict';
/**
 * 为组件库添加新语言，比如 fr（法语）
 *  分别为涉及到的文件设置该语言的相关配置
 *  components.json:
 *  page.json、
 *  route.json、
 *  nav.config.json、
 *  docs
 *  具体的配置项默认为英语，只需要在相应的文件中将这些英文配置项翻译为对应的语言即可
 */

console.log('new-lang.js 执行');
process.on('exit', () => {
  console.log();
});

// 判断参数，必须要传递语言名称
if (!process.argv[2]) {
  console.error('[language] is required!');
  // 退出程序
  process.exit(1);
}

var fs = require('fs');
const path = require('path');
const fileSave = require('file-save');
// 获取语言名称
const lang = process.argv[2];
// const configPath = path.resolve(__dirname, '../../examples/i18n', lang);

// 添加到 components.json
const componentFile = require('../../examples/i18n/component.json');
// 先判断语言是否存在
if (componentFile.some(item => item.lang === lang)) {
  console.error(`${lang} already exists.`);
  process.exit(1);
}
// 复制对象  根据英文配置，复制给新的语言对象
let componentNew = Object.assign({}, componentFile.filter(item => item.lang === 'en-US')[0], { lang });
// 追加新语言
componentFile.push(componentNew);
// 回写  将被改动后的配置文件回写
fileSave(path.join(__dirname, '../../examples/i18n/component.json'))
  .write(JSON.stringify(componentFile, null, '  '), 'utf8')
  .end('\n');

// 添加到 page.json
const pageFile = require('../../examples/i18n/page.json');
let pageNew = Object.assign({}, pageFile.filter(item => item.lang === 'en-US')[0], { lang });
pageFile.push(pageNew);
fileSave(path.join(__dirname, '../../examples/i18n/page.json'))
  .write(JSON.stringify(pageFile, null, '  '), 'utf8')
  .end('\n');

// 添加到 route.json  语言的路由文件
const routeFile = require('../../examples/i18n/route.json');
routeFile.push({ lang });
fileSave(path.join(__dirname, '../../examples/i18n/route.json'))
  .write(JSON.stringify(routeFile, null, '  '), 'utf8')
  .end('\n');

// 添加到 nav.config.json
const navFile = require('../../examples/nav.config.json');
navFile[lang] = navFile['en-US'];
fileSave(path.join(__dirname, '../../examples/nav.config.json'))
  .write(JSON.stringify(navFile, null, '  '), 'utf8')
  .end('\n');

// docs 下新建对应文件夹
try {
  fs.statSync(path.resolve(__dirname, `../../examples/docs/${ lang }`));
} catch (e) {
  fs.mkdirSync(path.resolve(__dirname, `../../examples/docs/${ lang }`));
}

console.log('DONE!');
