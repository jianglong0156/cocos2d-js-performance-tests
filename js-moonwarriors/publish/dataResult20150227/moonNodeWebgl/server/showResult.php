<?php
function n(){
    echo '<br />';
    //echo '\n';
}
// open database
include("./getDataBase.php");

$db = getConnectMyDB();
n();

$db->exec("ALTER TABLE baseTable ADD 'aveTime' varchar(15)");

$baseTableStr = "SELECT DISTINCT baseTable.caseID, systemVersion, aveTime, deviceModel,browerType, sysOS FROM baseTable";
//create table
$count = $db->query($baseTableStr);
$result = $count->fetchAll(PDO::FETCH_ASSOC);//����һ��2άarray����

$resultLength = count($result);
$newResult = [];
for ($i = 0; $i < $resultLength; $i++)
{
    if (strlen($result[$i]['aveTime']) <= 0)
    {
        $caseIDStr = $result[$i]['caseID'];
        $performanceCount = $db->query("SELECT * FROM performData WHERE caseID = '$caseIDStr'");
        $performanceResult = $performanceCount->fetchAll(PDO::FETCH_ASSOC);//����һ��2άarray����
        $performanceResultLength = count($performanceResult);
        $totalDate = 0;
        for ($j = 0; $j < $performanceResultLength; $j++)
        {
            $totalDate += $performanceResult[$j]['timeDate'];
        }
        echo $totalDate / $performanceResultLength;  
        $result[$i]['aveTime'] = $totalDate / $performanceResultLength;
        $aveTime = $totalDate / $performanceResultLength;
        $db->exec("UPDATE baseTable SET aveTime = $aveTime WHERE caseID = '$caseIDStr'");
        n();
        /*
        foreach ($performanceResult[$i] as $postKey => $value)
        {
               
        }
        */
    }
    
}

echo 'run over'; 
?>