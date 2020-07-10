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
function postOrder(payload) {
   return axios.post('/api/orders', payload, {
       headers: {
           'Content-Type': 'application/json',
       },
   }).catch(function (error) {
       console.log(error);
   });
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
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
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
        if ($('.Loading-box').hasClass('hide')) {
            $('.Loading-box').addClass('hide');
        }
    }
}