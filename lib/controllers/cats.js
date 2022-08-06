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
  });

module.exports = router;
