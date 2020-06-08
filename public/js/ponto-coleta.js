// popular selects com informações de Estado e Cidade
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })

}

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=cityselect]");
    const ufValue = event.target.value;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    const indexOfSelectedState = event.target.selectedIndex;
    const stateInput = document.querySelector("[name=state]");
    stateInput.value = event.target.options[indexOfSelectedState].text;

    citySelect.innerHTML = "<option>Selecione a cidade</option>";
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
    })

    citySelect.disabled = false;
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

document.querySelector("select[name=cityselect]").addEventListener("change", (event) => {
    const indexOfSelectedCity = event.target.selectedIndex;
    const cityInput = document.querySelector("[name=city]");
    cityInput.value = event.target.options[indexOfSelectedCity].text;
    document.querySelector("input[name=city]").setAttribute('value', cityInput.value);
});

    

// Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

let selectedItems = [];
const collectedItems = document.querySelector("input[name=items]");

function handleSelectedItem(event) {
    // adicionar ou remover classe
    const itemLi = event.target
    itemLi.classList.toggle("selected");
    
    const itemId = itemLi.dataset.id;

    // verificar se existem itens selecionar, se sim
    // pegar os selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId; // isso retorna true ou false
        return itemFound
    })

    if (alreadySelected >= 0) {
        // se selecionado, tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent
        })

        selectedItems = filteredItems;
        
    } else {
        // se não selecionado, adicionar
        selectedItems.push(itemId)
    }    

    // atualizar o campo escondido com a ID
    collectedItems.value = selectedItems;
    
}