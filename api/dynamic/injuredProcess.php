<?php
include_once "../../../SQLinfo2.php";
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
// echo "update InjuredPeople set states='2' where InjuredPeopleID='" . $_POST['InjID'] . "' and states='1' and AmbulanceID='" . $_POST['AmbID'] . "'";

if ($_POST['InjID'] && $_POST['status'] == '2') {
	if ($_conSQL->query("update InjuredPeople set status='2' where InjuredPeopleID='" . $_POST['InjID'] . "' and status='1' and AmbulanceID='" . $_POST['AmbID'] . "'")) {
		$ReLog['InjID'] = $_POST['InjID'];
		$ReLog['status'] = "OK";
	} else {
		$ReLog['status'] = "ERROR";
	}
	echo json_encode($ReLog, JSON_UNESCAPED_UNICODE);
} else if ($_POST['InjID'] && $_POST['status'] == '3') {
	if ($_conSQL->query("update InjuredPeople set status='3' where InjuredPeopleID='" . $_POST['InjID'] . "' and status='2' and AmbulanceID='" . $_POST['AmbID'] . "'")) {
		$ReLog['InjID'] = $_POST['InjID'];
		$ReLog['status'] = "Complete";
	} else {
		$ReLog['status'] = "ERROR";
	}
	echo json_encode($ReLog, JSON_UNESCAPED_UNICODE);
}
?>