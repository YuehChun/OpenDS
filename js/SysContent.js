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
  if(userType=="amb"){
  var Content =
              '<div class="container" style="padding-left: 1px;max-width: 250px;">' +
                  '<h5 class="text-info text-center">' + val.InjID + " : " + val.IName +
                  '</h5><div class="row clearfix">' +
                       '<div class="col-md-12 column">' +
                          '<ul>' +
                              '<li>傷患名稱 ：' + val.IName +
                                  '</li>' +
                              '<li>受傷位置 ：' + val.injuredArea +
                                  '</li>' +
                              '<li>事故原因 ：' + val.injuredCause +
                                  '</li>' +
                              '<li>受傷狀況 ：' + val.injuredStatus +
                                  '</li>' +
                              '<li>連絡人 ：' + val.Contact +"(" + val.ContactPhone + ")"+
                                  '</li>' +
                              '<li>建立時間 ：' + val.datetime +
                                  '</li>' +
                          '</ul>' +
                      '</div></div>'+
                      '<div class="row clearfix">' +
                        '<div class="col-md-6 column text-center">' +
                          '<button class="btn btn-info btn-xs" onclick="InjuredCancel(\''+val.InjID+'\');">解除傷患點</button>'+
                        '</div>' +
                        '<div class="col-md-6 column text-center">' +
                          '<button class="btn btn-danger btn-xs" onclick="InjuredStatus(\''+val.InjID+'\',\'2\');">送往醫院</button>'+
                        '</div>'+
                      '</div>' +
                  '</div>' +
              '</div>';
  }else{

  var Content =
              '<div class="container" style="padding-left: 1px;max-width: 250px;">' +
                  '<h5 class="text-info text-center">' + val.InjID + " : " + val.IName +
                  '</h5><div class="row clearfix">' +
                       '<div class="col-md-12 column">' +
                          '<ul>' +
                              '<li>傷患名稱 ：' + val.IName +
                                  '</li>' +
                              '<li>受傷位置 ：' + val.injuredArea +
                                  '</li>' +
                              '<li>事故原因 ：' + val.injuredCause +
                                  '</li>' +
                              '<li>受傷狀況 ：' + val.injuredStatus +
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
  }
	return Content;
}
function hosInfo(Obj){
  var HBWidth = parseInt(Obj.AHB) / parseInt(Obj.THB)*100;
  var SRWidth = parseInt(Obj.ASR) / parseInt(Obj.TSR)*100;
	var Content=
	'<div class="container" style="padding-left: 1px;max-width: 250px;">' +
	    '<h5 class="text-info text-center">' + Obj.name +
	    '</h5><div class="row clearfix">' +
	         '<div class="col-md-12 column">' +
	            '<ul>' +
	                '<li>空病床數 ：' + Obj.AHB + ' / ' + Obj.THB +
	                '<div class="row clearfix"><div class="col-md-12 column"><div class="progress"><div class="progress-bar progress-success" style="width:' + HBWidth + '%;"></div></div></div></div>' +
	                    '</li>' +
	                '<li>空手術房 ：' + Obj.ASR + ' / ' + Obj.TSR +
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
                  '<h5 class="text-info text-center">' + Obj.DisID +
                  '</h5><div class="row clearfix">' +
                       '<div class="col-md-12 column">' +
                          '<ul>' +
                              '<li>災害狀況 ：' + Obj.eventStatus +
                                  '</li>' +
                              '<li>災害範圍（公尺） ：' + Obj.Rank +
                                  '</li>' +
                              '<li>說明 ：' + Obj.note +
                                  '</li>' +
                          '</ul>' +
                      '</div></div>' +
                      '<div class="row clearfix">' +
                        '<div class="col-md-6 column text-center">' +
                          '<button class="btn btn-info btn-xs" onclick="DisasterUpdate(\''+Obj.DisID+'\');">更新</button>'+
                        '</div>' +
                        '<div class="col-md-6 column text-center">' +
                          '<button class="btn btn-danger btn-xs" onclick="DisasterCancel(\''+Obj.DisID+'\');">移除</button>'+
                        '</div>' +
                      '</div>'+
                  '</div>' +
              '</div>';
	return Content;
}

function supInfo(Obj){
	var Content = 
              '<div class="container" style="padding-left: 1px;max-width: 250px;">' +
                  '<h5 class="text-info text-center">' + Obj.SupID +
                  '</h5><div class="row clearfix">' +
                       '<div class="col-md-12 column">' +
                          '<ul>' +
                              '<li>需求數量 ：' + Obj.theNumber +
                                  '</li>' +
                              '<li>需求物品 ：' + Obj.Items +
                                  '</li>' +
                              '<li>註解 ：' + Obj.note +
                                  '</li>' +
                          '</ul>' +
                        '</div></div>' +
                      '<div class="row clearfix">' +
                        '<div class="col-md-6 column text-center">' +
                          '<button class="btn btn-info btn-xs" onclick="SuppliesUpdate(\''+Obj.SupID+'\');">更新</button>'+
                        '</div>' +
                        '<div class="col-md-6 column text-center">' +
                          '<button class="btn btn-danger btn-xs" onclick="SuppliesCancel(\''+Obj.SupID+'\');">移除</button>'+
                        '</div>' +
                      '</div>' +
                  '</div>' +
              '</div>';
	return Content;
}