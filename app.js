import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.get("/api", (req, res) =>{
    res.json({
        mensaje:"nodejs and JWT"
    })
});

app.post("/api/login", (req, res) =>{
    const user = {
        id: 1,
        nombre: "henry",
        email: "henry@email.com"
    } 
    jwt.sign({user}, 'secretkey', {expiresIn: '32s'}, (err, token) =>{
        res.json({
            token
        });
    });

});

app.post("/api/posts", verifyToken, (req, res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData) =>{
        if(error) {
            res.sendStatus(403);
        }else{
            res.json({
                mensaje: "Post fue creado",
                authData
        });
        }
    });

});


//la funcion que verificara el token
//authorization: bearer <token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    };
};

app.listen(3000, ()=>{
    console.log("Servicio levantado");
});