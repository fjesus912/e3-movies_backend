const catchError = require("../utils/catchError");
const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");

const getAll = catchError(async (req, res) => {
  const results = await Movie.findAll({ include: [Genre, Actor, Director] });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Movie.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.findByPk(id, {
    include: [Genre, Actor, Director],
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.destroy({ where: { id } });
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setGenre = catchError(async (req, res) => {
  //bucamos la película
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  //en caso de no encontrar la película
  if (!movie) return res.sendStatus(404);

  //seteo de los géneros a la película
  await movie.setGenres(req.body);
  //leemos los géneros que seteamos para retornarlos
  const genres = await movie.getGenres();
  //retorno de los géneros que seteamos en las peliculas
  return res.json(genres);
});

const setActor = catchError(async (req, res) => {
  //bucamos la película
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  //en caso de no encontrar la película
  if (!movie) return res.sendStatus(404);

  //seteo de los actores a la película
  await movie.setActors(req.body);
  //leemos los actores que seteamos para retornarlos
  const actors = await movie.getActors();
  //retorno de los actores que seteamos en las peliculas
  return res.json(actors);
});

const setDirector = catchError(async (req, res) => {
  //bucamos la película
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  //en caso de no encontrar la película
  if (!movie) return res.sendStatus(404);

  //seteo de los directores a la película
  await movie.setDirectors(req.body);
  //leemos los directores que seteamos para retornarlos
  const directors = await movie.getDirectors();
  //retorno de los directores que seteamos en las peliculas
  return res.json(directors);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setGenre,
  setActor,
  setDirector,
};
