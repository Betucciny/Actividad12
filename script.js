function aplicarCambios(event, contenedor){

    const data = document.querySelectorAll('#modal-view div textarea');
    const espacios = contenedor.querySelectorAll("td");


    espacios[2].innerHTML= "<em>" + data[0].value + "</em>";
    for(let i = 3; i<espacios.length-1; i++){
        espacios[i].textContent = data[i-2].value;
    }
    document.querySelector("#modal-view").classList.add('ocultar');

    event.currentTarget.removeEventListener('click',window.myListener);
}


function editarDatos(event){
    document.body.classList.add('no-scroll')
    modalview.classList.remove("ocultar")
    const textAreas = document.querySelectorAll("#modal-view div textarea");
    const contenedor = event.currentTarget.parentElement.parentElement;

    console.log(contenedor)

    const datos = contenedor.querySelectorAll("td");
    const original =  contenedor.querySelector("td img");
    const texto = [];
    for(let i of datos){
        if (i.textContent === "" || i.textContent ==='\n                    Editar\n                '){
            continue;
        }
        texto.push(i.textContent)
    }
    for(let i = 0; i< textAreas.length; i++){
        textAreas[i].value = texto[i];
    }

    window.myListener = function (event){
        aplicarCambios(event, contenedor)
    }

    const image = document.querySelector("#modal-view div img");
    image.src = original.src;
    const button = document.querySelector('#modal-view div button');
    button.addEventListener('click',window.myListener)

}


function aplicarFiltro(event){
    event.defaultPrevented;
    const filas = document.querySelectorAll(".fila");
    const e = document.querySelector("[name='filter']");
    const filtro = e.options[e.selectedIndex].text;

    for(let fil of filas){
        fil.classList.remove("ocultar")
    }
    if(filtro === "Género"){
        return;
    }
    for(let fil of filas){
        if (fil.querySelector(".genero").textContent !== filtro){
            fil.classList.add("ocultar");
        }
    }
}

function crearMiniatura(event){
    const bloque = document.createElement("div");
    bloque.classList.add("preview")

    const image = document.createElement("img");
    image.src =  event.currentTarget.src
    bloque.appendChild(image)

    let x = event.clientX;
    let y = event.clientY;

    bloque.style.left = String(x)+ "px";
    bloque.style.top = String(y) + "px";

    document.querySelector("body").appendChild(bloque);
    event.currentTarget.removeEventListener('mouseover', crearMiniatura);
}

function destruirMiniatura(event){
    document.querySelector(".preview").remove();
    event.currentTarget.addEventListener('mouseover', crearMiniatura);
}


const images = document.querySelectorAll(".miniatura")
for(let im of images){
    im.addEventListener('mouseover', crearMiniatura);
    im.addEventListener('mouseout', destruirMiniatura);
}

const filtrar = document.querySelector("[value = 'Filtrar']")
filtrar.addEventListener("click",aplicarFiltro);

const editar = document.querySelectorAll(".fila td button")
for(let i of editar){
    i.addEventListener("click", editarDatos);
}

const modalview = document.querySelector("#modal-view");
