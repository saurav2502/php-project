<?php
require_once ("DbController.php");
$db_handle = new DbController();
$query = "select * from country";
$result = $db_handle->getRecords($query);
echo "http://hi saurav";


