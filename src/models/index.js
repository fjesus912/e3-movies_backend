const Actor = require("./Actor")
const Director = require("./Director")
const Genre = require("./Genre")
const Movie = require("./Movie")

//tabla pivot -> MoviesGenres
Genre.belongsToMany(Movie, {through: 'MoviesGenres'})
Movie.belongsToMany(Genre, {through: 'MoviesGenres'})

//tabla pivot -> MoviesDirectors
Director.belongsToMany(Movie, {through: 'MoviesDirectors'})
Movie.belongsToMany(Director, {through: 'MoviesDirectors'})

//tabla pivot -> MoviesActors
Actor.belongsToMany(Movie, {through: 'MoviesActors'})
Movie.belongsToMany(Actor, {through: 'MoviesActors'})