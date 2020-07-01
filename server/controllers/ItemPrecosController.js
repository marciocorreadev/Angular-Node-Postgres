const ItemPrecosService = require("../services/ItemPrecosService");
const ItemPrecos = require("../database/models/ItemPrecos");

module.exports = {
    async find(req, res) {
        const { id } = req.params;
        if (id) {
            if (isNaN(id) && id != undefined) {
                return res.status(406).json({
                    info: "invalid ID",
                    statusCode: "406",
                    erros: `ID ${id} is invalid`,
                });
            }
            try {
                const findPrices = await ItemPrecosService.find(id);

                if (findPrices == undefined) {
                    return res.status(202).json({
                        info: "no data found",
                        statusCode: "202",
                        erros: findPrices,
                    });
                } else {
                    return res.status(200).json({
                        info: "found",
                        statusCode: "200",
                        price: findPrices,
                    });
                }
            } catch (error) {
                return res.status(500).json({
                    info: "Internal error",
                    statusCode: "500",
                    erros: error,
                });
            }
        } else {
            const { page, limit } = req.query;
            let offset = 0;
            if (isNaN(page) || page == 1 || limit == undefined) {
                offset = 0;
            } else {
                offset = (parseInt(page) - 1) * limit;
            }
            try {
                const findPrices = await ItemPrecosService.findAll(
                    offset,
                    limit
                );

                if (findPrices.count == 0) {
                    return res.status(202).json({
                        info: "no data found",
                        statusCode: "202",
                        erros: findPrices,
                    });
                } else {
                    return res.status(200).json({
                        info: "found",
                        statusCode: "200",
                        response: {
                            page,
                            limit,
                            prices: findPrices,
                        },
                    });
                }
            } catch (error) {
                return res.status(500).json({
                    info: "Internal error",
                    statusCode: "500",
                    erros: error,
                });
            }
        }
    },

    async create(req, res) {
        const item = {
            ...req.body,
        };
        const validate = ItemPrecosService.validate(item);
        if (validate !== true) {
            return res.status(406).json({
                info: "invalid fields",
                statusCode: "406",
                erros: validate,
            });
        } else {
            try {
                const trySave = await ItemPrecosService.create(item);
                if (trySave.id == undefined) {
                    return res.status(406).json({
                        info: "fail to save",
                        statusCode: "406",
                        erros: trySave,
                    });
                } else {
                    return res.status(200).json({
                        info: "created",
                        statusCode: "200",
                        response: trySave,
                    });
                }
            } catch (error) {
                return res.status(500).json({
                    info: "Internal error",
                    statusCode: "500",
                    erros: error,
                });
            }
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const item = {
            ...req.body,
        };

        if (isNaN(id) && id != undefined) {
            return res.status(406).json({
                info: "invalid ID",
                statusCode: "406",
                erros: `ID ${id} is invalid`,
            });
        }

        const validate = ItemPrecosService.validate(item);
        if (validate !== true) {
            return res.status(406).json({
                info: "invalid fields",
                statusCode: "406",
                erros: validate,
            });
        } else {
            try {
                const tryUpdate = await ItemPrecosService.update(id, item);
                if (tryUpdate == 0) {
                    return res.status(406).json({
                        info: "not updated",
                        statusCode: "406",
                        erros: "not found",
                    });
                } else {
                    const updatedItem = await ItemPrecosService.find(id);
                    return res.status(200).json({
                        info: "updeted",
                        statusCode: "200",
                        response: updatedItem,
                    });
                }
            } catch (error) {
                return res.status(500).json({
                    info: "Internal error",
                    statusCode: "500",
                    erros: error,
                });
            }
        }
    },

    async delete(req, res) {
        const { id } = req.params;
        if (isNaN(id) && id != undefined) {
            return res.status(406).json({
                info: "invalid ID",
                statusCode: "406",
                erros: `ID ${id} is invalid`,
            });
        }

        try {
            const item = await ItemPrecosService.find(id);
            const tryDelete = await ItemPrecosService.delete(id);
            if (tryDelete == 0) {
                return res.status(406).json({
                    info: "not deleted",
                    statusCode: "406",
                    erros: "not found",
                });
            } else {
                return res.status(200).json({
                    info: "deleted",
                    statusCode: "200",
                    response: item,
                });
            }
        } catch (error) {
            return res.status(500).json({
                info: "Internal error",
                statusCode: "500",
                erros: error,
            });
        }
    },
};
