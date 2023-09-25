const url = "https://6509e7ebf6553137159c3aee.mockapi.io/Pokemon";
let prueba = document.querySelector('form')


prueba.addEventListener("submit" ,async(e)=>{
    e.preventDefault();

    let enviar = Object.fromEntries(new FormData (e.target));

    const res = await (await fetch(url)).json();

    

    let config ={
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(enviar)
    }

    const x = await (await fetch(url,config)).json();

    console.log(x)
})

document.addEventListener("DOMContentLoaded", async(e)=>{

    const tabla = document.querySelector("#data-tabla");

    let res = await (await fetch(url)).json();

    res.map((elemento)=>{
        tabla.insertAdjacentHTML("beforeend", `
        <tr>
            <td>${elemento.id}</td>
            <td>${elemento.hp}</td>
            <td>${elemento.attack}</td>
        </tr>
        `);
    });

})


async function getpokemon() {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
        const data = await res.json();
        return data.results.map(pokemon => pokemon.name);


    } catch (error) {
        console.error("Error en la lista de nombres de Pokémon:", error);
        return [];
    }
}


async function pokemon() {
    const pokemonNames = await getpokemon();
    const mainContainer = document.querySelector("section");
    for (const name of pokemonNames) {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemonData = await res.json();
            const article = document.createElement("article");
            article.innerHTML = `
            <button class="show-image-button" src="${pokemonData.sprites.front_default}" </button>
            <h2>${name}</h2>
            `;
            mainContainer.appendChild(article);


            const showImageButton = article.querySelector(".show-image-button");
            showImageButton.addEventListener("click", () => {
                const imageUrl = pokemonData.sprites.front_default;

               //ESTO SE UTILIZA
                Swal.fire({

                    title: `${pokemonData.name}`,
                    imageUrl: imageUrl,
                    imageAlt: "Imagen del Pokémon",
                    html: `
                    <form>
                        ${pokemonData.stats.map((data) =>`
                        <div>
                            <input type="range" value="${data.base_stat}" name="${data.stat.name}">
                            <label data-name="${data.stat.name}"><b>${data.base_stat}<b> ${data.stat.name}</label><br>
                        </div>
                        `).join("")}
                            <input type="submit" value="Enviar"/> 
                    </form>
                            
                        `,//Esto
                    imageWidth: "80%",
                    imageHeight: "80%",

                    showCloseButton: true,
                });
                
                let myContainer = document.querySelector('#swal2-html-container');
                myContainer.addEventListener("input", (e)=>{
                    let myLabel = e.target.nextElementSibling;
                    myLabel.innerHTML = `<b>${e.target.value}</b> ${myLabel.dataset.name}` 
                });
            });
        } catch (error) {
            console.error(`Error de información del ${name}:`, error);
        }
    }
}

pokemon();

