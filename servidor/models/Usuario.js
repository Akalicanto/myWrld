const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: false
    },
    desc:{
        type: String,
        required: false
    },
    following:{
        type: Array,
        required: false
    },
    followers:{
        type: Array,
        required: false
    },
    profilePath:{
        type: String,
        required: false
    },
    headerPath:{
        type: String,
        required: false
    },
    creationDate:{
        type: Date,
        default: Date.now()
    },
    token:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Usuario", UsuarioSchema);