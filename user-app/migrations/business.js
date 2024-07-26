module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('business', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            update_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('business');
    }
};
