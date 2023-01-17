const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
const https = require("https");
const fs = require('fs');


//creamos el servidor
const app = express();

//conectamos a la BDD
conectarDB();
app.use(cors());

app.use(express.json());

app.use("/api/publicaciones", require("./routes/publicacion"));

app.listen(4101, () => {
    console.log("servidor MSG ON");
})

var privateKey = fs.readFileSync( '/opt/bitnami/apache2/conf/ssl/privkey.pem' );
var certificate = fs.readFileSync( '/opt/bitnami/apache2/conf/ssl/cert.pem' );

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(4100);