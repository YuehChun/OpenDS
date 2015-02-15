<?php
header("Access-Control-Allow-Origin: *");
include_once "../../../SQLinfo2.php";

$Days = is_null($_GET['Days']) ? 1 : $_GET['Days'];
$PerSons = $_conSQL->query("select UserID,lng,lat,convert(VARCHAR(24),datetime, 20) as time from UserInTimePoint where pointID in (select max(pointID) as pointID from UserInTimePoint where datetime > '" . date("Y-m-d H:i:s", time() - (86400 * $Days)) . "' group by UserID)")->fetchall(PDO::FETCH_ASSOC);
echo json_encode($PerSons, JSON_UNESCAPED_UNICODE);
?>