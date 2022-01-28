document.addEventListener('DOMContentLoaded', () => {
    getPoke()
})

const EMPTY_HEART = '♡'
const FULL_HEART = '♥'


function getPoke() {
    fetch('https://pokeapi.co/api/v2/pokemon')
    .then(r => r.json())
    .then(data => {
        console.log(data)
        data.results.forEach(pokemon => {
            const pokeContainer = document.getElementById('poke-container')
            let pokeCard = document.createElement('div')
            pokeCard.setAttribute('id', `poke-card-${pokemon.name}`)
            pokeCard.classList.add('poke-card')
            let h2 = document.createElement('h2')
            h2.innerText = pokemon.name
            pokeCard.append(h2)
            pokeContainer.append(pokeCard)
            fetch(`${pokemon.url}`)
            .then(resp => resp.json())
            .then(pokeData => {
                console.log(pokeData)
                let pokeImg = document.createElement('img')
                pokeImg.src = pokeData.sprites.other.dream_world.front_default
                pokeImg.setAttribute("height", '230')
                pokeImg.setAttribute('width', '230')
                pokeCard.append(pokeImg)
                let heartBtn = document.createElement('div')
                heartBtn.setAttribute('id', 'heart-button')
                heartBtn.className = " "
                heartBtn.innerText = EMPTY_HEART
                pokeCard.append(heartBtn)
                heartBtn.addEventListener('click', () =>{
                    if (heartBtn.innerText === EMPTY_HEART) {
                        heartBtn.className = "active"
                        heartBtn.innerText = FULL_HEART
                        console.log(`${pokemon.name} added to favorites`)
                        
                    } else {
                        heartBtn.className = " "
                        heartBtn.innerText = EMPTY_HEART
                        console.log(`${pokemon.name} removed from favorites`)
                    }

                })
                
            })

        });
    })
}