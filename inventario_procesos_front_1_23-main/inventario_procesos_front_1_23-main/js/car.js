const urlApi = "http://localhost:9000";

function listarVehiculos(){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi+"/api/vehicle",settings)
    .then(response => response.json())
    .then(function(vehicle){
        
            var vehiculos = '';
            for(const vehiculo of vehicle.data){
                vehiculos += `
                <tr>
                    <th scope="row">${vehiculo.id}</th>
                    <td>${vehiculo.car}</td>
                    <td>${vehiculo.carModel}</td>
                    <td>${vehiculo.carColor}</td>
                    <td>${vehiculo.carType}</td>
                    <td>${vehiculo.carFuel}</td>
                    <td>${vehiculo.carVin}</td>
                    <td>
                    <a href="#" onclick="verModificarVehiculo('${vehiculo.id}')" class="btn btn-outline-warning">
                        <i class="fa-solid fa-pencil"></i>
                    </a>
                    <a href="#" onclick="verVehiculo('${vehiculo.id}')" class="btn btn-outline-info">
                        <i class="fa-solid fa-eye"></i>
                    </a>
                    <a href="#" onclick="eliminarVehiculo('${vehiculo.id}')" class="btn btn-outline-danger">
                        <i class="fa-solid fa-trash"></i>
                    </a>
                    </td>
                </tr>`;
                
            }
            document.getElementById("listarVehiculos").innerHTML = vehiculos;
    })
}

function alertas(mensaje,tipo){
    var color ="";
    if(tipo == 1){//success verde
        color="success"
    }
    else{//danger rojo
        color = "danger"
    }
    var alerta =`<div class="alert alert-${color} alert-dismissible fade show" role="alert">
                    <strong><i class="fa-solid fa-triangle-exclamation"></i></strong>
                        ${mensaje}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div>`;
    document.getElementById("datos").innerHTML = alerta;
}


function registerCarForm(){
    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-car"></i>Car Register</h1>
            </div>
              
            <form action="" method="post" id="registerCarForm">
                <label for="car" class="form-label">Car</label>
                <input type="text" class="form-control" name="car" id="car" required> <br>
                <label for="carModel"  class="form-label">Car Model</label>
                <input type="text" class="form-control" name="carModel" id="carModel" required> <br>
                <label for="carColor" class="form-label">Car Color</label>
                <input type="text" class="form-control" name="carColor" id="carColor"> <br>
                <label for="carType" class="form-label">Car Type</label>
                <input type="text" class="form-control" name="carType" id="carType"> <br>
                <label for="carFuel" class="form-label">Car Fuel</label>
                <input type="text" class="form-control" name="carFuel" id="carFuel"> <br>
                <label for="carVin" class="form-label">Car Vin</label>
                <input type="text" class="form-control" name="carVin" id="carVin"> <br>
                <label for="user" class="form-label">User</label>
                <input type="number" class="form-control" name="user" id="user"> <br>
                <button type="button" class="btn btn-outline-info" onclick="registrarVehiculo()">Registrar</button>
            </form>`;
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
}

async function registrarVehiculo(){
    validaToken();
    var myForm = document.getElementById("registerCarForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        if (k === "user") {
            jsonData[k] = { id: parseInt(v) };
        } else {
            jsonData[k] = v;
        }
    }
    const request = await fetch(urlApi+"/api/vehicle", {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    listarVehiculos();
    alertas("Se ha registrado el vehiculo exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function eliminarVehiculo(id){
    validaToken();
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi+"/api/vehicle/"+id,settings)
    .then(response => response.json())
    .then(function(data){
        listarVehiculos();
        alertas("Se ha eliminado el vehiculo exitosamente!",2)
    })
}

function verModificarVehiculo(id){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi+"/api/vehicle/"+id,settings)
    .then(response => response.json())
    .then(function(response){
            var cadena='';
            var vehiculo = response.data;
            if(vehiculo){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modificar Usuario</h1>
                </div>
              
                <form action="" method="post" id="modificar">
                    <input type="hidden" name="id" id="id" value="${vehiculo.id}">
                    <label for="car" class="form-label">Car</label>
                    <input type="text" class="form-control" name="car" id="car" required value="${vehiculo.car}"> <br>
                    <label for="carModel"  class="form-label">Model</label>
                    <input type="text" class="form-control" name="carModel" id="carModel" required value="${vehiculo.carModel}"> <br>
                    <label for="carColor" class="form-label">Color</label>
                    <input type="text" class="form-control" name="carColor" id="carColor" value="${vehiculo.carColor}"> <br>
                    <label for="carType" class="form-label">Tipo</label>
                    <input type="text" class="form-control" name="carType" id="carType" value="${vehiculo.carType}"> <br>
                    <label for="carFuel" class="form-label">Combustible</label>
                    <input type="text" class="form-control" name="carFuel" id="carFuel" value="${vehiculo.carFuel}"> <br>
                    <button type="button" class="btn btn-outline-warning" 
                        onclick="modificarVehiculo('${vehiculo.id}')">Modificar
                    </button>
                </form>`;
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}

async function modificarVehiculo(id){
    validaToken();
    var myForm = document.getElementById("modificar");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(urlApi+"/api/vehicle/"+id, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    listarVehiculos();
    alertas("Se ha modificado el vehiculo exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function verVehiculo(id){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi+"/api/vehicle/"+id,settings)
    .then(response => response.json())
    .then(function(response){
            var cadena='';
            var vehiculo = response.data;
            if(vehiculo){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-car"></i> Visualizar Vehiculo</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Car: ${vehiculo.car}</li>
                    <li class="list-group-item">Modelo: ${vehiculo.carModel}</li>
                    <li class="list-group-item">Combustible: ${vehiculo.carColor}</li>
                    <li class="list-group-item">Tipo: ${vehiculo.carType}</li>
                    <li class="list-group-item">Combustible: ${vehiculo.carFuel}</li>
                    <li class="list-group-item">VIN: ${vehiculo.carVin}</li>
                </ul>`;
              
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.show();
    })
}

function modalConfirmacion(texto,funcion){
    document.getElementById("contenidoConfirmacion").innerHTML = texto;
    var myModal = new bootstrap.Modal(document.getElementById('modalConfirmacion'))
    myModal.toggle();
    var confirmar = document.getElementById("confirmar");
    confirmar.onclick = funcion;
}

function salir(){
    localStorage.clear();
    location.href = "index.html";
}

function validaToken(){
    if(localStorage.token == undefined){
        salir();
    }
}