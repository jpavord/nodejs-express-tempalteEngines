const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/////////////////////////////////////
//     HANDLEBARS
////////////////////////////////////
// const handlebars = require('express-handlebars')
// app.engine(
//     "hbs",
//     handlebars.engine({
//       extname: ".hbs",
//       defaultLayout: "index.hbs",
//       layoutsDir: __dirname + "/views/layouts",
//     })
//   );
// app.set("view engine", "hbs");
// app.set("views", "./views");

/////////////////////////////////////
//     PUG JS
/////////////////////////////////////
// const pug = require('pug')
// app.set("views", "./views");
// app.set("view engine", "pug");

/////////////////////////////////////
//      EJS
/////////////////////////////////////
const ejs = require('ejs')
app.set("views", "./views");
app.set("view engine", "ejs");

let array_productos = []

app.get("/productos", function (req, res){
    res.render("main", {productos: array_productos})
})

app.post('/', (req, res)=>{
    try{
        let id
        if (array_productos.length === 0){ 
        id = 1
        } else{
            let nid = array_productos[array_productos.length-1].id
            id = parseInt(nid) +1
            }
            array_productos.push({...req.body, id: id})
            res.status(201).redirect(req.originalUrl) 
    } catch(err){
        console.log(`Error,no se puede leer el archivo: ${err.message}`);
    }
})

app.listen(8080, ()=>{console.log("Servidor escuchando por el puerto 8080")});

app.on("Error", (err)=>{console.log(`Error en el servidor ${err}`)});


