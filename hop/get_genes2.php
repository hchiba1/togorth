<?php
    require_once "db.php";

    $dbh = openDb2();

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
    $sql = $sql . " limit 50";

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
