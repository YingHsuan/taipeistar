var feeForAdult=1e3,feeForChild=800;function setTwCitySelector(e){new TwCitySelector;new TwCitySelector({el:e,hasZipcode:!1})}function countFee(){$("#feeByMember").html(0);var e=$("#feeByAdultCheck").prop("checked"),a=$("#feeByChildCheck").prop("checked");if(e){var r=parseInt($("#feeByMember").html());r+=parseInt($("#numberOfAdults").val()?$("#numberOfAdults").val():0)*feeForAdult,$("#feeByMember").html(r)}if(a){r=parseInt($("#feeByMember").html());r+=parseInt($("#numberOfChildren").val()?$("#numberOfChildren").val():0)*feeForChild,$("#feeByMember").html(r)}}function appendAvailableDate(e){var a="",r=!1;_.each(e,(function(e,n){var d=e.date,t=e.remainingQuota,i=e.dayOfWeek,l=e.id,s="";r||0==t||(s="checked",r=!0),a+='<div class="column-x2"><input name="planDate" id="'+l+'" type="radio" value="'+d+'" '+s+" "+(0==t?"disabled":"")+">"+d+"("+i+')<font class="red">(剩餘：'+t+"人)</font></div>"})),$("#available_date").empty(),$("#available_date").append(a)}function setPlan(){getPlan().then((function(e){var a=e.data,r=$('input[name="planType"]:checked').val();appendAvailableDate(a=_.filter(a,["planType",r]))}))}function appendPeopleForm(){var e,a=$(".person-table-box").length;e='<div class="person-table-box"><div class="caption">'+(0==a?"主要聯絡人":"團員姓名"+a)+'：</div><div class="column"><input id="name-'+a+'" type="text"><font id="error-name-'+a+'" class="red error hide">請填寫</font></div><div class="caption">性別：</div><div class="column"><input name="gender-'+a+'" type="radio" value="男" checked>男&nbsp;&nbsp;<input name="gender-'+a+'" type="radio" value="女">女</div><div class="caption">出生年月日：</div><div class="column"><input id="dateOfBirth-'+a+'"type="date" class="ymd" value="2000-01-01"><font id="error-dateOfBirth-'+a+'" class="red error hide">請填寫</font></div><div class="caption">國籍：</div><div class="column"><input name="country-'+a+'" type="radio" value="本國籍" checked>本國籍&nbsp;&nbsp;<input name="country-'+a+'" type="radio" value="非本國籍">非本國籍</div><div class="caption">身分證：<br></div><div class="column"><input id="numberOfIdCard-'+a+'" type="text"><font id="error-numberOfIdCard-'+a+'" class="red error hide">請正確填寫</font><br><font class="ssmall">(非本國籍請填寫護照號碼)</font></div><div class="caption">地址：</div><div class="column"><div id="city-'+a+'" class="twcity"></div><input id="address-'+a+'" type="text" class="add"><font id="error-address-'+a+'" class="red error hide">請填寫</font></div><div class="caption">電話：</div><div class="column"><input id="phone-'+a+'" type="text"><font id="error-phone-'+a+'" class="red error hide">請填寫</font></div><div class="caption">Mail：</div><div class="column"><input id="email-'+a+'" type="text"><font id="error-email-'+a+'" class="red error hide">請填寫</font></div><div class="caption">用餐需求：</div><div class="column"><input name="eatingHabits-'+a+'" type="radio" value="葷" checked>葷&nbsp;&nbsp;&nbsp;<input name="eatingHabits-'+a+'" type="radio" value="素">素&nbsp;&nbsp;&nbsp;<input name="eatingHabits-'+a+'" type="radio" value="其他">其他 <input type="text" class="other"></div></div>',$("#people-forms").append(e),setTwCitySelector("#city-"+a)}function checkFormValid(){var e=!1;null==$('input[name="planDate"]:checked').val()?($(".error-planDate").removeClass("hide"),e=!0):$(".error-planDate").addClass("hide");var a=$("#feeByAdultCheck").prop("checked"),r=$("#feeByChildCheck").prop("checked");a||r?a&&""==$("#numberOfAdults").val()||r&&""==$("#numberOfChildren").val()?($(".error-numberOfMember").removeClass("hide"),e=!0):$(".error-numberOfMember").addClass("hide"):($(".error-numberOfMember").removeClass("hide"),e=!0);var n=$(".person-table-box").length;for(p=0;p<n;p++){var d=$("#name-"+p).val(),t=$("#dateOfBirth-"+p).val(),i=$('input[name="country-'+p+'"]:checked').val(),l=$("#numberOfIdCard-"+p).val(),s=$("#city-"+p+" .county").val(),o=$("#city-"+p+" .district").val(),c=$("#address-"+p).val(),v=$("#phone-"+p).val(),m=$("#email-"+p).val();if(""==d?($("#error-name-"+p).removeClass("hide"),e=!0):$("#error-name-"+p).addClass("hide"),10!=t.length?($("#error-dateOfBirth-"+p).removeClass("hide"),e=!0):$("#error-dateOfBirth-"+p).addClass("hide"),"本國籍"==i)validateID(l)?$("#error-numberOfIdCard-"+p).addClass("hide"):($("#error-numberOfIdCard-"+p).removeClass("hide"),e=!0);else""==l?($("#error-numberOfIdCard-"+p).removeClass("hide"),e=!0):$("#error-numberOfIdCard-"+p).addClass("hide");""==s||""==o||""==c?($("#error-address-"+p).removeClass("hide"),e=!0):$("#error-address-"+p).addClass("hide"),0==v.length?($("#error-phone-"+p).removeClass("hide"),e=!0):$("#error-phone-"+p).addClass("hide"),0==m.length?($("#error-email-"+p).removeClass("hide"),e=!0):ValidateEmail(m)?$("#error-email-"+p).addClass("hide"):($("#error-email-"+p).removeClass("hide"),e=!0)}return!e}$(document).ready((function(){$("#feeByMember").html(0),setPlan(),appendPeopleForm()})),$("#feeByAdultCheck, #feeByChildCheck").change((function(){countFee()})),$("#numberOfAdults, #numberOfChildren").keyup((function(e){countFee()})),$('input[name="planType"]').change((function(){setPlan()})),$("#appendForm").click((function(){appendPeopleForm()})),$("#postOrder").click((function(){if(checkFormValid())if(JSON.parse($('input[name="agree"]:checked').val())){var e=$('input[name="planType"]:checked').val(),a=$('input[name="planDate"]:checked').val(),r=parseInt($("#numberOfAdults").val()?$("#numberOfAdults").val():0),n=parseInt($("#numberOfChildren").val()?$("#numberOfChildren").val():0),d=JSON.parse($('input[name="accomodation"]:checked').val()),t=[],i=$(".person-table-box").length;for(p=0;p<i;p++){var l;l={name:$("#name-"+p).val(),gender:$('input[name="gender-'+p+'"]:checked').val(),dateOfBirth:$("#dateOfBirth-"+p).val(),numberOfIdCard:$("#numberOfIdCard-"+p).val(),address:$("#city-"+p+" .county").val()+$("#city-"+p+" .district").val()+$("#address-"+p).val(),phone:$("#phone-"+p).val(),email:$("#email-"+p).val(),eatingHabits:$('input[name="eatingHabits-'+p+'"]:checked').val()},t.push(l)}var s={planType:e,planDate:a,numberOfAdults:r,numberOfChildren:n,people:t,comment:"",accomodation:d};setLoading(!0),postOrder(s).then((function(e){if(setLoading(!1),data=e.data,"goToPay"==data.message){var a=data.paymentHtml;goToPay(a)}else"success"==data.message?(alert("報名成功"),window.location.href="/notice"):(alert("報名失敗"),window.location.href="/registered")}))}else alert("請勾選同意");else alert("請完成必填欄位")}));