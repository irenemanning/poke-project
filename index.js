document.addEventListener('DOMContentLoaded', () => {
    getPoke()
})

const EMPTY_HEART = '♡'
const FULL_HEART = '♥'


function getPoke() {
    fetch('https://pokeapi.co/api/v2/pokemon')
    .then(r => r.json())
    .then(data => {
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
                let pokeImg = document.createElement('img')
                pokeImg.src = pokeData.sprites.other.dream_world.front_default
                pokeImg.setAttribute("height", '230')
                pokeImg.setAttribute('width', '230')
                pokeCard.append(pokeImg)
                //image animation pulse
                function pulse(elem, iterations) {
                    var keyframes = [
                      {transform: 'scale3d(1, 1, 1)', offset: 0}, 
                      {transform: 'scale3d(1.05, 1.05, 1.05)', offset: 0.5}, 
                      {transform: 'scale3d(1, 1, 1)', offset: 1}];
                    var timing = {duration: 900, iterations: iterations};
                    return elem.animate(keyframes, timing);
                  }
            
                pokeImg.addEventListener('mouseover', () => {
                    pulse(pokeImg)
                })
                let ul = document.createElement('ul')
                let abilityLabel = document.createElement('h3')
                abilityLabel.innerText = 'Abilities: '
                ul.append(abilityLabel)
                ul.className = "ability-list"
                pokeData.abilities.forEach(id => {
                    let li = document.createElement('li')
                    li.innerText = ` •${id.ability.name}• `
                    ul.append(li)
                    pokeCard.append(ul)
                });
                
                let heartBtn = document.createElement('div')
                let faveText = document.createElement('h5')
                faveText.innerText = " "
                
               
                
                heartBtn.setAttribute('id', 'heart-button')
                heartBtn.className = " "
                heartBtn.innerText = EMPTY_HEART
                pokeCard.append(heartBtn)
                pokeCard.append(faveText)
                //animation function
                function rubberBand(elem, iterations) {
                    var keyframes = [
                      {transform: 'scale3d(1, 1, 1)', offset: 0}, 
                      {transform: 'scale3d(1.25, 0.75, 1)', offset: 0.3}, 
                      {transform: 'scale3d(0.75, 1.25, 1)', offset: 0.4}, 
                      {transform: 'scale3d(1.15, 0.85, 1)', offset: 0.5}, 
                      {transform: 'scale3d(.95, 1.05, 1)', offset: 0.65}, 
                      {transform: 'scale3d(1.05, .95, 1)', offset: 0.75}, 
                      {transform: 'scale3d(1, 1, 1)', offset: 1}];
                    var timing = {duration: 900, iterations: iterations};
                    return elem.animate(keyframes, timing);        
                  }
                //animation function

                let faveContainer = document.getElementById('fave-container')

                heartBtn.addEventListener('click', () =>{
                    if (heartBtn.innerText === EMPTY_HEART) {
                        heartBtn.className = "active"
                        heartBtn.innerText = FULL_HEART
                        rubberBand(heartBtn)
                        //trying to add to favorite section
                        
                        let favDiv = document.createElement('div')
                        favDiv.className = "fave-pokes"
                        favDiv.setAttribute('id', `fave-${pokemon.name}`)
                        let favName = document.createElement('h3')
                        favName.innerText = `${pokemon.name}`
                        favDiv.append(favName)
                        favDiv.append(pokeImg.cloneNode())
                        faveContainer.append(favDiv)
                        //^^^^^
                        faveText.innerText = `${pokemon.name} added to favorites`
                        setTimeout(() => {
                            faveText.innerText = ''
                        }, 2000);
                        
                    } else {
                        heartBtn.className = " "
                        heartBtn.innerText = EMPTY_HEART
                        rubberBand(heartBtn)
                        faveContainer.removeChild(document.getElementById(`fave-${pokemon.name}`))
                        faveText.innerText = `${pokemon.name} removed from favorites`
                        setTimeout(() => {
                            faveText.innerText = ' '
                        }, 2000); 
                    }

                })
                
            })

        });
    })
}