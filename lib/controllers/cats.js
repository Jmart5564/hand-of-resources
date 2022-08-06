const { Router } = require('express');
const router = Router();
const { Cats } = require('../models/Cats');

router
  .get('/', async (req, res, next) => {
    try {
      const cats = await Cats.getAll();
      res.json(cats);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const cat = await Cats.getById(req.params.id);
      if (!cat) {next();}
      res.json(cat);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const cats = await Cats.insert(req.body);
      res.json(cats);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const cat = await Cats.updateById(req.params.id, req.body);
      res.json(cat);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const band = await Cats.delete(req.params.id);
      res.json(band);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
