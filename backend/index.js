// olhe no ARQUIVO AS DEPENDENCIAS UTILIZADAS
import mysql from "mysql";
import express from "express";
import cors from "cors";

const app = express()



const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"carteirasuellen"
});



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//selecionar todas as entradas e saidas do banco 
app.get("/Entrada", (req, res)=>{
    const q = "SELECT * FROM entrada"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/Saida", (req, res)=>{
    const q = "SELECT * FROM Saida"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
//
//

//criar um entrada e saida no banco 
app.post("/Entrada", (req,res)=>{
    const q = "INSERT INTO entradas (`descricao`, `valor`, `data`) VALUES (?)"
    const values = [
        req.body.descricao,
        req.body.valor,
        req.body.data
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Seu gasto foi criado com sucesso!")
    })
})

app.post("/Saida", (req,res)=>{
    const q = "INSERT INTO saida (`descricao`, `valor`, `data`) VALUES (?)"
    const values = [
        req.body.descricao,
        req.body.valor,
        req.body.data
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Seu gasto foi criado com sucesso!")
    })
})

//
//
// deletar um gasto do banco
app.delete("/saida/:id", (req, res)=>{
    const livroId = req.params.id;
    const q = "DELETE FROM saida  WHERE id = ?"

    db.query(q,[livroId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Seu gasto foi deletado com sucesso!")
    })
})
//
//

//ATUALIZAR UM gasto NO BANCO
app.put("/entrada/:id", (req, res)=>{
    const entradaId = req.params.id;
    const q = "UPDATE entrada SET `descricao` = ?, `valor`= ?, `data`= ?, WHERE id = ?"

    const values = [
        req.body.descricao,
        req.body.valor,
        req.body.data
    ]
    db.query(q,[...values,livroId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Seu livro foi atualizado com sucesso!")
    })
})




app.get("/", (req, res) =>{
    res.json("Oi, este é o backend")
});

app.listen(8800, () => {
    console.log("backend  on")
})
