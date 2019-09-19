// namespace
var togorth = {};

// id
togorth.id = 1;

// endpoint
togorth.endpoint = 'http://mbgd.genome.ad.jp:8047/sparql';

// issue ID
togorth.issueId = function() {
    var id = togorth.id;
    togorth.id++;
    return id;
}

// create tabs
togorth.createTabs = function( tabs ) {
    tabs.forEach( 
        function( element ) {
            title = element.title;
            page = element.page;
            var id = togorth.issueId();
            element.id = id;
            togorth.addTabButton( title, id );
            togorth.addTabContent( page, id );
        }
    );
    var tag = '<div class="tab_rest"></div>';
    $( '#tabs' ).append( tag );

    if( tabs.length > 0 ) {
        togorth.openTab( tabs[ 0 ].id );
    }
}

// add tab button
togorth.addTabButton = function( title, id ) {
    var buttonId = 'tab_button-' + id;
    var tag = '<button id="' + buttonId + '" class="tab_button">' + title + '</button>';
    $( '#tabs' ).append( tag );
    $( '#' + buttonId ).click(
        function() {
            togorth.openTab( id );
        }
    );
}

// add tab content
togorth.addTabContent = function( page, id ) {
    var panelId = 'tab_content-' + id;
    var tag = '<div id="' + panelId + '" class="tab_content"></div>'
    $( '#contents' ).append( tag );
    $( '#' + panelId ).load( page + '.html' );
}

// open tab
togorth.openTab = function( id ) {
    $( '.tab_button' ).css( 'background-color', 'darkgreen' );
    $( '.tab_button' ).css( 'color', 'white' );
    $( '.tab_content' ).css( 'display', 'none' );
    $( '#tab_button-' + id ).css( 'background-color', 'white' );
    $( '#tab_button-' + id ).css( 'color', 'darkgreen' );
    $( '#tab_content-' + id ).css( 'display', 'block' );
}

// submit sparql
togorth.submitSparql = function() {
    var tag = '<h3>Result:</h3><div>Searching...</div>';
    $( '#sparql_result' ).html( tag );

    var sparql = $( '#sparql_text' ).val();

    $.ajax(
        {
            url: togorth.endpoint,
            type: 'GET',
            dataType: 'json',
            data: {
                format: 'application/sparql-results+json',
                query: sparql
            }
        }
    ).then(
        function( result ) {
            var headers = togorth.getHeaders( result );
            var rows = togorth.getResult( result, headers );
            togorth.createSparqlResultTable( headers, rows );
        }
    );
}

// headers
togorth.getHeaders = function( result ) {
    var headers = [];
    result.head.vars.forEach(
        function( element ) {
            headers.push( element );
        }
    );
    return headers;
}

// results
togorth.getResult = function( result, headers ) {
    var array = [];
    result.results.bindings.forEach(
        function( element ) {
            var row = {};
            headers.forEach(
                function( header ) {
                    var value = element[ header ].value;
                    row[ header ] = value;
                }
            );
            array.push( row );
        }
    );
    return array;
}

// sparql result table
togorth.createSparqlResultTable = function( headers, result ) {
    var tag = '<h3>Result:</h3><table id="sparql_result_table"></table>';
    $( '#sparql_result' ).html( tag );

    tag = '<tr>';
    headers.forEach(
        function( header ) {
            tag += '<th>' + header + '</th>'
        }
    );
    tag += '</tr>';
    $( '#sparql_result_table' ).append( tag );

    result.forEach(
        function( row ) {
            tag = '<tr>'
            headers.forEach( 
                function( header ) {
                    tag += '<td>' + row[ header ] + '</td>';
                }
            );
            tag += '</tr>'
            $( '#sparql_result_table' ).append( tag );
        }
    );
}