function getPlan(){return axios.get("/api/plans",{headers:{"Content-Type":"application/json"}}).catch((function(e){console.log(e)}))}function getAvailablePlan(){var e=$.Deferred();return axios.get("/api/available-plans",{headers:{"Content-Type":"application/json"}}).then((function(n){e.resolve(n)})).catch((function(n){e.reject(n)})),e}function getGroupInPlanById(e){var n=$.Deferred();return axios.get("/api/groups-in-plan/"+e,{headers:{"Content-Type":"application/json"}}).then((function(e){n.resolve(e)})).catch((function(e){n.reject(e)})),n}function getGroupInPlan(e){var n=$.Deferred();return axios.get("/api/groups-in-plan",{headers:{"Content-Type":"application/json"},params:e}).then((function(e){n.resolve(e)})).catch((function(e){n.reject(e)})),n.promise()}function getOrder(){var e=$.Deferred();return axios.get("/api/orders",{headers:{"Content-Type":"application/json"}}).then((function(n){e.resolve(n)})).catch((function(n){e.reject(n)})),e}function getOrderById(e){return axios.get("/api/orders/"+e,{headers:{"Content-Type":"application/json"}}).catch((function(e){console.log(e)}))}function getExportOrders(){var e=$.Deferred();return axios.get("/api/export/orders",{headers:{"Content-Type":"application/json"}}).then((function(n){e.resolve(n)})).catch((function(n){e.reject(n)})),e}function postOrder(e){var n=$.Deferred();return axios.post("/api/orders",e,{headers:{"Content-Type":"application/json"}}).then((function(e){n.resolve(e)})).catch((function(e){n.reject(e)})),n}function patchOrderById(e,n){var t=$.Deferred();return axios.patch("/api/orders/"+e,n,{headers:{"Content-Type":"application/json"}}).then((function(e){t.resolve(e)})).catch((function(e){t.reject(e)})),t}function postGroupMailNotification(e){return axios.post("/api/group-mail-notification",e,{headers:{"Content-Type":"application/json"}}).catch((function(e){console.log(e)}))}function ValidateEmail(e){return!!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)}function validateID(e){if(tab="ABCDEFGHJKLMNPQRSTUVXYWZIO",A1=new Array(1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3),A2=new Array(0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5),Mx=new Array(9,8,7,6,5,4,3,2,1,1),10!=e.length)return!1;if(i=tab.indexOf(e.charAt(0)),-1==i)return!1;for(sum=A1[i]+9*A2[i],i=1;i<10;i++){if(v=parseInt(e.charAt(i)),isNaN(v))return!1;sum+=v*Mx[i]}return sum%10==0}function calculate_age(e){e=new Date(e);var n=new Date("2020-09-01");return Math.floor((n-e)/315576e5)}function FormatNumber(e){var n=(e+="").split(".");return n[0].replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+(2==n.length?"."+n[1]:"")}function goToPay(e){var n=e.replace(/\\/g,""),t=$(n);$(document.body).append(t),t.submit()}function paymentCallbacksByTradeNo(e){var n=$.Deferred();return axios.get("/api/payment-callbacks/"+e,{headers:{"Content-Type":"application/json"}}).then((function(e){n.resolve(e)})).catch((function(e){n.reject(e)})),n}function setLoading(e){e?$(".Loading-box").removeClass("hide"):$(".Loading-box").hasClass("hide")||$(".Loading-box").addClass("hide")}