// const pokemon = require('./pokemon');

const Players = require('../models').Player;
const Team = require('../models').Team;
const Pokemon = require('../models').Pokemon;

const index = (req, res) => {
    res.render('players/index.ejs');
}

const login = (req, res) => {
    res.render('players/login.ejs')
}

const signup = (req, res) => {
    res.render('players/signup.ejs');
}

const profile = (req, res) => {
    Players.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        },
        include: [Team]
    }).then(player => {
        res.redirect(`/players/profile/${player.id}`);
    }).catch(() => {
        res.redirect('/players/login')
    })
    
}

const renderProfile = (req, res) => {
    Players.findByPk(req.params.index, {
        include: [
            Team,
            {
                model: Pokemon,
                attributes: ['name','id']
            }
        ]
    })
    .then( player =>{
        Team.findAll()
        .then(Teams => {
            Pokemon.findAll()
            .then(pokemons => {
                res.render('players/profile.ejs', {
                    player: player,
                    teams: Teams,
                    pokemons: pokemons
                })
            })
        });
    })
}

const newProfile = (req, res) => {
    Players.create(req.body)
    .then(player => {
        res.redirect(`/players/profile/${player.id}`);
    })
}

const editProfile = (req, res) => {
    console.log(req.body)
    Players.update(req.body, {
        where: {id: req.params.index},
        returning: true
    }).then(async updatedPlayer => {
        await new Promise((resolve, reject) => {
            console.log(typeof(req.body.pokemonId))
            if (typeof(req.body.pokemonId) === 'string') {
                req.body.pokemonId = [req.body.pokemonId];
            }

            req.body.pokemonId.forEach(async (id,index,array) => {
                await Pokemon.findByPk(id)
                .then(async foundPokemon => {
                    await Players.findByPk(req.params.index)
                    .then(foundPlayer => {
                        foundPlayer.addPokemon(foundPokemon)
                    })
                })
                if (index === array.length - 1) {
                    resolve();
                }
            })
    
            
        })
        .then(()=>{
            res.redirect(`/players/profile/${req.params.index}`);
        })            
    })
}

const deleteProfile =(req, res) => {
    Players.destroy({
        where: {id: req.params.index}
    }).then(() => {
        res.redirect('/players');
    })
}

module.exports = {
    index,
    login,
    profile,
    renderProfile,
    signup,
    newProfile,
    editProfile,
    deleteProfile
}