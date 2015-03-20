<?php
header("Access-Control-Allow-Origin: *");
include_once "../SQLinfo2.php";

/*
25.035910, 121.561999
25.030554, 121.569606
lat = 25 , lng = 121


25.037660, 121.557547
25.028590, 121.578908
 */
if (isset($_GET['all'])) {
	if ($_GET['all'] == "Injured") {
		$_conSQL->query("delete from InjuredReturnLog");
		$_conSQL->query("delete from InjuredPeople");
	} elseif ($_GET['all'] == "Disaster") {
		$_conSQL->query("delete from MapDestruction");
	} elseif ($_GET['all'] == "Supplies") {
		$_conSQL->query("delete from SuppliesPoint");
	} elseif ($_GET['all'] == "Ambulance") {
		$_conSQL->query("delete from Ambulance");
		$_conSQL->query("delete from AmbulanceInTimePoint");
	} elseif ($_GET['all'] == "Person") {
		$_conSQL->query("delete from UserLog");
		$_conSQL->query("delete from UserInTimePoint");
	}
	$Output['state'] = "OK";
}

if (isset($_GET['Type']) && $_GET['PerID'] == "1") {
	if ($_GET['Type'] == "Injured") {
		$FirstLevel = $_conSQL->query("delete from InjuredReturnLog output DELETED.InjuredPeopleID where RescuersID = '1' and RescuersClass='0'")->fetchall(PDO::FETCH_ASSOC);
		foreach ($FirstLevel as $Key => $Value) {
			$_conSQL->query("delete from InjuredPeople where InjuredPeopleID='" . $Value['InjuredPeopleID'] . "'");
		}
		$Output['state'] = "OK";
	} elseif ($_GET['Type'] == "Disaster") {
		$_conSQL->query("delete from MapDestruction where UserID = '1'");
		$Output['state'] = "OK";
	} elseif ($_GET['Type'] == "Supplies") {
		$_conSQL->query("delete from SuppliesPoint where UserID = '1'");
		$Output['state'] = "OK";
	} elseif ($_GET['Type'] == "Person") {

	}
}

if (isset($_GET['GET']) && $_GET['N']) {
	if ($_GET['GET'] == "Disaster") {
		$MaxNumber = $_GET['N'];
		for ($i = 0; $i < $MaxNumber; $i++) {
			$tempDis = getLocation();
			$Co = rand(0, count($FirstName));
			$tempDis['Scope'] = rand(0, 4);
			$tempDis['RoadStatus'] = CreateString(3);
			$tempDis['CarPass'] = rand(0, 1);
			$Output[$i] = $tempDis;
		}
	} elseif ($_GET['GET'] == "Supplies") {
		$MaxNumber = $_GET['N'];
		for ($i = 0; $i < $MaxNumber; $i++) {
			$tempSup = getLocation();
			$Co = rand(0, count($FirstName));
			$tempSup['PersonNumber'] = rand(1, 5);
			$tempSup['Items'] = CreateString(4);
			$Output[$i] = $tempSup;
		}
	} elseif ($_GET['GET'] == "Injured") {
		$MaxNumber = $_GET['N'];
		$FirstName = array("趙", "錢", "孫", "李", "周", "吳", "王", "馮", "陳", "蔣", "沈", "韓", "楊",
			"朱", "秦", "尤", "許", "何", "呂", "施", "張", "孔", "曹", "嚴", "華", "金", "魏", "陶", "姜",
			"戚", "謝", "鄒", "喻", "水", "竇", "章", "雲", "蘇", "潘", "葛", "奚", "范", "彭", "郎",
			"魯", "韋", "昌", "馬", "花", "方", "俞", "任", "袁", "柳", "鮑", "史", "唐",
			"費", "廉", "岑", "薛", "雷", "賀", "倪", "湯", "殷", "羅", "畢", "郝", "安",
			"樂", "于", "時", "傅", "齊", "康", "伍", "余", "元", "卜", "顧", "孟", "平", "黃",
			"和", "穆", "蕭", "尹", "姚", "邵", "湛", "汪", "祁", "毛", "禹", "狄", "米", "貝", "明", "臧",
			"計", "伏", "成", "戴", "談", "宋", "茅", "龐", "熊", "紀", "舒", "屈", "項", "祝", "董", "梁",
			"杜", "阮", "藍", "閔", "席", "季", "麻", "強", "賈", "路", "婁", "危", "江", "童", "顏", "郭",
			"梅", "盛", "林", "刁", "鍾", "徐", "丘", "駱", "高", "夏", "蔡", "田", "樊", "胡", "凌", "霍",
			"虞", "萬", "支", "柯", "昝", "管", "盧", "莫", "經", "房", "裘", "繆", "干", "解", "應", "宗",
			"丁", "宣", "賁", "鄧", "郁", "單", "杭", "洪", "包", "諸", "左", "石", "崔", "吉", "鈕", "龔",
			"程", "嵇", "邢", "滑", "裴", "陸", "榮", "翁", "荀", "羊", "於", "惠", "甄", "麴", "家", "封",
			"芮", "羿", "儲", "靳", "汲", "邴", "糜", "松", "井", "段", "富", "巫", "烏", "焦", "巴", "弓",
			"牧", "隗", "山", "谷", "車", "侯", "宓", "蓬", "全", "郗", "班", "仰", "秋", "仲", "伊", "宮",
			"甯", "仇", "欒", "暴", "甘", "鈄", "厲", "戎", "祖", "武", "符", "劉", "景", "詹", "束", "龍",
			"葉", "幸", "司", "韶", "郜", "黎", "薊", "薄", "印", "宿", "白", "懷", "蒲", "邰", "從", "鄂",
			"索", "咸", "籍", "賴", "卓", "藺", "屠", "蒙", "池", "喬", "陰", "鬱", "胥", "能", "蒼", "雙",
			"聞", "莘", "黨", "翟", "譚", "貢", "勞", "逄", "姬", "申", "扶", "堵", "冉", "宰", "酈", "雍",
			"郤", "璩", "桑", "桂", "濮", "牛", "壽", "通", "邊", "扈", "燕", "冀", "郟", "浦", "尚", "農",
			"溫", "別", "莊", "晏", "柴", "瞿", "閻", "充", "慕", "連", "茹", "習", "宦", "艾", "魚", "容",
			"向", "古", "易", "慎", "戈", "廖", "庾", "終", "暨", "居", "衡", "步", "都", "耿", "滿", "弘",
			"匡", "國", "文", "寇", "廣", "祿", "闕", "東", "歐", "殳", "沃", "利", "蔚", "越", "夔", "隆",
			"師", "鞏", "厙", "聶", "晁", "勾", "敖", "融", "冷", "訾", "辛", "闞", "那", "簡", "饒", "空",
			"曾", "毋", "沙", "乜", "養", "鞠", "須", "豐", "巢", "關", "蒯", "相", "查", "后", "荊", "紅",
			"游", "竺", "權", "逯", "蓋", "益", "桓", "公", "万", "俟", "司", "馬", "上", "官", "歐", "陽",
			"夏", "侯", "諸", "葛", "聞", "人", "東", "方", "赫", "連", "皇", "甫", "尉", "遲", "公", "羊",
			"澹", "臺", "公", "冶", "宗", "政", "濮", "陽", "淳", "于", "單", "于", "太", "叔", "申", "屠",
			"公", "孫", "仲", "孫", "軒", "轅", "令", "狐", "鍾", "離", "宇", "文", "長", "孫", "慕", "容",
			"鮮", "于", "閭", "丘", "司", "徒", "司", "空", "亓", "官", "司", "寇", "仉", "督", "子", "車",
			"顓", "孫", "端", "木", "巫", "馬", "公", "西", "漆", "雕", "樂", "正", "壤", "駟", "公", "良",
			"拓", "跋", "夾", "谷", "宰", "父", "穀", "梁", "晉", "楚", "閆", "法", "汝", "鄢", "涂", "欽",
			"段", "干", "百", "里", "東", "郭", "南", "門", "呼", "延", "歸", "海", "羊", "舌", "微", "生",
			"岳", "帥", "緱", "亢", "況", "後", "有", "琴", "梁", "丘", "左", "丘", "東", "門", "西", "門",
			"商", "牟", "佘", "佴", "伯", "賞", "南", "宮", "墨", "哈", "譙", "笪", "年", "愛", "陽", "佟");
		for ($i = 0; $i < $MaxNumber; $i++) {
			$tempInj = getLocation();
			$Co = rand(0, count($FirstName));
			$tempInj['Injured_Name'] = $FirstName[$Co] . "小明";
			$tempInj['Contact_Name'] = $FirstName[$Co] . "爸爸";
			$tempInj['Contact_Phone'] = "0987" . rand(0, 999999);
			$tempInj['Injured_Sex'] = rand(0, 1);
			$tempInj['injuredArea'] = CreateString(3);
			$tempInj['injuredCause'] = CreateString(4);
			$tempInj['injuredStatus'] = CreateString(9);
			$Output["$i"] = $tempInj;
		}
	} elseif ($_GET['GET'] == "Ambulance") {
		$MaxNumber = $_GET['N'];
		for ($i = 0; $i < $MaxNumber; $i++) {
			$tempInj = getLocation2();
			$tempInj['IP'] = "1.2.3." . $i;
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_URL, "http://opends2.azurewebsites.net/api/dynamic/AmbulanceInit.php?IP=" . $tempInj['IP']);
			$Cont = curl_exec($ch);
			curl_close($ch);
			$temp = json_decode($Cont, true);
			$tempInj["AmbID"] = $temp['AmbulanceID'];
			$tempInj["InjID"] = "0";
			$tempInj["S"] = "0";

			// echo "http://opends2.azurewebsites.net/api/dynamic/AmbulancePoint.php?AmbID=" . $tempInj["AmbID"] . "&IP=" . $tempInj['IP'] . "&lat=" . $tempInj['lat'] . "&lng=" . $tempInj['lng'];
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_URL, "http://opends2.azurewebsites.net/api/dynamic/AmbulancePoint.php?AmbID=" . $tempInj["AmbID"] . "&IP=" . $tempInj['IP'] . "&lat=" . $tempInj['lat'] . "&lng=" . $tempInj['lng']);
			$Cont = curl_exec($ch);
			curl_close($ch);
			$Output["$i"] = $tempInj;
		}
	} elseif ($_GET['GET'] == "Person") {
		$MaxNumber = $_GET['N'];
		for ($i = 1; $i < $MaxNumber + 1; $i++) {
			$tempInj = getLocation3();
			$j = floor($i / 254);
			$k = $i % 254;
			$tempInj['IP'] = "2.2." . $j . "." . $k;
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_URL, "http://opends2.azurewebsites.net/api/dynamic/PersonInit.php?IP=" . $tempInj['IP']);
			$Cont = curl_exec($ch);
			curl_close($ch);
			$temp = json_decode($Cont, true);
			$tempInj["PerID"] = $temp['ID'];

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_URL, "http://opends2.azurewebsites.net/api/dynamic/PersonPoint.php?PerID=" . $tempInj["PerID"] . "&IP=" . $tempInj['IP'] . "&lat=" . $tempInj['lat'] . "&lng=" . $tempInj['lng']);
			$Cont = curl_exec($ch);
			curl_close($ch);
			$Output["$i"] = $tempInj;
		}
	}
}
echo json_encode($Output, JSON_UNESCAPED_UNICODE);

/*

function

 */
function getLocation() {
	$local['lng'] = rand(121557547, 121569606) / 1000000;
	$local['lat'] = rand(25030554, 25035910) / 1000000;
	return $local;
}

function getLocation2() {
	$local['lng'] = rand(121561999, 121578908) / 1000000;
	$local['lat'] = rand(25028590, 25037660) / 1000000;
	return $local;
}
function getLocation3() {
	$local['lng'] = rand(121509471, 121577277) / 1000000;
	$local['lat'] = rand(25029562, 25076216) / 1000000;
	return $local;
}

function CreateString($End) {
	$S = "";
	for ($i = 0; $i <= $End; $i++) {
		if (rand(0, 1) == 1) {
			$S .= $i . ":";
		}
	}
	return $S;
}

?>