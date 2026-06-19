const personagem = {
    jogador: "",
    nome: "",
    nivel: 5,
    derrotado: false,
    player: true,
    xp: 0,
    pv: 0,
    pm: 0,
    defesa: 0,
    defendendo: false,
    defesaMagica: 0,

    itens: [],

    atributos: {
        destreza: null,
        vigor: null,
        astucia: null,
        vontade: null
    
    }
};

module.exports = personagem;