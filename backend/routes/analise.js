const express = require("express");

const router = express.Router();

const db = require("../database");



router.get("/:id", (req,res)=>{


    const id = req.params.id;



    db.get(

        "SELECT * FROM usuarios WHERE id = ?",


        [id],


        (erro,usuario)=>{


            if(erro){

                return res.status(500).json({

                    erro:erro.message

                });

            }



            if(!usuario){

                return res.status(404).json({

                    erro:"Usuário não encontrado"

                });

            }



            res.json({

                nome:usuario.nome,

                score:usuario.score,

                limite:usuario.limite,

                renda:usuario.renda,

                gastos:usuario.gastos

            });


        }

    );


});



module.exports = router;