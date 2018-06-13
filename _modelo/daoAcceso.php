<?php
/*
Jaime Matas Asensio
Proyecto DAW: ShopSphere
I.E.S. Maestre de Calatrava - Ciudad Real
2018
*/
require_once '../_entidad/classAcceso.php';
require_once '../_conexion/libreria_PDO.php';
 class daoAcceso{
 
    private $con;    //Propiedad para guardar el objeto conexion
    public $result = array();  //Array de objetos para devolver el resultado
    public function __CONSTRUCT(){
      try{
        $this->con = new BD();
      }catch(Exception $e){
        die($e->getMessage());
      }
    }
    //Funcion constructor del modelos de datos de acceso
    
    public function listarAccesosUsuarios(){
      try {
        $consulta = "SELECT * FROM acceso WHERE codUsuario > 0";
        $param = array();
        $this->con->ConsultaNormalAssoc($consulta, $param);
        $this->result = array();
        foreach ($this->con->datos as $fila){
          $acceso[ $fila['codUsuario'] ] = $fila['codTienda'];
        }
        $this->result[] = $acceso;
      }catch (Exception $e){
        echo($e->getMessage());
      }  
    }
    //retorna un listado de usuarios en array[codUsuario] = codTienda

    public function eliminarAcceso($codUsuario){
      try {
      $consulta = "DELETE FROM acceso WHERE codUsuario = :codUsuario";
      $param = array(":codUsuario" => $codUsuario);
      $this->result = $this->con->ConsultaSimple($consulta, $param);
      
      }catch (Exception $e){
        echo($e->getMessage());
      }  
    }
    //Funcion modelo de datos acceso elimina por clave
    public function insertarAcceso($obj){
      try {
      $consulta = "INSERT INTO usuario(codUsuario,codAcceso) VALUES (?,?)";
      $param = array(
        $obj->__GET("codUsuario"),
        $obj->__GET("codAcceso"),
        
      );
      $this->result = $this->con->ConsultaSimple($consulta, $param);
      
      }catch (Exception $e){
        echo($e->getMessage());
      }  
    }
    //Funcion modelo de datos acceso inserta un nuevo registro
    public function actualizarAcceso($obj){
      try {
      $consulta = "UPDATE articulos SET codTienda=? WHERE codUsuario=?";
      $param = array(
        $obj->__GET("codTienda"),
        $obj->__GET("codUsuario")
      );
      $this->result = $this->con->ConsultaSimple($consulta, $param);
      
      }catch (Exception $e){
        echo($e->getMessage());
      }  
    }
    //Funcion modelo de datos acceso actualiza un registro existente
}