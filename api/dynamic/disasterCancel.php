<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

if ($_GET['DisID']) {
	if ($_conSQL->query("update MapDestruction set status='0' where ID='" . $_GET['DisID'] . "' and status='1'")) {
		echo "OK";
	} else {
		echo "ERROR";
	}
} else {
	echo "ERROR";
	exit();
}
?>