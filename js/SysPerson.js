
    var perInfoMsg='<div class="alert alert-dismissable alert-info">'+
      '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
      '<h4>Post!</h4>' +
      '<strong>Thank your help!</strong><div> Please wait 10 second'+ 
    '</div></div>';
    function SysGetIP(IPjson) {
        IP=IPjson.IP;
        $.get("http://opends.azurewebsites.net/api/dynamic/PersonInit.php?IP="+IP,function( result ){
          var newID = JSON.parse(result);
          PerID=newID.ID;
          $("#LogID").html("NCHU-DMLab :: 鄉民 :: "+ PerID);
        });
        getLocation();
    }
    var perLat = 25.045988;
    var perLng = 121.514934;
    function getLocation() {
      // Try HTML5 geolocation
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
          // lat = perLat+0.0001;
          // lng = perLng+0.0001;
          $("#Dist_Location").val("("+lat+","+lng+")");
          $("#Supp_Location").val("("+lat+","+lng+")");
          $("#Inju_Location").val("("+lat+","+lng+")");
          map.setCenter(new google.maps.LatLng(lat,lng));
          MyMarker.setPosition(new google.maps.LatLng(lat,lng));
          // perLat=lat;
          // perLng=lng;
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
    }
    function sendInjured(){
      // var Injured_Name = $("#Injured_Name").val();
      // var Injured_Phone = $("#Injured_Phone").val();
      // var Contact_Name = $("#Contact_Name").val();
      // var Contact_Phone = $("#Contact_Phone").val();
      // var Injured_Status = $("#Injured_Status").val();
      var Para = "Type=Per&PerID="+PerID+"&IP="+IP+"&lat="+lat+"&lng="+lng;
      $.post("http://opends.azurewebsites.net/api/dynamic/InjuredInit.php?" + Para ,{"Injured_Name": Injured_Name , "Injured_Phone": Injured_Phone, "Contact_Name":Contact_Name , "Contact_Phone":Contact_Phone , "Injured_Status":Injured_Status},function(result){
          var InjuredObj = JSON.parse(result);
          var perSuccessMsg='<div class="alert alert-dismissable alert-success">'+
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
            '<h4>Complete!</h4>' +
            '<strong>Thank your help!</strong><div> post time :'+InjuredObj.time + 
          '</div></div>';
          $("#InjuredInfo").html(perSuccessMsg);
      });
      // $("#InjuredInfo").html(perInfoMsg);
      // $("#Injured_Name").val("");
      // $("#Injured_Phone").val("");
      // $("#Contact_Name").val("");
      // $("#Contact_Phone").val("");
      // $("#Injured_Status").val("");
    }

    function sendDisaster(){
      var Para = "PerID="+PerID+"&IP="+IP+"&lat="+lat+"&lng="+lng;
      alert("http://opends.azurewebsites.net/api/dynamic/DisasterInit.php?" + Para);
      $.post("http://opends.azurewebsites.net/api/dynamic/DisasterInit.php?" + Para ,{"PerID" : PerID},function(result){
          var DisasterObj = JSON.parse(result);
          var perSuccessMsg='<div class="alert alert-dismissable alert-success">'+
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
            '<h4>Complete!</h4>' +
            '<strong>Thank your help!</strong><div> post time :'+DisasterObj.time + 
          '</div></div>';
          $("#DisasterInfo").html(perSuccessMsg);
      });
    }

    function sendSupplies(){
      var Para = "PerID="+PerID+"&IP="+IP+"&lat="+lat+"&lng="+lng;
      $.post("http://opends.azurewebsites.net/api/dynamic/SuppliesInit.php?" + Para ,{"PerID" : PerID},function(result){
          alert();
          var SuppliesObj = JSON.parse(result);
          var perSuccessMsg='<div class="alert alert-dismissable alert-success">'+
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
            '<h4>Complete!</h4>' +
            '<strong>Thank your help!</strong><div> post time :'+SuppliesObj.time + 
          '</div></div>';
          $("#SuppliesInfo").html(perSuccessMsg);
      });
    }

    function PeopleTimeout() {
        setTimeout(function () {
            getLocation();
            sendPersonPoint();
            PeopleTimeout();
        }, PostTimer);
    }

    function sendPersonPoint(){
      var Para = "PerID="+PerID+"&IP="+IP+"&lat="+lat+"&lng="+lng;
      $.get("http://opends.azurewebsites.net/api/dynamic/PersonPoint.php?"+Para , function( result ){
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