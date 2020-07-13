$(document).ready(function () {
    setLoading(true);
    var paymentMerchantTradeNo = sessionStorage.getItem('paymentMerchantTradeNo');
    paymentCallbacksByTradeNo(paymentMerchantTradeNo)
        .done(function (res) {
            var data = res.data;
            var RtnCode = data.RtnCode;
            if (RtnCode == 1) {
                setLoading(false);
            } else {
                alert('交易失敗');
                window.location.href = './registered';
            }
        }).fail(function(err) {
            alert('交易失敗');
            window.location.href = './registered';
        })
})