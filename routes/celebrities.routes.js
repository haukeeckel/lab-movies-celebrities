// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();
const CelebrityModel = require('../models/Celebrity.model');

router.get('/celebrities', (_, res) => {
  CelebrityModel.find()
    .then((celebrity) => {
      res.render('celebrities/celebrities', { celebrity });
    })
    .catch((err) => {
      console.log('Fetching celebrities failed', err);
    });
});

router.get('/celebrities/create', (_, res) => {
  res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  CelebrityModel.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((err) => {
      res.redirect('/celebrities/create');
      console.log(err);
    });
});

module.exports = router;
