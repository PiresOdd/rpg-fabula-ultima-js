const prompt = require ('prompt-sync') ({sigint: true});

const personagem = {
    nome: "",
    nomePersonagem: "",
    nivel: 5,
    xp: 0,
    pv: 0,
    pm: 0,
    defesa: 0,
    defesaMagica: 0,

    itens: [],

    atributos: {
        destreza: null,
        vigor: null,
        astucia: null,
        vontade: null
    
    }
};

const inimigos = [
    {
        nome: "Goblin",
        pv: 20,
        derrotado: false,
        xpInimigo: 1,
        defesa: 9,
    },
    {
        nome: "Orc",
        pv: 25,
        derrotado: false,
        xpInimigo: 2,
        defesa: 10,
    }, {
        nome: "Lobo",
        pv: 20,
        derrotado: false,
        xpInimigo: 1,
        defesa: 8,
    }
];

let inimigoAtual = null;
let emCombate = false;

const itensDoMapa = {

    itens: ["Poção de Vida", "Poção de Mana"],
};


let dados = [6, 6, 8, 10];
let acoesMExploracao = [ "Explorar", "Checar Status", "Usar Item" ];
let acoesMCombate = [ "Atacar", "Defender", "Usar Item", "Fugir" ];

let nome = prompt("Digite seu nome: ");
let nomePersonagem = prompt("Digite o nome do seu personagem: ");
personagem.nome = nome;
personagem.nomePersonagem = nomePersonagem;

console.log(`Olá, ${personagem.nome}, o nome do seu personagem é ${personagem.nomePersonagem}.`);
console.log("Agora, vamos definir os atributos do seu personagem.");

function criarPersonagem() {
    for (let atributo in personagem.atributos) {
    console.log(`Valores disponíveis ${dados.join(", ")}`);
    let valorAtributo
    while (true) {
        valorAtributo = Number(prompt(`Digite o valor para ${atributo}: `));
        if (dados.includes(valorAtributo)) {
            break;
        } else {
            console.log("Valor inválido. Por favor, escolha um valor disponível.");
        }
    }
    personagem.atributos[atributo] = valorAtributo;
    dados.splice(dados.indexOf(valorAtributo), 1);

}
    personagem.pv = Number(((personagem.atributos.vigor + personagem.nivel) * 5));
    personagem.pm = Number(((personagem.atributos.vontade + personagem.nivel) * 5));
    personagem.defesa = Number(personagem.atributos.destreza);
    personagem.defesaMagica = Number(personagem.atributos.astucia);

    console.log(`\nAtributos do personagem ${personagem.nomePersonagem}:`);
    for (let atributo in personagem.atributos) {
        let capital= atributo.charAt(0).toUpperCase() + atributo.slice(1);
        console.log(`${capital}: ${personagem.atributos[atributo]}`);
    }

    console.log("Defesa: " + personagem.defesa);
    console.log("Defesa Mágica: " + personagem.defesaMagica);
    console.log("PV: " + personagem.pv);
    console.log("PM: " + personagem.pm);
}

criarPersonagem();

function setarInimigoAtual(enemy) {
    inimigoAtual = enemy;

}

    function atacar(enemy) {
        let dadoD1 = [];
        dadoD1.push(rolarDestreza());
        dadoD1.push(rolarVigor());
        
        // for (let i = 0; i < dadoD1.length; i++) {
        //    console.log(`Dado ${i + 1}: ${dadoD1[i]}`);
        // }
        if (inimigoAtual === null) {
            console.log("Não há inimigos para atacar.");
            return;
            } {


            if (enemy.pv === 0 || enemy.pv < 0) {
                enemy.derrotado = true;
                console.log("O inimigo já foi derrotado!");
                emCombate = false;
            } else {
                if (!enemy.derrotado) {
                    emCombate = true;
                    let acerto = dadoD1.reduce((a, b) => a + b, 0);
                    console.log(`Você rolou um acerto de ${acerto}.`);
                    console.log(`Defesa do inimigo: ${enemy.defesa}`);
                    if (acerto > enemy.defesa) {
                        let dano = Number(Math.max(...dadoD1)) + 5;
                        enemy.pv -= dano;

                        console.log(`Você acertou o inimigo e causou ${dano} de dano!`);
                        

                            if (enemy.pv === 0 || enemy.pv < 0) {
                            enemy.pv = 0;
                            enemy.derrotado = true;
                            console.log(`Você derrotou o inimigo ganhou ${enemy.xpInimigo} de experiência!`);
                                personagem.xp += Number(10 * enemy.xpInimigo);
                                subirNivel();
                            } else {
                                console.log(`PV restante do inimigo: ${enemy.pv}`);
                            }
                        } else {
                            
                            console.log("Você errou o ataque!");
                        }
                    } else {
                        console.log("O inimigo já foi derrotado!");
                    }
            }
            }

        
        
    }

    function mostrarInimigo (enemy) {
        console.log(" ==== INIMIGO A FRENTE ====");
        console.log(`Tipo de Inimigo: ${enemy.nome}`);
        console.log(`Vida do Inimigo: ${enemy.pv}`);
        console.log(`Defesa do Inimigo: ${enemy.defesa}`);
    }

    function subirNivel (){
        if (personagem.xp >= 10) {
            personagem.nivel += 1;
            personagem.xp = 0;
            console.log(`Parabéns! Você subiu para o nível ${personagem.nivel}!`);
            personagem.pv += 2;
            personagem.pm += 2;
            console.log(`PV aumentado para ${personagem.pv} e PM aumentado para ${personagem.pm}.`);
        }
    }

    function mostrarMenuExploração () {
        for (let i = 0; i < acoesMExploracao.length; i++) {
            console.log(`${i + 1}: ${acoesMExploracao[i]}`)
        }
        
    }

    function mostrarMenuCombate () {
        for (let i = 0; i < acoesMCombate.length; i++) {
            console.log(`${i + 1}: ${acoesMCombate[i]}`)
        }
        
    }

    function checarStatus () {
        console.log(`Atributos do personagem ${personagem.nomePersonagem}:`);
    for (let atributo in personagem.atributos) {
        let capital= atributo.charAt(0).toUpperCase() + atributo.slice(1);
        console.log(`${capital}: ${personagem.atributos[atributo]}`);
    }
        console.log("Defesa: " + personagem.defesa);
        console.log("Defesa Mágica: " + personagem.defesaMagica);
        console.log("PV: " + personagem.pv);
        console.log("PM: " + personagem.pm);
    }
    
    function rolarDado(nLados) {
        return Math.floor(Math.random() * nLados) + 1;
    }

    function rolarDestreza(){
        return rolarDado(personagem.atributos.destreza);
    }
    function rolarVigor(){
        return rolarDado(personagem.atributos.vigor);
    }
    function rolarAstucia(){
        return rolarDado(personagem.atributos.astucia);
    }
    function rolarVontade(){
        return rolarDado(personagem.atributos.vontade);
    }

    function receberItem() {
        
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

    function checarInventario() {
        if (personagem.itens.length > 0) {
            console.log("Inventário do personagem:");
            personagem.itens.forEach((item, index) => {
                console.log(`${index + 1}. ${item}`);
            });
        } else {
            console.log("O inventário está vazio.");
        }
    }

    function inimigoDaVez() {
    let indice = Number(Math.floor(Math.random() * inimigos.length));
    
    return {...inimigos[indice]};
    

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
                    inimigoAtual = inimigoDaVez();
                mostrarInimigo(inimigoAtual);
                emCombate = true;
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

    while (true) {
        console.log("\nEscolha uma ação: ");
        if (emCombate === false){
            mostrarMenuExploração();
            let escolhas = prompt();
        switch (escolhas) {
            case "1":
                if (inimigoAtual != null){
                    console.log("Não é possível explorar. Existe um inimigo próximo!");
                } else {
                    explorar();
                }
                break;
            case "2":
                checarStatus();
                break;
            case "3":
                console.log("Você escolheu usar um item!");
                break;
            default:
                console.log("Ação inválida. Por favor, escolha uma ação válida.");
        }
        } else {
            mostrarMenuCombate();
            let escolhaCombate = prompt();
            switch (escolhasCombate) {
            case "1":
                inimigoAtual = inimigoDaVez();
                atacar(inimigoAtual);
                break;
            case "2":
                //Criar o ataque do inimigo
                //Criar a defesa do personagem
                break;
            case "3":
                console.log("Você escolheu usar um item!");
                //Criar a escolha dos itens
                break;
            case "4":
                //Criar o fugir
                break;
            default:
                console.log("Ação inválida. Por favor, escolha uma ação válida.");
        }

        }
        
    }
