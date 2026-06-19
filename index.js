const prompt = require ('prompt-sync') ({sigint: true});

const personagem = require("./personagem");
const inimigos = require("./inimigos");

const { atacar, defender, fugir, inimigoDaVez } = require("./combate");

const { criarPersonagem, 
        checarInventario,
        checarStatus,
        subirNivel
    } = require("./criar");

const { explorar } = require("./exploracao");

const {
    mostrarMenuCombate,
    mostrarMenuExploracao
} = require("./menus");

const estados = require("./estados");

const { rolarDado } = require("./utilidades");



console.clear();

criarPersonagem();

    while (true) {
        console.log("\nEscolha uma ação: ");
        if (estados.inimigoAtual === null){
            mostrarMenuExploracao();
            let escolhas = prompt();
        switch (escolhas) {
            case "1":
                console.clear(); 
                console.log("Vocês escolher explorar");
                if (estados.inimigoAtual != null){
                    console.log("Não é possível explorar. Existe um inimigo próximo!");
                } else {
                    explorar();
                }
                break;
            case "2":
                console.log("Vocês escolher Checar Status");
                console.clear(); 
                checarStatus();
                break;
            case "3":
                console.clear(); 
                console.log("Você escolheu usar um item!");
                break;
            default:
                console.log("Ação inválida. Por favor, escolha uma ação válida.");
        }
        } else {
            mostrarMenuCombate();
            let escolhaCombate = prompt();
            switch (escolhaCombate) {
            case "1":
            console.clear();  
            console.log("Vocês escolher Atacar \n");  
            atacar(personagem, estados.inimigoAtual);
                if(estados.inimigoAtual !== null && estados.inimigoAtual.pv > 0){
                    atacar(estados.inimigoAtual, personagem);
                }
                break;
            case "2":
                console.clear(); 
                console.log("Vocês escolher Defender \n");
                defender();
                atacar(estados.inimigoAtual, personagem);

                break;
            case "3":
                console.clear(); 
                console.log("Você escolheu usar um item! \n");
                //Criar a escolha dos itens
                break;
            case "4":
                console.clear(); 
                fugir();
                //Criar o fugir
                break;
            default:
                console.log("Ação inválida. Por favor, escolha uma ação válida.");
        }

        }
        
    }
