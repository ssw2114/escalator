var Sequelize = require('sequelize');
var pkg = require('../../package.json');
var databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');
var db = new Sequelize(process.env.DATABASE_URL || "postgres://localhost:5432/" + databaseName, {
    logging: false
});
module.exports = db;
// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
    after('close database connection', function () { return db.close(); });
}
//# sourceMappingURL=db.js.map