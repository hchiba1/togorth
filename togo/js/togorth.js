// namespace
let togorth = {};

// id
togorth.id = 1;

// endpoint
togorth.endpoint = 'https://dbpedia.org/sparql';

// create tabs1
togorth.createTabs = function (tabs) {
  tabs.forEach(
    (element) => {
      title = element.title;
      page = element.page;
      let id = togorth.id++;
      element.id = id;
      togorth.addTabButton(title, id);
      togorth.addTabContent(page, id);
    }
  );
  let tag = '<div class="tab_rest"></div>';
  $('#tabs').append(tag);

  if (tabs.length > 0) {
    togorth.openTab(tabs[0].id);
  }
}

// add tab button
togorth.addTabButton = function (title, id) {
  let buttonId = 'tab_button-' + id;
  let tag = `<button id="${buttonId}" class="tab_button">${title}</button>`;
  $('#tabs').append(tag);
  $('#' + buttonId).click(
    function () {
      togorth.openTab(id);
    }
  );
}

// add tab content
togorth.addTabContent = function (page, id) {
  let panelId = 'tab_content-' + id;
  let tag = `<div id="${panelId}" class="tab_content"></div>`
  $('#contents').append(tag);
  $('#' + panelId).load(page + '.html');
}

// open tab
togorth.openTab = function (id) {
  $('.tab_button').css('color', 'black').css('border-bottom', 'none');
  $('.tab_button:hover').css('border-bottom', '2px solid #005cab');
  $('.tab_content').css('display', 'none');
  $('#tab_button-' + id).css('color', '#005cab').css('border-bottom', '2px solid #005cab');
  $('#tab_content-' + id).css('display', 'block');
}


// sparql result table
togorth.createSparqlResultTable = function (headers, result) {
  let tag = '<h3>Result:</h3><table id="sparql_result_table"></table>';
  $('#sparql_result').html(tag);

  tag = '<tr>';
  headers.forEach(
    function (header) {
      tag += `<th>${header}</th>`;
    }
  );
  tag += '</tr>';
  $('#sparql_result_table').append(tag);

  result.forEach(
    (row) => {
      tag = '<tr>'
      headers.forEach(
        (header) => {
          tag += `<td>${row[header]}</td>`;
        }
      );
      tag += '</tr>'
      $('#sparql_result_table').append(tag);
    }
  );
}

// create db table
togorth.createDbTable = function (id) {
  let no = 1;
  $.ajax(
    {
      url: 'json/databases.json',
      type: 'GET',
      dataType: 'json',
      data: {
        alt: 'json'
      }
    }
  ).then(
    function (result) {
      let content = '<thead><tr><th>No.</th><th>Name</th><th>Method</th><th>Hierarchical / Flat</th><th>Target</th>' +
        '<th>#organisms</th><th>Sequence Source</th><th>First Publication</th><th>Last Update</th></tr></thead>';
      result.forEach(
        (entry) => {
          if (entry['Obsolete'] !== '1') {
            entry.no = no;
            let lineTag = togorth.createDbLineTag(entry);
            content += lineTag;
            no++;
          }
        }
      );
      $('#' + id).html(content).tablesorter();
    }
  );
}

// create DB line tag
togorth.createDbLineTag = function (object) {
  let keys = ['no', 'Name', 'Method', 'Hierarchical/flat/pair-wise (and other characteristics)', 'Target', '#organisms', 'sequence source', 'Publication', 'Last update'];
  return togorth.createLineTag(object, keys);
}

// create line tag
togorth.createLineTag = function (object, keys) {
  let tag = '';
  keys.forEach(
    function (key) {
      if (key in object) {
        let value = object[key];
        if (key === 'Name') {
          let url = object.URL;
          value = `<a href="${url}" target="_blank">${value}</a>`;
        }
        tag += `<td>${value}</td>`;
      } else {
        tag += '<td></td>';
      }
    }
  );
  tag = `<tr>${tag}</tr>`;
  return tag;
}

// create endpoint table
togorth.createEndpointTable = function (id) {
  let tag = '<tr><th>Name</th><th>URL</th></tr>';
  $('#' + id).html(tag);
  $.getJSON(
    'json/endpoints.json',
    (data) => {
      data.forEach(
        (element) => {
          let tag = togorth.createLineTag(element, ['name', 'url']);
          $('#' + id).append(tag);
        }
      );
    }
  );
}

// create link table
togorth.createLinkTable = function (id) {
  let tag = '<tr><th>Name</th><th>URL</th></tr>';
  $('#' + id).html(tag);
  $.getJSON(
    'json/links.json',
    (data) => {
      data.forEach(
        (element) => {
          let tag = togorth.createLineTag(element, ['name', 'url']);
          $('#' + id).append(tag);
        }
      );
    }
  );
}

// create paper table
togorth.createPaperTable = function (id) {
  $.ajax(
    {
      url: 'json/references.json',
      type: 'GET',
      dataType: 'json',
      data: {
        alt: 'json'
      }
    }
  ).then(
    (result) => {
      let content = '<thead><tr><th>Tag</th><th>Year</th><th>Paper</th></tr></thead>'
      result.forEach(
        (entry) => {
          content += togorth.createPaperLineTag(entry['Tag'], entry['Paper'], entry['Year'], entry['URL']);
        }
      );
      $('#' + id).html(content).tablesorter();
    }
  );
}

// create paper line tag
togorth.createPaperLineTag = function (tag, paper, year, url) {
  let line = `<tr><td>${tag}</td><td>${year}</td>`;
  let paperTag = paper;
  if (url !== '') {
    paperTag = `<a href="${url}" target="_blank">${paperTag}</a>`;
  }
  paperTag = `<td>${paperTag}</td>`;
  line += paperTag + '</tr>';
  return line;
}

// create reference table
togorth.createReferenceTable = function (id) {
  let tag = '<tr><th>Authors</th><th>Year</th><th>Title</th><th>Journal</th></tr>';
  $('#' + id).html(tag);
  $.getJSON(
    'json/references.json',
    (data) => {
      data.forEach(
        (element) => {
          let keys = ['authors', 'year', 'title', 'journal'];
          let tag = togorth.createLineTag(element, keys);
          $('#' + id).append(tag);
        }
      );
    }
  );
}

