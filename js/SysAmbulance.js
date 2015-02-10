    var waypts = [];
    var getTaskMsg='<div class="alert alert-dismissable alert-info">'+
      '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
      '<h4>Require Task!</h4>' +
      '<strong>Loading!</strong> Please waiting 5 second. Thank you !'+
    '</div>';
    var LoadDangerMsg='<div class="alert alert-dismissable alert-danger">'+
      '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
      '<h4>Change Task!</h4>' +
      '<strong>Check it!</strong> Please change your path. Thank you !'+
    '</div>';
    function SysGetIP(IPjson) {
        IP=IPjson.IP;
        $.get("http://opends.azurewebsites.net/api/dynamic/AmbulanceInit.php?IP="+IP,function( result ){
          var newID = JSON.parse(result);
          AmbID=newID.AmbulanceID;
          $("#LogID").html("NCHU-DMLab :: Ambulance :: "+ AmbID);
        });
        getLocation();
    }
    function getLocation() {
      // Try HTML5 geolocation
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          MyAmbMarker.setMap(null);
          // lat = position.coords.latitude;
          // lng = position.coords.longitude;
          // temp
          lat = 25.043832;
          lng = 121.509034;
          MyAmbMarker = new google.maps.Marker({
                      'position': new google.maps.LatLng(lat, lng),
                      'icon': myambulanceImg,
                      'title' : AmbID
                  });
          MyAmbMarker.setMap(map);
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
            if (status == google.maps.DirectionsStatus.OK) {
              // alert(JSON.stringify(response));
              directionsDisplay.setDirections(response);
              var LoadInfoMsg='<div class="alert alert-dismissable alert-info">'+
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
                '<h4>Get Task!</h4>' +
                '<strong>Do Your Best!</strong> Get Task Time : '+newTaskObj.time+
              '!</div>';
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