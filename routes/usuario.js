var express = require('express');
var router = express.Router();
var path = require('path');
const bodyParser = require('body-parser');
var conexion = require('../db/conexion');

router.use(bodyParser.json());

router.post('/login', function (req, res, next) {
    var datos = req.body.datos;
    
    conexion.query("SELECT COD_USU codigo, NOM_USU nombres, APE_PAT_USU apPaterno, APE_MAT_USU apMaterno, DNI_USU dni, EDAD_USU edad FROM USUARIO WHERE LOG_USU = ? AND CLA_USU = ?",[datos.login, datos.contrasena], function (err, result) {
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

router.post('/registro', function (req, res, next) {
    var datos = req.body.datos;
    
    conexion.query("INSERT INTO USUARIO VALUES (NULL,?,?,?,?,?,?,?,?,?)"
    ,[datos.nombres, datos.apPaterno, datos.apMaterno, datos.dni, datos.edad,datos.correo,datos.telefono,datos.login,datos.contrasena], function (err, result) {
        if (err) throw err;
        
            res.json(result);

   });
});

router.post('/actualizacion', function (req, res, next) {
    var datos = req.body.datos;
    
    conexion.query("UPDATE USUARIO SET NOM_USU=?, APE_PAT_USU=?, APE_MAT_USU=?, DNI_USU=?, EDAD_USU=?, EMAIL_USU=?, TEL_USU=?, LOG_USU=?, CLA_USU=? WHERE COD_USU=?",
    [datos.nombres, datos.apPaterno, datos.apMaterno, datos.dni, datos.edad,datos.correo,datos.telefono,datos.login,datos.contrasena,datos.codigo], function (err, result) {
        if (err) throw err;

        res.json(result);

    });
});

router.post('/eliminacion', function (req, res, next) {
    var datos = req.body.datos;
    
    conexion.query("DELETE FROM USUARIO WHERE COD_USU=?",[datos.codigo], function (err, result) {
        if (err) throw err;

        res.json(result);
    });
});

module.exports = router;
