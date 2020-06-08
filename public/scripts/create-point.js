

function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then( res => res.json() )
      .then( states => {
        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`
        }
    } )
}  

populateUfs();

function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    
    citySelect.innerHTML = "<option value> Selecione a cidade </option>";
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
      for(const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`
      }
      citySelect.disabled = false;
    } )

   /* () => { //Ouvir evento de mudança //Vai ficar com o ouvido ligado, sempre que ouvir alguém evento
        console.log('Mudei')
    } */
   
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);


// Itens de coleta
const itemsToCollet = document.querySelectorAll('.items-grid li');

for(const item of itemsToCollet){
  item.addEventListener("click", hacdleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];

function hacdleSelectedItem(event){
  const itemLi = event.target;
  
  // Adicionar ou remover uma classe com JavaScript
  itemLi.classList.toggle("selected") //O toggle Adiciona ou remove o elemento no HTML

  const itemId = itemLi.dataset.id; //Pega os ID do item selecionado

  console.log('Item do ID: ', itemId); //Essa é só para rastrear os dados, como está o fluxo

  // verificar se existem itens selecionados
  // Se sim, Pegar os itens selecionados
  
  const alreadySelected = selectedItems.findIndex( item => {
      const ItemFound = item == itemId;
      return ItemFound;
    })

  // Se já estiver selecionado
    if(alreadySelected >= 0) {
      //tirar da seleção
      const filteredItems = selectedItems.filter( item => { 
        const itemIsDifferent = item != itemId;
        return itemIsDifferent
      })

      selectedItems = filteredItems;
    } else {
        // Se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId);
    }

    console.log(selectedItems); //Essa é só para rastrear os dados, como está o fluxo

  //Atualizar o campo escondido com os itens selecionados
  collectedItems.value = selectedItems;
  
}
