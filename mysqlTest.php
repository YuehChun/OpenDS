<?

	function ConSQL(){

		$handle = fopen("../SQLinfo", "r");
		if ($handle) {
			$server = fgets($handle);
			$username = fgets($handle);
			$password = fgets($handle);
			$database = fgets($handle);
		    fclose($handle);
		} else {
		    // error opening the file.
		} 

		try
		{
		    $conn = new PDO("sqlsrv:server=$server ; Database = $database", $username, $password);
		}
		catch(Exception $e)
		{
		    die(print_r($e));
		}
		return $conn
	}


	$MySQLPDO = ConSQL();
	$_result = $MySQLPDO->query("SHOW TABLES");
	echo "hello World!!";



?>