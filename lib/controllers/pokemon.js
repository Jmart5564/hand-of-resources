const { Router } = require('express');
const router = Router();
const { Pokemon } = require('../models/Pokemon');

router
  .get('/', async (req, res, next) => {
    try {
      const pokemon = await Pokemon.getAll();
      res.json(pokemon);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const pokemon = await Pokemon.getById(req.params.id);
      if (!pokemon) {next();}
      res.json(pokemon);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const pokemon = await Pokemon.insert(req.body);
      res.json(pokemon);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const pokemon = await Pokemon.updateById(req.params.id, req.body);
      res.json(pokemon);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
