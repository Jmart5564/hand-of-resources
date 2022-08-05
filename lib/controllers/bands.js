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
  });

module.exports = router;
