module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tenant', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: Sequelize.STRING(2000),
                allowNull: false
            },
            business:{
                type: Sequelize.JSONB,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            app_name: {
                type: Sequelize.STRING,
                allowNull: false
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
        await queryInterface.dropTable('tenant');
    }
};
