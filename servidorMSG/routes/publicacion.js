//Rutas para publicaciones
const express = require("express");
const router = express.Router();
const publicacionController = require("../controllers/publicacionController");

// api/publicaciones
router.post("/", publicacionController.crearPublicacion);
router.get("/:email/:id", publicacionController.obtenerPublicaciones);
router.get("/:id", publicacionController.obtenerTodasPublicaciones);
router.delete("/:id", publicacionController.eliminarPublicacion);
router.put("/:id", publicacionController.actualizarPublicacion);

module.exports = router;