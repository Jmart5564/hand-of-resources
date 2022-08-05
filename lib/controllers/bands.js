const { Router } = require('express');
const router = Router();
const { Bands } = require('../models/Bands');

router
  .get('/', async (req, res, next) => {
    try {
      const bands = await Bands.getAll();
      res.json(bands);
    } catch (e) {
      next(e);
    }
  })
  
  .get('/:id', async (req, res, next) => {
    try {
      const band = await Bands.getById(req.params.id);
      if (!band) {next();}
      res.json(band);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const bands = await Bands.insert(req.body);
      res.json(bands);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const band = await Bands.updateById(req.params.id, req.body);
      res.json(band);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const band = await Bands.delete(req.params.id);
      res.json(band);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
