<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

if ($_GET['SupID']) {
	if ($_conSQL->query("update SuppliesPoint set status='0' where pointID='" . $_GET['SupID'] . "' and status='1'")) {
		echo "OK";
	} else {
		echo "ERROR";
	}
} else {
	echo "ERROR";
	exit();
}
?>