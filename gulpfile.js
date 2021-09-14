const path = require('path');
const { src, dest } = require('gulp');
const gulpPug = require('gulp-pug');
const gulpData = require('gulp-data');
const imageSize = require('image-size');

exports.default = function () {
  return src(path.resolve(__dirname, 'src/**/*.pug'))
    .pipe(
      gulpData((file) => {
        return {
          imageSize: (src) => {
            return imageSize(path.resolve(file.dirname, src));
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
