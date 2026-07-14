const express = require("express");

const router = express.Router();

const db = require("../database");



router.post("/",(req,res)=>{


    const {

        id,

        valor


    } = req.body;



    db.run(

        `UPDATE usuarios 
         SET limite = ?
         WHERE id = ?`,


        [

            valor,

            id

        ],


        function(erro){



            if(erro){


                return res.status(500).json({

                    erro:erro.message

                });


            }



            res.json({

                mensagem:
                "Limite atualizado com sucesso"


            });



        }


    );


});



module.exports = router;