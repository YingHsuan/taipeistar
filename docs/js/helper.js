function getPlan(){return axios.get("/api/plans",{headers:{"Content-Type":"application/json"}}).catch((function(n){console.log(n)}))}function postOrder(n){return axios.post("/api/orders",n,{headers:{"Content-Type":"application/json"}}).catch((function(n){console.log(n)}))}function ValidateEmail(n){return!!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(n)}function goToPay(n){var o=n.replace(/\\/g,""),t=$(o);$(document.body).append(t),t.submit()}