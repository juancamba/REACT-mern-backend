# Backend MERN - Calendar

## Development

1. Instalar dependencias `npm install`
2. Clonar el archivo `.env.template` y renombrarlo a `.env`
3. Cambiar las variables de entorno acorde a tu configuración
4. Correr el servidor `npm start`

# Backend con Mern Mongo, Express , r y Node
Ejecutar con npm run dev

## 372 Inicio del backend
crear un proyecto node
npm init -y

lanzar un node
node index.js

Instalar nodemon: es para ejecutar de forma recurrente el node, ya que sino es euna aplicación de consola. Este lo instalamos de forma global

npm i nodemon -g


nodemon index.js

Luego agrego estas lineas al package json para facilitar el arrancado

```
"scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  },
```

Esto quiere decir que en producción arranco con npm start y en desarrollo con npm run dev



## 373 configuracion express

npm i express

## 374 

Se crea la carpeta public y un index.html. 

Luego en el index.js

app.use( express.static('public'));

Esto sive el html en /

### Creamos archivo .env con una variable de entorno.

Para usar variables de entorno en node hace falta instalar el paquete npm i dotenv

Luego metemos en index.js

require('dotenv').config();

console.log(process.env) // ver las variables que tiene el sistema, la nuestra deberia estar

Para llamar la variable de entorno process.env.PORT


## 375 Rutas
en el index.js
// Rutas
app.use('/api/auth', require("./routes/auth") );

en el archivo /routes/auth

```
const {Router} = require('express');

const router = Router();

router.get("/",(req, res)=>{
    res.json({
        ok: true

    })
})

module.exports = router;
```
## 376 endpoint crear, remover y login

Creamos los controladores, hacemo el archivo auth.js mas escalable

## 377 Recuperar informacion posteos

Impelmentamos la recuperacion del payload
Errores http: https://www.restapitutorial.com/httpstatuscodes

## 378 Express validator
npm i express-validator

Este validator usa un middleware, pero no se pone en el index, sino que se pone en el router auth.js


```
router.post("/new",
     [
        check('name','el nombre es obligatorio').not().isEmpty(),
        check('email','el nombre es obligatorio').isEmail(),
        check('password','Password debe tener mas de 6 caracteres').isLength({min:6}) ,
     ]
    ,crearUsuario);
```
## 379 custom middleware
Extraemos la comprobación a valida-campos.js, por tanto se quita esa logica de los controladores.

Se crea en la carpeta middlewares

En el router hay que agregar la referencia a validarcampos

## 370 configurar base de datos
Usamos el ORM mongoose que es para mongo.

En este vamos a ver mongodb atlas. Nos permite usar bd en la nube. Use la cuenta de google. [https://cloud.mongodb.com/](https://cloud.mongodb.com/)

## 381 configurar bd
instalamos mongoose con npm i mongoose

## 382 modelos con moongoose
Creacion clase Usuario, el modelo y su definición de tipos.

Grabar un usuario en bd

Mongoose, al igual que la mayoria de los orm guarda usuario como usuarios


## 383 validaciones al guardar en bd
Agregamos comprobacion para lanzar error si existe en bd un usuario con ese email


## 384 encriptar contraseña
npm i bcryptjs

## 385 recuperar contraseña y compararla encriptada 
Esto es al hacer login

## 386 generar jwt
npm i jsonwebtoken

Se crea la helper jwt.js
Se implementa el token en login y crear usuario


## 387 se agrega el middleware para validar el jwt
Creamos el archivo validar-jwt


## 388 configurar cors
npm i cors

Esto es un middleware por tanto va en index.js

## 389 en adelente
se crea modelo, routes y controlador para los eventos ( las notas)
Se hace pasar el por el validar token


## 395 uso de un custom para validar fechas 
npm i moment


## 396 agregamos guardado y retorno de objeto tipo dto
Algo parecido al dto


## 397 getEventos
Uso de find() y populate para rellenar los objetos relacionados
```
// trae los eventos, ademas añede el objeto usuario los campos name y email
    const eventos = await Evento.find().populate('user','name email');
```

## 398 actualizar eventos

## 399 eliminar eventos
