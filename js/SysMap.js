  var hosMarkers = [], polMarkers = [], sheMarkers = [],ambMarkers = {},perMarkers = {},injMarkers = {},disMarkers = {},supMarkers = {}
  var hosContent = {}, polContent = {}, sheContent = {},ambContent = {},perContent = {},injContent = {},disContent = {},supContent = {};
  var InjListener ={};
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var SyncElems = {
      'hospital': false,
      'ambulance': false,
      'person': false,
      'injured': false,
      'disaster': false,
      'supplies': false
  };  
  var MapElems = {
      'hospital': false,
      'police': false,
      'emergency': false,
      'shelter': false,
      'ambulance': false,
      'person': false,
      'injured': false,
      'disaster': false,
      'supplies': false
  };



  var hospitalImg = {
    url: 'http://opends2.azurewebsites.net/img/icon/hospital.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(16, 32)
  };
  var policeImg = {
    url: 'http://opends2.azurewebsites.net/img/icon/Police.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(16, 32)
  };
  var shelterImg = {
    url: 'http://opends2.azurewebsites.net/img/icon/shelter.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(16, 32)
  };
  var ambulanceImg = {
    url: 'http://opends2.azurewebsites.net/img/icon/Ambulance.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(16, 32)
  };
  var personImg = {
    url: 'http://opends2.azurewebsites.net/img/icon/person.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(16, 32)
  };
  var injuredImg = {
    url: 'http://opends2.azurewebsites.net/img/icon/injured.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(16, 32)
  };
  var disasterImg = {
    url: 'http://opends2.azurewebsites.net/img/icon/disaster.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(16, 32)
  };
  var suppliesImg = {
    url: 'http://opends2.azurewebsites.net/img/icon/supplies.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(16, 32)
  };
  var myambulanceImg = {
    url: 'http://opends2.azurewebsites.net/img/icon/myambulance.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(16, 32)
  };
  var mymarkerImg = {
    url: 'http://opends2.azurewebsites.net/img/icon/mymarker.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(16, 32)
  };


  var MyMarker = new google.maps.Marker({
                'icon': mymarkerImg
            });
  var MyAmbMarker = new google.maps.Marker({
                'icon': myambulanceImg
            });



  function hospitalRemove(){
    for (var i = 0; i < hosMarkers.length; i++) {
      hosMarkers[i].setMap(null);
    }
    $("#hospital").removeClass("active");
  }
  function policeRemove(){
    for (var i = 0; i < polMarkers.length; i++) {
      polMarkers[i].setMap(null);
    }
    $("#police").removeClass("active");
  }
  function shelterRemove(){
    for (var i = 0; i < sheMarkers.length; i++) {
      sheMarkers[i].setMap(null);
    }
    $("#shelter").removeClass("active");
  }
  function ambulanceRemove(){
    for (var AID in ambMarkers){
      ambMarkers[AID].setMap(null);
    }
    $("#ambulance").removeClass("active");
  }
  function injuredRemove(){
    for (var IID in injMarkers){
      injMarkers[IID].setMap(null);
    }
    $("#injured").removeClass("active");
  }
  function personRemove(){
    for (var PID in perMarkers){
      perMarkers[PID].setMap(null);
    }
    $("#person").removeClass("active");
  }
  function disasterRemove(){
    for (var DID in disMarkers){
      disMarkers[DID].setMap(null);
    }
    $("#disaster").removeClass("active");
  }
  function suppliesRemove(){
    for (var SID in supMarkers) {
      supMarkers[SID].setMap(null);
    }
    $("#supplies").removeClass("active");
  }







  function hospitalSetup(map){
    for (var i = 0; i < hosMarkers.length; i++) {
      hosMarkers[i].setMap(map);
    }
    $("#hospital").addClass("active");
  }
  function policeSetup(map){
    for (var i = 0; i < polMarkers.length; i++) {
      polMarkers[i].setMap(map);
    }
    $("#police").addClass("active");
  }
  function shelterSetup(map){
    for (var i = 0; i < sheMarkers.length; i++) {
      sheMarkers[i].setMap(map);
    }
    $("#shelter").addClass("active");
  }
  function ambulanceSetup(map){
    for (var AID in ambContent){
      ambMarkers[AID].setMap(map);
    }
    $("#ambulance").addClass("active");
  }


  function injuredSetup(map){
    for (var IID in injMarkers){
      injMarkers[IID].setMap(map);
    }
    $("#injured").addClass("active");
  }

  function disasterSetup(map){
    for (var DID in disMarkers){
      disMarkers[DID].setMap(map);
    }
    $("#disaster").addClass("active");
  }

  function suppliesSetup(map){
    for (var SID in supMarkers){
      supMarkers[SID].setMap(map);
    }
    $("#supplies").addClass("active");
  }
  function personSetup(map){
    for (var PID in perMarkers){
      thisMarker = perMarkers[PID];
      thisMarker.setMap(map);
    }
    $("#person").addClass("active");
  }


  function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer();
      var TaiWanmapOptions = {
          zoom: 8,
          center: new google.maps.LatLng(23.5413701, 120.9276791),
          'mapTypeId': google.maps.MapTypeId.ROADMAP
      };
      var TaipeimapOptions = {
          zoom: 15,
          center: new google.maps.LatLng(25.040678,121.518969),
          'mapTypeId': google.maps.MapTypeId.ROADMAP
      };
      var lolmapOptions = {
          zoom: 15,
          center: new google.maps.LatLng(25.033460, 121.565443),
          'mapTypeId': google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById('jumbotron'), lolmapOptions);
      directionsDisplay.setMap(map);
      if(!(typeof(MyMarker) == 'undefined' || MyMarker == null)){
        MyMarker.setMap(map);
        MyMarker.setAnimation(google.maps.Animation.BOUNCE);
      }
      if(!(typeof(MyAmbMarker) == 'undefined' || MyAmbMarker == null)){
        MyAmbMarker.setMap(map);
        MyAmbMarker.setAnimation(google.maps.Animation.BOUNCE);
      }
      InitMap(map);
  }

  function actionStatus(CallType){
    if(MapElems[CallType]){
      MapElems[CallType]=false;
        switch(CallType){
          case "hospital":
            hospitalRemove();break;
          case "police":
            policeRemove();break;
          case "shelter":
            shelterRemove();break;
          case "ambulance":
            ambulanceRemove();break;
          case "injured":
            injuredRemove();break;
          case "disaster":
            disasterRemove();break;
          case "supplies":
            suppliesRemove();break;
          case "person":
            personRemove();break;
        }
    }else{
      MapElems[CallType]=true;
        switch(CallType){
          case "hospital":
            hospitalSetup(map);break;
          case "police":
            policeSetup(map);break;
          case "shelter":
            shelterSetup(map);break;
          case "ambulance":
            ambulanceSetup(map);break;
          case "injured":
            injuredSetup(map);break;
          case "disaster":
            disasterSetup(map);break;
          case "supplies":
            suppliesSetup(map);break;
          case "person":
            personSetup(map);break;
        }
    }
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