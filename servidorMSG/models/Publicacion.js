const mongoose = require("mongoose");

const PublicacionSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    msg:{
        type: String,
        required: true
    },
    idUser:{
        type: String,
        required: true
    },
    parentCode:{
        type: String,
        required: true
    },
    sonNumber:{
        type: Number,
        default: 0,
        required: false
    },
    likes:{
        type: Array,
        required: false
    },
    creationDate:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Publicacion", PublicacionSchema);