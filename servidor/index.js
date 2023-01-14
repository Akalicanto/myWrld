const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser")

//creamos el servidor
const app = express();

//conectamos a la BDD
conectarDB();
app.use(cors());
app.use(bodyParser({limit: '50mb'}));

app.use(express.json());

app.use("/api/usuarios", require("./routes/usuario"));

app.listen(4000, () => {
    console.log("servidor USER ON");
})

app.use('/uploads', express.static('uploads'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
