var resultAvailablePlanType = [];
var resultAvailablePlanDate = [];
var feeForAdult = 1000;
var feeForChild = 800;
$(document).ready(function () {
    $('#send-mail').prop('disabled', true);
    getPlan()
    .then( function(res){
        plans = res.data;
        setPlanType(plans);
        setPlanDate();
    });
    $('#planType').change(function () {
        setPlanDate();
        checkEnableSendMail();
    });
    $('#planDate').change(function () {
        setPlanGroup();
        checkEnableSendMail();
    });
    $('#planGroup').change(function() {
        checkEnableSendMail();
    })
    $('#search').keyup(function () {
        var value = $(this).val().toLowerCase();
        $('#list tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $('#search-button').click(function () {
        getAvailablePlans();
    })
    $('#send-mail').click(function() {
        sendMail();
    })
    getAvailablePlans();
    // $.fancybox.open('<div class="message"><h2>Hello!</h2><p>You are awesome!</p></div>');
});
function checkEnableSendMail() {
    var type = $('#planType').val();
    var date = $('#planDate').val();
    var group = $('#planGroup').val();
    if (type == '不限' || date == '不限' || group == '不限') {
        $('#send-mail').prop('disabled', true);
    } else {
        $('#send-mail').prop('disabled', false);
    }
}
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
        
        // _.each(availablePlans, function(plan) {
        //     var params = {
        //         "planType": plan.planType,
        //         "planDate": plan.date,
        //     }
        //     getGroupInPlan(params)
        //         .then(function (res) {
        //             var groups = res.data;
        //             plan.groups = groups;
        //         })
        // })
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
            var resultAvailablePlanDate = _.map(_.filter(availablePlans, { 'planType': order.planType }), 'date');
            var resultAvailablePlanGroups = _.filter(_.filter(availablePlans, { 'planType': order.planType }), {'date': order.planDate});
            _.each(resultAvailablePlanType, function (t) {
                var selected = t == order.planType ? "selected" : "";
                typeOptions += '<option ' + selected + '>' + t + '</option>';
            })
            _.each(resultAvailablePlanDate, function (t) {
                var selected = t == order.planDate ? "selected" : "";
                dateOptions += '<option ' + selected + ' value="'+t+'">' + t + ' (' + order.planDayOfWeek +')</option>';
            })
            // if (resultAvailablePlanGroups.length > 0) {
            //     var groupsFromAvailablePlan = resultAvailablePlanGroups[0].groups
            //     _.each(groupsFromAvailablePlan, function (t, index) {
            //         var selected = index == order.groupName ? "selected" : "";
            //         groupOptions += '<option ' + selected + ' value="' + index + '">' + index + '</option>';
            //     })
            // } else {
            //     groupOptions += '<option selected value="' + order.groupName + '">' + order.groupName + '</option>';
            // }
            var params = {
                "planType": order.planType,
                "planDate": order.planDate,
            }
            getGroupInPlan(params)
                .then(function (res) {
                    var groups = res.data;
                    _.each(groups, function (t, index) {
                        var selected = index == order.groupName ? "selected" : "";
                        groupOptions += '<option ' + selected + ' value="' + index + '">' + index + '</option>';
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
                        '<td><input id="getInfo_'+ order.id +'" type="button" value="查詢" data-order-id="' + order.id +'"></td>' +
                        '<td><textarea id="comment_'+ order.id+'">' + order.comment + '</textarea></td>' +
                        '<td>成功</td>'+
                        '<td>' + order.paymentMerchantTradeNo +'</td>'+
                        '<td>' + order.registrationDate +'</td>'+
                        '<td><input id="saveInfo_'+order.id +'" type="button" value="儲存" data-order-id="'+ order.id +'"></td></tr>'
                    $('#list').empty();
                    $('#list').append(orderItem);
                    $("select[id^='select_type_']").change(function (e) {
                        var selectedValue = e.target.value;
                        var orderId = e.target.dataset.orderId;
                        getAvailablePlan()
                            .then(function (res) {
                                var availablePlans = _.filter(res.data, {
                                    'planType': selectedValue
                                });
                                // var dates = _.map(_.uniqBy(availablePlans, 'date'), 'date');
                                var newDateOptions = '<option selected>請選擇</option>';
                                var newGroupOptions = '<option selected>請選擇</option>';
                                _.each(availablePlans, function (plan) {
                                    newDateOptions += '<option value="' + plan.date + '">' + plan.date + ' (' + plan.dayOfWeek + ')' + '</option>'
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
                                _.each(groups, function (value, index) {
                                    newGroupOptions += '<option value="' + index + '">' + index + '</option>'
                                })
                                $('#select_group_' + orderId).empty();
                                $('#select_group_' + orderId).append(newGroupOptions);
                            })
                            .catch(function () {
                                $('#select_group_' + orderId).empty();
                                $('#select_group_' + orderId).append(newGroupOptions);
                            })
                    })
                    $("input[id^='getInfo_']").click(function (e) {
                        var orderId = e.target.dataset.orderId;
                        setInfo(orderId);
                    })
                    $("input[id^='saveInfo_']").click(function (e) {
                        var orderId = e.target.dataset.orderId;
                        saveInfo(orderId);
                    })
                })
            
        })
    })
}

// update team-info
function setInfo(orderId) {
    getOrderById(orderId)
        .then( function(res) {
            var info = res.data;
            var orderId = info.id;
            var planType = '';
            if (info.planType == 'T1') {
                planType = '第一航廈團';
            } else if (info.planType == 'T2') {
                planType = '第二航廈團';
            }
            var planDate = info.planDate;
            var c_accomodation = (info.accomodation)?'有':'無';
            var numberOfAdults = info.numberOfAdults;
            var numberOfChildren = info.numberOfChildren;
            var groupName = info.groupName;
            var comment = info.comment;
            var paymentDone = (info.paymentDone)?'成功':'取消';
            var paymentMerchantTradeNo = info.paymentMerchantTradeNo;
            var registrationDate = info.registrationDate;
            var person = '';
            _.each(info.people, function(p, index) {
                var name_title = '';
                if (index == 0) {
                    name_title = '主要連絡人';
                } else {
                    name_title = '團員姓名'+index;
                }
                var name = p.name;
                var gender = p.gender;
                if (p.gender == 'M') {
                    gender = '男';
                } else if (p.gender == 'F') {
                    gender = '女';
                }
                var dateOfBirth = p.dateOfBirth;
                var numberOfIdCard = p.numberOfIdCard;
                var address = p.address;
                var phone = p.phone;
                var email = p.email;
                var eatingHabits = p.eatingHabits;
                
                person += 
                    '<div class="column-half">'+
                        '<div class="caption">'+name_title+'：</div>'+
                        '<div class="column">'+name+'</div>'+
                        '<div class="caption">性別：</div>'+
                        '<div class="column">'+gender+'</div>'+
                        '<div class="caption">出生年月日：</div>'+
                        '<div class="column">' + dateOfBirth + '</div>' +
                        '<div class="caption">身分證：</div>'+
                        '<div class="column">' + numberOfIdCard + '</div>' +
                        '<div class="caption">地址：</div>'+
                        '<div class="column">' + address + '</div>' +
                        '<div class="caption">電話：</div>'+
                        '<div class="column">' + phone + '</div>' +
                        '<div class="caption">Mail：</div>' +
                        '<div class="column">'+ email +'</div>' +
                        '<div class="caption">用餐需求：</div>' +
                        '<div class="column">' + eatingHabits + '</div>' +
                    '</div>'
                
            })
            var info = 
                '<section id="team-infor-page">'+
                    '<div class="title">報名詳細資料</div>'+
                    '<div class="column-half">'+
                        '<strong>序號：</strong>'+orderId+
                    '</div>'+
                    '<div class="column-half">'+
                        '<strong>報名行程：</strong>'+planType+
                    '</div>'+
                    '<div class="column-half">'+
                        '<strong>報名時段：</strong>'+planDate+
                    '</div>'+
                    '<div class="column-half">'+
                        '<strong>住宿需求：</strong>'+c_accomodation+
                    '</div>'+
                    '<div class="column-half">'+
                        '<strong>參加人數：</strong>大人 '+numberOfAdults+' 位, 小孩 '+numberOfChildren+' 位, 總共 '+(numberOfAdults+numberOfChildren)+' 人'+
                    '</div>'+
                    '<div class="column-half">'+
                        '<strong>團號分配：</strong>'+groupName+
                    '</div>'+
                    '<div class="column-half">'+
                        '<strong>備註：</strong>'+comment+
                    '</div>'+
                    '<div class="column-half">'+
                        '<strong>報名成功/取消：</strong>' + paymentDone +
                    '</div>'+
                    '<div class="column-half">'+
                        '<strong>綠界訂單編號：</strong>' + paymentMerchantTradeNo +
                    '</div>'+
                    '<div class="column-half">'+
                        '<strong>報名時間：</strong>' + registrationDate +
                    '</div>'+
                    '<div class="column-full" style="text-align:right;">'+
                        '<font class="red"><strong>總計費用：</strong>'+ (numberOfAdults*feeForAdult + numberOfChildren*feeForChild) +'NT</font>'+
                    '</div>'+
                    '<div class="column-full">'+
                        '<strong>參與團員請詳填個資</strong>'+
                    '</div>'+
                    person +
                '</section>'
            $.fancybox.open(info);
        })
}

function saveInfo(orderId) {
    var payload = {
        planType = $('#select_type_'+orderId).val(),
        planDate = $('#select_date_'+orderId).val(),
        groupName = $('#select_group_' + orderId).val(),
        comment = $('#comment_'+orderId).val(),
    }
    patchOrderById(orderId, payload)
        .then(function(res) {
            alert('儲存成功');
            location.reload();
        })
}
function sendMail() {
    var type = $('#planType').val();
    var date = $('#planDate').val();
    var group = $('#planGroup').val();
    var payload = {
        "planType": type,
        "planDate": date,
        "groupName": group,
    }
    postGroupMailNotification(payload)
        .then(function(res) {
            console.log(res);
            alert('發送成功');
        })
}