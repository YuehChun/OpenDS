<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

/*
鄉民建立一個傷患點。傷患點自動建立InjuredPeople ID
建立人是鄉民還是救護車？
 */
if ($_GET['Type'] == "Amb" && $_GET['AmbID'] && $_POST['InjID']) {
	$Injured_Name = is_null($_POST['Injured_Name']) ? "" : $_POST['Injured_Name'];
	$Injured_Phone = is_null($_POST['Injured_Phone']) ? "" : $_POST['Injured_Phone'];
	$Contact_Name = is_null($_POST['Contact_Name']) ? "" : $_POST['Contact_Name'];
	$Contact_Phone = is_null($_POST['Contact_Phone']) ? "" : $_POST['Contact_Phone'];
	$Injured_Sex = is_null($_POST['Injured_Sex']) ? "" : $_POST['Injured_Sex'];
	$injured_Area = is_null($_POST['injured_Area']) ? "" : $_POST['injured_Area'];
	$injured_Cause = is_null($_POST['injured_Cause']) ? "" : $_POST['injured_Cause'];
	$injured_Status = is_null($_POST['injured_Status']) ? "" : $_POST['injured_Status'];
	$StateLog = is_null($_POST['StateLog']) ? "" : $_POST['StateLog'];

	$InsertTime = date("Y-m-d H:i:s", time());
	$updateSQL = "update InjuredPeople set Name='" . $Injured_Name . "',sex='" . $Injured_Sex . "',phone='" . $Injured_Phone . "',contact='" . $Contact_Name . "',ContactPhone='" . $Contact_Phone . "' where InjuredPeopleID='" . $_POST['InjID'] . "'";
	$_conSQL->query($updateSQL);

	$updateLogSQL = "update InjuredReturnLog set injuredArea='" . $injured_Area . "',injuredStatus='" . $injured_Status . "',injuredCause='" . $injured_Cause . "',InjuryStateLog='" . $StateLog . "' where InjuredPeopleID='" . $_POST['InjID'] . "'";
	// echo $updateLogSQL;
	$_conSQL->query($updateLogSQL);
	$ReLog['state'] = "OK";
	$ReLog['time'] = date("Y-m-d H:i:s", time());
	echo json_encode($ReLog, JSON_UNESCAPED_UNICODE);
	exit();
} else {
	echo "error";
	exit();
}

?>