<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

$SelectInfo = "R.InjuredPeopleID as InjID,R.datetime,I.name,I.sex,I.Contact,I.ContactPhone,I.status,R.injuredArea,R.injuredStatus,R.injuredCause ";
$Status1 = $_conSQL->query("select " . $SelectInfo . " from InjuredReturnLog as R left join InjuredPeople as I on R.InjuredPeopleID=I.InjuredPeopleID where I.status ='1'")->fetchall(PDO::FETCH_ASSOC);
$Status2 = $_conSQL->query("select " . $SelectInfo . " from InjuredReturnLog as R left join InjuredPeople as I on R.InjuredPeopleID=I.InjuredPeopleID where I.status ='2'")->fetchall(PDO::FETCH_ASSOC);
$Status3 = $_conSQL->query("select " . $SelectInfo . " from InjuredReturnLog as R left join InjuredPeople as I on R.InjuredPeopleID=I.InjuredPeopleID where I.status ='3'")->fetchall(PDO::FETCH_ASSOC);
$ReLog['Status1'] = $Status1;
$ReLog['Status2'] = $Status2;
$ReLog['Status3'] = $Status3;
foreach ($ReLog as $top => $topLevel) {
	foreach ($topLevel as $Key => $Value) {
		$Area = $Value['injuredArea'];
		$Area = str_replace("0", "頭", $Area);
		$Area = str_replace("1", "手", $Area);
		$Area = str_replace("2", "腳", $Area);
		$Area = str_replace("3", "胸", $Area);
		$ReLog[$top][$Key]['injuredArea'] = $Area;

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
		$ReLog[$top][$Key]['injuredStatus'] = $Status;

		$Cause = $Value['injuredCause'];
		$Cause = str_replace("0", "車禍", $Cause);
		$Cause = str_replace("1", "氣爆", $Cause);
		$Cause = str_replace("2", "溺水", $Cause);
		$Cause = str_replace("3", "跌倒", $Cause);
		$ReLog[$top][$Key]['injuredCause'] = $Cause;

		$ReLog[$top][$Key]['sex'] = is_null($Value['sex']) ? "未知" : ($Value['sex'] == 1) ? "男" : "女";
		$ReLog[$top][$Key]['name'] = $Value['name'] == "" ? "未知" : $Value['name'];
		$ReLog[$top][$Key]['Contact'] = $Value['Contact'] == "" ? "未知" : $Value['Contact'];
		$ReLog[$top][$Key]['ContactPhone'] = $Value['ContactPhone'] == "" ? "未知" : $Value['ContactPhone'];
		$ReLog[$top][$Key]['time'] = substr($Value['datetime'], 0, -4);

		switch ($Value['status']) {
			case '1':$ReLog[$top][$Key]['status'] = "等待救護車中";
				break;
			case '2':$ReLog[$top][$Key]['status'] = "送醫途中";
				break;
			case '3':$ReLog[$top][$Key]['status'] = "已送達醫院";
				break;
		}
	}
}
echo json_encode($ReLog, JSON_UNESCAPED_UNICODE);
exit();

?>