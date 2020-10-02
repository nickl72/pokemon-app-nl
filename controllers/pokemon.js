const Pokemon = require('../models').Pokemon;
const { Op } = require('sequelize');
const { sequelize } = require('../models');
const { pokemon } = require('../routes');
const Player = require('../models').Player;

const index = (req,res) => {
    Pokemon.findAll({
        order: [['name']]
    })
    .then(pokemon => {
        res.render('index.ejs', {
            pokemon: pokemon
        });
    })
}

const renderNew = (req, res) => {
    res.render('new.ejs');
}

const showPokemon = (req, res) => {
    Pokemon.findByPk(req.params.index,{
        include: [{
            model: Player
        }]
    })
    .then((pokemon) => {
        Pokemon.findAll({
            where: {id: {[Op.not]: pokemon.id}},
            limit: 5,
            order: sequelize.random()
        }).then((pokemonArr) => {
            res.render('show.ejs', {
                pokemonArr: pokemonArr, 
                pokemon: pokemon,
            });
        }) 
    })
}

const renderEdit = (req, res) => {
    Pokemon.findByPk(req.params.index)
    .then(pokemon => {
        res.render('edit.ejs', {
            pokemon: pokemon,
        })
    })
}

const editPokemon = (req, res) => {
    Pokemon.update(req.body, {
        where: {id: req.params.index},
        returning: true
    })
    .then(() => {
        res.redirect(`/pokemon/${req.params.index}`)
    })
}

const postPokemon = (req, res) => {
    Pokemon.create(req.body)
    .then(pokemon => {
        res.redirect('/pokemon');
    })
}

const deletePokemon = (req, res) => {
    Pokemon.destroy({
        where: {id: req.params.index}
    }).then(() => {
        res.redirect('/pokemon');
    })
}

module.exports = {
    index,
    renderNew,
    showPokemon,
    renderEdit,
    editPokemon,
    postPokemon,
    deletePokemon
}