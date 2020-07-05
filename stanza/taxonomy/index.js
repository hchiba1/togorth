Stanza((stanza, params) => {
  const query = stanza.query({
    endpoint: "https://sparql-proxy.orth.dbcls.jp/sparql",
    template: "taxid.rq",
    parameters: params
  });

  query.then((data) => {
    stanza.render({
      template: "view.html",
      parameters: {
        lines: data.results.bindings
      }
    });
  });
  
});
