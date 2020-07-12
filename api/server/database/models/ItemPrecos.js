const { Model, DataTypes } = require("sequelize");

class ItemPrecos extends Model {
    static init(sequelize) {
        super.init(
            {
                ValorCompra: DataTypes.REAL,

                PercCreditoICMS: DataTypes.REAL,
                ValorCreditoICMS: DataTypes.REAL,

                PercFrete: DataTypes.REAL,
                ValorFrete: DataTypes.REAL,

                PercIPI: DataTypes.REAL,
                ValorIPI: DataTypes.REAL,

                PercICMSST: DataTypes.REAL,
                ValorICMSST: DataTypes.REAL,

                ValorAdicionalCompra: DataTypes.REAL,

                PercMargemLucro: DataTypes.REAL,
                ValorMargemLucro: DataTypes.REAL,

                ValorVenda: DataTypes.REAL,
            },
            { sequelize }
        );
    }
}
// ItemPrecos.sync({ force: true });

module.exports = ItemPrecos;
