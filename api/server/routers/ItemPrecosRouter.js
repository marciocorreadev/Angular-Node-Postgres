const express = require("express");
const routes = express.Router();
const PrecoItemController = require("../controllers/ItemPrecosController");
const Authenticate = require("../middlewares/Authenticate");

routes.post("/", PrecoItemController.create);
routes.get("/:id?", PrecoItemController.find);
routes.put("/:id", PrecoItemController.update);
routes.patch("/:id", PrecoItemController.update);
routes.delete("/:id", PrecoItemController.delete);

module.exports = routes;
