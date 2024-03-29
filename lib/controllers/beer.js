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
  })
  .post('/', async (req, res, next) => {
    try {
      const beer = await Beer.insert(req.body);
      res.json(beer);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const beer = await Beer.updateById(req.params.id, req.body);
      res.json(beer);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const beer = await Beer.delete(req.params.id);
      res.json(beer);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
