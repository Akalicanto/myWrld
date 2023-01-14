const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

//creamos el servidor
const app = express();

//conectamos a la BDD
conectarDB();
app.use(cors());

app.use(express.json());

app.use("/api/publicaciones", require("./routes/publicacion"));

app.listen(4100, () => {
    console.log("servidor MSG ON");
})