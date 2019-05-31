var express = require('express');
var router = express.Router();
var path = require('path');
const bodyParser = require('body-parser');
var conexion = require('../../db/conexion');

router.use(bodyParser.json());

router.post('/login', function (req, res, next) {
    var datos = req.body.datos;
    
    conexion.query("SELECT*FROM USUARIO WHERE LOG_USU = ? AND CLA_USU = ?",[datos.login, datos.contrasena], function (err, result) {
        if (err) throw err;

        else if (result.length == 0) {

            console.log('No coincide');
            res.json({});
        }
        else {
            console.log("Login");
            res.json(result[0]);
        }
    });
});

module.exports = router;
