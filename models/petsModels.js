const uploadDeArquivos = require("../arquivos/uploadDeArquivos")

const conexao = ('../infraestrutura/conexao')

class Pet{
    adiciona(pet, res){
        const query = 'INSERT INTO Pets SET?'

        uploadDeArquivos(pet.imagem, pet.nome, (erro, novoCaminho) =>{
            if(erro){
                res.status(400).json({ erro })
            }else{
                const novoPet = {nome: pet.nome, imagem: pet.imagem}

                conexao.query(query, novoPet, erro =>{
                    if(erro){
                        console.log(erro)
                        res.status(400).json(erro)
                    }else{
                        res.status(200).json(pet)
                    }
        
                })

            }

        })


 
    }
}

module.exports = new Pet()