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
  });

module.exports = router;
