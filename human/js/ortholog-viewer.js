var ortholog = {};

// create page
ortholog.createPage = function() {
    ortholog.createSelect();
    $( '#button-update' ).click( ortholog.onSubmit );
}

// create page
ortholog.createPage2 = function() {
    $( '#button-update' ).click( ortholog.onSubmit2 );
}

// create query
ortholog.createQuery = function( term ) {
    var query = 'PREFIX orth: <http://purl.jp/bio/11/orth#> '
              + 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> '
              + 'select distinct ?label from <http://purl.org/net/orthordf/hOP> where { '
              + '    ?gene_id a orth:Gene ; '
              + '    rdfs:label ?label . '
    if( term !== undefined && term !== null && term !== '' ) {
        query = query + "filter( contains( ?label, '" + term + "' ) ). ";
    }
    query = query + '}';

    return query;
}

// create select
ortholog.createSelect = function() {
    $( '#select-gene' ).select2(
        {
            ajax: {
                type: 'POST',
                url: 'http://mbgd.genome.ad.jp:8047/sparql',
                data: function( params ) {
                    var term = params.term;
                    var query = ortholog.createQuery( term );
                    var data = {
                        format: 'application/sparql-results+json',
                        query: query
                    }
                    return data;
                },
                processResults: function( result ) {
                    array = [];
                    result.results.bindings.forEach(
                        function( element ) {
                            var gene = element.label.value;
                            array.push( { id: gene, text: gene } );
                        }
                    );
                    return { results: array };
                }
            },
            tags: true
        }
    );
}

// create select
ortholog.createSelect2 = function() {
    $.ajax(
       {
           url: 'http://mbgd.genome.ad.jp:8047/sparql',
           type: 'GET',
           dataType: 'json',
           data: {
               format: 'application/sparql-results+json',
               query: ortholog.createQuery( null )
           }
       }
    ).then(
        function( result ) {
            var array = [];
            result.results.bindings.forEach(
                function( element ) {
                    var gene = element.label.value;
                    array.push( { id: gene, text: gene } );
                }
            );
            console.log( array );
            $( '#select-gene' ).select2(
                {
                    tags: true,
                    data: array
                }
            );
            $( '#select-gene' ).css( 'display', 'block' );
        }
    );
}

// on submit
ortholog.onSubmit = function() {
    var genes = $( '#select-gene' ).val();
    if( genes.length == 0 ) {
        alert( "Select one or more genes before updating." );
    }

    var url = 'stanza.html?stanza=ortholog&genes=' + encodeURI( genes.join( ' ' ) );

    if( $( '#check-openwindow' ).prop( 'checked' ) ) {
        window.open( url );
    }
    else {
        $( '#chart' ).html( '<iframe src="' + url + '" style="width: 100%; height: 500px; border: none;"></iframe>' );
    }
}

// on submit
ortholog.onSubmit2 = function() {
    var genes = $( '#genes' ).val();
    if( genes === null || genes === '' ) {
        alert( "Input genes." );
    }

    var url = 'stanza.html?stanza=ortholog&genes=' + encodeURI( genes );

    if( $( '#check-openwindow' ).prop( 'checked' ) ) {
        window.open( url );
    }
    else {
        $( '#chart' ).html( '<iframe src="' + url + '" style="width: 100%; height: 500px; border: none;"></iframe>' );
    }
}
