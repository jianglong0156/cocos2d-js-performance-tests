<?php
header("Access-Control-Allow-Origin: *");
if (!function_exists('getConnectMyDB'))
{
    function getConnectMyDB()
    {
        $db_name = "sqlite:./myDB.sqlite";
        $db = new PDO($db_name);
        if ($db){ 
            echo 'connect ok'; 
        }else{ 
            echo 'connect bad'; 
        }
        return $db;
    }
}

?>