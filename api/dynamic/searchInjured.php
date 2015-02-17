<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

if ($_POST['PostKey'] != "") {
	$KeyWord = $_POST['PostKey'];
	$SearchKey = "I.name like '%" . $KeyWord . "%' or I.status like '%" . $KeyWord . "%' or I.phone like '%" . $KeyWord . "%'";
	$SelectInfo = "I.InjuredPeopleID,R.datetime,I.name,I.sex,I.Contact,I.ContactPhone,I.status,R.injuredArea,R.injuredStatus,R.injuredCause ";
	$SeArr = $_conSQL->query("select " . $SelectInfo . " from InjuredPeople as I left join InjuredReturnLog as R on I.InjuredPeopleID=R.InjuredPeopleID where (" . $SearchKey . ") and (I.status='1' or I.status='2' or I.status='3')")->fetchall(PDO::FETCH_ASSOC);
	foreach ($SeArr as $Key => $Value) {
		$Area = $Value['injuredArea'];
		$Area = str_replace("0", "頭", $Area);
		$Area = str_replace("1", "手", $Area);
		$Area = str_replace("2", "腳", $Area);
		$Area = str_replace("3", "胸", $Area);
		$ReLog[$Key]['injuredArea'] = $Area;

		$Status = $Value['injuredStatus'];
		$Status = str_replace("0", "骨折", $Status);
		$Status = str_replace("1", "出血嚴重", $Status);
		$Status = str_replace("2", "燒燙傷", $Status);
		$Status = str_replace("3", "凍傷", $Status);
		$Status = str_replace("4", "化學傷", $Status);
		$Status = str_replace("5", "切割傷", $Status);
		$Status = str_replace("6", "撕裂傷", $Status);
		$Status = str_replace("7", "穿刺傷", $Status);
		$Status = str_replace("8", "斷裂傷", $Status);
		$Status = str_replace("9", "挫傷", $Status);
		$ReLog[$Key]['injuredStatus'] = $Status;

		$Cause = $Value['injuredCause'];
		$Cause = str_replace("0", "車禍", $Cause);
		$Cause = str_replace("1", "氣爆", $Cause);
		$Cause = str_replace("2", "溺水", $Cause);
		$Cause = str_replace("3", "跌倒", $Cause);
		$ReLog[$Key]['injuredCause'] = $Cause;

		$ReLog[$Key]['sex'] = is_null($Value['sex']) ? "未知" : ($Value['sex'] == 1) ? "男" : "女";
		$ReLog[$Key]['name'] = $Value['name'] == "" ? "未知" : $Value['name'];
		$ReLog[$Key]['Contact'] = $Value['Contact'] == "" ? "未知" : $Value['Contact'];
		$ReLog[$Key]['ContactPhone'] = $Value['ContactPhone'] == "" ? "未知" : $Value['ContactPhone'];
		$ReLog[$Key]['time'] = substr($Value['datetime'], 0, -4);
		$ReLog[$Key]['InjID'] = $Value['InjuredPeopleID'];

		switch ($Value['status']) {
			case '1':$ReLog[$Key]['status'] = "等待救護車中";
				break;
			case '2':$ReLog[$Key]['status'] = "送醫途中";
				break;
			case '3':$ReLog[$Key]['status'] = "已送達醫院";
				break;
		}

	}
	echo json_encode($ReLog, JSON_UNESCAPED_UNICODE);
	exit();
}
?>