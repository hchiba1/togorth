Stanza(
    function( stanza, params ) {
        if( params.genes === null ) {
            return;
        }
        var genes = params.genes.split( ' ' );
        var genesStr = '';
        genes.forEach(
            function( gene ) {
                genesStr = genesStr + ' "' + gene + '"';
            }
        );
        params.genes = genesStr;

        var dataQuery = {
            endpoint: 'https://sparql.orth.dbcls.jp/sparql',
            template: 'data.rq',
            parameters: params
        };

        var countQuery = {
                endpoint: 'https://sparql.orth.dbcls.jp/sparql',
                template: 'count.rq',
        };

        var query = $.when( stanza.query( dataQuery ), stanza.query( countQuery ) );

        query.then(
            function( dataResult, countResult ) {
                var rows = dataResult[ 0 ].results.bindings;
                var count = countResult[ 0 ].results.bindings[ 0 ].max_id.value;
                stanza.render(
                    {
                        template: 'stanza.html'
                    }
                );

                ortholog.render( stanza.select( '#chart'), rows, genes, count );
            }
        );
    }
);
