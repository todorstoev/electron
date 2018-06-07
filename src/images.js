const path = require('path');
const fs = require('fs');
let cachedImages = [];
let images = {

    save: (picturesPath, contents, done) => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        let hour = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let secs = currentDate.getSeconds();

        const base64Data = contents.replace(/^data:image\/png;base64,/, '');
        const imgPath = path.join(picturesPath, `image-${day}_${month}_${hour}-${minutes}-${secs}.png`);

        fs.writeFile(imgPath, base64Data, { encoding: 'base64' }, err => {
            if (err) {
                conole.log(err)
            } else {
                done(null, imgPath);
            }
        })
    },
    getPicturesDir: app => {
        return path.join(app.getPath('pictures'), 'codix')
    },
    mkdir: picturesPath => fs.stat(picturesPath, (err, stats) => {
        if (err && err.code !== 'ENOENT')
            return console.log(err + 2)
        else if (err || !stats.isDirectory())
            fs.mkdir(picturesPath, err => console.log(err + 3))

    }),
    cache: imgPath => {
        cachedImages = cachedImages.concat([imgPath]);
        return cachedImages;
    },
    getFromCache: index => {
        return cachedImages[index];
    },
    rm: (index, done) => {
        debugger
        fs.unlink(cachedImages[index], err => {
            if (err) {
                console.log(err);
            } else {
                cachedImages.splice(index, 1);
                done()
            }
        })
    }
}

module.exports = images;