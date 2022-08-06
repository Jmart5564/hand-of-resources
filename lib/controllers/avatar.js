const { Router } = require('express');
const router = Router();
const { Avatar } = require('../models/Avatar');

router
  .get('/', async (req, res, next) => {
    try {
      const avatar = await Avatar.getAll();
      res.json(avatar);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const avatar = await Avatar.getById(req.params.id);
      if (!avatar) {next();}
      res.json(avatar);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
