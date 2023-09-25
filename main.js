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

               
                Swal.fire({
                    title: `${pokemonData.name}`,
                    imageUrl: imageUrl,
                    imageAlt: "Imagen del Pokémon",
                    html: `${pokemonData.stats.map((data) => `
                    <input type="range" value="${data.base_stat}">
                    <label> ${data.stat.name}</label><br>
                    `).join("")}`,
                    imageWidth: "80%",
                    imageHeight: "80%",
                    
                    showCloseButton: true,
                });
            });
        } catch (error) {
            console.error(`Error de información del ${name}:`, error);
        }
    }
}


pokemon();
