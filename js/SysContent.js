function ambInfo(Obj){
	var Content = 
'<div class="container" style="padding-left: 1px;max-width: 250px;">' +
    '<h5 class="text-info text-center">' + Obj.ambID + " : " + Obj.S +
    '</h5><div class="row clearfix">' +
         '<div class="col-md-12 column">' +
            '<ul>' +
                '<li>傷患名稱 ：' + Obj.name + "("+Obj.sex +")"+
                    '</li>' +
                '<li>送往醫院 ：' + Obj.H.name +
                          '</li>' +
                '<li>連絡人 ：' + Obj.Contact +"(" + Obj.ContactPhone + ")"+
                          '</li>' +
                '<li>更新時間 ：' + Obj.uptime +
                          '</li>' +
            '</ul>' +
        '</div>' +
    '</div>' +
'</div>';
return Content;
}

function injInfo(val){
	var Content =
              '<div class="container" style="padding-left: 1px;max-width: 250px;">' +
                  '<h5 class="text-info text-center">' + val.InjID + " : " + val.IName +
                  '</h5><div class="row clearfix">' +
                       '<div class="col-md-12 column">' +
                          '<ul>' +
                              '<li>傷患名稱 ：' + val.IName +
                                  '</li>' +
                              '<li>連絡人 ：' + val.Contact +"(" + val.ContactPhone + ")"+
                                  '</li>' +
                              '<li>建立時間 ：' + val.datetime +
                                  '</li>' +
                          '</ul>' +
                      '</div>' +
                      '<div class="col-md-12 column text-center">' +
                        '<button class="btn btn-info btn-xs" onclick="InjuredCancel(\''+val.InjID+'\');">以解除傷患點</button>'+
                      '</div>' +
                  '</div>' +
              '</div>';
	return Content;
}
function hosInfo(Obj){
  var HBWidth = parseInt(HosObj.AHB) / parseInt(HosObj.THB)*100;
  var SRWidth = parseInt(HosObj.ASR) / parseInt(HosObj.TSR)*100;
	var Content=
	'<div class="container" style="padding-left: 1px;max-width: 250px;">' +
	    '<h5 class="text-info text-center">' + Obj.name +
	    '</h5><div class="row clearfix">' +
	         '<div class="col-md-12 column">' +
	            '<ul>' +
	                '<li>空病床數 ：' + Obj.AHB + ' / ' + Obj.THB +
	                '<div class="row clearfix"><div class="col-md-12 column"><div class="progress"><div class="progress-bar progress-success" style="width:' + HBWidth + '%;"></div></div></div></div>' +
	                    '</li>' +
	                '<li>空急診間數 ：' + Obj.ASR + ' / ' + Obj.TSR +
	                '<div class="row clearfix"><div class="col-md-12 column"><div class="progress"><div class="progress-bar progress-success" style="width:' + SRWidth + '%;"></div></div></div></div>' +
	                          '</li>' +
	                '<li>更新時間 ：' + Obj.time +
	                          '</li>' +
	            '</ul>' +
	        '</div>' +
	    '</div>' +
	'</div>';
	return Content;
}

function sheInfo(Obj){
	var Content=
                '<div class="container" style="padding-left: 1px;max-width: 250px;">' +
                    '<h5 class="text-info text-center">' + Obj.name +
                    '</h5>' +
                '</div>';
	return Content;
}

function polInfo(Obj){
	var Content = 
                '<div class="container" style="padding-left: 1px;max-width: 250px;">' +
                    '<h5 class="text-info text-center">' + Obj.name +
                    '</h5>' +
                '</div>';
    return Content;
}

function disInfo(Obj){
	var Content = 
          '<div class="container" style="padding-left: 1px;max-width: 250px;">' +
              '<h5 class="text-info text-center">' + Obj.name +
              '</h5>' +
          '</div>';
	return Content;
}

function supInfo(Obj){
	var Content = 
          '<div class="container" style="padding-left: 1px;max-width: 250px;">' +
              '<h5 class="text-info text-center">' + Obj.name +
              '</h5>' +
          '</div>';
	return Content;
}