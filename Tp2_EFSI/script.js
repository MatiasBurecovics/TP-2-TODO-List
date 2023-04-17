let arr = []

const eventhandler = (event) => {

    event.preventDefault()

    let item = document.getElementById("item")
    let inputItem = document.getElementById("item").value

    if (validar(inputItem)) {

        crearTarea(inputItem)
        document.getElementById('check').innerHTML = ''
        arr.forEach(mostrarArr)
    }



}
const tacharCheckbox =(index)=>{
  arr[index].completado = !arr[index].completado
  if (arr[index].completado) {
    arr[index].tiempoCompletado = new Date().getTime()
  } else {
    arr[index].tiempoCompletado = null
  }
  document.getElementById('check').innerHTML = ''
  arr.forEach(mostrarArr)
}

const tareaMasRapida=() =>
{
  let tareaRapida = null

  arr.forEach((tarea, index) => {
      if (tarea.completado) {
          const tiempoTranscurrido = new Date().getTime() - tarea.tiempoCreacion.getTime()
          if (!tareaRapida || tiempoTranscurrido < tareaRapida.tiempoTranscurrido) {
              tareaRapida = {
                  nombre: tarea.nombre,
                  tiempoTranscurrido: tiempoTranscurrido
              }
          }
      }
  })
  
  if (tareaRapida) {
      document.getElementById("tareaMasRapida").innerHTML = "La tarea mas rapida es: " + tareaRapida.nombre
  } else {
      document.getElementById("tareaMasRapida").innerHTML = "No hay tareas completadas"
  }
  document.getElementById("tareaMasRapida").classList.remove("hidden")
document.getElementById("btnTareaMasRapida").classList.remove("hidden")
}

const validar = (inputItem) => {
    let item = document.getElementById("item")
    if (inputItem.length == 0 || inputItem.trim() == "") {
      item.style.borderColor = "red"
      return false
    } else {
      item.style.borderColor = ""
      return true
    }

}

const mostrarArr = (tarea, index) => {
  
  var contenido = document.createElement('li')
    var checkBox = document.createElement('input')
    
    checkBox.checked = tarea.completado
    checkBox.type = 'checkbox'
    checkBox.onclick = function () { tacharCheckbox(index) }
    contenido.appendChild(checkBox)
    var nombreTarea = document.createElement("span")
    nombreTarea.textContent = tarea.nombre
    if (tarea.completado) {
      nombreTarea.style.textDecoration = "line-through"
    }
    
    document.getElementById('check').appendChild(contenido)
    contenido.appendChild(nombreTarea)

    const botonEditar = document.createElement("button")
    botonEditar.textContent = "Editar"
    botonEditar.className = "btn btn-info float-right"
    botonEditar.onclick = function () { editarTarea(index) }
    contenido.appendChild(botonEditar)

    const botonEliminar = document.createElement("button")
    botonEliminar.textContent = "Eliminar"
    botonEliminar.className = "btn btn-danger float-right"
    botonEliminar.onclick = function () { borrarTarea(index) }
    contenido.appendChild(botonEliminar)


}
const crearTarea = (inputNombre) => {

    const tarea = {
        nombre: inputNombre,
        tiempoCreacion: new Date(),
        completado: false,
       tiempoCompletado:null
    }
    arr.push(tarea)


}
const borrarTarea = (index) => {
  arr.splice(index, 1)
  document.getElementById('check').innerHTML = ''
  arr.forEach(mostrarArr)
}

const editarTarea = (index) => {

    var nombre = window.prompt("Editar")

    if (validar(nombre)) {
        arr[index].nombre = nombre

        document.getElementById('check').innerHTML = ''
        arr.forEach(mostrarArr)
    }
}
