//variable que mantene el estado visible del carrito//
var carritoVisible = false;

//esperramos que todos los elements de la pagina carguen para continuar con el scrip//
if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    //agregamos funcion a los botones al elminar el carrito//
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i < botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }
    //agregar funcionalidad al boton restar//
    var botonesRestarCantidad = documen.getElementsByClassName('restar-cantidad');
    for(var i=0; i < botonesRestarCantidad.length;i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }
    //agregar funcionalidad al boton sumar//
    var botonesSumarCantidad = documen.getElementsByClassName('sumar-cantidad');
    for(var i=0; i < botonesSumarCantidad.length;i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }
    //agregamos funcionalidad a los botones agregar al carrito//
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener(click , agregarAlCarritoClicked);
    }

    //agregar funcionalidad al boton pagar//
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked);
}
//elimino item seleccinado del carrito//
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElemet.remove();

    //actualizacion el total del carrito
actualizarTotalCarrito();
//la siguiente funcion controla si hay elementos en el carrito una vez que se elimino//
//si no hay debo ocultar el carrito
ocultarCarrito();
}

//actualizar el total del carrito//
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito//
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total=0;
    //recorremos cada elemento del carrito para actualizar el total//
    for(var i=0; i < carritoItems.length;i++){
    var item = carritoItems[i];
    var precioElemento = item.getElementsByClassName(carrito-item-precio)[0];
    console.log(precioElemento);
    //utilisamos el simboloo peso y el punto milesimo//
    var precio = parseFloat(precioElemento.innertext.replace('$','').replace(',',''))
    console.log(precio);
    var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidad = cantidadItem.value;
    console.log(cantidad);
    total = total +(precio*cantidad);
    }
   total = Math.round(total*100)/100;
   document.getElementsByClassName('carrito-precio-total')[0].innertext = '$' + total.toLocaleString("es")+'.00';
}
function ocultarCarrito(){
    var carritoItems =  document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity='0';
        carritoVisible= false;
        //ahora maximizo el contenedor de los elementos
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width='100%';
}
}
//aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito.item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    //actalizar el total//
    actualizarTotalCarrito();
}
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito.item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;
    //coontrolamos que no sea menor a 1
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        //actalizar el total//
        actualizarTotalCarrito(); 
    }
  
}
function  agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innertext;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innertext;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);
    //la siguien funcon el elemento carrrito.le mando parametros los valores
    agregarAlCarritoClicked(titulo, precio, imagenSrc);
    //hacemos visible el carrito cuando agraga por primer vez
    hacerVisibleCarrito();

}
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    //vamos a controlar el item que esta ingresando mo se encuentra ya en el carito.//
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0; i< nombresItemsCarrito,length;i++){
        if(nombresItemsCarrito[i].innertext==titulo){
            alert("el producto se encuentra en el carrito");
            return;
        }
    }
    var itemCarritoContenido =` <div class="carrito-item">
    <img src="${imagenSrc}" alt="" width="80px">
    <div class="carrito-item-detalles">
      <span class="carrito-item-titulo">${titulo}</span>
      <div class="selector-cantidad">
        <i class="fa-solid fa-minus restar-cantidad"></i>
        <input type="text" value="1" class="carrito-item-cantidad" disabled>
        <i class="fa-solid fa-plus sumar-cantidad"></i>
      </div>
      <span class="carrito-item-precio">${precio}</span>
    </div>`
item.innerHTML = itemCarritoContenido;
itemsCarrito.append(item);
//agregamos funcionalidad al eliminar nuevo item//
item.getElementsByClassName('btn-eliminar')[0].getEventListener('click',eliminarItemCarrito);
//agregamos la funcionalidad de sumar el nuevo item//
var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
botonSumarCantidad.addEventListener('click',sumarCantidad);
//agregamos la funcionalidad de restar el nuevo item//
var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
botonRestarCantidad.addEventListener('click',restarCantidad);
}
function pagarClicked(event){
    alert("Gracias Por Su Compra");
    //elimino todos los elementos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    white(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    //funciokn que oculta el carrito//
    ocultarCarrito();
}
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';
    var items = document.getElementsByClassName('carrito-items')[0];
    items.style.width = '60%';

}
