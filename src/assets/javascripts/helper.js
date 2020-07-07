function getPlan() {
    return axios.get('/api/plans', {
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch(function (error) {
        console.log(error);
    });
}
function postOrder(payload) {
   return axios.post('/api/orders', payload, {
       headers: {
           'Content-Type': 'application/json',
       },
   }).catch(function (error) {
       console.log(error);
   });
}