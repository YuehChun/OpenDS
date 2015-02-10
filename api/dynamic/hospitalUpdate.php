<?
    header("Access-Control-Allow-Origin: *");
    include_once("../../../SQLinfo2.php");
    if(preg_match('/^\d+$/',$_GET['HID'])){
        $HID = intval($_GET['HID']);
        $AHB = $_GET['AHB']?intval($_GET['AHB']):0;
        $THB = $_GET['THB']?intval($_GET['THB']):0;
        $ASR = $_GET['ASR']?intval($_GET['ASR']):0;
        $TSR = $_GET['TSR']?intval($_GET['TSR']):0;
        $CHECK = $_conSQL->query("select IDhospital from Emergency where IDhospital ='".$HID."'")->fetch(PDO::FETCH_ASSOC);
        if($CHECK['IDhospital'] != NULL){
            $UpdateString = "update Emergency set ";
            if(preg_match('/^\d+$/',$_GET['AHB'])){
                 $UpdateString .= " availableHospitalBed ='".$AHB."',";
            }
            if(preg_match('/^\d+$/',$_GET['THB'])){
                 $UpdateString .= " totalHospitalBed ='".$THB."',";
            }
            if(preg_match('/^\d+$/',$_GET['ASR'])){
                 $UpdateString .= " availableSurgeryRoom ='".$ASR."',";
            }
            if(preg_match('/^\d+$/',$_GET['TSR'])){
                 $UpdateString .= " totalSurgeryRoom ='".$TSR."',";
            }
            $UpdateString .= " datetime='".date("Y-m-d H:i:s", time())."' where IDhospital= '".$HID."'";
            if($_conSQL->query($UpdateString)){
               echo "OK, Be changed";
            }else{
               echo "ERROR";
            }
        }else{
            $InsertSQL = "insert into Emergency (IDhospital,availableHospitalBed,totalHospitalBed,availableSurgeryRoom,totalSurgeryRoom,datetime) values ('".$HID."','".$AHB."','".$THB."','".$ASR."','".$TSR."','".date("Y-m-d H:i:s", time())."')";
            if($_conSQL->query($InsertSQL)){
                echo "OK, Be changed";
            }else{
                echo "ERROR";
            }
        }
        //availableHospitalBed
        //totalHospitalBed
        //availableSurgeryRoom
        //totalSurgeryRoom
        //datetime


    }else{
        echo "error";
        exit();
    }

    // api version 1
    //print_r($_GET);
?>