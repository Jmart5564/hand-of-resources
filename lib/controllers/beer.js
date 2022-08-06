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
  });

module.exports = router;
