// var feeForAdult = 1000;
// var feeForChild = 800;
$(document).ready(function () {
    // $('#feeByMember').html(0);
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
// function countFee() {
//     $('#feeByMember').html(0);
//     var isFeeByAdultCheck = $('#feeByAdultCheck').prop("checked");
//     var isFeeByChildCheck = $('#feeByChildCheck').prop("checked");
//     if (isFeeByAdultCheck) {
//         var fee = parseInt($('#feeByMember').html());
//         var numberOfAdults = parseInt($('#numberOfAdults').val() ? $('#numberOfAdults').val():0);
//         fee += numberOfAdults * feeForAdult;
//         $('#feeByMember').html(fee);
//     }
//     if (isFeeByChildCheck) {
//         var fee = parseInt($('#feeByMember').html());
//         var numberOfChildren = parseInt($('#numberOfChildren').val() ? $('#numberOfChildren').val():0);
//         fee += numberOfChildren * feeForChild;
//         $('#feeByMember').html(fee);
//     }
// }
// $('#feeByAdultCheck, #feeByChildCheck').change(function() {
//     countFee();
// })
// $('#numberOfAdults, #numberOfChildren').keyup(function (e) {
//     countFee();
// })
function appendAvailableDate(dates) {
    var item = '';
    var freeItem = ''
    var weekDaysItem = '';
    var weekEndItem = '';
    var foundDefault = false;
    _.each(dates, function(v, i) {
        var planType = v.planType;
        var c_planType = '';
        if (planType == 'T1') {
            c_planType = '第一航廈團';
        } else if (planType == 'T2') {
            c_planType = '第二航廈團'
        }
        var date = v.date;
        var remainingQuota = v.remainingQuota;
        var day = v.dayOfWeek;
        var id = v.id;
        var checked = '';
        var disabled = (remainingQuota==0)?'disabled':'';
        if (!foundDefault && remainingQuota != 0) {
            checked = 'checked';
            foundDefault = true;
        }
        item = '<div class="column-x2"><input name="planDate" id="' + id + '" type="radio" data-plan-type="' + planType + '" value="' + date + '" ' + checked + ' ' + disabled + '>' + date + '(' + day + ') ' + c_planType + '<font class="red">(剩餘：' + remainingQuota + '人)</font></div>'
        if (date == '2020-07-25') {
            freeItem += item;
        } else if (day == '六' || day == '日') {
            weekEndItem += item;
        } else {
            weekDaysItem += item;
        }
    })
    $('#free-available-date').empty();
    $('#free-available-date').append(freeItem);
    $('#weekdays-available-date').empty();
    $('#weekdays-available-date').append(weekDaysItem);
    $('#weekend-available-date').empty();
    $('#weekend-available-date').append(weekEndItem);
}
function setPlan() {
    getPlan().then(function (res) {
        var data = res.data;
        // var planType = $('input[name="planType"]:checked').val();
        // data = _.filter(data, ['planType', planType]);
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
                '<div class="caption">國籍：</div>'+
                '<div class="column"><input name="country-' + numOfPeople + '" type="radio" value="本國籍" checked>本國籍&nbsp;&nbsp;<input name="country-' + numOfPeople + '" type="radio" value="非本國籍">非本國籍</div>' +
                '<div class="caption">身分證：<br></div>' +
                '<div class="column">'+
                    '<input id="numberOfIdCard-' + numOfPeople + '" type="text"><font id="error-numberOfIdCard-' + numOfPeople + '" class="red error hide">請正確填寫</font><br>' +
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
    // people
    var numOfPeople = $('.person-table-box').length;
    var numberOfAdults = parseInt($('input[name="numberOfAdults"]:checked').val());
    var numberOfChildren = parseInt($('input[name="numberOfChildren"]:checked').val());
    var personAgeBet6And12 = 0;
    var personAgeUpon12 = 0;
    for (p = 0; p < numOfPeople; p++) {
        var name = $('#name-' + p).val();
        var dateOfBirth = $('#dateOfBirth-'+p).val();
        var age = calculate_age(dateOfBirth);
        if (age >= 6 && age < 12) {
            personAgeBet6And12 += 1;
        } else if (age >= 12) {
            personAgeUpon12 += 1;
        }
        var country = $('input[name="country-' + p + '"]:checked').val();
        var numberOfIdCard = $('#numberOfIdCard-' + p).val();
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
        if (country == '本國籍') {
            var isID = validateID(numberOfIdCard)
            if (!isID) {
                $('#error-numberOfIdCard-' + p).removeClass('hide');
                isError = true;
            } else {
                $('#error-numberOfIdCard-' + p).addClass('hide');
            }
        } else {
            if (numberOfIdCard == '') {
                $('#error-numberOfIdCard-' + p).removeClass('hide');
                isError = true;
            } else {
                $('#error-numberOfIdCard-' + p).addClass('hide');
            }
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
    if (personAgeUpon12 != numberOfAdults || personAgeBet6And12 != numberOfChildren) {
        console.log('>12: ', personAgeUpon12);
        console.log('6~12: ', personAgeBet6And12);
        console.log('numberOfAdults: ', numberOfAdults);
        console.log('numberOfChildren: ', numberOfChildren);
        $('#error-numberOfMember').removeClass('hide');
        isError = true;
    } else {
       $('#error-numberOfMember').addClass('hide');
    }
    return !isError;
}
$('#postOrder').click(function() {
    var isValid = checkFormValid();
    if (isValid) {
        var agree = JSON.parse($('input[name="agree"]:checked').val());
        if (agree) {
            // var planType = $('input[name="planType"]:checked').val();
            var planType = $('input[name="planDate"]:checked')[0].dataset.planType;
            var planDate = $('input[name="planDate"]:checked').val();
            // var numberOfAdults = parseInt($('#numberOfAdults').val() ? $('#numberOfAdults').val() :0);
            // var numberOfChildren = parseInt($('#numberOfChildren').val() ? $('#numberOfChildren').val():0);
            var numberOfAdults = parseInt($('input[name="numberOfAdults"]:checked').val());
            var numberOfChildren = parseInt($('input[name="numberOfChildren"]:checked').val());
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
                .done(function (res) {
                    data = res.data;
                    if (data.message == 'goToPay') {
                        var formObject = data.paymentHtml;
                        goToPay(formObject);
                    } else if (data.message == 'success') {
                        alert('報名成功');
                        window.location.href = '/notice';
                    } else {
                        alert('報名失敗');
                        window.location.href = '/registered';
                    }
                }).fail(function(error) {
                   alert('Oops! Something wrong!');
                }).always(function() {
                   setLoading(false);
                })
        } else {
            alert('請勾選同意');
        }
    } else {
        alert('請完成必填欄位');
    }
});