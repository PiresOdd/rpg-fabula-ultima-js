 function mostrarMenuExploracao () {
    let acoesMExploracao = [ "Explorar", "Checar Status", "Usar Item" ];
        for (let i = 0; i < acoesMExploracao.length; i++) {
            console.log(`${i + 1}: ${acoesMExploracao[i]}`)
        }
        
    }

    function mostrarMenuCombate () {
        let acoesMCombate = [ "Atacar", "Defender", "Usar Item", "Fugir" ];
        for (let i = 0; i < acoesMCombate.length; i++) {
            console.log(`${i + 1}: ${acoesMCombate[i]}`)
        }
        
    }

    module.exports = {
    mostrarMenuCombate,
    mostrarMenuExploracao
};