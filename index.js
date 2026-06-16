const prompt = require ('prompt-sync') ({sigint: true});

const personagem = {
    nome: "",
    nomePersonagem: "",
    nivel: 5,
    xp: 0,
    PV: 0,
    PM: 0,
    Defesa: 0,
    DefesaMagica: 0,

    itens: [],

    atributos: {
        destreza: null,
        vigor: null,
        astucia: null,
        vontade: null
    
    }
};

const inimigo ={
    nome: "Goblin",
    PV: 20,
    Defesa: 2,
    DefesaMagica: 1
};

const itensDoMapa = {

    itens: ["Poção de Vida", "Poção de Mana"],
};


let dados = [6, 6, 8, 10];
let act = ["Lutar", "Explorar", "Usar Item", "Checar Status"];
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
    personagem.PV = Number(((personagem.atributos.vigor + personagem.nivel) * 5));
    personagem.PM = Number(((personagem.atributos.vontade + personagem.nivel) * 5));
    personagem.Defesa = Number(personagem.atributos.destreza);
    personagem.DefesaMagica = Number(personagem.atributos.astucia);

    console.log(`\nAtributos do personagem ${personagem.nomePersonagem}:`);
    for (let atributo in personagem.atributos) {
        let capital= atributo.charAt(0).toUpperCase() + atributo.slice(1);
        console.log(`${capital}: ${personagem.atributos[atributo]}`);
    }

    console.log("Defesa: " + personagem.Defesa);
    console.log("Defesa Mágica: " + personagem.DefesaMagica);
    console.log("PV: " + personagem.PV);
    console.log("PM: " + personagem.PM);
}

criarPersonagem();

    function atacar(enemy) {
        let dadoD1 = [];
        dadoD1.push(rolarDestreza());
        dadoD1.push(rolarVigor());
        
        // for (let i = 0; i < dadoD1.length; i++) {
        //    console.log(`Dado ${i + 1}: ${dadoD1[i]}`);
        // }
        
        

        if (enemy.PV > 0) {
            let acerto = dadoD1.reduce((a, b) => a + b, 0);
            console.log(`Você rolou um acerto de ${acerto}.`);
            if (acerto > enemy.Defesa) {
                let dano = Number(Math.max(...dadoD1)) + 5;
                enemy.PV -= dano;
                if (enemy.PV <= 0) {
                    enemy.PV = 0;
                    console.log("O inimigo já foi derrotado!");
                   
                }
                console.log(`Você acertou o inimigo e causou ${dano} de dano!`);
                console.log(`PV restante do inimigo: ${enemy.PV}`);
                console.log("Você derrotou o inimigo ganhou 10 de experiência!");
                personagem.xp += 1;
                subirNivel();
            } else {
                console.log("Você errou o ataque!");
            }
        } else {
            console.log("O inimigo já foi derrotado!");
            
        }
        
    }

    function subirNivel (){
        if (personagem.xp >= 10) {
            personagem.nivel += 1;
            personagem.xp = 0;
            console.log(`Parabéns! Você subiu para o nível ${personagem.nivel}!`);
        }
    }

    function mostrarMenu () {
        for (let i = 0; i < act.length; i++) {
            
            console.log(`${i + 1}. ${act[i]}\n`);
        }
        
    }

    function checarStatus () {
        console.log(`Atributos do personagem ${personagem.nomePersonagem}:`);
    for (let atributo in personagem.atributos) {
        let capital= atributo.charAt(0).toUpperCase() + atributo.slice(1);
        console.log(`${capital}: ${personagem.atributos[atributo]}`);
    }
        console.log("Defesa: " + personagem.Defesa);
        console.log("Defesa Mágica: " + personagem.DefesaMagica);
        console.log("PV: " + personagem.PV);
        console.log("PM: " + personagem.PM);
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
                atacar(inimigo);
                
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
        console.log("\nEscolha uma ação: 1, 2, 3 ou 4");
        mostrarMenu();
        let escolhas = prompt().toLowerCase();
        switch (escolhas) {
            case "1":
                atacar(inimigo);
                break;
            case "2":
                explorar();
                break;
            case "3":
                console.log("Você escolheu usar um item!");
                break;
            case "4":
                checarStatus();
                break;
            default:
                console.log("Ação inválida. Por favor, escolha uma ação válida.");
        }
    }
