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

module.exports = router;