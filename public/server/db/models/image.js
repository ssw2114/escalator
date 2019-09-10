var Sequelize = require('sequelize');
var db = require('../db');
var Image = db.define('image', {
    time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING
    },
    orientation: {
        type: Sequelize.INTEGER,
        default: 1
    }
});
module.exports = Image;
//# sourceMappingURL=image.js.map