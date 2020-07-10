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
    $('#planDate').change(function () {
        setPlanGroup();
    });
    $('#search').keyup(function () {
        var value = $(this).val().toLowerCase();
        $('#list tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $('#search-button').click(function () {
        getAvailablePlans();
    })
    getAvailablePlans();
});
function setPlanType(plans) {
    var planTypes = [];
    var options = '<option selected>不限</option>';
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
            var options = '<option selected>不限</option>';
            _.each(plans, function (plan) {
                var planDate = plan.date;
                var dayOfWeek = plan.dayOfWeek;
                if (!planDates.includes(planDate)) {
                    planDates.push(planDate);
                    options += '<option value="' + planDate +'">' + planDate + '('+dayOfWeek+')</option>';
                }
            });
            $('#planDate').empty();
            $('#planDate').append(options);
            setPlanGroup();
        })
}
function setPlanGroup() {
    var params = {
        "planType": $('#planType').val(),
        "planDate": $('#planDate').val(),
    }
    var options = '<option selected>不限</option>';
    if ($('#planType').val() == '不限' || $('#planDate').val() == '不限') {
        $('#planGroup').empty();
        $('#planGroup').append(options);
    } else {
        getGroupInPlan(params)
            .then(function (res) {
                var groups = res.data;
                _.each(groups, function (value, id) {
                    options += '<option value="' + id + '">' + id + '(' + value + '人)' + '</option>';
                })
                $('#planGroup').empty();
                $('#planGroup').append(options);
            })
            .catch(function () {
                $('#planGroup').empty();
                $('#planGroup').append(options);
            })
    }
    
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
        var selectedPlanType = $('#planType').val();
        var selectedPlanDate = $('#planDate').val();
        var selectedPlanGroup = $('#planGroup').val();
        if (selectedPlanType != '不限') {
            orders = _.filter(orders, {
                'planType': selectedPlanType
            });
        };
        if (selectedPlanDate != '不限') {
            orders = _.filter(orders, {
                'planDate': selectedPlanDate
            });
        };
        if (selectedPlanGroup != '不限') {
            orders = _.filter(orders, {
                'groupName': selectedPlanGroup
            });
        };
        var orderItem = '';
        resultAvailablePlanType = _.map(_.uniqBy(availablePlans, 'planType'), 'planType');
        _.each(orders, function(order) {
            var c_accomodation = (order.accomodation)?'有':'無';
            var numOfAdult = order.numberOfAdults;
            var numOfChild = order.numberOfChildren;
            var typeOptions, dateOptions, groupOptions = '';
            var resultAvailablePlanDate = _.map(_.uniqBy(_.filter(availablePlans, { 'planType': order.planType }), 'date'), 'date');
            var resultAvailablePlanGroups = _.filter(_.filter(availablePlans, { 'planType': order.planType }), {'date': order.planDate})[0].groups;
            _.each(resultAvailablePlanType, function (t) {
                var selected = t == order.planType ? "selected" : "";
                typeOptions += '<option ' + selected + '>' + t + '</option>';
            })
            _.each(resultAvailablePlanDate, function (t) {
                var selected = t == order.planDate ? "selected" : "";
                dateOptions += '<option ' + selected + '>' + t + '</option>';
            })
            _.each(resultAvailablePlanGroups, function (t, index) {
                var selected = index == order.groupName ? "selected" : "";
                groupOptions += '<option ' + selected + ' value="' + t + '">' + index + '</option>';
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
                    '<td><div class="search-infor-bt"><a data-fancybox data-type="iframe" data-src="team_info" href="javascript:;">查詢</a></div></td>' +
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