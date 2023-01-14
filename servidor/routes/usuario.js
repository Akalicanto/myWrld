//Rutas para usuarios
const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

// api/usuarios
router.post("/", usuariosController.crearUsuario);
router.get("/", usuariosController.obtenerUsuarios);
router.put("/:email", usuariosController.actualizarUsuario);
router.get("/:email/:password", usuariosController.obtenerUsuario);
router.delete("/:email", usuariosController.eliminarUsuario);

module.exports = router;