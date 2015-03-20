
  function SingleAmb(thisAmb){
    var thisAmbID = thisAmb;
    $.get("http://opends2.azurewebsites.net/api/dynamic/ambulanceCancel.php?ambID=" + thisAmb,function( result ){
      if(result == "1"){
        ambMarkers[thisAmbID].setMap(null);
      }else if(result == "2"){

      }
    });
  }

  function InjuredCancel(thisInj){
    var thisInjID = thisInj;
    $.get("http://opends2.azurewebsites.net/api/dynamic/injuredCancel.php?injID=" + thisInjID,function( result ){
      if(result == "OK"){
        injMarkers[thisInjID].setMap(null);
        injMarkers[thisInjID]=null;
        injContent[thisInjID]=null;
      }
    });
  }

  function SuppliesCancel(thisSup){
    var thisSupID = thisSup;
    $.get("http://opends2.azurewebsites.net/api/dynamic/suppliesCancel.php?SupID=" + thisSupID,function( result ){
      if(result == "OK"){
        supMarkers[thisSupID].setMap(null);
        supMarkers[thisSupID]=null;
        supContent[thisSupID]=null;
      }
    });
  }

  function DisasterCancel(thisDis){
    var thisDisID = thisDis;
    $.get("http://opends2.azurewebsites.net/api/dynamic/disasterCancel.php?DisID=" + thisDisID,function( result ){
      if(result == "OK"){
        disMarkers[thisDisID].setMap(null);
        disMarkers[thisDisID]=null;
        disContent[thisDisID]=null;
      }
    });
  }


  function AlertStatus( thisType, thisInfo){
      var lertInfoMsg='<div class="alert alert-dismissable alert-success">'+
        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
        '<strong>載入'+thisType+'</strong>'+ thisInfo
      '</div></div>';
      $("#alertStatus").html($("#alertStatus").html()+lertInfoMsg);
  }




/******************  Marker ******************/


  function hospitalMarkers(map) {
    $.get("http://opends2.azurewebsites.net/api/static/hospital.php", function (data) {
        var HosJSON = JSON.parse(data);
        $.each(HosJSON, function (i, val) {
            var marker = new google.maps.Marker({
                'position': new google.maps.LatLng(val.lat, val.lng),
                'icon': hospitalImg,
                'title': val.name + "," + val.ID
            });
            hosContent[val.ID]= '';
            google.maps.event.addListener(marker, 'click', function () {
                titleArr = this.title.split(",");
                HTMLDoc = titleArr[1];
                var infowindow = new google.maps.InfoWindow({ content: hosContent[HTMLDoc] });
                infowindow.open(map, this);
            });
            hosMarkers.push(marker);
        });
        hospitalStatus();
      $("#HosNum").html("#"+hosMarkers.length);
    });
  }
  function policeMarkers(map) {
    $.get("http://opends2.azurewebsites.net/api/static/police.php", function (data) {
        var HosJSON = JSON.parse(data);
        $.each(HosJSON, function (i, val) {
            var marker = new google.maps.Marker({
                'position': new google.maps.LatLng(val.lat, val.lng),
                'icon': policeImg,
                'title': val.name + "," + val.ID
            });
            polContent[val.ID]= polInfo(val);
            google.maps.event.addListener(marker, 'click', function () {
                titleArr = this.title.split(",");
                HTMLDoc = titleArr[1];
                var infowindow = new google.maps.InfoWindow({ content: polContent[HTMLDoc] });
                infowindow.open(map, this);
            });
            polMarkers.push(marker);
        });
      $("#PolNum").html("#"+polMarkers.length);
    });
  }
  
  function shelterMarkers(map) {
    $.get("http://opends2.azurewebsites.net/api/static/shelter.php", function (data) {
        var SheJSON = JSON.parse(data);
        $.each(SheJSON, function (i, val) {
            var marker = new google.maps.Marker({
                'position': new google.maps.LatLng(val.lat, val.lng),
                'icon': shelterImg,
                'title': val.name + "," + val.ID
            });
            sheContent[val.ID]= sheInfo(val);
            google.maps.event.addListener(marker, 'click', function () {
                titleArr = this.title.split(",");
                HTMLDoc = titleArr[1];
                var infowindow = new google.maps.InfoWindow({ content: sheContent[HTMLDoc] });
                infowindow.open(map, this);
            });
            sheMarkers.push(marker);
        });
      $("#SheNum").html("#"+sheMarkers.length);
    });
  }
  function ambulancebMarkers(map) {
    $.get("http://opends2.azurewebsites.net/api/dynamic/ambulanceSync.php?Days=5", function (data) {
        var AmbJSON = JSON.parse(data);
        $.each(AmbJSON, function (i, val) {
            if(typeof(ambMarkers[val.AmbID]) == 'undefined' || ambMarkers[val.AmbID] == null){
              var marker = new google.maps.Marker({
                  'position': new google.maps.LatLng(val.lat, val.lng),
                  'icon': ambulanceImg,
                  'title': val.AmbID
              });
              if(SyncElems['ambulance']){
                marker.setMap(map);
              }
              ambMarkers[val.AmbID] = marker;
              ambContent[val.AmbID] = "";
              google.maps.event.addListener(ambMarkers[val.AmbID], 'click', function () {
                  titleID = this.title;
                  var infowindow = new google.maps.InfoWindow({ content: ambContent[titleID] });
                  infowindow.open(map, this);
              });
            }else if(typeof(val.AmbID) == 'undefined' || val.AmbID == null){
              ambMarkers[val.AmbID].setMap(null);
              ambMarkers[val.AmbID]=null;
              ambContent[val.AmbID]=null
            }else{
              ambMarkers[val.AmbID].setPosition(new google.maps.LatLng(val.lat, val.lng));
            }
        });
      ambulanceStatus();
    });
  }
  function injuredMarkers(map) {
    $.get("http://opends2.azurewebsites.net/api/dynamic/injured.php", function (data) {
        var InjJSON = JSON.parse(data);
        $.each(InjJSON, function (i, val) {
            var marker = new google.maps.Marker({
                'position': new google.maps.LatLng(val.lat, val.lng),
                'icon': injuredImg,
                'title':  val.InjID + "," +val.IName
            });
            if(SyncElems['injured']){
              marker.setMap(map);
            }
            injMarkers[val.InjID] = marker;
            injContent[val.InjID] = "-";
            google.maps.event.addListener(injMarkers[val.InjID], 'click', function () {
                titleArr = this.title.split(",");
                titleID = titleArr[0];
                var infowindow = new google.maps.InfoWindow({ content: injContent[titleID] });
                infowindow.open(map, this);
            });
        });
      injuredStatus();
    });
  }
  function personMarkers(map) {
    $.get("http://opends2.azurewebsites.net/api/dynamic/person.php?Days=1", function (data) {
        var PerJSON = JSON.parse(data);
        $.each(PerJSON, function (i, val) {
            if(typeof(perMarkers[val.UserID]) == 'undefined' || perMarkers[val.UserID] == null){
              var marker = new google.maps.Marker({
                  'position': new google.maps.LatLng(val.lat, val.lng),
                  'icon': personImg,
                  'title': val.UserID +" Time: "+ val.time
              });
              if(SyncElems['person']){
                marker.setMap(map);
              }
              perMarkers[val.UserID] = marker;
              perContent[val.UserID] = "";

            }else if(typeof(val.lat) == 'undefined' || val.lat == null){
              perMarkers[val.UserID].setMap(null);
              perMarkers[val.UserID]=null;
            }else{
              perMarkers[val.UserID].setPosition(new google.maps.LatLng(val.lat, val.lng));
            }
        });
      $("#PerNum").html("#"+Object.keys(perMarkers).length);
      $("#UpTime_person").html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
    });
  }
  function disasterMarkers(map) {
    $.get("http://opends2.azurewebsites.net/api/dynamic/disaster.php", function (data) {
        var DisJSON = JSON.parse(data);
        $.each(DisJSON, function (i, val) {
            if(typeof(disMarkers[val.DisID]) == 'undefined' || disMarkers[val.DisID] == null){
              var marker = new google.maps.Marker({
                  'position': new google.maps.LatLng(val.lat, val.lng),
                  'icon': disasterImg,
                  'title': val.DisID
              });
              disMarkers[val.DisID] = marker;
              disContent[val.DisID] = "";
              if(SyncElems['disaster']){
                marker.setMap(map);
              }
              google.maps.event.addListener(disMarkers[val.DisID], 'click', function () {
                  titleID = this.title;
                  var infowindow = new google.maps.InfoWindow({ content: disContent[titleID] });
                  infowindow.open(map, this);
              });
            }
        });
        disasterStatus();
    });
  }
  function suppliesMarkers(map) {
    $.get("http://opends2.azurewebsites.net/api/dynamic/supplies.php", function (data) {
        var SupJSON = JSON.parse(data);
        $.each(SupJSON, function (i, val) {
            if(typeof(supMarkers[val.SupID]) == 'undefined' || supMarkers[val.SupID] == null){
              var marker = new google.maps.Marker({
                  'position': new google.maps.LatLng(val.lat, val.lng),
                  'icon': suppliesImg,
                  'title': val.SupID
              });
              supMarkers[val.SupID] = marker;
              supContent[val.SupID] = "";

              if(SyncElems['supplies']){
                supMarkers[val.SupID].setMap(map);
              }
              google.maps.event.addListener(supMarkers[val.SupID], 'click', function () {
                  titleID = this.title;
                  var infowindow = new google.maps.InfoWindow({ content: supContent[titleID] });
                  infowindow.open(map, this);
              });
            }
        });
        suppliesStatus();
    });
  }


/******************  Status ******************/


    function hospitalStatus(){
      for (var HID in hosContent){
        $.get("http://opends2.azurewebsites.net/api/dynamic/hospitalInfo.php?HID=" + HID, function (result) {
            var HosObj = JSON.parse(result);
            hosContent[HosObj.HID] = hosInfo(HosObj);
        });
      }
      $("#UpTime_hospital").html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
    }

    function ambulanceStatus(){
      var Ci=0;
      for (var AID in ambContent){
        Ci++;
        $.get("http://opends2.azurewebsites.net/api/dynamic/ambulanceInfo.php?AmbID=" + AID, function (AmbInfo) {
            var AmbObj = JSON.parse(AmbInfo);
            ambContent[AmbObj.ambID] = ambInfo(AmbObj);
        });          
      }
      $("#AmbNum").html("#"+Ci);
      $("#UpTime_ambulance").html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
    }


    function injuredStatus(){
        var Group=",0";
        for (var IID in injContent){
            Group = Group+","+IID;
        }
        $.get("http://opends2.azurewebsites.net/api/dynamic/InjuredStatus.php?InjGroupID=" + Group, function (InjInfo) {
            var InjObj = JSON.parse(InjInfo);
            var Ci=0;
            for(var key in InjObj.New){
                Ci++;
                var ThisObj = InjObj.New[key];
                injContent[ThisObj.InjID] = injInfo(ThisObj);
                if(typeof(injMarkers[ThisObj.InjID]) == 'undefined' || injMarkers[ThisObj.InjID] == null){
                  injMarkers[ThisObj.InjID]= new google.maps.Marker({
                    'position': new google.maps.LatLng(ThisObj.lat, ThisObj.lng),
                    'icon': injuredImg,
                    'title': ThisObj.InjID + "," + ThisObj.IName
                  });
                  if(MapElems['injured']){
                    injMarkers[ThisObj.InjID].setMap(map);
                  }
                  google.maps.event.addListener(injMarkers[ThisObj.InjID], 'click', function () {
                      titleArr = this.title.split(",");
                      titleID = titleArr[0];
                      var infowindow = new google.maps.InfoWindow({ content: injContent[titleID] });
                      infowindow.open(map, this);
                  });
                }
            }
            $("#InjNum").html("#"+Ci);
            $("#UpTime_injured").html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
            for(var key in InjObj.Clear){
                var ThisObj = InjObj.Clear[key];
                injContent[ThisObj.InjID] = null;
                injMarkers[ThisObj.InjID].setMap(null);
                injMarkers[ThisObj.InjID] = null;
            }
        });
    }

    function disasterStatus(){
        var Group="";
        for (var DID in disContent){
            Group = Group+","+DID;
        }
        $.get("http://opends2.azurewebsites.net/api/dynamic/disasterStatus.php?DisGroupID=" + Group, function (DisInfo) {
            var DisObj = JSON.parse(DisInfo);
            var Ci=0;
            for(var key in DisObj.Current){
                Ci++;
                var ThisObj = DisObj.Current[key];
                disContent[ThisObj.DisID] = disInfo(ThisObj);
                if(typeof(disMarkers[ThisObj.DisID]) == 'undefined' || disMarkers[ThisObj.DisID] == null){
                  disMarkers[ThisObj.DisID] = new google.maps.Marker({
                    'position': new google.maps.LatLng(ThisObj.lat, ThisObj.lng),
                    'icon': disasterImg,
                    'title': ThisObj.DisID
                  });
                  if(MapElems['disaster']){
                    disMarkers[ThisObj.DisID].setMap(map);
                  }
                  google.maps.event.addListener(disMarkers[ThisObj.DisID], 'click', function () {
                      titleID = this.title;
                      var infowindow = new google.maps.InfoWindow({ content: disContent[titleID] });
                      infowindow.open(map, this);
                  });
                }
            }
            $("#DisNum").html("#"+Ci);
        });
      $("#UpTime_disaster").html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
    }

    function suppliesStatus(){
        var Group="";
        for (var SID in supContent){
            Group = Group+","+SID;
        }
        $.get("http://opends2.azurewebsites.net/api/dynamic/SuppliesStatus.php?SupGroupID=" + Group, function (SupData) {
            var SupObj = JSON.parse(SupData);
            var Ci=0;
            for(var key in SupObj.Current){
                Ci++;
                var ThisObj = SupObj.Current[key];
                supContent[ThisObj.SupID] = supInfo(ThisObj);
                if(typeof(supMarkers[ThisObj.SupID]) == 'undefined' || supMarkers[ThisObj.SupID] == null){
                  supMarkers[ThisObj.SupID] = new google.maps.Marker({
                    'position': new google.maps.LatLng(ThisObj.lat, ThisObj.lng),
                    'icon': suppliesImg,
                    'title': ThisObj.SupID
                  });
                  if(MapElems['supplies']){
                    supMarkers[ThisObj.SupID].setMap(map);
                  }
                  google.maps.event.addListener(supMarkers[ThisObj.SupID], 'click', function () {
                      titleID = this.title;
                      var infowindow = new google.maps.InfoWindow({ content: supContent[titleID] });
                      infowindow.open(map, this);
                  });
                }
            }
          $("#SupNum").html("#"+Ci);
        });
      $("#UpTime_supplies").html(new Date().Format("yyyy-MM-dd HH:mm:ss"));
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




