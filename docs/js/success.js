$(document).ready((function(){setLoading(!0);var e=sessionStorage.getItem("paymentMerchantTradeNo");paymentCallbacksByTradeNo(e).done((function(e){1==e.data.RtnCode?setLoading(!1):(alert("交易失敗"),window.location.href="./registered")})).fail((function(e){alert("交易失敗"),window.location.href="./registered"}))}));