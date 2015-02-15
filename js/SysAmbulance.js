    var waypts = [];
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
          // lat = position.coords.latitude;
          // lng = position.coords.longitude;
          // temp
          lat = 25.041276;
          lng = 121.50900;
          map.setCenter(new google.maps.LatLng(lat,lng));
          MyAmbMarker.setPosition(new google.maps.LatLng(lat,lng));
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
      loadTask(); 
    }
    function loadTask(){
      $.get("http://opends.azurewebsites.net/api/dynamic/ambulanceTask.php?AmbID=" + AmbID , function( result ){
        var newTaskObj = JSON.parse(result);
        waypts = [{
          location: new google.maps.LatLng(newTaskObj.injured.lat,newTaskObj.injured.lng) ,
          stopover: true
        }];
        var request = {
            origin: new google.maps.LatLng(newTaskObj.Amb.lat, newTaskObj.Amb.lng),
            destination: new google.maps.LatLng(newTaskObj.hospital.lat, newTaskObj.hospital.lng),
            waypoints: waypts,
            optimizeWaypoints: true,
            provideRouteAlternatives: true,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {              directionsDisplay.setDirections(response);
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
              $("#taskCom").html(PathCommand);
            }else{
              // alert(JSON.stringify(response));
              alert("ERROR");
            }
        });


        /* 隨機配置的方式
        if(TaskObj.AmbID == newTaskObj.AmbID){
        }else if(TaskObj.AmbID == null ){
          $("#taskCom").html(LoadInfoMsg);
        }else if(TaskObj.AmbID == newTaskObj.AmbID){
          $("#taskCom").html(LoadDangerMsg);
        }else{
          alert("System Error!!");
        }
        TaskObj = newTaskObj;
        */
      });
    }

    function AmbulanceTimeout() {
        setTimeout(function () {
            getLocation();
            sendAmbulancePoint();
            AmbulanceTimeout();
        }, PostTimer);
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