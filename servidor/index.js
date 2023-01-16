const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require('fs');

//creamos el servidor
const app = express();

//conectamos a la BDD
conectarDB();
app.use(cors());
app.use(bodyParser({limit: '50mb'}));

app.use(express.json());

app.use("/api/usuarios", require("./routes/usuario"));

app.listen(4001, () => {
    console.log("servidor USER ON");
})

var privateKey = fs.readFileSync( '/opt/bitnami/apache2/conf/ssl/privKey.pem' );
var certificate = fs.readFileSync( '/opt/bitnami/apache2/conf/ssl/fullchain.pem' );

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(4000);

app.use('/uploads', express.static('uploads'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
