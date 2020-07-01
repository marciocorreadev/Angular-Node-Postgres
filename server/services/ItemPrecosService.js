const ItemPrecos = require("../database/models/ItemPrecos");

module.exports = {
    async find(id) {
        return await ItemPrecos.findByPk(id);
    },

    async findAll(offset, limit) {
        return await ItemPrecos.findAndCountAll({
            limit,
            offset,
            order: [["id", "ASC"]],
        });
    },

    async create(value) {
        return await ItemPrecos.create(value);
    },

    async update(id, item) {
        return await ItemPrecos.update(item, { where: { id: id } });
    },

    async delete(id) {
        return await ItemPrecos.destroy({ where: { id: id } });
    },

    validate(item) {
        let errors = {
            count: 0,
        };

        for (let key in item) {
            if (isNaN(item[key])) {
                errors[key] = `${key} is a invalid number`;
                errors.count++;
            }
        }
        if (item.ValorVenda == undefined) {
            errors.ValorVenda = `ValorVenda is a invalid number`;
            errors.count++;
        }
        if (errors.count == 0) {
            return true;
        } else {
            return errors;
        }
    },
};
