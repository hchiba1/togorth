<?php

$dbh = new PDO("sqlite:" . __DIR__ . "/data/human_genes.db");
$sql = 'create table genes(id varchar, name varchar)';
$result = $dbh->query($sql);

$sql = "insert into genes(id, name) values(?, ?)";
$statement = $dbh->prepare($sql);

$file_name = __DIR__ . '/data/human_genes.tsv';
$file = file($file_name);

foreach($file as $line) {
    $tokens = explode("\t", $line);
    $id = $tokens[0];
    $name = str_replace("\n", '', $tokens[1]);
    if(strlen($name) > 0) {
        $statement->bindValue(1, $id, PDO::PARAM_STR);
        $statement->bindValue(2, $name, PDO::PARAM_STR);
        $statement->execute();
    }
}

$dbh = NULL;
?>
