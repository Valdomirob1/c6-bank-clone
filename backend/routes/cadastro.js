const express = require("express");

const router = express.Router();

const database = require("../database");





router.post("/cadastro", (req,res)=>{


    const db = database.getDB();



    const {

        nome,
        cpf,
        dataNascimento,
        email,
        telefone,
        renda,
        gastos,
        senha

    } = req.body;





    if(
        !nome ||
        !cpf ||
        !dataNascimento ||
        !email ||
        !renda ||
        !senha
    ){

        return res.status(400).json({

            mensagem:
            "Preencha todos os campos obrigatórios."

        });

    }





    // ==========================
    // ANALISE DE CREDITO
    // ==========================


    let score = 300;



    const rendaLivre =
    Number(renda) - Number(gastos);



    // aumenta score conforme renda disponível

    if(rendaLivre > 1000){

        score += 50;

    }


    if(rendaLivre > 3000){

        score += 50;

    }



    if(rendaLivre > 5000){

        score += 50;

    }



    if(score > 500){

        score = 500;

    }






    // limite baseado na renda

    let limite =
    Number(renda) * 1.5;



    if(score < 300){

        limite =
        Number(renda) * 0.5;

    }



    if(score > 400){

        limite =
        Number(renda) * 2;

    }





    const saldo =
    Number(renda) - Number(gastos);







    const sql = `

    INSERT INTO usuarios

    (

        nome,

        cpf,

        dataNascimento,

        email,

        telefone,

        renda,

        gastos,

        score,

        limite,

        saldo,

        senha

    )

    VALUES (?,?,?,?,?,?,?,?,?,?,?)

    `;






    db.run(

        sql,

        [

            nome,

            cpf,

            dataNascimento,

            email,

            telefone,

            renda,

            gastos,

            score,

            limite,

            saldo,

            senha

        ],



        function(erro){



            if(erro){


                console.error(erro);


                return res.status(400).json({

                    mensagem:
                    "CPF ou email já cadastrado."

                });


            }







            res.json({

                mensagem:
                "Cadastro aprovado.",


                usuario:{


                    id:this.lastID,


                    nome,


                    score,


                    limite,


                    saldo



                }


            });




        }

    );



});





module.exports = router;