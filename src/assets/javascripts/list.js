$(document).ready(function () {
    getPlan()
    .then( function(res){
        plans = res.data;
        setPlanType(plans);
        setPlanDate();
    })
    $('#planType').change(function () {
        setPlanDate();
    })
});
function setPlanType(plans) {
    var planTypes = [];
    var options = '';
    _.each(plans, function(plan){
    var planType = plan.planType;
    if (!planTypes.includes(planType)) {
        planTypes.push(planType);
        options += '<option>' + planType + '</option>';
    }
    });
    $('#planType').empty();
    $('#planType').append(options);
}
function setPlanDate() {
    getPlan()
        .then(function (res) {
            plans = res.data;
            var planType = $('#planType').val();
            plans = _.filter(plans, {'planType': planType})
            var planDates = [];
            var options = '';
            _.each(plans, function (plan) {
                var planDate = plan.date;
                var dayOfWeek = plan.dayOfWeek;
                if (!planDates.includes(planDate)) {
                    planDates.push(planDate);
                    options += '<option>' + planDate + '('+dayOfWeek+')</option>';
                }
            });
            $('#planDate').empty();
            $('#planDate').append(options);
        })
}