<?php
include("./getDataBase.php");

$db = getConnectMyDB();

$resultStr = "SELECT caseID, renderMode, systemVersion, aveTime, deviceModel, enemyMax, browerType, sysOS 
              FROM baseTable ORDER BY deviceModel DESC, browerType ASC, caseID ASC";

$count = $db->query($resultStr);
$result = $count->fetchAll(PDO::FETCH_ASSOC);//返回一个2维array数组
$resultLength = count($result);
$categoriesArr = [];
$v3DataArr = [];
$v4DataArr = [];
for ($i = 0; $i + 1 < $resultLength; $i+=2)
{
    $firstResult = $result[$i];
    $secondResult = $result[$i + 1];
    if (count($firstResult['deviceModel']) < 0 || count($secondResult['deviceModel']) < 0 ||
        $firstResult['sysOS'] != $secondResult['sysOS'] || $firstResult['browerType'] != $secondResult['browerType'] ||
        $firstResult['deviceModel'] != $secondResult['deviceModel'] || $firstResult['renderMode'] != $secondResult['renderMode'] || $firstResult['systemVersion'] == $secondResult['systemVersion'])
    {
        $i--;
        continue;
    }
    // first is v3, second is v4, if not, translate
    if (strpos($firstResult['systemVersion'], "v3") == false)
    {
        $temp = $firstResult;
        $firstResult = $secondResult;
        $secondResult = $temp;
    }

    $tempCategoriesStr = date('Ymd', $firstResult['caseID'] / 1000)."<br>".$firstResult['sysOS']."<br>".$firstResult['browerType']."<br>".$firstResult['deviceModel']."<br>".$firstResult['renderMode'];
    array_push($categoriesArr,$tempCategoriesStr);

    array_push($v3DataArr,$firstResult['aveTime']);

    array_push($v4DataArr,$secondResult['aveTime']);
}

// javascript end
    $db = null;
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script type="text/javascript" src="http://cdn.hcharts.cn/jquery/jquery-1.8.3.min.js"></script>
  <script type="text/javascript" src="http://cdn.hcharts.cn/highcharts/highcharts.js"></script>
  <script type="text/javascript" src="http://cdn.hcharts.cn/highcharts/exporting.js"></script>
</head>
<body>
<?php
    function outPutGraph($categories, $v3Data, $v4Data, $containerStr)
    {
echo <<< outPutGraphFlag
        <div id="$containerStr" style="min-width:700px;height:400px"></div>
        <script>
        $(function () {
        $('#$containerStr').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Engine performan test'
            },
            subtitle: {
                text: 'testCase: js-moonwarriors'
            },
            xAxis: {
                categories: $categories
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'aveTimePerFrame (sec)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.3f} sec</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'v3',
                data: $v3Data

            }, {
                name: 'v4',
                data: $v4Data

            }]
        });
    });               
      </script>  
outPutGraphFlag;
    }

    function divideTestData($diveNum, $categoriesArr, $v3DataArr, $v4DataArr)
    {
        $dataLength = count($categoriesArr);
        echo "-dataNum:".$dataLength;
        for ($i = 0; $i < ($dataLength / $diveNum + 1); $i++)
        {
            $diveIndex = $i * $diveNum;
            $diveLength = $diveNum;
            if ($diveIndex >= $dataLength)
            {
                break;
            }
            if ($diveIndex + $diveLength > $dataLength)
            {
                $diveLength = $dataLength - $diveIndex;
            }
            $subCategoriesArr = array_slice($categoriesArr, $diveIndex, $diveLength); 
            $subv3DataArr = array_slice($v3DataArr, $diveIndex, $diveLength); 
            $subv4DataArr = array_slice($v4DataArr, $diveIndex, $diveLength); 

            $categoriesStr = '["'. implode('","', $subCategoriesArr). '"]';
            $v3DataStr = '['. implode(',', $subv3DataArr). ']';
            $v4DataStr = '['. implode(',', $subv4DataArr). ']';

            outPutGraph($categoriesStr, $v3DataStr, $v4DataStr, "container$i");
        }
        
    }
    divideTestData(10, $categoriesArr, $v3DataArr, $v4DataArr);
?>
</body>
</html>