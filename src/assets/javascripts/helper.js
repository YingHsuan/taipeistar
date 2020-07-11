function getPlan() {
    return axios.get('/api/plans', {
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch(function (error) {
        console.log(error);
    });
}
function getAvailablePlan() {
    return axios.get('/api/available-plans', {
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch(function (error) {
        console.log(error);
    });
}
function getGroupInPlanById(id) {
    return axios.get('/api/groups-in-plan/'+id, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch(function (error) {
        console.log(error);
    });
}
function getGroupInPlan(params) {
    return axios.get('/api/groups-in-plan', {
        headers: {
            'Content-Type': 'application/json',
        },
        params: params,
    }).catch(function (error) {
        console.log(error);
    });
}
function getOrder() {
    return axios.get('/api/orders', {
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch(function (error) {
        console.log(error);
    });
}
function getOrderById(id) {
    return axios.get('/api/orders/' + id, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch(function (error) {
        console.log(error);
    });
}
function getExportOrders(){
    var defer = $.Deferred();
    axios.get('/api/export/orders', {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(function (res) {
        defer.resolve(res);
    }).catch(function (error) {
        defer.reject(error);
    });
    return defer;
}
function postOrder(payload) {
    var defer = $.Deferred();
    axios.post('/api/orders', payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(function(res) {
        defer.resolve(res);
    }).catch(function (error) {
        defer.reject(error);
    });
    return defer;
}
function patchOrderById(id, payload) {
    return axios.patch('/api/orders/' + id, payload,{
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch(function (error) {
        console.log(error);
    });
}
function postGroupMailNotification(payload) {
    return axios.post('/api/group-mail-notification', payload, {
       headers: {
            'Content-Type': 'application/json',
       },
    }).catch(function (error) {
        console.log(error);
    });
}
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}
function validateID(id) {
    tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO"
    A1 = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
    A2 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5);
    Mx = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);

    if (id.length != 10) return false;
    i = tab.indexOf(id.charAt(0));
    if (i == -1) return false;
    sum = A1[i] + A2[i] * 9;

    for (i = 1; i < 10; i++) {
        v = parseInt(id.charAt(i));
        if (isNaN(v)) return false;
        sum = sum + v * Mx[i];
    }
    if (sum % 10 != 0) return false;
    return true;
}
function calculate_age(dob) {
    dob = new Date(dob);
    var today = new Date();
    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));

    return age;
}
function goToPay(paymentForm) {
    var s = paymentForm.replace(/\\/g, '');
    var formObject = $(s);
    $(document.body).append(formObject);
    formObject.submit();
}
function setLoading(show) {
    if (show) {
        $('.Loading-box').removeClass('hide');
    } else {
        if (!$('.Loading-box').hasClass('hide')) {
            $('.Loading-box').addClass('hide');
        }
    }
}