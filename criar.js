const prompt = require ('prompt-sync') ({sigint: true});
const personagem = require("./personagem");
const { rolarDado } = require("./utilidades");


function criarPersonagem() {
    let nome = prompt("Digite seu nome: ");
let nomePersonagem = prompt("Digite o nome do seu personagem: ");
personagem.jogador = nome;
personagem.nome = nomePersonagem;
console.log(`Olá, ${personagem.jogador}, o nome do seu personagem é ${personagem.nome}.`);
console.log("Agora, vamos definir os atributos do seu personagem.");
    let dados = [6, 6, 8, 10];
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

    console.clear();

    console.log(`\nAtributos do personagem ${personagem.nome}:`);
    for (let atributo in personagem.atributos) {
        let capital= atributo.charAt(0).toUpperCase() + atributo.slice(1);
        console.log(`${capital}: ${personagem.atributos[atributo]}`);
    }

    console.log("Defesa: " + personagem.defesa);
    console.log("Defesa Mágica: " + personagem.defesaMagica);
    console.log("PV: " + personagem.pv);
    console.log("PM: " + personagem.pm);
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
    
    function checarStatus () {
        console.log(`Atributos do personagem ${personagem.nome}:`);
    for (let atributo in personagem.atributos) {
        let capital= atributo.charAt(0).toUpperCase() + atributo.slice(1);
        console.log(`${capital}: ${personagem.atributos[atributo]}`);
    }
        console.log("Defesa: " + personagem.defesa);
        console.log("Defesa Mágica: " + personagem.defesaMagica);
        console.log("PV: " + personagem.pv);
        console.log("PM: " + personagem.pm);
    }

module.exports = {
    criarPersonagem, 
    checarInventario, 
    checarStatus,
    subirNivel,  
};