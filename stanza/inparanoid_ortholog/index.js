Stanza((stanza, params) => {
  const query = stanza.query({
    endpoint: "https://orth.dbcls.jp/togo/sparql",
    template: "query.rq",
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
