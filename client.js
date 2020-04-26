let axios = require('axios');
let params = {
    bounds: {
        northeast: {
            lat: 24.510338411688174,
            lng: 90.9214621008292,
        },
        southwest: {

            lat: 22.8544133690995,
            lng: 89.79113789917083,
        },
    },
    filter:
        {
            orgName: null,
            schedule: null,
            typeOfRelief: []
        }
};
let headers = {
    'x-auth': null,
};

this.organizationLoaderFlag = true;
axios.get('https://protean-smile-275412.el.r.appspot.com/api/pins',
    {
        headers: headers,
        params: params
    })
    .then((res) => {
        console.log('response ', res);
    }).catch(e => {
    console.log('error');
}).finally(() => {
    console.log('loaded finished');

});

