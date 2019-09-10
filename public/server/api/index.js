var router = require('express').Router();
require('../../secrets');
module.exports = router;
router.use('/images', require('./images'));
router.use('/gpx', require('./gpx'));
router.use(function (req, res, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});
//# sourceMappingURL=index.js.map