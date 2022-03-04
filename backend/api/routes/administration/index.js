const router = require('express').Router();
const guard = require("../../middleware/guard");
const AdministrationController = require('./controller');

router.use(guard.auth);
router
  .get('/', AdministrationController.getAccounts);

module.exports = router;