Stanza((stanza, params) => {
  if (params.genes === null) {
    return;
  }
  const genes = params.genes.split( ' ' );
  let genesStr = '';
  genes.forEach((gene) => {
    genesStr = genesStr + ' "' + gene + '"';
  });
  params.genes = genesStr;

  const dataQuery = stanza.query({
    endpoint: 'https://sparql.orth.dbcls.jp/sparql',
    template: 'data.rq',
    parameters: params
  });
  const countQuery = stanza.query({
    endpoint: 'https://sparql.orth.dbcls.jp/sparql',
    template: 'count.rq',
  });
  const query = Promise.all([dataQuery, countQuery]);

  query.then(([dataResult, countResult]) => {
    const rows = dataResult.results.bindings;
    const count = countResult.results.bindings[0].max_id.value;
    stanza.render({
      template: 'stanza.html'
    });
    ortholog.render(stanza.select('#chart'), rows, genes, count);
  });
});
