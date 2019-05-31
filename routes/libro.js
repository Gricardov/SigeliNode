var express = require('express');
var router = express.Router();
var path = require('path');
const bodyParser = require('body-parser');
var conexion = require('../db/conexion');

router.use(bodyParser.json());

/*
    {
        "datos":{
        	"codigo":1002,
        	"nombres":"Manolo",
        	"apPaterno":"Cabeza",
        	"apMaterno":"De huevo",
        	"dni":"71488754",
        	"edad":21,
        	"correo":"nmj@gmail.com",
        	"telefono":"987564154",
        	"login":"bruno",
        	"contrasena":"mars"
        }
    }    
*/

router.post('/listado', function (req, res, next) {
    var datos = req.body.datos;
    
    conexion.query("CALL USP_OBTENER_LIBROS()"
    ,[], function (err, result) {
        if (err) throw err;
        
            res.json(result);

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
