<?

	$handle = fopen("../SQLinfo", "r");
	if ($handle) {
	    while (($line = fgets($handle)) !== false) {
	         echo $line;
	    }
	    fclose($handle);
	} else {
	    // error opening the file.
	} 


	
	// $server = "ServerID.database.windows.net,1433";
	// $username = "Username@ServerID";
	// $password = "Password";
	// $database = "DbName";


	// try
	// {
	//     $conn = new PDO("sqlsrv:server=$server ; Database = $database", $username, $password);
	// }
	// catch(Exception $e)
	// {
	//     die(print_r($e));
	// }





?>