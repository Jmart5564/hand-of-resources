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
  });

module.exports = router;
