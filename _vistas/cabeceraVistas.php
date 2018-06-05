<?php
session_start();
?>
<header class="container-fluid bg-principal">
	<div id="contentHeader">
		<div id="logo">
			<a href="../index.php"><img src="../_recursos/img/Logo_Movil.jpg" alt="Logo shopsphere" title="shopsphere.S.L.U"
				class="hidden-sm hidden-md hidden-lg">
				<img src="../_recursos/img/Logo_Largo.jpg" alt="LogoShopsphere" title="shopsphere.s.l.u" class="hidden-xs">
			</a>
		</div>
		<div id="menuEscritorio" class="hidden-xs">
			<?php
		if( isset($_SESSION["nivelAcceso"]) && !empty($_SESSION["nivelAcceso"]) ){
			$nivelAcc = $_SESSION["nivelAcceso"];
			if ($nivelAcc == "adm") {
					echo "<ul>";
					echo "<li><a href='../_vistas/tienda.php'>Tiendas</a></li>";
					echo "<li><a href='../_vistas/usuario.php'>Usuarios</a></li>";
					echo "<li><a href='../_vistas/producto.php'>Productos</a></li>";
					echo "<li><a href='../_vistas/proveedor.php'>Proveedores</a></li>";
					echo "<li><a href='../_vistas/empleado.php'>Empleados</a></li>";
					echo "<li><a href='../_vistas/alertas.php'>Alertas</a></li>";
					echo "</ul>";
				}
		}
		?>
		</div>
		<div id="login">
			<?php
			if( isset($_SESSION["nivelAcceso"]) && !empty($_SESSION["nivelAcceso"]) ){
				echo "<div id='credenciales'>";
				
				if ($nivelAcc == "adm") {
					echo "<p>Usuario: Administrador</p>";
				}
				echo "<form action='../_web/controller.php?accion=logoff' method='post'>";
				echo '<input type="submit" id="cerrarSession" class="btn btn-info" value="Cerrar Session">';
				echo "</form>";
				echo "</div>";
			}
			?>
		</div>
		<div id="menuMovil" class="hidden-sm hidden-md hidden-lg">
			<?php
			if( isset($_SESSION["logDone"]) && $_SESSION["logDone"] == 1){
				echo '<button type="button" id="btnMenuMovil" class="btn bg-secundario">';
	      echo '<span class="glyphicon glyphicon-menu-hamburger"></span>';
	    	echo '</button>';
			}
			?>
	  </div>
	</div>
</header>
	<div id="opcionesMovil" class="hidden-sm hidden-md hidden-lg">
		<?php
		if( isset($_SESSION["nivelAcceso"]) && !empty($_SESSION["nivelAcceso"]) ){
			if ($nivelAcc == "adm") {
					echo "<ul>";
					echo "<li><a href='../_vistas/tienda.php'>Tiendas</a></li>";
					echo "<li><a href='../_vistas/usuario.php'>Usuarios</a></li>";
					echo "<li><a href='../_vistas/producto.php'>Productos</a></li>";
					echo "<li><a href='../_vistas/proveedor.php'>Proveedores</a></li>";
					echo "<li><a href='../_vistas/empleado.php'>Empleados</a></li>";
					echo "<li><a href='../_vistas/alertas.php'>Alertas</a></li>";
					echo "</ul>";
				}
		}
		?>
	</div>
	<script type="text/javascript" src="../_recursos/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="../_recursos/js/jqueryUI.js"></script>
	<script type="text/javascript" src="../_recursos/js/formularios.js"></script>