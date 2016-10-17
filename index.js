const lint = require('./lint');

let text = 'image: node:latest';

lint(text)
    .then((res) => {
        if(res.error){
            console.log('lint error');
        }else{
            console.log('lint success');
        }
    })
    .catch((err) => {
        console.log(err.message);
    });
