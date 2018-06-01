'use strict';

module.exports = (sequelize, Sequelize) => {

    var Task = sequelize.define('Task', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        completed: {
                type: Sequelize.BOOLEAN
            },
        task: {
            type: Sequelize.TEXT
        }
    });

    Task.associate = function (models) {
        models.Task.belongsTo(models.User, {
            foreignKey: 'UserId'
        });
    };

    return Task;
};
