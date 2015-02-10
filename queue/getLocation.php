<?php
     include_once("../../SQLinfo2.php");


     $UpdateString ="";
     // hospital
     $hospitals=$_conSQL->query("select * from DBhospital where (lat is null or lng is null)")->fetchall(PDO::FETCH_ASSOC);
     foreach($hospitals as $Key => $hospital){
         if($hospital['lat']=='' || $hospital['lng']==''){
             $L = GetLocation($hospital['address']);
             $UpdateString +="update DBhospital set lat='".$L['lat']."',lng='".$L['lng']."' where ID='".$hospital['ID']."';";
         }
     }

     // police
     $polices=$_conSQL->query("select * from DBpolice where (lat is null or lng is null)")->fetchall(PDO::FETCH_ASSOC);
     foreach($polices as $Key => $police){
         if($police['lat']=='' || $police['lng']==''){
             $L = GetLocation($police['address']);
             $UpdateString +="update DBpolice set lat='".$L['lat']."',lng='".$L['lng']."' where ID='".$police['ID']."';";
         }
     }
     
     // shelter
     $shelters=$_conSQL->query("select * from DBshelters where (lat is null or lng is null)")->fetchall(PDO::FETCH_ASSOC);
     foreach($shelters as $Key => $shelter){
         if($shelter['lat']=='' || $shelter['lng']==''){
             $L = GetLocation($shelter['address']);
             $UpdateString +="update DBshelters set lat='".$L['lat']."',lng='".$L['lng']."' where ID='".$shelter['ID']."';";
         }
     }
     $_conSQL->query($UpdateString);

     // firefighting
     $firefightings=$_conSQL->query("select * from DBFirefighting where (lat is null or lng is null)")->fetchall(PDO::FETCH_ASSOC);
     foreach($firefightings as $Key => $firefight){
         if($firefight['lat']=='' || $firefight['lng']==''){
             $L = GetLocation($firefight['address']);
             $UpdateString +="update DBFirefighting set lat='".$L['lat']."',lng='".$L['lng']."' where ID='".$firefight['ID']."';";
         }
     }
     $_conSQL->query($UpdateString);

     function GetLocation($_Address){
        $GoogleAPIString = "http://maps.googleapis.com/maps/api/geocode/json?address=".$_Address."&sensor=false";
        $curl  = curl_init($GoogleAPIString);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $JsonCode = curl_exec($curl);
        $Obj_Json= json_decode($JsonCode);
        $_lat=$Obj_Json->{'results'}[0]->{'geometry'}->{'location'}->{'lat'};//we
        $_lng=$Obj_Json->{'results'}[0]->{'geometry'}->{'location'}->{'lng'};//ge
        curl_close($curl);
        return array("lat" => $_lat,"lng" => $_lng);
     }
?>