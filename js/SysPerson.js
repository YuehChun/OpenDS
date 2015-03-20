    var userType="per";
    var perInfoMsg='<div class="alert alert-dismissable alert-info">' +
      '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
      '<h4>Post!</h4>' +
      '<strong>Thank your help!</strong><div> Please wait 10 second' + 
    '</div></div>';

    function SysGetIP(IPjson) {
        IP=IPjson.IP;
        $.get("http://opends2.azurewebsites.net/api/dynamic/PersonInit.php?IP="+IP,function( result ){
          var newID = JSON.parse(result);
          PerID=newID.ID;
          $("#LogID").html("NCHU-DMLab :: 鄉民 :: "+ PerID);
        });
        getLocation();
    }

    function getLocation() {
      // Try HTML5 geolocation
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
          $("#Dist_Location").val("("+lat+","+lng+")");
          $("#Supp_Location").val("("+lat+","+lng+")");
          $("#Inju_Location").val("("+lat+","+lng+")");
          map.setCenter(new google.maps.LatLng(lat,lng));
          MyMarker.setPosition(new google.maps.LatLng(lat,lng));
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
        handleNoGeolocation(false);
      }
    }
    function sendInjured(){
      $("#MainInjured").mask("等候中");
      var Status="";
      $("input[name='injuredStatus']:checked").each(function(i){
        Status += $(this).val() + ":";
        $(this).prop("checked",false);
        $(this).parent().removeClass("active");
      });

      var Cause="";
      $("input[name='injuredCause']:checked").each(function(i){
        Cause += $(this).val() + ":";
        $(this).prop("checked",false);
        $(this).parent().removeClass("active");
      });

      var Iarea="";
      $("input[name='injuredArea']:checked").each(function(i){
        Iarea += $(this).val() + ":";
        $(this).prop("checked",false);
        $(this).parent().removeClass("active");
      });

      var Injured_Name = $("#Injured_Name").val();
      var Injured_Phone = $("#Injured_Phone").val();
      var Contact_Name = $("#Contact_Name").val();
      var Contact_Phone = $("#Contact_Phone").val();
      var StateLog = $("#InjuryStateLog").val();
      var SexEle = $("input[name='Injured_Sex']:checked");
      var Sex = SexEle.val();
      SexEle.prop("checked",false);
      SexEle.parent().removeClass("active");


      var Para = "Type=Per&PerID="+PerID+"&IP="+IP+"&lat="+lat+"&lng="+lng;
      $.post("http://opends2.azurewebsites.net/api/dynamic/InjuredInit.php?" + Para ,{
        "Injured_Name": Injured_Name ,
        "Injured_Phone": Injured_Phone,
        "Contact_Name":Contact_Name ,
        "Contact_Phone":Contact_Phone ,
        "Injured_Sex":Sex,
        "injured_Area":Iarea ,
        "injured_Cause":Cause ,
        "injured_Status":Status,
        "StateLog":StateLog},function(result){
          var InjuredObj = JSON.parse(result);
          var perSuccessMsg='<div class="alert alert-dismissable alert-success">'+
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
            '<h4>Complete!</h4>' +
            '<strong>Thank your help!</strong><div> post time :'+InjuredObj.time + 
          '</div></div>';
          $("#InjuredInfo").html(perSuccessMsg);
          $("#MainInjured").unmask();
          // PerMarKer('Injured', InjuredObj);
      });
      $("#InjuredInfo").html(perInfoMsg);
      $("#Injured_Name").val("");
      $("#Injured_Phone").val("");
      $("#Contact_Name").val("");
      $("#Contact_Phone").val("");
      $("#InjuryStateLog").val("");
    }
    // function PerMarker(htiaType,Obj){
    //   if(htiaType == "Injured"){
    //     var marker = new google.maps.Marker({
    //         'position': new google.maps.LatLng(Obj.lat, Obj.lng),
    //         'icon': injuredImg,
    //         'title':  Obj.InjID + "," +Obj.IName
    //     });
    //   }else if(htiaType == "Disaster"){

    //   }
    // }

    function sendDisaster(){
      $("#MainDisaster").mask("等候中");
      var RoadStatus="";
      $("input[name='RoadStatus']:checked").each(function(i){
        RoadStatus += $(this).val() + ":";
        $(this).prop("checked",false);
        $(this).parent().removeClass("active");
      });

      var ScopeEle = $("input[name='Scope']:checked");
      var Scope = ScopeEle.val();
      ScopeEle.prop("checked",false);
      ScopeEle.parent().removeClass("active");

      var CarPassEle = $("input[name='CarPass']:checked");
      var CarPass = CarPassEle.val();
      CarPassEle.prop("checked",false);
      CarPassEle.parent().removeClass("active");

      var DisStatus = $("#Disaster_Status").val();

      var Para = "PerID="+PerID+"&IP="+IP+"&lat="+lat+"&lng="+lng;
      $.post("http://opends2.azurewebsites.net/api/dynamic/DisasterInit.php?" + Para ,{"RoadStatus" : RoadStatus , "Scope" : Scope , "CarPass" : CarPass , "DisStatus" : DisStatus },function(result){
          var DisasterObj = JSON.parse(result);
          var perSuccessMsg='<div class="alert alert-dismissable alert-success">'+
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
            '<h4>Complete!</h4>' +
            '<strong>Thank your help!</strong><div> post time :'+DisasterObj.time + 
          '</div></div>';
          $("#Disaster_Status").val("");
          $("#DisasterInfo").html(perSuccessMsg);
          $("#MainDisaster").unmask();
      });
    }

    function sendSupplies(){
      $("#MainSupplies").mask("等候中");
      var Items="";
      $("input[name='SuppliesItem']:checked").each(function(i){
        Items += $(this).val() + ":";
        // $(this).prop("checked",false);
        // $(this).parent().removeClass("active");
      });
      var PersonNumber = $("#supNumber").val();
      var note = $("#Supplies_note").val();

      var Para = "PerID="+PerID+"&IP="+IP+"&lat="+lat+"&lng="+lng;
      $.post("http://opends2.azurewebsites.net/api/dynamic/SuppliesInit.php?" + Para ,{"Items" : Items ,"PersonNumber" : PersonNumber ,"note" : note },function(result){
          var SuppliesObj = JSON.parse(result);
          var perSuccessMsg='<div class="alert alert-dismissable alert-success">'+
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
            '<h4>Complete!</h4>' +
            '<strong>Thank your help!</strong><div> post time :'+SuppliesObj.time + 
          '</div></div>';
          $("#SuppliesInfo").html(perSuccessMsg);
          $("#MainSupplies").unmask();
          // var PersonNumber = $("#supNumber").val("");
          // var note = $("#Supplies_note").val("");
      });
    }

    function sendPersonPoint(){
      var Para = "PerID="+PerID+"&IP="+IP+"&lat="+lat+"&lng="+lng;
      $.get("http://opends2.azurewebsites.net/api/dynamic/PersonPoint.php?"+Para , function( result ){
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