const { atacar, defender, fugir, inimigoDaVez } = require("./combate");
const personagem = require("./personagem");
const estados = require("./estados");
const inimigos = require("./inimigos");
const { rolarDado } = require("./utilidades");
const { criarPersonagem, 
        checarInventario,
        checarStatus,
        subirNivel
    } = require("./criar");


function mostrarInimigo (enemy) {
        console.log("\n==== INIMIGO A FRENTE ====");
        console.log(`Tipo de Inimigo: ${enemy.nome}`);
        console.log(`Vida do Inimigo: ${enemy.pv}`);
        console.log(`Defesa do Inimigo: ${enemy.defesa}`);
    }

function explorar() {
        console.log("Você escolheu explorar o ambiente!");
        let evento = Number(rolarDado(6));
        console.log(`Evento gerado: ${evento}`);
        switch (evento) {
            case 1:
            case 2:
                console.log(
                    "Você encontrou um inimigo!" +
                    "Prepare-se para a batalha!");
                    estados.inimigoAtual = inimigoDaVez();
                mostrarInimigo(estados.inimigoAtual);
                break;
            case 3:
            case 4:
                console.log("Você encontrou um baú com um item valioso!");
                receberItem();
                checarInventario();

                break;
            case 5:
            case 6:
                console.log("Siga sua viagem!");
                break;

        }
    }
 function receberItem() {
    const itensDoMapa = {
        itens: ["Poção de Vida", "Poção de Mana"],
    };
        console.log("Itens disponíveis para receber:");
        console.log(itensDoMapa.itens.join("\n"));
        console.log(itensDoMapa.itens.length);

        if (itensDoMapa.itens.length === 0) {
            console.log("Não há mais itens disponíveis para receber.");
            return;
        } else {
            let itemRecebido = itensDoMapa.itens[Math.floor(rolarDado(itensDoMapa.itens.length)) - 1];
            console.log(`Você recebeu: ${itemRecebido}`);
            personagem.itens.push(itemRecebido);
            itensDoMapa.itens.splice(itensDoMapa.itens.indexOf(itemRecebido), 1);
            console.log(`Itens restantes: ${itensDoMapa.itens.join(", ")}`);
            console.log(itensDoMapa.itens.length);
        }
        // Aqui você pode adicionar lógica para armazenar o item no inventário do personagem
    }

    module.exports = {
    explorar,
    receberItem,
    mostrarInimigo
};