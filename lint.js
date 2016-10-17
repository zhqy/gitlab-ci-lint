'use strict'
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const FormData = require('form-data');

module.exports = (config) => {
    let form = new FormData();
    form.append('authenticity_token', 'jboK4oqab40M+FSdtQ95lbHWBW4ubuOP2M6f/ArkAunr5SRUnQM9Zra21JMnksgWG1gKVlOSvElJisvrJ1cOfQ==');
    form.append('content', config);
    //form.append('utf8', '')

    console.log('start fetch lint result. config: ' + config);
    let ret = fetch('https://gitlab.com/ci/lint', {
        method: 'POST',
        body: form,
        headers: form.getHeaders()
    })
        .then((res) => {
            console.log('fetch done');
            if(res.status !== 200){
                return Promise.reject(new Error(res.statusText));
            }
            return res.text();
        });

    return ret.then((data) => {
        console.log('cheerio start to handle http result');
        return cheerio.load(data, {
            decodEntitis: false
        }).then(($) => {
            let status = $('.results p b');
            let error = $('.results b');
            return {status, error};
        })
    });

}

