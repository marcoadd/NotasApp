document.getElementById('formNotas').addEventListener('submit', guardaNotas);

function guardaNotas(e){

    let titulo = document.getElementById('titulo').value;
    let descripcion = document.getElementById('descripcion').value;

    const nota = {
        titulo,
        descripcion
    };

    if(localStorage.getItem('notas')=== null){
        let notas= [];
        notas.push(nota);
        localStorage.setItem('notas',JSON.stringify(notas));
    }else{
        let notas = JSON.parse(localStorage.getItem('notas'));
        notas.push(nota);
        localStorage.setItem('notas', JSON.stringify(notas));
    }

    mostrarNotas();
    contarNotas();
    document.getElementById('formNotas').reset();
    e.preventDefault();
}

function mostrarNotas(){
    let notas = JSON.parse(localStorage.getItem('notas'));

    let notasView = document.getElementById('notas');

    notasView.innerHTML = '';

    for(let i=0; i < notas.length; i++){
        //console.log(notas[i])
        let titulo = notas[i].titulo;
        let descripcion = notas[i].descripcion;
        let caracteres = descripcion.length;

        if(caracteres>=20){
            nuevaDesc = descripcion.substring(0,20);
            nuevaDesc += '...';
        }else{
            nuevaDesc = descripcion;
        }

        notasView.innerHTML += `
        <li class="list-group-item list-group-item-light pt-3 pb-2 h-20">
            <p>${i+1}. ${titulo} - ${nuevaDesc}
                <div class="text-right">
                    <button  class="btn btn-sm btn-outline-success" role="button" onclick="verNota('${titulo}')"><i class="far fa-eye"></i></button>
                    <button class="btn btn-sm btn-outline-danger" role="button" onclick="eliminarNota('${titulo}')"><i class="far fa-trash-alt"></i></button>
                </div>
            </p>
        </li>`
    }
}

function eliminarNota(titulo){
    /* console.log(titulo); */
    let notas = JSON.parse(localStorage.getItem('notas'));

    for(let i=0; i<notas.length;i++){
        if(notas[i].titulo == titulo){
            notas.splice(i,1);
        }
    }
    localStorage.setItem('notas', JSON.stringify(notas));
    mostrarNotas();
    contarNotas();
}

function verNota(titulo){
    let notas = JSON.parse(localStorage.getItem('notas'));

    let notaView = document.getElementById('notas');

    notaView.innerHTML = '';

    for(let i=0; i<notas.length;i++){
        if(notas[i].titulo == titulo){
            let titulo = notas[i].titulo;
            let descripcion = notas[i].descripcion;

            notaView.innerHTML =`
            <div class="card">
                <p class="card-header">${titulo}</p>
                <div class="card-body">
                    <p>${descripcion}</p>
                </div>
            </div>`
        }
    }
}

function contarNotas(){
    let notas = JSON.parse(localStorage.getItem('notas'));

    let total = notas.length;
    
    let pestanaNotas = document.getElementById('pestanaNotas');
    
    pestanaNotas.innerHTML= '';

    pestanaNotas.innerHTML= `<a class="nav-link " href="#" onclick="mostrarNotas()">Notas (${total})</a>`

}

contarNotas();
mostrarNotas();
