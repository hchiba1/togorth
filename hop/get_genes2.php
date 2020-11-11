<?php
$dbh = new PDO("sqlite:" . __DIR__ . "/data/human_genes.db");

$term = '';
if(isset($_REQUEST['term'])) {
    $term = strtolower($_REQUEST['term']);
}

$array = [];

$sql = "select label, name from genes";
if(strlen($term) > 0) {
    $sql = $sql . " where name like '%" . $term . "%'";
    $sql = $sql . " or label like '%" . $term . "%'";
}
$sql = $sql . " order by name limit 50";

$result = $dbh->query($sql);

foreach($result as $row) {        
    array_push(
        $array, 
        array(
            'label' => $row['name'], 
            'value' => $row['label']
        )
    );
}

$json = json_encode($array);
echo $json;

$dbh = NULL;
?>
