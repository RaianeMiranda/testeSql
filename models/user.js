var mysql = require('mysql2/promise');

const UserSequelize = sequelize.define("User", {
    name: {
        type: String,
        require: true
    },
    email: { 
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = User;