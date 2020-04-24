let axios = require('axios');
// let sendData = {
//     address: '33/3, Azimpur Road'
// };
//
// let page=2;
// let number=3;
// let queryParameters = '?page='+page+'&number='+number;
//
// axios.get('http://localhost:5000/test'+queryParameters,
//     {
//         data: sendData,
//         headers: {
//             token: "147595741",
//         }
//     })
//     .then((res)=>{
//         console.log(res.data);
//     }).catch(e=>{
//     console.log('error');
// }).finally(()=>{
//     console.log('finished');
// });


let sendData = {
    address: '33/3, Azimpur Road'
};
axios.get('http://localhost:5000/test',
    {
        data: sendData,
        headers: {
            TOKEN: "147595741",
        }
    })
    .then((res)=>{
        console.log(res.data);
    }).catch(e=>{
    console.log('error');
}).finally(()=>{
    console.log('finished');
});