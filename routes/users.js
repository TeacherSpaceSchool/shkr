const express = require('express');
const router = express.Router();
const passportEngine = require('../module/passport');


/* GET users listing. */
router.get('/', async (req, res, next) => {
  await passportEngine.verifydeuser(req, res, async ()=>{
      await res.send('12345respond with a resource54321' + req.body.newwindow);
  });
});

router.post('/signin', async (req, res, next) => {
    passportEngine.signinuser(req, res)
});

module.exports = router;
