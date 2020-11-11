<?php
$dbh = new PDO("sqlite:" . __DIR__ . "/data/human_genes.db");
$sql = 'create table genes(id varchar, label, varchar, name varchar)';
$result = $dbh->query($sql);

$sparql = 'PREFIX orth: <http://purl.jp/bio/11/orth#> '
        . 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> '
        . 'PREFIX dc: <http://purl.org/dc/terms/> '
        . 'PREFIX hop: <http://purl.org/net/orthordf/hOP/ontology#> '
        . 'select distinct ?id ?label ?name where { '
        . '    ?gene a orth:Gene ; '
        . '    rdfs:label ?label ; '
        . '    hop:description ?name ; '
        . '    dc:identifier ?id . '
        . '}';
$endpoint = 'http://mbgd.genome.ad.jp:8047/sparql';

$url = $endpoint . '?query=' . urlencode($sparql)
     . '&format=' . urlencode('application/sparql-results+json')
     . '&timeout=0';

$content = file_get_contents($url);
$result = json_decode($content);

$sql = "insert into genes(id, label, name) values(?, ?, ?)";
$statement = $dbh->prepare($sql);

$bindings = $result->results->bindings;
foreach($bindings as $gene) {
    $id = $gene->id->value;
    $name = $gene->name->value;
    $label = $gene->label->value;

    $statement->bindValue(1, $id, PDO::PARAM_INT);
    $statement->bindValue(2, $label, PDO::PARAM_STR);
    $statement->bindValue(3, $name, PDO::PARAM_STR);
    $statement->execute();
}

$dbh = NULL;
?>
