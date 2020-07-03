Stanza((stanza, params) => {
  if (params.genes === null) {
    return;
  }
  var genes = params.genes.split( ' ' );
  var genesStr = '';
  genes.forEach((gene) => {
    genesStr = genesStr + ' "' + gene + '"';
  });
  params.genes = genesStr;

  var dataQuery = stanza.query({
    endpoint: 'https://sparql.orth.dbcls.jp/sparql',
    template: 'data.rq',
    parameters: params
  });
  var countQuery = stanza.query({
    endpoint: 'https://sparql.orth.dbcls.jp/sparql',
    template: 'count.rq',
  });
  var query = Promise.all([dataQuery, countQuery]);

  query.then(([dataResult, countResult]) => {
    var rows = dataResult.results.bindings;
    var count = countResult.results.bindings[0].max_id.value;
    stanza.render({
      template: 'stanza.html'
    });
    ortholog.render( stanza.select( '#chart'), rows, genes, count );
  });
});
