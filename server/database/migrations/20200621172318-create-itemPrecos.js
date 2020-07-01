"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("ItemPrecos", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            ValorCompra: Sequelize.REAL,

            PercCreditoICMS: Sequelize.REAL,
            ValorCreditoICMS: Sequelize.REAL,

            PercFrete: Sequelize.REAL,
            ValorFrete: Sequelize.REAL,

            PercIPI: Sequelize.REAL,
            ValorIPI: Sequelize.REAL,

            PercICMSST: Sequelize.REAL,
            ValorICMSST: Sequelize.REAL,

            ValorAdicionalCompra: Sequelize.REAL,

            PercMargemLucro: Sequelize.REAL,
            ValorMargemLucro: Sequelize.REAL,

            ValorVenda: {
                type: Sequelize.REAL,
                allowNull: false,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("ItemPrecos");
    },
};
