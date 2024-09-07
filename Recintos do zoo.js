function verificarRecintos(animal, quantidade) {


    const recintos = [
      { numero: 1, bioma: 'savana', tamanho: 10, animais: { 'MACACO': 3 } },
      { numero: 2, bioma: 'floresta', tamanho: 5, animais: {} },
      { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: { 'GAZELA': 1 } },
      { numero: 4, bioma: 'rio', tamanho: 8, animais: {} },
      { numero: 5, bioma: 'savana', tamanho: 9, animais: { 'LEAO': 1 } }
    ];
  
    

    const animais = {
      'LEAO': { tamanho: 3, bioma: 'savana' },
      'LEOPARDO': { tamanho: 2, bioma: 'savana' },
      'CROCODILO': { tamanho: 3, bioma: 'rio' },
      'MACACO': { tamanho: 1, bioma: 'savana ou floresta' },
      'GAZELA': { tamanho: 2, bioma: 'savana' },
      'HIPOPOTAMO': { tamanho: 4, bioma: 'savana ou rio' }
    };
  
    

    function validarEntrada(animal, quantidade) {
      if (!animais[animal]) return "Animal inválido";
      if (quantidade <= 0 || !Number.isInteger(quantidade)) return "Quantidade inválida";
      return null;
    }
  
    

    function verificarRecinto(recinto, animal, quantidade) {
      const { bioma, tamanho, animais } = recinto;
      const infoAnimal = animais[animal];
      const biomaAnimal = infoAnimal.bioma;
      const tamanhoAnimal = infoAnimal.tamanho;
      
    

      if (!(bioma === biomaAnimal || (bioma === 'floresta' && biomaAnimal === 'savana ou floresta') || (bioma === 'savana e rio' && biomaAnimal === 'savana ou rio'))) {
        return false;
      }
  
      

      let espaçoOcupado = 0;
      let númeroEspécies = 0;
      for (const especie in animais) {
        if (animais[especie] !== undefined) {
          const tamanhoEspécie = animais[especie].tamanho;
          espaçoOcupado += tamanhoEspécie * animais[especie];
          númeroEspécies++;
        }
      }
  
      

      const espaçoNecessário = quantidade * tamanhoAnimal + (númeroEspécies > 0 ? 1 : 0);
  
      

      if (animal === 'MACACO' && númeroEspécies <= 0) return false;
      if (animal === 'HIPOPOTAMO' && bioma !== 'savana e rio') return false;
      if (['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animal) && númeroEspécies > 0 && !animais[animal]) return false;
  
      return tamanho - espaçoOcupado >= espaçoNecessário;
    }
  
    

    function encontrarRecintosViaveis(animal, quantidade) {
      return recintos
        .filter(recinto => verificarRecinto(recinto, animal, quantidade))
        .map(recinto => {
          const espaçoAtual = recinto.tamanho;
          const animaisNoRecinto = recinto.animais;
          let espaçoOcupado = 0;
          for (const especie in animaisNoRecinto) {
            espaçoOcupado += animais[especie].tamanho * animaisNoRecinto[especie];
          }
          const espaçoLivre = espaçoAtual - espaçoOcupado - quantidade * animais[animal].tamanho - (Object.keys(animaisNoRecinto).length > 0 ? 1 : 0);
          return `Recinto ${recinto.numero} (espaço livre: ${espaçoLivre} total: ${espaçoAtual})`;
        });
    }
  


    const erro = validarEntrada(animal, quantidade);
    if (erro) return { erro };
  
    
    
    const recintosViaveis = encontrarRecintosViaveis(animal, quantidade);
    if (recintosViaveis.length > 0) {
      return { recintosViaveis: recintosViaveis.sort() };
    } else {
      return { erro: "Não há recinto viável" };
    }
  }
  
