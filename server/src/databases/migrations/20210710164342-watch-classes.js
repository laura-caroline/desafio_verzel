'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('watch_classes',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user:{
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_class: {
        allowNull:false,
        references: {
          model: 'classes',
          key: 'id'
        },
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      watched: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('watch_classes')
  }
};
