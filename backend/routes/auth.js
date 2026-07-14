const express = require("express");

const router = express.Router();

const database = require("../database");






router.post("/login",(req,res)=>{


    const db =
    database.getDB();




    const {

        cpf,

        senha

    } = req.body;







    if(!cpf || !senha){


        return res.status(400).json({

            mensagem:
            "CPF e senha obrigatórios."

        });


    }








    const sql = `

    SELECT

    id,
    nome,
    cpf,
    email

    FROM usuarios

    WHERE cpf = ?

    AND senha = ?

    `;








    db.get(

        sql,

        [
            cpf,
            senha
        ],


        (erro,usuario)=>{





            if(erro){


                return res.status(500).json({

                    mensagem:
                    "Erro no banco."

                });


            }








            if(!usuario){


                return res.status(401).json({

                    mensagem:
                    "CPF ou senha inválidos."

                });


            }








            res.json({

                mensagem:
                "Login realizado.",


                usuario

            });





        }



    );





});






module.exports = router;