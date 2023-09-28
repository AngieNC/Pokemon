const url = "https://6509e7ebf6553137159c3aee.mockapi.io/Pokemon";


const vengaPokemon = async () =>{

    const res = await(await fetch("https://pokeapi.co/api/v2/pokemon?limit=200")).json();
    return res.results.map(pokemon => pokemon.name)
}


const pokemon = async()=> {
    const nombres = await vengaPokemon();
    const principal = document.querySelector("section");
    for (const name of nombres) {
        
        const res = await (await  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)).json();
        const article = document.createElement("article");
        article.innerHTML = `
        <img src="${res.sprites.front_default}"/>  
        <button class="botones" id="principal" src="${res.sprites.front_default}"><h2 id="h2">${name}</h2></button>
        <img src="${res.sprites.front_default}"/>
        `;
        principal.appendChild(article);


        const muestreBoton = article.querySelector(".botones");
        muestreBoton.addEventListener("click", () => {
            const imageUrl = res.sprites.front_default;

            Swal.fire({

                title: `${res.name}`,
                imageUrl: imageUrl,
                imageAlt: "Imagen del Pokémon",
                html: `
                <form>
                    ${res.stats.map((data) =>`
                    <div>
                        <input type="range" value="${data.base_stat}" name="${data.stat.name}">
                        <label data-name="${data.stat.name}"><b>${data.base_stat}</b> <b>${data.stat.name}</b></label><br>
                    </div>
                    `).join("")}
                        <input type="submit" class="segundo_boton" value="Enviar"/> 
                </form>
                        
                    `,
                imageWidth: "80%",
                imageHeight: "80%"
            });
    
    muestreBoton.addEventListener("click" ,async(e)=>{
        e.preventDefault();
    
        let enviar = Object.fromEntries(new FormData (e.target));
    
        const res = await (await fetch(url)).json();
    
        let config ={
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(enviar)
        }
            
        const x = await (await fetch(url,config)).json();
        

        })

            let contenedor = document.querySelector('#swal2-html-container');
            contenedor.addEventListener("input", (e)=>{
                let hermano = e.target.nextElementSibling;
                hermano.innerHTML = `<b>${e.target.value}</b> ${hermano.dataset.name}` 
            });
        });
        
    }
}

pokemon();

const prueba = document.querySelectorAll('form')

prueba.addEventListener("submit" ,async(e)=>{
    e.preventDefault();

    let enviar = Object.fromEntries(new FormData (e.target));

    const res = await (await fetch(url)).json();


    let config ={
        method: "PUT",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(enviar)
    }

    const x = await (await fetch(url,config)).json();

    console.log(x)
});

