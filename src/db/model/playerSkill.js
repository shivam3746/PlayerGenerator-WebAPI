// ---------------------------------------------------------------------------------------------
// YOU CAN MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// YOU SHOULD NOT CHANGE THE EXPORTED VALUE OF THIS FILE
// ---------------------------------------------------------------------------------------------

import Sequelize from 'sequelize';
import database from '../index';

const PlayerSkill = database.define('playerSkill', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    skill: {
        type: Sequelize.STRING(200),
        allowNull : false
    },
    value: {
        type: Sequelize.INTEGER,
        allowNull : false
    }
}, {
    timestamps: false
})

PlayerSkill.associate = models => {
    models.PlayerSkill.belongsTo(models.Player, {
      foreignKey: 'playerId',
    });
};

export default PlayerSkill;