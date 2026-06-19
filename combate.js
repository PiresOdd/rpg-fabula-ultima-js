const personagem = require("./personagem"); 
const estados = require("./estados");
const inimigos = require("./inimigos");
const { rolarDado } = require("./utilidades");
 
 
 function atacar(atacante, alvo) {
        let dadoD1 = [];
        dadoD1.push(rolarDado(Number(atacante.atributos.destreza)));
        dadoD1.push(rolarDado(Number(atacante.atributos.vigor)));
        
        // for (let i = 0; i < dadoD1.length; i++) {
        //    console.log(`Dado ${i + 1}: ${dadoD1[i]}`);
        // }
        if (estados.inimigoAtual === null) {
            console.log("Não há alvos para atacar.");
            return;
            } {


            if (alvo.pv === 0 || alvo.pv < 0) {
                alvo.derrotado = true;
                console.log(`O ${alvo.nome} já foi derrotado!`);
            } else {
                if (!alvo.derrotado) {
                    let acerto = dadoD1.reduce((a, b) => a + b, 0);
                    console.log(`O personagem ${atacante.nome} rolou: ${acerto}.`);
                    
                    let defesaFinal = alvo.defesa;
                    if (alvo.defendendo === true){
                        defesaFinal += 3;
                        console.log(`Defesa do ${alvo.nome}: ${alvo.defesa} + 3: ${defesaFinal}`);
                    } else {
                        console.log(`Defesa do ${alvo.nome}: ${alvo.defesa}`);
                    }

                    if (acerto > defesaFinal) {
                        let dano = Number(Math.max(...dadoD1)) + 5;
                        alvo.pv -= dano;
                        alvo.defendendo = false;
                        console.log(`${atacante.nome} acertou e causou ${dano} de dano!`);
                        

                            if (alvo.pv === 0 || alvo.pv < 0) {
                                alvo.pv = 0;
                                alvo.derrotado = true;
                                if (alvo.player === false) {
                                console.log(`Você derrotou o inimigo ganhou ${alvo.xpInimigo} de experiência!`);
                                    estados.inimigoAtual = null;
                                    personagem.xp += Number(10 * alvo.xpInimigo);
                                    subirNivel();
                                    alvo.derrotado = true;
                                } else {
                                    console.log(`Você morreu e deve fazer outro personagem.`);
                                }
                            } else {
                                    console.log(`PV restante do ${alvo.nome}: ${alvo.pv}`);
                                    
                                }
                        } else {
                            alvo.defendendo = false;
                            console.log(`${atacante.nome} errou o ataque!`);
                        }
                    } else {
                        console.log("O inimigo já foi derrotado!");
                        estados.inimigoAtual = null;
                    }
            }
            }

        
        
    }

     function defender(){
        personagem.defendendo = true;
        console.log(`${personagem.nome} entrou em modo defensivo. `);   
    }

    function fugir () {
        let sorte = rolarDado(6);
        if (sorte > 3){
            console.log("Você consegue fugir.")
            estados.inimigoAtual = null;
        } else {
            console.log(`O ${estados.inimigoAtual.nome} te ataca e te faz continuar na batalha. `);
        }
    }

function inimigoDaVez() {
    let indice = Number(Math.floor(Math.random() * inimigos.length));
    
    return {...inimigos[indice]};
    

    }


    module.exports = {
    atacar,
    defender,
    fugir,
    inimigoDaVez
};