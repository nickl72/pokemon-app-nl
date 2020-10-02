const express = require('express');
const methodOverride = require('method-override');
const routes = require('./routes');
const pokemon = require('./models/pokemon');

const app = express();


app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use('/pokemon', routes.pokemon);
app.use('/players', routes.players);


app.listen(3000, () => {
    console.log('listening on port 3000');
})