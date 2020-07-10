var feeForAdult = 1000;
var feeForChild = 800;
$(document).ready(function () {
    $('#feeByMember').html(0);
    setPlan();
    appendPeopleForm();
})

function setTwCitySelector(el) {
    new TwCitySelector();
    var a = new TwCitySelector({
        el: el,
        hasZipcode: false
    });
}
function countFee() {
    $('#feeByMember').html(0);
    var isFeeByAdultCheck = $('#feeByAdultCheck').prop("checked");
    var isFeeByChildCheck = $('#feeByChildCheck').prop("checked");
    if (isFeeByAdultCheck) {
        var fee = parseInt($('#feeByMember').html());
        var numberOfAdults = parseInt($('#numberOfAdults').val() ? $('#numberOfAdults').val():0);
        fee += numberOfAdults * feeForAdult;
        $('#feeByMember').html(fee);
    }
    if (isFeeByChildCheck) {
        var fee = parseInt($('#feeByMember').html());
        var numberOfChildren = parseInt($('#numberOfChildren').val() ? $('#numberOfChildren').val():0);
        fee += numberOfChildren * feeForChild;
        $('#feeByMember').html(fee);
    }
}
$('#feeByAdultCheck, #feeByChildCheck').change(function() {
    countFee();
})
$('#numberOfAdults, #numberOfChildren').keyup(function (e) {
    countFee();
})
function appendAvailableDate(dates) {
    var item = ''
    _.each(dates, function(v) {
        var date = v.date;
        var remainingQuota = v.remainingQuota;
        var day = v.dayOfWeek;
        var id = v.id;
        item += '<div class="column-x2"><input name="planDate" id="' + id + '" type="radio" value="'+date+'">' + date + '(' + day + ')<font class="red">(剩餘：' + remainingQuota + '人)</font></div>'
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
function appendPeopleForm() {
    var item = '';
    var nameTitle = '';
    var numOfPeople = $('.person-table-box').length;
    
    if (numOfPeople == 0) {
        nameTitle = '主要聯絡人';
    } else {
        nameTitle = '團員姓名' + numOfPeople;
    }
    item = '<div class="person-table-box">'+
                '<div class="caption">' + nameTitle + '：</div>' +
                '<div class="column"><input id="name-' + numOfPeople + '" type="text"><font id="error-name-'+numOfPeople+'" class="red error hide">請填寫</font></div>' +
                '<div class="caption">性別：</div>'+
                '<div class="column"><input name="gender-' + numOfPeople + '" type="radio" value="男" checked>男&nbsp;&nbsp;<input name="gender-' + numOfPeople + '" type="radio" value="女">女</div>' +
                '<div class="caption">出生年月日：</div>' +
                '<div class="column">'+
                    '<input id="dateOfBirth-' + numOfPeople + '"type="date" class="ymd" value="2000-01-01">' +
                    '<font id="error-dateOfBirth-' + numOfPeople + '" class="red error hide">請填寫</font>'+
                '</div>'+
                '<div class="caption">身分證：<br></div>' +
                '<div class="column">'+
                    '<input id="numberOfIdCard-' + numOfPeople + '" type="text"><font id="error-numberOfIdCard-' + numOfPeople + '" class="red error hide">請填寫</font><br>' +
                    '<font class="ssmall">(非本國籍請填寫護照號碼)</font>'+
                '</div>'+
                '<div class="caption">地址：</div>' +
                '<div class="column">'+
                    '<div id="city-'+numOfPeople+'" class="twcity"></div>'+
                    '<input id="address-' + numOfPeople + '" type="text" class="add">' +
                    '<font id="error-address-' + numOfPeople + '" class="red error hide">請填寫</font>'+
                '</div>'+
                '<div class="caption">電話：</div>' +
                '<div class="column"><input id="phone-' + numOfPeople + '" type="text"><font id="error-phone-' + numOfPeople + '" class="red error hide">請填寫</font></div>' +
                '<div class="caption">Mail：</div>' +
                '<div class="column"><input id="email-' + numOfPeople + '" type="text"><font id="error-email-' + numOfPeople + '" class="red error hide">請填寫</font></div>' +
                '<div class="caption">用餐需求：</div>'+
                '<div class="column">'+
                    '<input name="eatingHabits-' + numOfPeople + '" type="radio" value="葷" checked>葷&nbsp;&nbsp;&nbsp;' +
                    '<input name="eatingHabits-' + numOfPeople + '" type="radio" value="素">素&nbsp;&nbsp;&nbsp;' +
                    '<input name="eatingHabits-' + numOfPeople + '" type="radio" value="其他">其他 <input type="text" class="other">' +
                '</div>'+
            '</div>'
    $('#people-forms').append(item);
    setTwCitySelector('#city-' + numOfPeople);
}
$('#appendForm').click(function() {
    appendPeopleForm();
})
function checkFormValid() {
    var isError = false;
    // Q2
    if ($('input[name="planDate"]:checked').val() == undefined) {
        $('.error-planDate').removeClass('hide');
        isError = true;
    } else {
       $('.error-planDate').addClass('hide');
    }
    // Q4
    var isFeeByAdultCheck = $('#feeByAdultCheck').prop("checked");
    var isFeeByChildCheck = $('#feeByChildCheck').prop("checked");
    if (!isFeeByAdultCheck && !isFeeByChildCheck) {
        $('.error-numberOfMember').removeClass('hide');
        isError = true;
    } else if (isFeeByAdultCheck && $('#numberOfAdults').val() == '') {
        $('.error-numberOfMember').removeClass('hide');
        isError = true;
    } else if (isFeeByChildCheck && $('#numberOfChildren').val() == '') {
        $('.error-numberOfMember').removeClass('hide');
        isError = true;
    } else {
       $('.error-numberOfMember').addClass('hide');
    }
    // people
    var numOfPeople = $('.person-table-box').length;
    for (p = 0; p < numOfPeople; p++) {
        var name = $('#name-' + p).val();
        var dateOfBirth = $('#dateOfBirth-'+p).val();
        var numberOfIdCard = $('#numberOfIdCard-'+p).val();
        var city_country = $('#city-'+p+ ' .county').val();
        var city_district = $('#city-' + p + ' .district').val();
        var address = $('#address-'+p).val();
        var phone = $('#phone-'+p).val();
        var email = $('#email-'+p).val();
        if (name == '') {
           $('#error-name-'+p).removeClass('hide');
           isError = true;
        } else {
            $('#error-name-' + p).addClass('hide');
        }
        if (dateOfBirth.length != 10) {
            $('#error-dateOfBirth-' + p).removeClass('hide');
            isError = true;
        } else {
            $('#error-dateOfBirth-' + p).addClass('hide');
        }
        if (numberOfIdCard == '') {
           $('#error-numberOfIdCard-' + p).removeClass('hide');
           isError = true;
        } else {
           $('#error-numberOfIdCard-' + p).addClass('hide');
        }
        if (city_country == '' || city_district == '' || address == '') {
           $('#error-address-' + p).removeClass('hide');
           isError = true;
        } else {
            $('#error-address-' + p).addClass('hide');
        }
        if (phone.length == 0) {
            $('#error-phone-' + p).removeClass('hide');
            isError = true;
        } else {
            $('#error-phone-' + p).addClass('hide');
        }
        if (email.length == 0) {
            $('#error-email-' + p).removeClass('hide');
            isError = true;
        } else if (!ValidateEmail(email)) {
           $('#error-email-' + p).removeClass('hide');
           isError = true;
        } else {
            $('#error-email-' + p).addClass('hide');
        }
        
    }
    return !isError;
}
$('#postOrder').click(function() {
    var isValid = checkFormValid();
    if (isValid) {
        var agree = JSON.parse($('input[name="agree"]:checked').val());
        if (agree) {
            var planType = $('input[name="planType"]:checked').val();
            var planDate = $('input[name="planDate"]:checked').val();
            var numberOfAdults = parseInt($('#numberOfAdults').val() ? $('#numberOfAdults').val() :0);
            var numberOfChildren = parseInt($('#numberOfChildren').val() ? $('#numberOfChildren').val():0);
            var accomodation = JSON.parse($('input[name="accomodation"]:checked').val());
            var persons = [];
            var numOfPeople = $('.person-table-box').length;
            for (p = 0; p < numOfPeople; p++) {
                var name = $('#name-' + p).val();
                var gender = $('input[name="gender-' + p + '"]:checked').val();
                var dateOfBirth = $('#dateOfBirth-'+p).val();
                var numberOfIdCard = $('#numberOfIdCard-'+p).val();
                var city_country = $('#city-' + p + ' .county').val();
                var city_district = $('#city-' + p + ' .district').val();
                var address = $('#address-'+p).val();
                var phone = $('#phone-'+p).val();
                var email = $('#email-'+p).val();
                var eatingHabits = $('input[name="eatingHabits-' + p + '"]:checked').val();

                var person = {};
                person = {
                    "name": name,
                    "gender": gender,
                    "dateOfBirth": dateOfBirth,
                    "numberOfIdCard": numberOfIdCard,
                    "address": city_country + city_district+address,
                    "phone": phone,
                    "email": email,
                    "eatingHabits": eatingHabits,
                }
                persons.push(person);
            }
            var payload = {
                "planType": planType,
                "planDate": planDate,
                "numberOfAdults": numberOfAdults,
                "numberOfChildren": numberOfChildren,
                "people": persons,
                "comment": "",
                "accomodation": accomodation
            };
            setLoading(true);
            postOrder(payload)
                .then(function (res) {
                    console.log(res);
                    setLoading(false);
                    data = res.data;
                    if (data.message == 'goToPay') {
                        var formObject = data.paymentHtml;
                        goToPay(formObject);
                    }
                })
        } else {
            alert('請勾選同意');
        }
    } else {
        alert('請完成必填欄位');
    }
});