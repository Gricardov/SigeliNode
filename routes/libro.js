var express = require('express');
var router = express.Router();
var path = require('path');
const bodyParser = require('body-parser');
var conexion = require('../db/conexion');

router.use(bodyParser.json());

/*
    {
       "datos":{
        	"id":2008,
        	"nombre":"Manolo cabeza de huevo, la trilogia",
        	"descripcion":"La descripción de mi libro",
        	"idTipo":"3",
        	"idEstado":"1"
        }
    }   
*/

router.post('/obtener', function (req, res, next) {

    var datos = req.body.datos;
    console.log("datos "+JSON.stringify(datos))
    var parametros = []

    if (datos && datos.nombre) {
        parametros.push(datos.nombre)
    }

    if (parametros.length > 0) {
        conexion.query(
            "CALL USP_OBTENER_LIBROS(?)"
            , [datos.nombre], function (err, result) {
                if (err) throw err;

                res.json(result[0]);

            });
    }
    else {
        conexion.query(
            "SELECT*FROM LIBRO"
            , [], function (err, result) {
                if (err) throw err;

                res.json(result);

            });
    }


});

router.post('/registro', function (req, res, next) {
    var datos = req.body.datos;

    conexion.query("INSERT INTO LIBRO VALUES (?,?,?,?,?)"
        , [datos.id, datos.nombre, datos.descripcion, datos.idTipo, datos.idEstado], function (err, result) {
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

    conexion.query("DELETE FROM LIBRO WHERE ID_LIB=?", [datos.id], function (err, result) {
        if (err) throw err;

        res.json(result);
    });
});

// Para obtener los valores de tipo y estado
router.post('/obtenerTipos', function (req, res, next) {

    conexion.query("SELECT ID_TIP id, DES_TIP descripcion FROM TIPO_LIBRO"
        , [], function (err, result) {
            if (err) throw err;

            res.json(result);

        });
});

router.post('/obtenerEstados', function (req, res, next) {

    conexion.query("SELECT ID_EST id, DES_EST descripcion FROM ESTADO_LIBRO"
        , [], function (err, result) {
            if (err) throw err;

            res.json(result);

        });
});

module.exports = router;
