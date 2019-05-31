var express = require('express');
var router = express.Router();
var path = require('path');
const bodyParser = require('body-parser');
var conexion = require('../db/conexion');

router.use(bodyParser.json());

/*
    {
        "datos":{
        	"id":1002,
        	"nombre":"Manolo",
        	"descripcion":"Cabeza",
        	"idTipo":"De huevo",
        	"idEstado":"71488754"
        }
    }    
*/

router.post('/listado', function (req, res, next) {
    var datos = req.body.datos;
    
    conexion.query("CALL USP_OBTENER_LIBROS()"
    ,[], function (err, result) {
        if (err) throw err;
        
            res.json(result[0]);

   });
});

router.post('/registro', function (req, res, next) {
    var datos = req.body.datos;
    
    conexion.query("INSERT INTO LIBRO VALUES (?,?,?,?,?)"
    ,[datos.id, datos.nombre, datos.descripcion, datos.idTipo, datos.idEstado], function (err, result) {
        if (err) throw err;
        
            res.json(result);

   });
});

router.post('/actualizacion', function (req, res, next) {
    var datos = req.body.datos;
    
    conexion.query("UPDATE LIBRO SET NOM_LIB=?, DES_LIB=?, ID_TIP=?, ID_EST=? WHERE ID_LIB=?",
    [datos.nombre, datos.descripcion, datos.idTipo, datos.idEstado, datos.id], function (err, result) {
        if (err) throw err;

        res.json(result);

    });
});

router.post('/eliminacion', function (req, res, next) {
    var datos = req.body.datos;
    
    conexion.query("DELETE FROM LIBRO WHERE ID_LIB=?",[datos.id], function (err, result) {
        if (err) throw err;

        res.json(result);
    });
});

module.exports = router;
