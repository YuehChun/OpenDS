    var waypts = [];
    var userType="amb";
    var request = {
        origin: "",
        destination: "",
        waypoints: waypts,
        optimizeWaypoints: true,
        provideRouteAlternatives: true,
        travelMode: google.maps.TravelMode.DRIVING
    };
    var firstmap = 0;
    var getTaskMsg='<div class="alert alert-dismissable alert-info">'+
      '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
      '<h4>任務請求中!</h4>' +
      '<strong>載入任務!</strong> 請稍候10秒，感謝您 !'+
    '</div>';
    var LoadDangerMsg='<div class="alert alert-dismissable alert-danger">'+
      '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
      '<h4>任務改變!</h4>' +
      '<strong>請確認任務!</strong> 請更改你的路線，感謝您 !'+
    '</div>';
    
    function SysGetIP(IPjson) {
        $("body").mask("請求任務");
        IP=IPjson.IP;
        $.get("http://opends.azurewebsites.net/api/dynamic/AmbulanceInit.php?IP="+IP,function( result ){
          var newID = JSON.parse(result);
          AmbID=newID.AmbulanceID;
          $("#LogID").html("NCHU-DMLab :: 救護車 :: "+ AmbID);
          MyAmbMarker.setTitle(AmbID);
        });
        getLocation();
    }

    function getLocation() {
      // Try HTML5 geolocation
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
          var MapLatlng= new google.maps.LatLng(lat,lng);
          map.setCenter(MapLatlng);
          MyAmbMarker.setPosition(MapLatlng);
          request.origin = MapLatlng;
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
    }

    
    function getTask(){
      $("#taskCom").html(getTaskMsg);
      $("#MainTask").mask("請求任務");
      loadTask(); 
    }
    function loadTask(){
      $.get("http://opends.azurewebsites.net/api/dynamic/ambulanceTask.php?AmbID=" + AmbID , function( result ){
        var newTaskObj = JSON.parse(result);
        waypts = [{
          location: new google.maps.LatLng(newTaskObj.injured.lat,newTaskObj.injured.lng) ,
          stopover: true
        }];
        request.origin = new google.maps.LatLng(newTaskObj.Amb.lat, newTaskObj.Amb.lng);
        request.destination = new google.maps.LatLng(newTaskObj.hospital.lat, newTaskObj.hospital.lng);
        request.waypoints = waypts;
        $("#ArriveHospital").removeClass('disabled');
        $("#ArriveHospital").attr("onclick","InjuredStatus('"+newTaskObj.injured.InjuredPeopleID+"','3')");
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
              var LoadInfoMsg='<div class="alert alert-dismissable alert-info">'+
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
                '<h4>Get Task!</h4>' +
                '<strong>Do Your Best!</strong> Get Task Time : '+ newTaskObj.time +
              '!</div>';
              var route = response.routes[0];
              var Duration = "路程時間"+response.routes[0].legs[0].duration.text;
              var PathCommand = '<h4>'+Duration+'</h4>';
              // For each route, display summary information.
              for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                PathCommand += '<b>路徑  ' + routeSegment + ': </b> <br>';
                PathCommand += route.legs[i].start_address + ' to ';
                PathCommand += route.legs[i].end_address + '<br>';
                PathCommand += route.legs[i].distance.text + '<br><br>';
              }
              $("#MainTask").unmask();
              $("#taskCom").html(PathCommand);
            }else{
              // alert(JSON.stringify(response));
              alert("ERROR");
            }
        });
        readInjured(newTaskObj.injured,newTaskObj.hospital.name);
      });
    }


    function UpdateInjured(){
      $("#MainInjured").mask("等候中");
      var Status="";
      $("input[name='injuredStatus']:checked").each(function(i){
        Status += $(this).val() + ":";
      });

      var Cause="";
      $("input[name='injuredCause']:checked").each(function(i){
        Cause += $(this).val() + ":";
      });

      var Iarea="";
      $("input[name='injuredArea']:checked").each(function(i){
        Iarea += $(this).val() + ":";
      });

      var InjID = $("#NumberID").val();
      var Injured_Name = $("#Injured_Name").val();
      var Injured_Phone = $("#Injured_Phone").val();
      var Contact_Name = $("#Contact_Name").val();
      var Contact_Phone = $("#Contact_Phone").val();
      var StateLog = $("#Injured_Status").val();
      var Sex = $("input[name='Injured_Sex']:checked").val();

      var Para = "Type=Amb&AmbID="+AmbID;
      $.post("http://opends.azurewebsites.net/api/dynamic/amb2injured.php?" + Para ,{
        "InjID": InjID ,
        "Injured_Name": Injured_Name ,
        "Injured_Phone": Injured_Phone,
        "Contact_Name":Contact_Name ,
        "Contact_Phone":Contact_Phone ,
        "Injured_Sex":Sex,
        "injured_Area":Iarea ,
        "injured_Cause":Cause ,
        "injured_Status":Status,
        "StateLog":StateLog } ,function(result){
          // alert(result);
          var UpdateObj = JSON.parse(result);
          if(UpdateObj.state=="OK"){
            var perSuccessMsg='<div class="alert alert-dismissable alert-success">'+
              '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
              '<h4>更新完成!</h4>' +
              '<strong>感謝您的幫忙!</strong><div> 更新時間 :'+UpdateObj.time + 
            '</div></div>';
            $("#InjuredInfo").html(perSuccessMsg);
            $("#MainInjured").unmask();
          }else{
            alert(result);
          }
          // PerMarKer('Injured', InjuredObj);
      });
    }

    function InjuredStatus(injuredID,status){
      $.post("http://opends.azurewebsites.net/api/dynamic/injuredProcess.php", {"status" : status , "AmbID": AmbID ,"IP" : IP,"InjID" : injuredID},function(result){
          var UpdateObj = JSON.parse(result);
          if(UpdateObj.status=="OK"){
            injMarkers[UpdateObj.InjID].setMap(null);
            injMarkers[UpdateObj.InjID]=null;
            injContent[UpdateObj.InjID]=null; 
          }else if(UpdateObj.status=="Complete"){
            alert("感謝配合，請重新整理或點選取得任務");
          }else{
            alert("ERROR");
          }
      });
    }

    function readInjured(injuredObj,HospitalName) {
      $("#Injured_Name").val(injuredObj.Name);
      $("#Injured_Phone").val(injuredObj.phone);
      $("#Contact_Name").val(injuredObj.contact);
      $("#Contact_Phone").val(injuredObj.ContactPhone);
      $("#HospitalName").val(HospitalName);
      $("#NumberID").val(injuredObj.InjuredPeopleID);
      $("#Injured_Status").val(injuredObj.InjuryStateLog);

      if(injuredObj.sex==0){
        var SexEle = $("#Injured_Female input");
        SexEle.prop("checked",true);
        SexEle.parent().addClass("active");
      }else if(injuredObj.sex==1){
        var SexEle = $("#Injured_Male input");
        SexEle.prop("checked",true);
        SexEle.parent().addClass("active");
      }


      for(var i=0 ; i<5 ; i++){
        if(injuredObj.injuredArea.indexOf(i) > -1){
          var AreaEle = $("#injuredArea_"+i+" input");
          AreaEle.prop("checked",true);
          AreaEle.parent().addClass("active");
        }
      }
      for(var i=0 ; i<5 ; i++){
        if(injuredObj.injuredCause.indexOf(i) > -1){
          var AreaEle = $("#injuredCause_"+i+" input");
          AreaEle.prop("checked",true);
          AreaEle.parent().addClass("active");
        }
      }
      for(var i=0 ; i<10 ; i++){
        if(injuredObj.injuredStatus.indexOf(i) > -1){
          var AreaEle = $("#injuredStatus_"+i+" input");
          AreaEle.prop("checked",true);
          AreaEle.parent().addClass("active");
        }
      }
    }



    function sendAmbulancePoint(){
      var Para = "AmbID="+AmbID+"&IP="+IP+"&lat="+lat+"&lng="+lng;
      $.get("http://opends.azurewebsites.net/api/dynamic/AmbulancePoint.php?"+Para , function( result ){
        var LocationObj = JSON.parse(result);
        $("#UpTime_location").text(LocationObj.time);
      });
    }

    function handleNoGeolocation(errorFlag) {
      if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
      } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
      }
      alert(content);
    }