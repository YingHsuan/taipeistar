var resultAvailablePlanType = [];
var resultAvailablePlanDate = [];
$(document).ready(function () {
    getPlan()
    .then( function(res){
        plans = res.data;
        setPlanType(plans);
        setPlanDate();
    });
    $('#planType').change(function () {
        setPlanDate();
    });
    $('#search').keyup(function () {
        var value = $(this).val().toLowerCase();
        $('#list tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    getAvailablePlans();
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
function getAvailablePlans() {
    getAvailablePlan()
    .then( function(res) {
        var availablePlans = res.data;
        // resultAvailablePlanType = _.map(_.uniqBy(availablePlans, 'planType'), 'planType');
        // resultAvailablePlanDate = _.map(_.uniqBy(availablePlans, 'date'), 'date');
        _.each(availablePlans, function(plan) {
            var params = {
                "planType": plan.planType,
                "planDate": plan.date,
            }
            getGroupInPlan(params)
                .then(function (res) {
                    var groups = res.data;
                    plan.groups = groups;
                })
        })
        getOrders(availablePlans);
    });
}
function getOrders(availablePlans) {
    getOrder()
    .then( function(res) {
        orders = res.data;
        var orderItem = '';
        resultAvailablePlanType = _.map(_.uniqBy(availablePlans, 'planType'), 'planType');
        _.each(orders, function(order) {
            var c_accomodation = (order.accomodation)?'有':'無';
            var numOfAdult = order.numberOfAdults;
            var numOfChild = order.numberOfChildren;
            var typeOptions, dateOptions, groupOptions = '';
            var resultAvailablePlanDate = _.map(_.uniqBy(_.filter(availablePlans, { 'planType': order.planType }), 'date'), 'date');
            var resultAvailablePlanGroups = _.filter(_.filter(availablePlans, { 'planType': order.planType }), {'date': order.planDate})[0].groups;
            // console.log(resultAvailablePlanGroups);
            _.each(resultAvailablePlanType, function (t) {
                var selected = t == order.planType ? "selected" : "";
                typeOptions += '<option ' + selected + '>' + t + '</option>';
            })
            _.each(resultAvailablePlanDate, function (t) {
                var selected = t == order.planDate ? "selected" : "";
                dateOptions += '<option ' + selected + '>' + t + '</option>';
            })
            _.each(resultAvailablePlanGroups, function (value, id) {
                var selected = id == order.groupId ? "selected" : "";
                groupOptions += '<option ' + selected + ' value="' + id + '">' + value + '</option>';
            })
            orderItem += '<tr><td>'+order.id +'</td>'+
                    '<td>'+
                        '<select id="select_type_' + order.id +'" data-order-id="'+ order.id +'">'+
                            typeOptions+
                        '</select>'+
                    '</td>'+
                    '<td>'+
                        '<select id="select_date_' + order.id + '" data-order-id="' + order.id + '">' +
                            dateOptions +
                        '</select>'+
                    '</td>'+
                    '<td>'+order.people[0].name+'</td>'+
                    '<td>'+order.people[0].email+'</td>'+
                    '<td>' + numOfAdult +'</td>'+
                    '<td>' + numOfChild + '</td>' +
                    '<td>' + (numOfAdult+numOfChild) + '</td>' +
                    '<td>' + c_accomodation + '</td>' +
                    '<td>'+
                        '<select id="select_group_'+ order.id+'">'+
                            groupOptions +
                        '</select>'+
                    '</td>'+
                    '<td><input type="button" value="查詢"></td>'+
                    '<td><textarea>' + order.comment + '</textarea></td>' +
                    '<td>成功</td>'+
                    '<td>' + order.paymentMerchantTradeNo +'</td>'+
                    '<td>' + order.registrationDate +'</td>'+
                    '<td><input type="button" value="儲存"></td></tr>'
        })
        $('#list').empty();
        $('#list').append(orderItem);
        $("select[id^='select_type_']").change(function (e) {
            var selectedValue = e.target.value;
            var orderId = e.target.dataset.orderId;
            getAvailablePlan()
                .then(function (res) {
                    var availablePlans = _.filter(res.data, { 'planType': selectedValue });
                    var dates = _.map(_.uniqBy(availablePlans, 'date'), 'date');
                    var newDateOptions = '<option selected>請選擇</option>';
                    var newGroupOptions = '<option selected>請選擇</option>';
                    _.each(dates, function (date) {
                        newDateOptions += '<option>' + date + '</option>'
                    })
                    $('#select_date_' + orderId).empty();
                    $('#select_date_' + orderId).append(newDateOptions);
                    $('#select_group_' + orderId).empty();
                    $('#select_group_' + orderId).append(newGroupOptions);
                });
        })
        $("select[id^='select_date_']").change(function (e) {
            var orderId = e.target.dataset.orderId;
            var newGroupOptions = '<option selected>請選擇</option>';
            var params = {
                "planType": $('#select_type_' + orderId).val(),
                "planDate": $('#select_date_' + orderId).val(),
            }
            getGroupInPlan(params)
                .then(function (res) {
                    var groups = res.data;
                    _.each(groups, function (date) {
                        newGroupOptions += '<option>' + date + '</option>'
                    })
                    $('#select_group_' + orderId).empty();
                    $('#select_group_' + orderId).append(newGroupOptions);
                })
                .catch( function() {
                    $('#select_group_' + orderId).empty();
                    $('#select_group_' + orderId).append(newGroupOptions);
                })
        })
    })
}