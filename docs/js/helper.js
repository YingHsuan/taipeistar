function getPlan(){return axios.get("/api/plans",{headers:{"Content-Type":"application/json"}}).catch((function(n){console.log(n)}))}function getAvailablePlan(){return axios.get("/api/available-plans",{headers:{"Content-Type":"application/json"}}).catch((function(n){console.log(n)}))}function getGroupInPlanById(n){return axios.get("/api/groups-in-plan/"+n,{headers:{"Content-Type":"application/json"}}).catch((function(n){console.log(n)}))}function getGroupInPlan(n){return axios.get("/api/groups-in-plan",{headers:{"Content-Type":"application/json"},params:n}).catch((function(n){console.log(n)}))}function getOrder(){var n=$.Deferred();return axios.get("/api/orders",{headers:{"Content-Type":"application/json"}}).then((function(e){n.resolve(e)})).catch((function(e){n.reject(e)})),n}function getOrderById(n){return axios.get("/api/orders/"+n,{headers:{"Content-Type":"application/json"}}).catch((function(n){console.log(n)}))}function getExportOrders(){var n=$.Deferred();return axios.get("/api/export/orders",{headers:{"Content-Type":"application/json"}}).then((function(e){n.resolve(e)})).catch((function(e){n.reject(e)})),n}function postOrder(n){var e=$.Deferred();return axios.post("/api/orders",n,{headers:{"Content-Type":"application/json"}}).then((function(n){e.resolve(n)})).catch((function(n){e.reject(n)})),e}function patchOrderById(n,e){var t=$.Deferred();return axios.patch("/api/orders/"+n,e,{headers:{"Content-Type":"application/json"}}).then((function(n){t.resolve(n)})).catch((function(n){t.reject(n)})),t}function postGroupMailNotification(n){return axios.post("/api/group-mail-notification",n,{headers:{"Content-Type":"application/json"}}).catch((function(n){console.log(n)}))}function ValidateEmail(n){return!!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(n)}function validateID(n){if(tab="ABCDEFGHJKLMNPQRSTUVXYWZIO",A1=new Array(1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3),A2=new Array(0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5),Mx=new Array(9,8,7,6,5,4,3,2,1,1),10!=n.length)return!1;if(i=tab.indexOf(n.charAt(0)),-1==i)return!1;for(sum=A1[i]+9*A2[i],i=1;i<10;i++){if(v=parseInt(n.charAt(i)),isNaN(v))return!1;sum+=v*Mx[i]}return sum%10==0}function calculate_age(n){n=new Date(n);var e=new Date;return Math.floor((e-n)/315576e5)}function goToPay(n){var e=n.replace(/\\/g,""),t=$(e);$(document.body).append(t),t.submit()}function setLoading(n){n?$(".Loading-box").removeClass("hide"):$(".Loading-box").hasClass("hide")||$(".Loading-box").addClass("hide")}