<?php

class DbController
{
    private $host = "localhost";
    private $port = "3306";
    private $user = "root";
    private $pass = "root";
    private $dbname = "creative";
    private $conn;

    public function __construct()
    {
        $this->conn = $this->connectDB();
    }


    function connectDB(): bool|mysqli|null
    {
        $conn = mysqli_connect($this->host, $this->user, $this->pass, $this->dbname, $this->port);
        mysqli_set_charset($conn, "utf8");
        return $conn;
    }

    function runQuery($query): array
    {
        $resultSet = null;
        $result = mysqli_query($this->conn, $query);
        while ($row = mysqli_fetch_row($result)) {
            $resultSet[] = $row;
        }
        if (!empty($resultSet)) {
            return $resultSet;
        }
        return $resultSet;
    }

    function numRows($query): int|string
    {
        $result = mysqli_query($this->conn, $query);
        $rowCount = mysqli_num_rows($result);
        return $rowCount;
    }

    function getRecords($query): array
    {
        $mysqli = new mysqli($this->host,$this->user,$this->pass,$this->dbname);
        $myArray = array();
        if ($result = $mysqli->query($query)) {

            while($row = $result->fetch_array(MYSQLI_ASSOC)) {
                $myArray[] = $row;
            }
            //echo json_encode($myArray);
        }

        $result->close();
        $mysqli->close();
        return $myArray;
    }
}

?>