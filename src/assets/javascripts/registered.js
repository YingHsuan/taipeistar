var feeForAdult = 1000;
var feeForChild = 800;
$(document).ready(function () {
    $('#feeByMember').html(0);
    setPlan();
})
function countFee() {
    $('#feeByMember').html(0);
    var isFeeByAdultCheck = $('#feeByAdultCheck').prop("checked");
    var isFeeByChildCheck = $('#feeByChildCheck').prop("checked");
    if (isFeeByAdultCheck) {
        var fee = parseInt($('#feeByMember').html());
        var feeByAdult = parseInt($('#feeByAdult').val());
        fee += feeByAdult * feeForAdult;
        $('#feeByMember').html(fee);
    }
    if (isFeeByChildCheck) {
        var fee = parseInt($('#feeByMember').html());
        var feeByChild = parseInt($('#feeByChild').val());
        fee += feeByChild * feeForChild;
        $('#feeByMember').html(fee);
    }
}
$('#feeByAdultCheck, #feeByChildCheck').change(function() {
    countFee();
})
$('#feeByAdult, #feeByChild').keyup(function (e) {
    countFee();
})
function appendAvailableDate(dates) {
    var item = ''
    _.each(dates, function(v) {
        var date = v.date;
        var remainingQuota = v.remainingQuota;
        var day = v.day;
        var id = v.id;
        item += '<div class="column-x2"><input id="'+id+'" type="checkbox">' + date + '('+ day +')<font class="red">(剩餘：'+ remainingQuota +'人)</font></div>'
    })
    $('#available_date').empty();
    $('#available_date').append(item);
}
function setPlan() {
    getPlan().then(function (res) {
        var data = res.data;
        var planType = $('input[name="planType"]:checked').val();
        data = _.filter(data, ['planType', planType]);
        appendAvailableDate(data);
    })
}
$('input[name="planType"]').change(function() {
    setPlan();
})