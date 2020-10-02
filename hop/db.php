<?php

function openDb() {
    $db = __DIR__ . "/data/human_genes.db";
    $db = str_replace("\\", "/", $db);
    $url = "sqlite:" . $db;
    $dbh = new PDO($url);
    return $dbh;
}
