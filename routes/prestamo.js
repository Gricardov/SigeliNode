var express = require('express');
var router = express.Router();
var path = require('path');
const bodyParser = require('body-parser');
var conexion = require('../db/conexion');

router.use(bodyParser.json());

router.post('/listado', function (req, res, next) {
    
    conexion.query("CALL USP_OBTENER_PRESTAMOS()",[], function (err, result) {
        if (err) throw err;

            res.json(result[0]);
        
    });
});
//
/*
    {
       "datos":{
        	"codUsu":1001,
        	"idLib":2002,
        	"fecFin":"2019-06-05 00:00:00",
        	"idTipo":"4",
        	"observacion":"Ninguna por ahora"
        }
    }
*/

router.post('/insercion', function (req, res, next) {
    
    var datos = req.body.datos;

    conexion.query("INSERT INTO PRESTAMO VALUES (NULL,?,?,CURDATE(),?,?,NULL)",[datos.codUsu,datos.idLib,datos.fecFin,datos.observacion], function (err, result) {
        if (err) throw err;

            res.json(result);
        
    });
});

/*
    {
       "datos":{
        	"fecDevPres":"2019-06-05 00:00:00",
        	"observacion":"en mal estado",
        	"devuelto":"2019-06-05 00:00:00",
        	"idPres":"2"
        }
    }
*/

router.post('/actualizacion', function (req, res, next) {

    var datos = req.body.datos;

    conexion.query("UPDATE PRESTAMO SET FEC_DEV_PRES=?, OBS_PRES=?, DEVUELTO=? WHERE ID_PRES=?",[datos.fecDevPres,datos.observacion,datos.devuelto,datos.idPres], function (err, result) {
        if (err) throw err;

            res.json(result);
        
    });
});

/*
{
    "datos":{
         "codUsu":1001
     }
 }
 */

router.post('/misPrestamos', function (req, res, next) {
    
    var datos = req.body.datos;

    conexion.query(`SELECT ID_PRES id, ID_LIB idLib, FEC_PRES fecPres, FEC_DEV_PRES fecDevPres, OBS_PRES observacion, 
    DEVUELTO devuelto FROM PRESTAMO WHERE COD_USU=?`,[datos.codUsu], function (err, result) {
        if (err) throw err;

            res.json(result);
        
    });
});

module.exports = router;