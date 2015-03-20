<?php
include_once "../../../SQLinfo2.php";
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
if (preg_match('/^\d+$/', $_GET['HID'])) {
	// valid input.
	// echo "<div>hello World!! ".$_GET['HID']."</div>";
	$QuerySQL = "select DB.name as name,DB.ID as HID,EM.availableHospitalBed as AHB,EM.totalHospitalBed as THB,EM.availableSurgeryRoom as ASR,EM.totalSurgeryRoom as TSR,EM.datetime as time from DBhospital as DB left join Emergency as EM on DB.ID=EM.IDhospital where DB.ID ='" . intval($_GET['HID']) . "'";
	$getDataArr = $_conSQL->query($QuerySQL)->fetch(PDO::FETCH_ASSOC);
	if (is_null($getDataArr['AHB'])) {
		$getDataArr['AHB'] = 0;
		$getDataArr['ASR'] = 0;
		$getDataArr['THB'] = 1;
		$getDataArr['TSR'] = 1;
		$getDataArr['time'] = 0;
	} else {
		$getDataArr['time'] = substr($getDataArr['time'], 0, -4);
	}
	echo json_encode($getDataArr, JSON_UNESCAPED_UNICODE);
} else {
	echo "404";
	exit();
}
?>