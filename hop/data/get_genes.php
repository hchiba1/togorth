<?php
$dbh = new PDO("sqlite:" . __DIR__ . "/human_genes.db");

$term = '';
if(isset($_REQUEST['term'])) {
    $term = strtolower($_REQUEST['term']);
}

$array = [];

$sql = "select name from genes";
if(strlen($term) > 0) {
    $sql = $sql . " where name like '%" . $term . "%'";
}
$sql = $sql . " limit 50";

$result = $dbh->query($sql);

foreach($result as $row) {
    array_push($array, $row['name']);
}

$json = json_encode($array);
echo $json;

$dbh = NULL;
?>
