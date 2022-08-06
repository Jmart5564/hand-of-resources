const { Router } = require('express');
const router = Router();
const { Beer } = require('../models/Beer');

router
  .get('/', async (req, res, next) => {
    try {
      const beer = await Beer.getAll();
      res.json(beer);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const beer = await Beer.getById(req.params.id);
      if (!beer) {next();}
      res.json(beer);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
