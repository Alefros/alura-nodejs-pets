const moment = require('moment')
const axios = require('axios')
const conexao = require("../infraestrutura/database/conexao");

class Atendimento{

    adiciona(atendimento, res){

        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const dataAtendimento = moment(atendimento.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        const atendimentoDatado = {...atendimento, dataCriacao, dataAtendimento} 

        const sql = 'INSERT INTO Atendimentos SET ?'

        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if(erro){
                res.json(erro)
            }else{
                res.json(resultados)
            }
        })
    }

    lista(res){
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

        conexao.query(sql, async(erro, resultados) => {
            const atendimento = resultados[0]
            const cpf = atendimento.cliente
            if(erro){
                res.status(400).json(erro)
            }else{
                const { data } = await axios.get(`http://localhost:8082/${cpf}` )
                atendimento.cliente = data
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res){

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        if(valores.dataAtendimento){
            valores.dataAtendimento = moment(valores.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
       

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res){
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {

            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }


        })
    }

}

module.exports = new Atendimento