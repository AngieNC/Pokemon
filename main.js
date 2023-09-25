
//Aca que llame al Api y se convierta a JSON, luego se realiza una lista que almacene los datos y despúes se crean botones con su respectivo nombre, se recorren y se añaden al poke 
fetch('https://pokeapi.co/api/v2/pokemon?limit=500')
    .then(response => response.json())
    .then(data => {
        const poke = document.getElementById('poke');

        data.results.forEach(pokemon => { //La lista que se ha obtenido de la API y la recorre
            const button = document.createElement('button');
            button.innerHTML = pokemon.name;
            button.addEventListener('click', () => pokemones(pokemon.name));
            poke.appendChild(button);
        });
    });

//Aca es para sacar la info de cada pokemon, otra vez se llama a la API y se convierte a JSON, despues se supone que al hacerle click se realiza lo del alert, pues en el anterior bloque al hacer click llama a esta funcion directamente
function pokemones(name) {

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: `${data.name}` ,
                text: 'Modal with a custom image.',
                imageUrl: `${(img) ? img : defectoImg}`,
                html: ` 
                    ${data.stats.map(data => ` 
                    <input
                    type="range"
                    value="${data.base_stat}">
                    <label>
                    <b>${data.base_stat}<b>
                    ${data.stat.name}
                    </label><br>
                    `).join("")}`,
                imageWidth: "80%",
                imageHeight: "80%",
            });
        });
}
