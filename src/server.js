const React = require('react');
const { renderToString } = require('react-dom/server');
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();
const App = require('./App').default;
const timestamp = new Date().getTime();

app.use(`/_/${timestamp}/bundle.js`, (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname + '/bundle.js'));
});

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.resolve(__dirname + '/../views'));
app.get('/', renderPage);
app.get('/about', renderPage);
app.get('/contact', renderPage);

function renderPage(req, res) {
    const url = req.url;
    res.render('index', {
        html: renderToString(<App {...{ url }} />),
        prefix: `/_/${timestamp}`,
        initState: JSON.stringify({ url })
    });
}

app.listen(process.env.PORT || 3000, function() {
    console.log('server listening to port 3000...');
});
