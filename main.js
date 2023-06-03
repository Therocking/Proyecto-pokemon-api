const pokemonContainer = document.querySelector('.pokemon-container');
const spinner = document.querySelector('#spinner');
const previo = document.querySelector('#previo');
const siguiente = document.querySelector('#siguiente');

let offset = 1;
let limit = 8;


listeners()
function listeners() {
    previo.addEventListener("click", () => {
        if (offset != 1) {
          offset -= 9;
          removeChild(pokemonContainer);
          limitePokemones(offset, limit);
        }
      });
      
      siguiente.addEventListener("click", () => {
        offset += 9;
        removeChild(pokemonContainer);
        limitePokemones(offset, limit);
      });

}



async function fechtpokemones(id) {
    try {
        const url = ` https://pokeapi.co/api/v2/pokemon/${id}/`
        const res = await fetch(url);
        const datos = await res.json()
        // console.log(datos)
        crearPokemones(datos)
        spinner.style.display = 'none'
    } catch (error) {
        console.log(error)
    }
}


function limitePokemones(offset, limit) {
    spinner.style.display = 'block'
    for (let i = offset; i <= offset + limit; i++) {
        fechtpokemones(i)
    }
};

function crearPokemones(pokemon) {

    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    flipCard.appendChild(cardContainer)

    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    const spritesContainer = document.createElement('div');
    spritesContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default

    spritesContainer.appendChild(sprite);

    const numero = document.createElement('p');
    numero.textContent = `#${pokemon.id.toString().padStart('3, 0')}`

    const nombre = document.createElement('p');
    nombre.classList.add('name');
    nombre.textContent = pokemon.name;

    card.appendChild(spritesContainer)
    card.appendChild(numero)
    card.appendChild(nombre)

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');
    cardBack.appendChild(barraProgreso(pokemon.stats))

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);

    pokemonContainer.appendChild(flipCard)
}

function barraProgreso(stats) {
    const statsContainer = document.createElement('div');
    statsContainer.classList.add('stats-container');
    
    for (let i = 0; i < 3; i++) {
        const stat = stats[i];
        
        const statPercent = stat.base_state / 2 + '%';
        
        const statContainer = document.createElement('div');
        statContainer.classList.add('stat-container');

        const statName = document.createElement('div');
        statName.textContent = stat.stat.name;

        const progress = document.createElement('div');
        progress.classList.add('progress');

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBar.setAttribute("aria-valuenow", stat.base_stat );
        progressBar.setAttribute("aria-valuemin", 0);
        progressBar.setAttribute("aria-valuemax", 200);
        progressBar.style.width = statPercent;

        progressBar.textContent = stat.base_stat;

        progress.appendChild(progressBar);
        statsContainer.appendChild(statName);
        statsContainer.appendChild(progress);
        statsContainer.appendChild(statContainer);
    }

    return statsContainer
}

function removeChild(divPadre) {
    while (divPadre.firstChild) {
        divPadre.removeChild(divPadre.firstChild)
    }
}

limitePokemones(offset, limit)
