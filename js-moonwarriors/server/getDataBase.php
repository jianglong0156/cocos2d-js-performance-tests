<?php
function getConnectMyDB()
{
    $db_name = "sqlite:./myDB.sqlite";
    $db = new PDO($db_name);
    if ($db){ 
        echo 'connect ok'; 
    }else{ 
        echo 'connect bad'; 
    }
    return $db
}
?>