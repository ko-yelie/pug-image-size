const path = require('path');
const { src, dest } = require('gulp');
const gulpPug = require('gulp-pug');
const gulpData = require('gulp-data');
const imageSize = require('image-size');

const sourcePath = path.resolve(__dirname, 'src');

exports.default = function () {
  return src(path.resolve(sourcePath, '**/*.pug'))
    .pipe(
      gulpData((file) => {
        // file: 処理中のPugファイルに関する情報
        // file.dirname: 処理中のPugファイルのあるディレクトリパス
        return {
          // imageSizeという名前の関数をPug内で使えるようにする
          imageSize: (src) => {
            // imgタグのsrc属性のパスを基にファイルパスを生成する
            const filePath = src.startsWith('/')
              ? path.resolve(sourcePath, src.slice(1)) // /から始まるルート相対パスの場合
              : path.resolve(file.dirname, src); // 相対パスの場合
            // ファイルパスに該当する画像のサイズをimage-sizeで取得する
            return imageSize(filePath);
          },
        };
      })
    )
    .pipe(
      gulpPug({
        pretty: '  ',
      })
    )
    .pipe(dest(path.resolve(__dirname, 'public')));
};
