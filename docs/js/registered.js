var feeForAdult=1e3,feeForChild=800;function setTwCitySelector(e){new TwCitySelector;new TwCitySelector({el:e,hasZipcode:!1})}function countFee(){$("#feeByMember").html(0);var e=$("#feeByAdultCheck").prop("checked"),a=$("#feeByChildCheck").prop("checked");if(e){var r=parseInt($("#feeByMember").html());r+=parseInt($("#numberOfAdults").val()?$("#numberOfAdults").val():0)*feeForAdult,$("#feeByMember").html(r)}if(a){r=parseInt($("#feeByMember").html());r+=parseInt($("#numberOfChildren").val()?$("#numberOfChildren").val():0)*feeForChild,$("#feeByMember").html(r)}}function appendAvailableDate(e){var a="";_.each(e,(function(e){var r=e.date,n=e.remainingQuota,t=e.dayOfWeek,d=e.id;a+='<div class="column-x2"><input name="planDate" id="'+d+'" type="radio" value="'+r+'">'+r+"("+t+')<font class="red">(剩餘：'+n+"人)</font></div>"})),$("#available_date").empty(),$("#available_date").append(a)}function setPlan(){getPlan().then((function(e){var a=e.data,r=$('input[name="planType"]:checked').val();appendAvailableDate(a=_.filter(a,["planType",r]))}))}function appendPeopleForm(){var e,a=$(".person-table-box").length;e='<div class="person-table-box"><div class="caption">'+(0==a?"主要聯絡人":"團員姓名"+a)+'：</div><div class="column"><input id="name-'+a+'" type="text"><font id="error-name-'+a+'" class="red error hide">請填寫</font></div><div class="caption">性別：</div><div class="column"><input name="gender-'+a+'" type="radio" value="男" checked>男&nbsp;&nbsp;<input name="gender-'+a+'" type="radio" value="女">女</div><div class="caption">出生年月日：</div><div class="column"><input id="dateOfBirthYear-'+a+'" type="text" class="ymd"> 年&nbsp;&nbsp;&nbsp;<input id="dateOfBirthMonth-'+a+'"type="text" class="ymd"> 月&nbsp;&nbsp;&nbsp;<input id="dateOfBirthDay-'+a+'"type="text" class="ymd"> 日<font id="error-dateOfBirth-'+a+'" class="red error hide">請填寫</font></div><div class="caption">身分證：<br></div><div class="column"><input id="numberOfIdCard-'+a+'" type="text"><font id="error-numberOfIdCard-'+a+'" class="red error hide">請填寫</font><br><font class="ssmall">(非本國籍請填寫護照號碼)</font></div><div class="caption">地址：</div><div class="column"><div id="city-'+a+'" class="twcity"></div><input id="address-'+a+'" type="text" class="add"><font id="error-address-'+a+'" class="red error hide">請填寫</font></div><div class="caption">電話：</div><div class="column"><input id="phone-'+a+'" type="text"><font id="error-phone-'+a+'" class="red error hide">請填寫</font></div><div class="caption">Mail：</div><div class="column"><input id="email-'+a+'" type="text"><font id="error-email-'+a+'" class="red error hide">請填寫</font></div><div class="caption">用餐需求：</div><div class="column"><input name="eatingHabits-'+a+'" type="radio" value="葷" checked>葷&nbsp;&nbsp;&nbsp;<input name="eatingHabits-'+a+'" type="radio" value="素">素&nbsp;&nbsp;&nbsp;<input name="eatingHabits-'+a+'" type="radio" value="其他">其他 <input type="text" class="other"></div></div>',$("#people-forms").append(e),setTwCitySelector("#city-"+a)}function checkFormValid(){var e=!1;null==$('input[name="planDate"]:checked').val()?($(".error-planDate").removeClass("hide"),e=!0):$(".error-planDate").addClass("hide");var a=$("#feeByAdultCheck").prop("checked"),r=$("#feeByChildCheck").prop("checked");a||r?a&&""==$("#numberOfAdults").val()||r&&""==$("#numberOfChildren").val()?($(".error-numberOfMember").removeClass("hide"),e=!0):$(".error-numberOfMember").addClass("hide"):($(".error-numberOfMember").removeClass("hide"),e=!0);var n=$(".person-table-box").length;for(p=0;p<n;p++){var t=$("#name-"+p).val(),d=$("#dateOfBirthYear-"+p).val()+"-"+$("#dateOfBirthMonth-"+p).val()+"-"+$("#dateOfBirthDay-"+p).val(),i=$("#numberOfIdCard-"+p).val(),l=$("#city-"+p+" .county").val(),s=$("#city-"+p+" .district").val(),o=$("#address-"+p).val(),c=$("#phone-"+p).val(),m=$("#email-"+p).val();""==t?($("#error-name-"+p).removeClass("hide"),e=!0):$("#error-name-"+p).addClass("hide"),10!=d.length?($("#error-dateOfBirth-"+p).removeClass("hide"),e=!0):$("#error-dateOfBirth-"+p).addClass("hide"),""==i?($("#error-numberOfIdCard-"+p).removeClass("hide"),e=!0):$("#error-numberOfIdCard-"+p).addClass("hide"),""==l||""==s||""==o?($("#error-address-"+p).removeClass("hide"),e=!0):$("#error-address-"+p).addClass("hide"),0==c.length?($("#error-phone-"+p).removeClass("hide"),e=!0):$("#error-phone-"+p).addClass("hide"),0==m.length?($("#error-email-"+p).removeClass("hide"),e=!0):ValidateEmail(m)?$("#error-email-"+p).addClass("hide"):($("#error-email-"+p).removeClass("hide"),e=!0)}return!e}$(document).ready((function(){$("#feeByMember").html(0),setPlan(),appendPeopleForm()})),$("#feeByAdultCheck, #feeByChildCheck").change((function(){countFee()})),$("#numberOfAdults, #numberOfChildren").keyup((function(e){countFee()})),$('input[name="planType"]').change((function(){setPlan()})),$("#appendForm").click((function(){appendPeopleForm()})),$("#postOrder").click((function(){if(checkFormValid())if(JSON.parse($('input[name="agree"]:checked').val())){var e=$('input[name="planType"]:checked').val(),a=$('input[name="planDate"]:checked').val(),r=parseInt($("#numberOfAdults").val()?$("#numberOfAdults").val():0),n=parseInt($("#numberOfChildren").val()?$("#numberOfChildren").val():0),t=JSON.parse($('input[name="accomodation"]:checked').val()),d=[],i=$(".person-table-box").length;for(p=0;p<i;p++){var l;l={name:$("#name-"+p).val(),gender:$('input[name="gender-'+p+'"]:checked').val(),dateOfBirth:$("#dateOfBirthYear-"+p).val()+"-"+$("#dateOfBirthMonth-"+p).val()+"-"+$("#dateOfBirthDay-"+p).val(),numberOfIdCard:$("#numberOfIdCard-"+p).val(),address:$("#city-"+p+" .county").val()+$("#city-"+p+" .district").val()+$("#address-"+p).val(),phone:$("#phone-"+p).val(),email:$("#email-"+p).val(),eatingHabits:$('input[name="eatingHabits-'+p+'"]:checked').val()},d.push(l)}postOrder({planType:e,planDate:a,numberOfAdults:r,numberOfChildren:n,people:d,comment:"",accomodation:t}).then((function(e){if(console.log(e),data=e.data,"goToPay"==data.message){var a=data.paymentHtml;goToPay(a)}}))}else alert("請勾選同意")}));