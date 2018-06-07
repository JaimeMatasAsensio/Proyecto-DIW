"use strict";
/*Documento para implementar las funcionalidades de los formularios y sus validaciones */
/*
Jaime Matas Asensio
Proyecto DAW: ShopSphere
I.E.S. Maestre de Calatrava - Ciudad Real
2017
*/
/*Acciones con JQuery*/
$(document).ready(function(){
  /*Objetos planos para recoger valores y realizar JSON*/
  var tienda = {
    codTienda: "",
    nombre: "",
    pais: "",
    provincia: "",
    poblacion: "",
    direccion: "",
    numero: "",
    telefono: "",
    movil: "",
    email: "",
    tipoSuscripcion: ""
  };
  /*Objeto Tienda */

  function resetTienda(tienda){
    tienda.codTienda = "";
    tienda.nombre =  "";
    tienda.pais = "";
    tienda.provincia = "";
    tienda.poblacion = "";
    tienda.direccion = "";
    tienda.numero = "";
    tienda.telefono = "";
    tienda.movil = "";
    tienda.email = "";
    tienda.tipoSuscripcion = "";   
  }
  /*Reset de valores del objeto Tienda */

  $( ".divMod button" ).click( function() {
    var form = $( ".divMod" ).parent().prev();
    form = form[0];
    for( var i = 1; i < form.length ; i++){
      var type = form[i].type;
      if(type != "hidden"){
        form[i].disabled = false;
      }
    }
    switch (form.name) {
      case "tienda":
        tienda.codTienda = form[1].value;
        tienda.nombre = form[2].value;
        tienda.pais = form[3].value;
        tienda.provincia = form[4].value;
        tienda.poblacion = form[5].value;
        tienda.direccion = form[6].value;
        tienda.numero = form[7].value;
        tienda.telefono = form[8].value;
        tienda.movil = form[9].value;
        tienda.email = form[10].value;
        var i = 1;
        while(tienda.tipoSuscripcion == ""){
          tienda.tipoSuscripcion = form[11][i].selected?form[11][i].value:"";
          i++;
        }
        break;
      
      case "usuario":
        
        break;
      
      case "producto":
        
        break;
      
      default:
        break;
    }
	});
  /*Habilita los campos del formulario y toma los valores por si se cancela la modificacion*/

  $( ".confMod button.cancelMod" ).click( function() {
		var form = $( ".divMod" ).parent().prev();
    form = form[0];
    switch (form.name) {
      case "tienda":
        form[1].value = tienda.codTienda;
        form[2].value = tienda.nombre;
        form[3].value = tienda.pais;
        form[4].value = tienda.provincia;
        form[5].value = tienda.poblacion;
        form[6].value = tienda.direccion;
        form[7].value = tienda.numero;
        form[8].value = tienda.telefono;
        form[9].value =  tienda.movil;
        form[10].value = tienda.email;
        
        for(var i = 1; i < form[11].length; i++){
          form[11][i].selected = form[11][i].value == tienda.tipoSuscripcion ? true : false ;
        }

        for(var i = 2; i < form.length ; i++){
          form[i].parentElement.className = "form-group col-xs-12 col-sm-6";
        }
        
        resetTienda(tienda);
        
        break;
      
      case "usuario":
        //Formulario de usuarios
        break;
      
      case "producto":
        //Formularios de productos
        break;
      
      default:
        break;
    }

    for( var i = 1; i < form.length ; i++){
      var type = form[i].type;
      if(type != "hidden"){
        form[i].disabled = true;
      }
    }
    
	});
  /*Deshabilita los campos del formulario de modificacion y recoje los valores antiguos*/

  $( ".confMod button:first-child" ).click( function() {
    var form = $( ".divMod" ).parent().prev();
    form = form[0];
    switch (form.name) {
      case "tienda":
        //Divisiones de informacion y bloqueo del formulario mientras se realiza el AJAX
        $( ".divMod" ).parent().prev().prev().prev().text("");
        $( ".divMod" ).parent().prev().prev().animate({zIndex:"1"});
      
        //Montar el obj, para convertirlo a JSON
        tienda.codTienda = form[1].value;
        tienda.nombre = form[2].value;
        tienda.pais = form[3].value;
        tienda.provincia = form[4].value;
        tienda.poblacion = form[5].value;
        tienda.direccion = form[6].value;
        tienda.numero = form[7].value;
        tienda.telefono = form[8].value;
        tienda.movil = form[9].value;
        tienda.email = form[10].value;
        var i = 1;
        while(tienda.tipoSuscripcion == ""){
          tienda.tipoSuscripcion = form[11][i].selected?form[11][i].value:"";
          i++;
        }
        //AJAX
        //Parametros de la peticion ajax para la modificacion de tienda
        var parametros = {
          accion: "mantenimentoTiendas",
          operacion:  "modificacion",
          json: JSON.stringify(tienda)
        };
        //Envio de AJAX
        $.ajax({
          data: parametros,
          url: "../_web/controller.php",
          type: "post"
        }).done(function(response,estado,jqXHR){
          //Peticion terminada con resultado correcto
          var tiendaUpdated = JSON.parse(response);
          //Toma los nuevos valores y los inserta en el formulario
          form[1].value = tiendaUpdated.codTienda;
          form[2].value = tiendaUpdated.nombre;
          form[3].value = tiendaUpdated.pais;
          form[4].value = tiendaUpdated.provincia;
          form[5].value = tiendaUpdated.poblacion;
          form[6].value = tiendaUpdated.direccion;
          form[7].value = tiendaUpdated.numero;
          form[8].value = tiendaUpdated.telefono;
          form[9].value =  tiendaUpdated.movil;
          form[10].value = tiendaUpdated.email;
          for(var i = 1; i < form[11].length; i++){
            form[11][i].selected = form[11][i].value == tiendaUpdated.tipoSuscripcion ? true : false ;
          }
          //Deshabilita la modificacion de campos
          for( var i = 1; i < form.length ; i++){
            var type = form[i].type;
            if(type != "hidden"){
              form[i].disabled = true;
            }
          }
          //Oculta la division de control de modificacion y muestra de la division de modificacion
          $( ".divMod" ).show();
          $(".confMod").hide();
          $( ".divMod" ).parent().prev().prev().prev().text(tiendaUpdated.msgReturn)
        }).fail(function(jqXHR,estado,error){
          //Errores en la peticion de AJAX
          console.log(error);
          console.log(estado);
        }).always(function(){
          //Animaciones tras la peticion AJAX y resultado  
            var aux = $( ".divMod" ).parent().prev().prev();
            var width = aux[0].offsetWidth;
            var height = aux[0].offsetHeight
            width = "-=" + width + "px";
            height = "-=" + height + "px";
            $( ".divMod" ).parent().prev().prev().animate({height: height, width: width},"500",function(){
              $( ".divMod" ).parent().prev().prev().prev().animate({zIndex: "1"},"10000"); 
              $( ".divMod" ).parent().prev().prev().prev().animate({opacity:0,zIndex: "-100"},3000,function(){
                $( ".divMod" ).parent().prev().prev().prev().css({opacity:1, zIndex: "-100"});
                $( ".divMod" ).parent().prev().prev().css({width:"100%" , height: "100%", zIndex: "-100"}); 
              }); 
              
            });  
        });
        
        break;
      
      case "usuario":
        //Formularios de usuarios
        break;
      
      case "producto":
        //Formularios de productos
        break;
      
      default:
        break;
    }
  });
  /*Funcion de envio de datos por ajax con JSON para la modificacion del Formulario*/
  
  $( "#resultadoBusquedaElementos" ).click( function() {
    var formsBusqueda = $( "#formsResaultadoBusqueda div.row.formulario.formulario-crud form" );
    for(var i = 0 ; i < formsBusqueda.length ; i++){
      for(var j = 2 ; j < formsBusqueda[i].length ; j++){
        formsBusqueda[i][j].parentElement.className = "form-group col-xs-12 col-sm-6";
      }      
    }
  });
  //Funcion para resetar los input y quitar las marcas de validacion en los formularios de busqueda

  $( "#nuevoElemento" ).click( function() {
    var formsInsert = $( "#formNuevoElemento form" );
    console.log(formsInsert);
    /*
    for(var i = 0 ; i < formsInsert.length ; i++){
      for(var j = 2 ; j < formsInsert[i].length ; j++){
        formsInser[i][j].parentElement.className = "form-group col-xs-12 col-sm-6";
      }      
    }
    */
  });
  //Funcion para resetar los input y quitar las marcas de validacion en los formularios de busqueda

  
});//Fin del documentReady