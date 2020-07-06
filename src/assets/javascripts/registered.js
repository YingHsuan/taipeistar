var feeForAdult = 800;
var feeForChild = 400;
$('#feeByMember').html(0);
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