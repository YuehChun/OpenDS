        var hosMarkers = [], polMarkers = [], sheMarkers = [],ambMarkers = [],perMarkers = [],injMarkers = [],disMarkers = [],supMarkers = [];
        var hosContent = {}, polContent = {}, sheContent = {},ambContent = {},perContent = {},injContent = {},disContent = {},supContent = {};
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
          url: 'http://opends.azurewebsites.net/img/icon/hospital.png',
          size: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 32)
        };
        var policeImg = {
          url: 'http://opends.azurewebsites.net/img/icon/Police.png',
          size: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 32)
        };
        var shelterImg = {
          url: 'http://opends.azurewebsites.net/img/icon/shelter.png',
          size: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 32)
        };
        var ambulanceImg = {
          url: 'http://opends.azurewebsites.net/img/icon/Ambulance.png',
          size: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 32)
        };
        var personImg = {
          url: 'http://opends.azurewebsites.net/img/icon/person.png',
          size: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 32)
        };
        var injuredImg = {
          url: 'http://opends.azurewebsites.net/img/icon/injured.png',
          size: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 32)
        };
        var disasterImg = {
          url: 'http://opends.azurewebsites.net/img/icon/disaster.png',
          size: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 32)
        };
        var suppliesImg = {
          url: 'http://opends.azurewebsites.net/img/icon/supplies.png',
          size: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 32)
        };
        var myambulanceImg = {
          url: 'http://opends.azurewebsites.net/img/icon/myambulance.png',
          size: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 32)
        };
        var mymarkerImg = {
          url: 'http://opends.azurewebsites.net/img/icon/mymarker.png',
          size: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 32)
        };



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
          for (var i = 0; i < ambMarkers.length; i++) {
            ambMarkers[i].setMap(null);
          }
          $("#ambulance").removeClass("active");
        }
        function injuredRemove(){
          for (var i = 0; i < injMarkers.length; i++) {
            injMarkers[i].setMap(null);
          }
          $("#injured").removeClass("active");
        }
        function disasterRemove(){
          for (var i = 0; i < disMarkers.length; i++) {
            disMarkers[i].setMap(null);
          }
          $("#disaster").removeClass("active");
        }
        function suppliesRemove(){
          for (var i = 0; i < supMarkers.length; i++) {
            supMarkers[i].setMap(null);
          }
          $("#supplies").removeClass("active");
        }






        function hospitalMarkers(map) {
          $.get("http://opends.azurewebsites.net/api/static/hospital.php", function (data) {
              var HosJSON = JSON.parse(data);
              $.each(HosJSON, function (i, val) {
                  var marker = new google.maps.Marker({
                      'position': new google.maps.LatLng(val.lat, val.lng),
                      'icon': hospitalImg,
                      'title': val.name + "," + val.ID
                  });
                  hosMarkers.push(marker);
                  hosContent[val.ID]= '';
              });
              hospitalStatus();
          });
        }
        function policeMarkers(map) {
          $.get("http://opends.azurewebsites.net/api/static/police.php", function (data) {
              var HosJSON = JSON.parse(data);
              $.each(HosJSON, function (i, val) {
                  var marker = new google.maps.Marker({
                      'position': new google.maps.LatLng(val.lat, val.lng),
                      'icon': policeImg,
                      'title': val.name + "," + val.ID
                  });
                  polMarkers.push(marker);
                  polContent[val.ID]= 
                '<div class="container" style="padding-left: 1px;max-width: 250px;">' +
                    '<h5 class="text-info text-center">' + val.name +
                    '</h5>' +
                '</div>';
              });
          });
        }
        
        function shelterMarkers(map) {
          $.get("http://opends.azurewebsites.net/api/static/shelter.php", function (data) {
              var SheJSON = JSON.parse(data);
              $.each(SheJSON, function (i, val) {
                  var marker = new google.maps.Marker({
                      'position': new google.maps.LatLng(val.lat, val.lng),
                      'icon': shelterImg,
                      'title': val.name + "," + val.ID
                  });
                  sheMarkers.push(marker);
                  sheContent[val.ID]= 
                '<div class="container" style="padding-left: 1px;max-width: 250px;">' +
                    '<h5 class="text-info text-center">' + val.name +
                    '</h5>' +
                '</div>';
              });
          });
        }
        function ambulancebMarkers(map) {
          $.get("http://opends.azurewebsites.net/api/dynamic/ambulanceSync.php?Days=20", function (data) {
              var AmbJSON = JSON.parse(data);
              $.each(AmbJSON, function (i, val) {
                  var marker = new google.maps.Marker({
                      'position': new google.maps.LatLng(val.lat, val.lng),
                      'icon': ambulanceImg,
                      'title': val.AmbulanceID+","+val.IP
                  });
                  ambMarkers.push(marker);
                  ambContent[val.AmbulanceID]= 
                '<div class="container" style="padding-left: 1px;max-width: 250px;">' +
                    '<h5 class="text-info text-center">' + val.AmbulanceID+","+val.IP +
                    '</h5>' +
                '</div>';
              });
          });
        }
        function injuredMarkers(map) {
          $.get("http://opends.azurewebsites.net/api/dynamic/injured.php", function (data) {
              var InjJSON = JSON.parse(data);
              $.each(InjJSON, function (i, val) {
                  var marker = new google.maps.Marker({
                      'position': new google.maps.LatLng(val.lat, val.lng),
                      'icon': shelterImg,
                      'title': val.name + "," + val.ID
                  });
                  sheMarkers.push(marker);
                  sheContent[val.ID]= 
                '<div class="container" style="padding-left: 1px;max-width: 250px;">' +
                    '<h5 class="text-info text-center">' + val.name +
                    '</h5>' +
                '</div>';
              });
          });
        }
        function disasterMarkers(map) {
          $.get("http://opends.azurewebsites.net/api/dynamic/disaster.php", function (data) {
              var SheJSON = JSON.parse(data);
              $.each(SheJSON, function (i, val) {
                  var marker = new google.maps.Marker({
                      'position': new google.maps.LatLng(val.lat, val.lng),
                      'icon': shelterImg,
                      'title': val.name + "," + val.ID
                  });
                  sheMarkers.push(marker);
                  sheContent[val.ID]= 
                '<div class="container" style="padding-left: 1px;max-width: 250px;">' +
                    '<h5 class="text-info text-center">' + val.name +
                    '</h5>' +
                '</div>';
              });
          });
        }
        function suppliesMarkers(map) {
          $.get("http://opends.azurewebsites.net/api/dynamic/supplies.php", function (data) {
              var SheJSON = JSON.parse(data);
              $.each(SheJSON, function (i, val) {
                  var marker = new google.maps.Marker({
                      'position': new google.maps.LatLng(val.lat, val.lng),
                      'icon': shelterImg,
                      'title': val.name + "," + val.ID
                  });
                  sheMarkers.push(marker);
                  sheContent[val.ID]= 
                '<div class="container" style="padding-left: 1px;max-width: 250px;">' +
                    '<h5 class="text-info text-center">' + val.name +
                    '</h5>' +
                '</div>';
              });
          });
        }






        function hospitalSetup(map){
          for (var i = 0; i < hosMarkers.length; i++) {
            IiMarker = hosMarkers[i];
            IiMarker.setMap(map);
            google.maps.event.addListener(IiMarker, 'click', function () {
                titleArr = this.title.split(",");
                HTMLDoc = titleArr[1];
                var infowindow = new google.maps.InfoWindow({ content: hosContent[HTMLDoc] });
                infowindow.open(map, this);
            });
          }
          $("#hospital").addClass("active");
        }
        function policeSetup(map){
          for (var i = 0; i < polMarkers.length; i++) {
            IiMarker = polMarkers[i];
            IiMarker.setMap(map);
            google.maps.event.addListener(IiMarker, 'click', function () {
                titleArr = this.title.split(",");
                HTMLDoc = titleArr[1];
                var infowindow = new google.maps.InfoWindow({ content: polContent[HTMLDoc] });
                infowindow.open(map, this);
            });
          }
          $("#police").addClass("active");
        }
        function shelterSetup(map){
          for (var i = 0; i < sheMarkers.length; i++) {
            IiMarker = sheMarkers[i];
            IiMarker.setMap(map);
            google.maps.event.addListener(IiMarker, 'click', function () {
                titleArr = this.title.split(",");
                HTMLDoc = titleArr[1];
                var infowindow = new google.maps.InfoWindow({ content: sheContent[HTMLDoc] });
                infowindow.open(map, this);
            });
          }
          $("#shelter").addClass("active");
        }
        function ambulanceSetup(map){
          for (var i = 0; i < ambMarkers.length; i++) {
            IiMarker = ambMarkers[i];
            IiMarker.setMap(map);
            google.maps.event.addListener(IiMarker, 'click', function () {
                titleArr = this.title.split(",");
                HTMLDoc = titleArr[0];
                var infowindow = new google.maps.InfoWindow({ content: ambContent[HTMLDoc] });
                infowindow.open(map, this);
            });
          }
          $("#ambulance").addClass("active");
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
            map = new google.maps.Map(document.getElementById('jumbotron'), TaipeimapOptions);
            directionsDisplay.setMap(map);
            InitMap(map);

            /*
            hospitalsMarkers(map);
            policeMarkers(map);
            ambulanceMarkers(map);
            */

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
                  disasterSetup();break;
                case "supplies":
                  suppliesSetup();break;
                case "person":
                  personSetup();break;
              }
          }
        }
        function InitMap(map){
          ambulancebMarkers(map);
          hospitalMarkers(map);
          policeMarkers(map);
          shelterMarkers(map);
          injuredMarkers(map);
          // disasterMarkers(map);
          // suppliesMarkers(map);
        }