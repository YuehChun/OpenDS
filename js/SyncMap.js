
        function hospitalStatus(){
          for (var HID in hosContent){
            $.get("http://opends.azurewebsites.net/api/dynamic/hospitalInfo.php?HID=" + HID, function (HosInfo) {
                var HosObj = JSON.parse(HosInfo);
                var HBWidth = parseInt(HosObj.AHB) / parseInt(HosObj.THB)*100;
                var SRWidth = parseInt(HosObj.ASR) / parseInt(HosObj.TSR)*100;
                hosContent[HosObj.HID] =
'<div class="container" style="padding-left: 1px;max-width: 250px;">' +
    '<h5 class="text-info text-center">' + HosObj.name +
    '</h5><div class="row clearfix">' +
         '<div class="col-md-12 column">' +
            '<ul>' +
                '<li>空病床數 ：' + HosObj.AHB + ' / ' + HosObj.THB +
                '<div class="row clearfix"><div class="col-md-12 column"><div class="progress"><div class="progress-bar progress-success" style="width:' + HBWidth + '%;"></div></div></div></div>' +
                    '</li>' +
                '<li>空急診間數 ：' + HosObj.ASR + ' / ' + HosObj.TSR +
                '<div class="row clearfix"><div class="col-md-12 column"><div class="progress"><div class="progress-bar progress-success" style="width:' + SRWidth + '%;"></div></div></div></div>' +
                          '</li>' +
                '<li>更新時間 ：' + HosObj.time +
                          '</li>' +
            '</ul>' +
        '</div>' +
    '</div>' +
'</div>';
            });          
          }
          $("#UpTime_hospital").html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
        }

        function ambulanceStatus(){
          for (var AID in ambContent){
            $.get("http://opends.azurewebsites.net/api/dynamic/ambulanceInfo.php?AmbID=" + AID, function (AmbInfo) {
                var AmbObj = JSON.parse(AmbInfo);
                hosContent[HosObj.HID] =
'<div class="container" style="padding-left: 1px;max-width: 250px;">' +
    '<h5 class="text-info text-center">' + HosObj.name +
    '</h5><div class="row clearfix">' +
         '<div class="col-md-12 column">' +
            '<ul>' +
                '<li>傷患名稱 ：' + 'temp:王小明' +
                '<div class="row clearfix"><div class="col-md-12 column"><div class="progress"><div class="progress-bar progress-success" style="width:' + HBWidth + '%;"></div></div></div></div>' +
                    '</li>' +
                '<li>送往醫院 ：' + 'temp:台大醫院' +
                '<div class="row clearfix"><div class="col-md-12 column"><div class="progress"><div class="progress-bar progress-success" style="width:' + SRWidth + '%;"></div></div></div></div>' +
                          '</li>' +
                '<li>更新時間 ：' + HosObj.time +
                          '</li>' +
            '</ul>' +
        '</div>' +
    '</div>' +
'</div>';

            });          
          }
          $("#UpTime_ambulance").html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
        }
        function SyncData(_Type){
            if(SyncElems[_Type]){
                $("#sync" + _Type).removeClass("active");
                $("#gly" + _Type).removeClass('glyphicon-ok').addClass("glyphicon-remove");
                SyncElems[_Type] = false;
            }else{
                $("#sync" + _Type).addClass("active");
                $("#gly" + _Type).removeClass("glyphicon-remove").addClass('glyphicon-ok');
                SyncElems[_Type] = true;
            }
        }
        
        function MainPageTimeout() {
            setTimeout(function () {
                if (SyncElems['hospital']) {
                    hospitalStatus();
                } else if (SyncElems['ambulance']) {
                    ambulanceStatus();
                } else if (SyncElems['person']) {
                    personStatus();
                }
                MainPageTimeout();
            }, 10000);
        }



Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}