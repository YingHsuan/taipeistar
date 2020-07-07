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
    getOrders();
    $('#search').keyup(function () {
        var value = $(this).val().toLowerCase();
        $('#list tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
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
function getOrders() {
    getOrder()
    .then( function(res) {
        orders = res.data;
        var orderItem = '';
        _.each(orders, function(order) {
            var c_accomodation = (order.accomodation)?'有':'無';
            var numOfAdult = order.numberOfAdults;
            var numOfChild = order.numberOfChildren;
            orderItem += '<tr><td>'+order.id +'</td>'+
                    '<td>'+
                        '<select>'+
                            '<option>'+order.planType +'</option>'+
                        '</select>'+
                    '</td>'+
                    '<td>'+
                        '<select>'+
                            '<option>' + order.planDate + '</option>' +
                        '</select>'+
                    '</td>'+
                    '<td>'+order.people[0].name+'</td>'+
                    '<td>'+order.people[0].email+'</td>'+
                    '<td>' + numOfAdult +'</td>'+
                    '<td>' + numOfChild + '</td>' +
                    '<td>' + (numOfAdult+numOfChild) + '</td>' +
                    '<td>' + c_accomodation + '</td>' +
                    '<td>'+
                        '<select>'+
                            '<option>' + order.groupId + '</option>' +
                        '</select>'+
                    '</td>'+
                    '<td><input type="button" value="查詢"></td>'+
                    '<td>' + order.comment + '</td>' +
                    '<td>成功</td>'+
                    '<td>' + order.paymentMerchantTradeNo +'</td>'+
                    '<td>' + order.registrationDate +'</td></tr> '
        })
        $('#list').empty();
        $('#list').append(orderItem);
    })
}