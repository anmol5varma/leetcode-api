module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('entries', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      transactionId: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING,
      },
      notes: {
        type: Sequelize.TEXT,
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      totalCost: {
        type: Sequelize.FLOAT
      },
      sectionShortHand:{
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'sections',
          key: 'shortHand'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('entries');
  }
};
