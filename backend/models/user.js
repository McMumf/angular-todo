'use strict';

module.exports = (sequelize, Sequelize) => {

    var User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        first_name: {
                type: Sequelize.STRING,
                notEmpty: true
            },
        last_name: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING
        }
    });

    User.associate = function (models) {
        models.User.hasMany(models.Task);
    };

    return User;
};
