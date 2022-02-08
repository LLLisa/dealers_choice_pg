const fullList = (arrayFromDB) => `
<!DOCTYPE html>
<html>
  <head>
    <title>Video Games I Like</title>
    <link rel="stylesheet" href="app.css" />
  </head>
  <body>
    <div id="header">
    <h1>Some Video Games idk</h1>
    </div>
    <div id="content">
      ${arrayFromDB
        .map(
          (game) =>
            `<div><a href="/games/${game.name}">${game.name.replace(
              /_/g,
              ' '
            )}</a></div>`
        )
        .join('')}
    </div>
  </body>
</html>
`;

const detail = (dataRow) => `
<!DOCTYPE html>
<html>
<head>
  <title>Video Games I Like</title>
  <link rel="stylesheet" href="/app.css" />
</head>
<body>
  <div id="header">
  <h1><a href="/">Some Video Games idk</a></h1>
  </div>
  <div id="content">
    <h2>${dataRow.name.replace(/_/g, ' ')}</h2>
    <div>${dataRow.year}</div>
    <div>${dataRow.genre.replace(/_/g, ' ')}</div>
    <div>${dataRow.maker.replace(/_/g, ' ')}</div>
  </div>
</body>
</html>
`;

module.exports = { fullList, detail };
