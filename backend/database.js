const sqlite3 = require("sqlite3").verbose();

const path = require("path");



const caminhoBanco =
path.join(__dirname,"nexbank.sqlite");



let db;





function connect(){


    return new Promise((resolve,reject)=>{


        db = new sqlite3.Database(
            caminhoBanco,
            (erro)=>{


                if(erro){


                    reject(erro);


                }else{


                    console.log(
                        "Banco conectado."
                    );


                    criarTabelas()
                    .then(resolve)
                    .catch(reject);


                }


            }
        );


    });



}








function criarTabelas(){


    return new Promise((resolve,reject)=>{


        const sql = `

CREATE TABLE IF NOT EXISTS usuarios (

    id INTEGER PRIMARY KEY AUTOINCREMENT,


    nome TEXT NOT NULL,


    cpf TEXT UNIQUE NOT NULL,


    dataNascimento TEXT NOT NULL,


    email TEXT UNIQUE NOT NULL,


    telefone TEXT,



    renda REAL NOT NULL,


    gastos REAL NOT NULL,



    score INTEGER DEFAULT 0,


    limite REAL DEFAULT 0,


    saldo REAL DEFAULT 0,



    senha TEXT NOT NULL,


    criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP

);

`;





        db.run(sql,(erro)=>{


            if(erro){


                reject(erro);


            }else{


                console.log(
                    "Tabela usuarios pronta."
                );


                resolve();


            }


        });




    });



}







function getDB(){


    return db;


}







module.exports = {


    connect,

    getDB


};