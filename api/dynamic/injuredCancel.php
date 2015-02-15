<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

if ($_GET['injID']) {
	if ($_conSQL->query("update InjuredPeople set status='4' where InjuredPeopleID='" . $_GET['injID'] . "' and status='1'")) {
		echo "OK";
	} else {
		echo "ERROR";
	}
} else {
	echo "ERROR";
	exit();
}
?>