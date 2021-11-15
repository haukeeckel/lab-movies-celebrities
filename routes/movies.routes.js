// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();
const MovieModel = require('../models/Movie.model');
const CelebrityModel = require('../models/Celebrity.model');

router.get('/movies', (_, res) => {
  MovieModel.find()
    .then((movie) => {
      res.render('movies/movies', { movie });
    })
    .catch((err) => {
      console.log('Fetching movies failed', err);
      next(err);
    });
});

router.get('/movies/create', (_, res) => {
  CelebrityModel.find()
    .then((celebrity) => {
      res.render('movies/new-movie', { celebrity });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/movies/create', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  MovieModel.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      res.render('movies/create');
      console.log(err);
    });
});

router.get('/movies/:id', (req, res) => {
  let { id } = req.params;
  MovieModel.findById(id)
    .populate('cast')
    .then((movie) => {
      console.log(movie.cast);
      res.render('movies/movie-details', { movie });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/movies/:id/delete', (req, res) => {
  let { id } = req.params;
  MovieModel.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/movies/:id/edit', (req, res) => {
  const { id } = req.params;
  MovieModel.findById(id)
    .populate('cast')
    .then((movie) => {
      CelebrityModel.find().then((celebrity) => {
        celebrity.forEach((elem) => {
          let isCastMember = movie.cast.find((cast) =>
            cast._id.equals(elem._id)
          );
          let isSelected = isCastMember !== undefined;
          elem.selected = isSelected;
        });
        res.render('./movies/edit-movie.hbs', { movie, celebrity });
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/movies/:id/edit', (req, res) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;
  MovieModel.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
