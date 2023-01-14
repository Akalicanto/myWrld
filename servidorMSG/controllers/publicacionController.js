const Publicacion = require("../models/Publicacion");

exports.crearPublicacion = async (req, res) => {
    try {
        let publicacion = new Publicacion(req.body);
        publicacion.likes.splice(0, 1);
        await publicacion.save();
        res.send(publicacion);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Ha ocurrido un error" });
    }
}

exports.obtenerPublicaciones = async (req, res) => {
    try {
        let email = req.params.email;
        let id = req.params.id;
        const publicaciones = await Publicacion.find({ email }).sort({ "_id": -1 });

        if (id != "empty" && id != "parent") {
            publicaciones.forEach(p => {
                if (p._id == id) {
                    res.json(p);
                }
            });
        } if (id != "empty") {
            const allP = await Publicacion.find();
            var finalList;
            allP.forEach(p => {
                publicaciones.forEach(s => {
                    if (p._id == s.parentCode) {
                        p.sonNumber++;
                    }
                })
            });
            res.json(allP);
        } else {
            const allP = await Publicacion.find();

            publicaciones.forEach(p => {
                allP.forEach(s => {
                    if (p._id == s.parentCode) {
                        p.sonNumber++;
                    }
                })
            });
            res.json(publicaciones);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Ha ocurrido un error" });
    }
}

exports.obtenerTodasPublicaciones = async (req, res) => {
    try {
        let id = req.params.id;
        const publicaciones = await Publicacion.find({ idUser: id }).sort({ "_id": -1 });
        const allP = await Publicacion.find();

        publicaciones.forEach(p => {
            allP.forEach(s => {
                if (p._id == s.parentCode) {
                    p.sonNumber++;
                }
            })
        });
        res.json(publicaciones);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Ha ocurrido un error" });
    }
}

exports.eliminarPublicacion = async (req, res) => {
    try {
        let publicacion = await Publicacion.findById(req.params.id);

        if (!publicacion) {
            res.status(404).json({ message: "No existe la publicacion" })
        }

        await Publicacion.findOneAndRemove({ _id: req.params.id })

        res.json({ message: "Publicación eliminada con exito" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Ha ocurrido un error" });
    }
}

exports.actualizarPublicacion = async (req, res) => {
    try {
        let id = req.params.id;
        let likeId = req.body.likes;

        let publicacion = await Publicacion.findById(id);

        if (likeId != null && likeId != "") {
            var indexLikes = publicacion.likes.indexOf(likeId);

            if (indexLikes == -1) {
                publicacion.likes.push(likeId);
            } else {
                publicacion.likes.splice(indexLikes, 1);
            }
        }

        publicacion = await Publicacion.findOneAndUpdate({ _id: publicacion.id }, publicacion, { new: true })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Ha ocurrido un error" });
    }
}