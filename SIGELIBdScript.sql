USE BDSIGELI;

DROP TABLE PRESTAMO;
DROP TABLE USUARIO;
DROP TABLE LIBRO;
DROP TABLE TIPO_LIBRO;
DROP TABLE ESTADO_LIBRO;

CREATE TABLE USUARIO (
COD_USU INT AUTO_INCREMENT,
NOM_USU VARCHAR (50) NOT NULL,
APE_PAT_USU VARCHAR (50) NOT NULL,
APE_MAT_USU VARCHAR (50) NOT NULL,
DNI_USU CHAR (8) NOT NULL,
EDAD_USU INT NOT NULL,
EMAIL_USU VARCHAR (50) NULL,
TEL_USU VARCHAR (20) NULL,
LOG_USU VARCHAR (20) NOT NULL,
CLA_USU VARCHAR (20) NOT NULL,
PRIMARY KEY (COD_USU)
);

ALTER TABLE USUARIO
AUTO_INCREMENT=1001;

CREATE TABLE TIPO_LIBRO (
ID_TIP INT PRIMARY KEY,
DES_TIP VARCHAR (50) NOT NULL
);

CREATE TABLE ESTADO_LIBRO (
ID_EST INT PRIMARY KEY,
DES_EST VARCHAR (50) NOT NULL
);

CREATE TABLE LIBRO (
ID_LIB INT PRIMARY KEY,
NOM_LIB VARCHAR (50) NOT NULL,
DES_LIB VARCHAR(500) NOT NULL,
ID_TIP INT NOT NULL,
ID_EST INT NOT NULL
);

ALTER TABLE LIBRO
ADD FOREIGN KEY (ID_TIP) REFERENCES TIPO_LIBRO (ID_TIP),
ADD FOREIGN KEY (ID_EST) REFERENCES ESTADO_LIBRO (ID_EST);

CREATE TABLE PRESTAMO (
ID_PRES INT AUTO_INCREMENT,
COD_USU INT NOT NULL,
ID_LIB INT NOT NULL,
FEC_PRES DATETIME NOT NULL,
FEC_DEV_PRES DATETIME NOT NULL,
OBS_PRES VARCHAR (500) DEFAULT 'Sin observaciones',
DEVUELTO DATETIME NULL,
PRIMARY KEY (ID_PRES)
);

ALTER TABLE PRESTAMO
ADD FOREIGN KEY (COD_USU) REFERENCES USUARIO (COD_USU),
ADD FOREIGN KEY (ID_LIB) REFERENCES LIBRO (ID_LIB);

-- PROCEDIMIENTOS

DELIMITER //

CREATE PROCEDURE USP_OBTENER_LIBROS(NOMBRE VARCHAR(500))
BEGIN
SELECT L.ID_LIB id, L.NOM_LIB nombre, L.DES_LIB descripcion, TL.DES_TIP tipo, EL.DES_EST estado
FROM LIBRO L
INNER JOIN TIPO_LIBRO TL
ON L.ID_TIP=TL.ID_TIP
INNER JOIN ESTADO_LIBRO EL
ON L.ID_EST=EL.ID_EST
WHERE L.NOM_LIB LIKE CONCAT('%',NOMBRE,'%');
END; //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE USP_OBTENER_PRESTAMOS()
BEGIN
SELECT P.ID_PRES id, U.COD_USU codUsu, U.NOM_USU nomUsu, U.APE_PAT_USU apePatUsu, U.APE_MAT_USU apeMatUsu, P.ID_LIB idLib, L.NOM_LIB nomLib, P.FEC_PRES fecPrestamo, P.FEC_DEV_PRES fecDevolucion, P.OBS_PRES observacion, P.DEVUELTO devuelto
FROM PRESTAMO P
INNER JOIN USUARIO U
ON P.COD_USU=U.COD_USU
INNER JOIN LIBRO L
ON P.ID_LIB=L.ID_LIB;
END; //

DELIMITER ;

-- INSERT

INSERT INTO USUARIO VALUES (NULL,'Vanesita','Linda','Bella','78454154',22,'vane@gmail.com','987654321','vane','sita');

INSERT INTO TIPO_LIBRO VALUES (1,'Acción'),(2,'Romántico'),(3,'Comedia'),(4,'Aventura'),(5,'Misterio'),(6,'Ciencia ficción');

INSERT INTO ESTADO_LIBRO VALUES (1,'Disponible'),(2,'Prestado'),(3,'Retirado');

INSERT INTO LIBRO VALUES 	(1001,'El pez','Lorem ipsum...',6,1),
							(2000,'Kristy Wells','Lorem ipsum...',2,1),
                            (2001,'Eu nao falo portugues muito bem','Lorem ipsum...',4,1),
                            (2002,'¿Y dónde está el perro?','Lorem ipsum...',6,1),
                            (2003,'Buscando el amor','Lorem ipsum...',2,1),
                            (2004,'Señoritas, señoritas','Lorem ipsum...',4,1),
                            (2005,'Autocondicionamiento','Lorem ipsum...',4,1),
                            (2006,'Pablito, Pedrito y los polímeros','Lorem ipsum...',3,1);
                          
INSERT INTO PRESTAMO VALUES (NULL,1001,2000,CURDATE(),DATE_ADD(CURDATE(), INTERVAL 3 DAY),'Ninguna',NULL);

SELECT*FROM USUARIO;
SELECT*FROM LIBRO;
SELECT*FROM TIPO_LIBRO;
SELECT*FROM ESTADO_LIBRO;
SELECT*FROM PRESTAMO;

CALL USP_OBTENER_LIBROS();
CALL USP_OBTENER_PRESTAMOS();