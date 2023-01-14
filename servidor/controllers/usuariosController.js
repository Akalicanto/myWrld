const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.crearUsuario = async (req, res) => {
    try {
        let usuario = new Usuario(req.body);

        usuario.password = await bcryptjs.hash(usuario.password, 8);
        usuario.name = usuario.username;
        usuario.following.splice(0, 1);
        usuario.followers.splice(0, 1);

        await usuario.save();
        res.send(usuario);
    } catch (error) {
        res.status(500).send({ message: "El Correo o Usuario ya estan en uso" });
    }
}

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();

        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Ha ocurrido un error" });
    }
}

exports.actualizarUsuario = async (req, res) => {
    try {
        const { username, email, password, name, desc, following, followers, profile, profileName, header, headerName } = req.body;
        let usuario = await Usuario.findOne({ email });

        if(profileName != "" && profileName != undefined && !profileName.includes("/assets/")){
            var base64Data = profile.replace(/^data:image\/\w+;base64,/, '');
            usuario.profilePath = 'uploads/'+profileName;
            fs.writeFile('uploads/'+profileName, base64Data, 'base64', err => {
                if (err) {
                  res.status(500).send({ message: "ERROR AL SUBIR LA IMAGEN" });
                }
              });                
        }

        if(headerName != "" && headerName != undefined && !headerName.includes("/assets/")){
            var base64Data = header.replace(/^data:image\/\w+;base64,/, '');
            usuario.headerPath = 'uploads/'+headerName;
            fs.writeFile('uploads/'+headerName, base64Data, 'base64', err => {
                if (err) {
                  res.status(500).send({ message: "ERROR AL SUBIR LA IMAGEN" });
                }
              });                
        }

        if (!usuario) {
            res.status(404).json({ message: "No existe el usuario" })
        } else {

            if (username != null && username != "") {
                usuario.username = username;
            }

            if (password != null && password != "") {
                usuario.password = await bcryptjs.hash(password, 8);
            }

            if (name != null && name != "") {
                usuario.name = name;
            }

            if (desc != null && desc != "" && desc != "myWrldDescDelete") {
                usuario.desc = desc;
            } if (desc == "myWrldDescDelete") {
                usuario.desc = "";
            }

            if (following != null && following != "") {//AÑADO TU [ID] EN MI LISTA DE SEGUIDOS
                var indexFollowing = usuario.following.indexOf(following);// SI -> x | NO -> -1

                if (indexFollowing == -1) {// SI NO ESTAS EN MI LISTA TE AGREGO
                    usuario.following.push(following);
                } else {// SI SI ESTAS EN MI LISTA TE ELIMINO
                    usuario.following.splice(indexFollowing, 1);
                }
            }

            if (followers != null && followers != "") {//DESDE MI USER ME AÑADO A TU LISTA DE SEGUIDORES [TU ID]
                var tuUsuario = await Usuario.findById(followers);//TE BUSCO
                var indexFollower = tuUsuario.followers.indexOf(usuario._id);//BUSCO SI ESTOY EN TU LISTA DE SEGUIDORES

                if (indexFollower == -1) {// SI NO ESTOY EN TU LISTA ME AÑADO
                    tuUsuario.followers.push(usuario._id.toString());
                } else {// SI SI ESTAS EN MI LISTA TE ELIMINO
                    tuUsuario.followers.splice(indexFollower, 1);
                }

                tuUsuario = await Usuario.findOneAndUpdate({ _id: followers }, tuUsuario, { new: true })
            }

            usuario = await Usuario.findOneAndUpdate({ _id: usuario.id }, usuario, { new: true })
            
            res.json(usuario);
        }
    } catch (error) {
        res.status(500).send({ message: "Ese usuario ya está en uso" });
    }
}

exports.obtenerUsuario = async (req, res) => {
    try {
        let email = req.params.email;
        let password = req.params.password;
        let usuario = await Usuario.findOne({ email });

        if (usuario != null) {
            bcryptjs.compare(password, usuario.password, (err, data) => {

                if (err) throw res.status(500).send({ message: "Las contrasñas no son iguales" });

                if (data) {
                    usuario.token = jwt.sign({ usuario }, "secretkey", { expiresIn: "10h" });

                    res.json(usuario);
                } else {
                    res.status(401).json({ message: "Credenciales Incorrectas" })
                }

            })
        } else {
            res.status(404).json({ message: "No existe el usuario" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Ha ocurrido un error" });
    }
}

exports.eliminarUsuario = async (req, res) => {
    try {
        let email = req.params.email;
        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            res.status(404).json({ message: "No existe el usuario" })
        }

        await Usuario.findOneAndRemove({ _id: usuario.id })

        res.json({ message: "Usuario eliminado con exito" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Ha ocurrido un error" });
    }
}