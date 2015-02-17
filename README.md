# 婉君護台灣 
Open Data Open Source Competition

Demo Website : http://opends.azurewebsites.net/index.html
Andriod APK  : https://github.com/whcheng740418/AndroidDemo/blob/master/app/app-release.apk?raw=true

#API




救護車
------
|名稱|說明
|------|----------
|目前救護車|呼叫目前所有的救護車
|[救護車位置傳送](http://opends.azurewebsites.net/api/dynamic/AmbulancePoint.php?AmbID=「救護車ID」&IP=「裝置的IP和port」&lat=「緯度」&lng=「經度」)|[先取得IP](http://opends.azurewebsites.net/api/dynamic/getClientIp.php?callback=SysGetIP)，[再取得AmbID(救護車ID)需要IP](http://opends.azurewebsites.net/api/dynamic/AmbulanceInit.php?IP=「裝置的IP和port」)，而lat和lng需要提供
|[救護車資訊](http://opends.azurewebsites.net/api/dynamic/ambulanceInfo.php?AmbID=「救護車ID」)|需要提供AmbID(救護車ID)
|[救護車取的任務](http://opends.azurewebsites.net/api/dynamic/ambulanceTask.php?AmbID=「救護車ID」)|需要提供AmbID(救護車ID)
|[救護車更新傷患](http://opends.azurewebsites.net/api/dynamic/ambulanceTask.php?AmbID=「救護車ID」)|需要提供AmbID(救護車ID)
* 救護車更新,post帶的參數(InjID,Injured_Name,Injured_Phone,Contact_Name,Contact_Phone,Injured_Sex,injured_area,injured_Cause,injured_Status,StateLog)


鄉民
-----
|名稱|說明
|------|----------
|[建立傷患點](http://opends.azurewebsites.net/api/dynamic/InjuredInit.php?Type=Per&PerID=「使用者ID」&IP=「裝置的IP和port」&lat=「緯度」&lng=「經度」)|傷患的所在位置，PerID=輸入使用者ID，IP=輸入裝置的IP和port,lat和lng為經緯度，lat為緯度，lng為經度  
|[建立災害點](http://opends.azurewebsites.net/api/dynamic/DisasterInit.php?PerID=「使用者ID」&IP=「裝置的IP和port」&lat=「緯度」&lng=「經度」)|災害破壞的位置，PerID=輸入使用者ID，IP=輸入裝置的IP和port,lat和lng為經緯度，lat為緯度，lng為經度  
|[建立物資點](http://opends.azurewebsites.net/api/dynamic/SuppliesInit.php?PerID=「使用者ID」ID&IP=「裝置的IP和port」&lat=「緯度」&lng=「經度」)|需要物資補給的位置，PerID=輸入使用者ID，IP=輸入裝置的IP和port,lat和lng為經緯度，lat為緯度，lng為經度  
|[刪除傷患點](http://opends.azurewebsites.net/api/dynamic/InjuredCancel.php?injID=「傷患點ID」)|injID=輸入傷患點ID
|[刪除災害點](http://opends.azurewebsites.net/api/dynamic/DisasterCancel.php?DisID=「災害點ID」)|DisID=輸入災害點ID
|[刪除物資點](http://opends.azurewebsites.net/api/dynamic/SuppliesCancel.php?injID=「物資點ID」)|injID=輸入物資點ID
|[鄉民位置傳送](http://opends.azurewebsites.net/api/dynamic/InjuredInit.php?Type=Per&PerID=「使用者ID」&IP=「裝置的IP和port」&lat=「緯度」&lng=「經度」)|[PerID需要從API抓取](http://opends.azurewebsites.net/api/dynamic/PersonInit.php?IP=「裝置的IP和port」)需輸入IP，lat和lng需要提供


位置存取
---------
|名稱|說明
|-------|---------
|[警察局](http://opends.azurewebsites.net/api/static/police.php)|全臺灣警局位置
|[避難點](http://opends.azurewebsites.net/api/static/shelter.php)|出現的災難點
|[救護車](http://opends.azurewebsites.net/api/dynamic/ambulanceSync.php?Days=「天數」)|幾天前有執行的救護車，Days=輸入幾天前
|[鄉民](http://opends.azurewebsites.net/api/dynamic/person.php?Days=「天數」)|幾天前在的使用者，Days=輸入幾天前
|[災害點](http://opends.azurewebsites.net/api/dynamic/disaster.php)|所有災難點紀錄
|[傷患點](http://opends.azurewebsites.net/api/dynamic/injured.php)|所有傷患點紀錄
* 傷患點狀態: 1.等待救護車,2.運送途中,3.送達醫院,4.不必送醫,所以2以上就回從地圖中移除。
