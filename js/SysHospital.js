var myApp;
myApp = myApp || (function () {
    var pleaseWaitDiv = $('<div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-header"><h1>Processing...</h1></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div>');
    return {
        showPleaseWait: function() {
            pleaseWaitDiv.modal();
        },
        hidePleaseWait: function () {
            pleaseWaitDiv.modal('hide');
        },
    };
})();


var userType="hos";

var AutoTime = 5000;

function MainPageTimeout() {
    setTimeout(function () {
        getInjured();
        MainPageTimeout();
    }, AutoTime);
}
getInjured();
MainPageTimeout();


function InjInfo(InjObj){
	var ContentHTML=
	'<div class="modal fade" id="modal-'+ InjObj.InjID +'" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
	        '<div class="modal-dialog">'+
	          '<div class="modal-content">'+
	            '<div class="modal-header">'+
	               '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
	              '<h4 class="modal-title" id="myModalLabel">傷患 :: '+ InjObj.name + ' :: ' + InjObj.status +
	              '</h4>'+
	            '</div>'+
	            '<div class="modal-body">'+
	              	'<h3>傷患者資訊</h3>'+
						'<dl>'+
							'<dt><p><span class="label label-success">傷患資料</span></p></dt>' +
							'<dd>'+InjObj.name+'</dd>'+
							'<dd>'+InjObj.sex+'</dd>'+
							'<dt><p><span class="label label-info">聯絡資訊</span></p></dt>'+
							'<dd>'+InjObj.Contact+'</dd>'+
							'<dd>'+InjObj.ContactPhone+'</dd>'+
							'<dt><p><span class="label label-info">醫院資訊</span></p></dt>'+
							'<dd>'+InjObj.Hname+'</dd>'+
							'<dt><p><span class="label label-danger">受傷區域</span></p></dt>' +
							'<dd>'+InjObj.injuredArea+'</dd>'+
							'<dt><p><span class="label label-danger">受傷狀況</span></p></dt>' +
							'<dd>'+InjObj.injuredStatus+'</dd>'+
							'<dt><p><span class="label label-danger">受傷原因</span></p></dt>' +
							'<dd>'+InjObj.injuredCause+'</dd>'+
							'<dt><p><span class="label label-danger">受傷時間</span></p></dt>' +
							'<dd>'+InjObj.time+'</dd>'+
						'</dl>'+
	            '</div>'+
	            '<div class="modal-footer">'+
	               '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button> '+
	            '</div>'+
	          '</div>'+
	        '</div>'+
	      '</div>'+
	'</div>';
return ContentHTML;
}
function InjInfoLink(InjObj){
	var ContentHTML= '<a class="btn btn-default" id="modal-a-'+InjObj.InjID+'" href="#modal-'+InjObj.InjID+'" role="button" class="btn" data-toggle="modal">'+InjObj.name+'</a>';
	return ContentHTML;
}

function SearchInjured(){
	var KeyWord = $("#SearchText").val();
	var mySearch="";
	var SearchContent="";
	$.post("http://opends2.azurewebsites.net/api/dynamic/searchInjured.php", {"PostKey" : KeyWord} ,function( result ){
        var InjuredSearch = JSON.parse(result);
        for(var S1 in InjuredSearch){
        	mySearch+=InjInfoLink(InjuredSearch[S1]);
        }
        $("#searchResult").html(mySearch);
	});
}

function getInjured(){
	// myApp.showPleaseWait();
	$.get("http://opends2.azurewebsites.net/api/dynamic/showInjured.php", function(result){
        var InjuredObj = JSON.parse(result);
        var myStatus1=""
        var StatusContent=""
        for(var S1 in InjuredObj.Status1){
        	myStatus1+=InjInfoLink(InjuredObj.Status1[S1]);
        	StatusContent+=InjInfo(InjuredObj.Status1[S1]);
        }
        $("#Status1").html(myStatus1);


        var myStatus2=""
        for(var S2 in InjuredObj.Status2){
        	myStatus2+=InjInfoLink(InjuredObj.Status2[S2]);
        	StatusContent+=InjInfo(InjuredObj.Status2[S2]);
        }
        $("#Status2").html(myStatus2);


        var myStatus3=""
        for(var S3 in InjuredObj.Status3){
        	myStatus3+=InjInfoLink(InjuredObj.Status3[S3]);
        	StatusContent+=InjInfo(InjuredObj.Status3[S3]);
        }
        $("#Status3").html(myStatus3);
        $("#pushContent").html(StatusContent);
		// myApp.hidePleaseWait();
    });
}