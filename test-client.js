const load = require('./dist/index');
load('/fnt/Lato-Regular-32.fnt', (_, font) => {
    console.log(font);
})
