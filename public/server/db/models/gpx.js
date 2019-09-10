var Sequelize = require('sequelize');
var db = require('../db');
var Gpx = db.define('gpx', {
    gpxString: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    uniqueId: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    sequence: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        default: ''
    }
});
module.exports = Gpx;
//# sourceMappingURL=gpx.js.map