const url = "https://6509e7ebf6553137159c3aee.mockapi.io/Pokemon";

//Se traen los datos de la PokeAPI
const vengaPokemon = async () =>{

    const res = await(await fetch("https://pokeapi.co/api/v2/pokemon?limit=200")).json();
    return res.results.map(pokemon => pokemon.name)

}

//Se crea el alert con ayuda de sweetAlert llamando a los principales datos de la PokeAPI para crear nuestras tarjetas
const pokemon = async()=> {
    const nombres = await vengaPokemon();
    const principal = document.querySelector("section");
    for (const name of nombres) {
        
        const res = await (await  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)).json();
        const div = document.createElement("div");
        div.innerHTML = `
        <img src="${res.sprites.front_default}"/>  
        <button class="botones" id="principal" src="${res.sprites.front_default}"><h2 id="h2">${name}</h2></button>
        <img src="${res.sprites.front_default}"/>
        `;
        principal.appendChild(div);

        //Cuando se despliega el alert al oprimir el boton principal
        const muestreBoton = div.querySelector(".botones");
        muestreBoton.addEventListener("click", () => {
            const imageUrl = res.sprites.front_default;

            Swal.fire({

                title: `${res.name}`,
                imageUrl: imageUrl,
                imageAlt: "Imagen del Pokémon",
                html: `
                <form id="formulario-${name}">
                    ${res.stats.map((data) =>`
                    <div>
                        <input type="range" value="${data.base_stat}" name="${data.stat.name}">
                        <label data-name="${data.stat.name}"><b>${data.base_stat}</b> <b>${data.stat.name}</b></label><br>
                    </div>
                    `).join("")}
                        <input type="submit" class="segundo_boton" value="Enviar"/> 
                        <button class="segundo_boton" id="actualizar">Actualizar</button>
                </form>
                        
                    `,
                imageWidth: "80%",
                imageHeight: "80%"
            });
    

    //Se crea un objeto en la base de datos
    const formulario = document.querySelector(`#formulario-${name}`);

    formulario.addEventListener("submit", async(e)=>{
        e.preventDefault();

        const paso = Object.fromEntries(new FormData (e.target));

        try{
            const config = {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(paso) 
            }

            const res = await fetch(url, config);

            if (res.ok){
                console.log("Datos enviados :)");
            }else{
                console.error("ERROR, datos no se enviaron");
            }
        }catch (error){
            console.error("ERROR, datos no se enviaron",error);
        }
    })


    //Aca debe de actualizar (x)
    const update = formulario.querySelector("#actualizar");
    
    update.addEventListener("click", async()=>{

        const paso = Object.fromEntries(new FormData (formulario));

        try{
            const config = {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(paso) 
            }

            const res = await fetch(`${url}/${name}`, config);

            if (res.ok){
                console.log("Datos enviados :)");
            }else{
                console.error("ERROR, datos no se enviaron");
            }
        }catch (error){
            console.error("ERROR, datos no se enviaron",error);
        }
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


