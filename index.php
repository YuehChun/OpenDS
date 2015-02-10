
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>婉君護台灣</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">
	<!--link rel="stylesheet/less" href="less/bootstrap.less" type="text/css" /-->
	<!--link rel="stylesheet/less" href="less/responsive.less" type="text/css" /-->
	<!--script src="js/less-1.3.3.min.js"></script-->
	<!--append ‘#!watch’ to the browser URL, then refresh the page. -->

	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
  <![endif]-->

  <!-- Fav and touch icons -->
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/apple-touch-icon-144-precomposed.png">
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/apple-touch-icon-114-precomposed.png">
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/apple-touch-icon-72-precomposed.png">
  <link rel="apple-touch-icon-precomposed" href="img/apple-touch-icon-57-precomposed.png">
  <link rel="shortcut icon" href="img/favicon.png">
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/markerclusterer.js"></script>
  <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>


	<script type="text/javascript" src="js/SyncMap.js"></script>
	<script type="text/javascript" src="js/SysMap.js"></script>
    <script type="text/javascript">
        var d = new Date();
        var map;
        var SyncElems = {
            'hospital': false,
            'ambulance': false,
            'person': false
        }
        var hosMarkers = [], polMarkers = [], sheMarkers = [];
        var hosContent = {}, polContent = {}, sheContent = {};
        var MapElems = {
            'hospital': false,
            'police': false,
            'emergency': false,
            'shelter': false,
            'ambulance': false,
            'person': false
        }
        google.maps.event.addDomListener(window, 'load', initialize);
        MainPageTimeout();
    </script>
</head>


<body>
<div class="container">
	<div class="row clearfix">
		<div class="col-md-12 column">
			<nav class="navbar navbar-default" role="navigation">
				<div class="navbar-header">
					 <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button> <a class="navbar-brand" href="#">NCHU-DMLab</a>
				</div>
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav navbar-right">
						<li class="dropdown">
							 <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown<strong class="caret"></strong></a>
							<ul class="dropdown-menu">
								<li>
							        <a href="#">Ambulance Page</a>
								</li>
								<li>
							        <a href="#">Person Page</a>
								</li>
								<li>
							        <a href="#">Hospital Page</a>
								</li>
								<li class="divider"></li>
								<li>
									<a href="#">Main Page</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>

			</nav>
        </div>
    </div>
	<div class="row clearfix">
		<div class="col-md-12 column">
		    <div class="col-md-10 column">
			    <div class="jumbotron" id="jumbotron" style="height: 650px"></div>
		    </div>
		    <div class="col-md-2 column">
                <div class="btn-group btn-group-vertical btn-group-lg" id="buttonGroup">
                     <button class="btn btn-default" type="button" id="hospital" onclick="actionStatus('hospital');">
                         <img alt="醫院" src="img/icon/hospital.png" height="20"> Hospital
                     </button>
                     <button class="btn btn-default" type="button" id="police" onclick="actionStatus('police');">
                         <img alt="警察局" src="img/icon/Police.png" height="20"> Police
                     </button>
                     <button class="btn btn-default" type="button" id="shelter" onclick="actionStatus('shelter');">
                         <img alt="避難點" src="img/icon/shelter.png" height="20"> Shelter
                     </button>
                     <button class="btn btn-default" type="button" id="firefighting" onclick="actionStatus('firefighting');">
                         <img alt="消防局" src="img/icon/firefighting.png" height="20"> Fire Station
                     </button>
                     <button class="btn btn-default" type="button" id="ambulance" onclick="actionStatus('ambulance');">
                         <img alt="救護車" src="img/icon/Ambulance.png" height="20"> Ambulance
                     </button>
                     <button class="btn btn-default" type="button" id="person" onclick="actionStatus('person');">
                         <img alt="鄉民" src="img/icon/person.png" height="20"> Person
                     </button>
                </div>
	        </div>
            <div class="col-md-2 column">
                <h3 class="text-success">Last Updated</h3>
                <span class="label label-success">hospital</span>
                <p id="UpTime_hospital">2014-00-00 12:00:00</p>
                <span class="label label-success">ambulance</span>
                <p id="UpTime_ambulance">2014-00-00 12:00:00</p>
                <span class="label label-success">person</span>
                <p id="UpTime_person">2014-00-00 12:00:00</p>
	        </div>
	    </div>
    </div>
	<div class="row clearfix">
		<div class="col-md-12 column">
			<div class="btn-group ">
                <button type="button" class="btn btn-info btn-lg" onclick="SyncData('hospital');" id="synchospital">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true" id="glyhospital"></span>
                    Sync Hospital
                </button>
                <button type="button" class="btn btn-info btn-lg" onclick="SyncData('ambulance')" id="syncambulance">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true" id="glyambulance"></span>
                    Sync Ambulance
                </button>
                <button type="button" class="btn btn-info btn-lg" onclick="SyncData('person')" id="syncperson">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true" id="glyperson"></span>
                    Sync Person
                </button>
            </div>
        </div>
	</div>
</div>
</body>
</html>
