#! /bin/sh
# 需要更换git仓库的地址 lib 、dev 、theme-chalk、element
mkdir temp_web
# 配置账号
#git config --global user.name "duduodudu"
git config --global user.name "element-bot"
#git config --global user.email "wallement@gmail.com"
git config --global user.email "1431761424@qq.com"

if [ "$ROT_TOKEN" = "" ]; then
  echo "Bye~"
  exit 0
fi

# release
if [ "$TRAVIS_TAG" ]; then
  # build lib
  npm run dist
  cd temp_web
  #git clone https://$ROT_TOKEN@github.com/ElementUI/lib.git && cd lib
  git clone https://$ROT_TOKEN@github.com/duduodudu/element-lib.git && cd lib
  rm -rf `find * ! -name README.md`
  cp -rf ../../lib/** .
  git add -A .
  git commit -m "[build] $TRAVIS_TAG"
  git tag $TRAVIS_TAG
  git push origin master --tags
  cd ../..

  # build theme-chalk
  cd temp_web
  # git clone https://$ROT_TOKEN@github.com/ElementUI/theme-chalk.git && cd theme-chalk
  git clone https://$ROT_TOKEN@github.com/duduodudu/element-theme-chalk.git && cd theme-chalk
  rm -rf *
  cp -rf ../../packages/theme-chalk/** .
  git add -A .
  git commit -m "[build] $TRAVIS_TAG"
  git tag $TRAVIS_TAG
  git push origin master --tags
  cd ../..

  # build site
  npm run deploy:build
  cd temp_web
  #  git clone --depth 1 -b gh-pages --single-branch https://$ROT_TOKEN@github.com/ElemeFE/element.git && cd element
  git clone --depth 1 -b gh-pages --single-branch https://$ROT_TOKEN@github.com/duduodudu/element.git && cd element
  # build sub folder
  echo $TRAVIS_TAG

  SUB_FOLDER='2.15'
  mkdir $SUB_FOLDER
  rm -rf *.js *.css *.map static
  rm -rf $SUB_FOLDER/**
  cp -rf ../../examples/element-ui/** .
  cp -rf ../../examples/element-ui/** $SUB_FOLDER/
  git add -A .
  git commit -m "$TRAVIS_COMMIT_MSG"
  git push origin gh-pages
  cd ../..

  echo "DONE, Bye~"
  exit 0
fi

# build dev site
npm run build:file && CI_ENV=/dev/$TRAVIS_BRANCH/ node_modules/.bin/cross-env NODE_ENV=production node_modules/.bin/webpack --config build/webpack.demo.js
cd temp_web
#git clone https://$ROT_TOKEN@github.com/ElementUI/dev.git && cd dev
git clone https://$ROT_TOKEN@github.com/duduodudu/element-dev.git && cd dev
mkdir $TRAVIS_BRANCH
rm -rf $TRAVIS_BRANCH/**
cp -rf ../../examples/element-ui/** $TRAVIS_BRANCH/
git add -A .
git commit -m "$TRAVIS_COMMIT_MSG"
git push origin master
cd ../..

# push dev theme-chalk
cd temp_web
#git clone -b $TRAVIS_BRANCH https://$ROT_TOKEN@github.com/ElementUI/theme-chalk.git && cd theme-chalk
git clone -b $TRAVIS_BRANCH https://$ROT_TOKEN@github.com/duduodudu/element-theme-chalk.git && cd theme-chalk
rm -rf *
cp -rf ../../packages/theme-chalk/** .
git add -A .
git commit -m "$TRAVIS_COMMIT_MSG"
git push origin $TRAVIS_BRANCH
cd ../..
