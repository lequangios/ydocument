const madge = require('madge');

madge('./public/mbDocument.js').then((res) => {
    console.log('1 Object with only circular dependencies')
    console.log(res.circular());
});

madge('./public/mbDocument.js').then((res) => {
    console.log('2 Array of all modules that no one is depending on')
    console.log(res.orphans());
});