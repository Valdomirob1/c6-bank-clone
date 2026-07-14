const express = require("express");
const cors = require("cors");
const path = require("path");


const database = require("./database");



const app = express();



const PORT = 3000;





// =======================
// CONFIGURAÇÕES
// =======================


app.use(cors({

    origin: "*",

    methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE"
    ],

    allowedHeaders:[
        "Content-Type",
        "Authorization"
    ]

}));




app.use(express.json());





// =======================
// ARQUIVOS FRONTEND
// =======================


app.use(
    express.static(
        path.join(__dirname,"../frontend")
    )
);






// =======================
// ROTAS
// =======================



const authRoutes =
require("./routes/auth");


const cadastroRoutes =
require("./routes/cadastro");




app.use(
    "/api",
    authRoutes
);



app.use(
    "/api",
    cadastroRoutes
);








// =======================
// TESTE SERVIDOR
// =======================


app.get("/api/status",(req,res)=>{


    res.json({

        sistema:"NexBank API",

        status:"online",

        data:
        new Date()

    });


});







// =======================
// ERRO GLOBAL
// =======================


app.use((err,req,res,next)=>{


    console.error(err);



    res.status(500).json({

        mensagem:
        "Erro interno no servidor."

    });



});







// =======================
// INICIAR SERVIDOR
// =======================


database.connect()
.then(()=>{


    app.listen(PORT,()=>{


        console.log(
            `NexBank rodando na porta ${PORT}`
        );


    });



})
.catch((erro)=>{


    console.error(
        "Erro ao iniciar banco:",
        erro
    );


});