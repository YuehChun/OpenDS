<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

/*
鄉民建立一個傷患點。傷患點自動建立InjuredPeople ID
建立人是鄉民還是救護車？
 */
if ($_GET['Type']) {
	if ($_GET['Type'] == 'Amb' && preg_match('/^\d+$/', $_GET['AmbID'])) {
		$RescuersID = intval($_GET['AmbID']);
		$AmbID = $RescuersID;
		$RescuersClass = 1;
	} else if ($_GET['Type'] == 'Per' && preg_match('/^\d+$/', $_GET['PerID'])) {
		$RescuersID = intval($_GET['PerID']);
		$AmbID = 0;
		$RescuersClass = 0;
	}
	$tIP = $_GET['IP'];
	$lat = $_GET['lat'];
	$lng = $_GET['lng'];
	$preHospi = $_conSQL->prepare("select H.ID,H.name,EM.availableSurgeryRoom,EM.availableHospitalBed from DBhospital as H left join Emergency as EM on H.ID=EM.IDhospital where EM.availableSurgeryRoom >0 and EM.availableHospitalBed >0  and (H.lng between :Lng1 and :Lng2) and (H.lat between :Lat1 and :Lat2) order by EM.availableSurgeryRoom,EM.availableHospitalBed");

	$Injured_Name = is_null($_POST['Injured_Name']) ? "" : $_POST['Injured_Name'];
	$Injured_Phone = is_null($_POST['Injured_Phone']) ? "" : $_POST['Injured_Phone'];
	$Contact_Name = is_null($_POST['Contact_Name']) ? "" : $_POST['Contact_Name'];
	$Contact_Phone = is_null($_POST['Contact_Phone']) ? "" : $_POST['Contact_Phone'];
	$Injured_Sex = is_null($_POST['Injured_Sex']) ? "" : $_POST['Injured_Sex'];
	$injured_Area = is_null($_POST['injured_area']) ? "" : $_POST['injured_area'];
	$injured_Cause = is_null($_POST['injured_Cause']) ? "" : $_POST['injured_Cause'];
	$injured_Status = is_null($_POST['injured_Status']) ? "" : $_POST['injured_Status'];
	$StateLog = is_null($_POST['StateLog']) ? "" : $_POST['StateLog'];

	// print_r($_POST);
	$InsertTime = date("Y-m-d H:i:s", time());
	//尋找最近的醫院 GetHospital

	//先算醫院的距離
	$i = 1;
	$Hospital = "";
	while (!is_array($Hospital[0])) {
		$dist = $i * (0.005);
		$i++;
		$preHospi2 = $preHospi;
		$preHospi2->execute(array(':Lng1' => ($lng - $dist), ':Lng2' => ($lng + $dist), ':Lat1' => ($lat - $dist), ':Lat2' => ($lat + $dist)));
		$Hospital = $preHospi2->fetchall(PDO::FETCH_ASSOC);
		if ($i > 100) {
			exit("ERROR");
		}
	}
	$toHospital = $Hospital[0];
	//Update Hospital Room
	$HospitalUpdate = "update Emergency set availableSurgeryRoom='" . ($toHospital['availableSurgeryRoom'] - 1) . "',availableHospitalBed='" . ($toHospital['availableHospitalBed'] - 1) . "' where IDhospital='" . $toHospital['ID'] . "'";
	$_conSQL->query($HospitalUpdate);
	$InsertSQL = "insert into InjuredPeople (Name,sex,phone,contact,ContactPhone,AmbulanceID,status) OUTPUT INSERTED.InjuredPeopleID values ('" . $Injured_Name . "','" . $Injured_Sex . "','" . $Injured_Phone . "','" . $Contact_Name . "','" . $Contact_Phone . "','" . $AmbID . "','1')";
	$injured = $_conSQL->query($InsertSQL)->fetch(PDO::FETCH_ASSOC);
	// $injured['InjuredPeopleID'] = 1;

	$InsertSQL = "insert into InjuredReturnLog (InjuredPeopleID,RescuersClass,RescuersID,toHospitalID,IP,lng,lat,datetime,injuredArea,injuredStatus,injuredCause,InjuryStateLog) values ('" . $injured['InjuredPeopleID'] . "','" . $RescuersClass . "','" . $RescuersID . "','" . $toHospital['ID'] . "','" . $tIP . "','" . $lng . "','" . $lat . "','" . $InsertTime . "','" . $injured_Area . "','" . $injured_Status . "','" . $injured_Cause . "','" . $StateLog . "')";
	$_conSQL->query($InsertSQL);
	$LogSQL = "select R.InjuredPeopleID as InjID,R.lat,R.lng,R.datetime as time,I.name as IName,I.sex,I.Contact,I.status from InjuredReturnLog as R left join InjuredPeople as I on R.InjuredPeopleID=I.InjuredPeopleID where I.InjuredPeopleID='" . $injured['InjuredPeopleID'] . "'";
	$Log = $_conSQL->query($LogSQL)->fetch(PDO::FETCH_ASSOC);
	$Log['HospitalName'] = $toHospital['name'];
	$Log['InjuredID'] = $injured['InjuredPeopleID'];
	$aa = $_conSQL->query("select * from InjuredReturnLog where InjuredPeopleID= '" . $Log['InjuredID'] . "'")->fetch(PDO::FETCH_ASSOC);
	// print_r($aa);
	echo json_encode($Log, JSON_UNESCAPED_UNICODE);
} else {
	echo "error";
	exit();
}

?>