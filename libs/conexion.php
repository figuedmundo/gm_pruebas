<?php
/***********************************
 * LIBRERIA DE DB - conexion_base_datos.php
 ***********************************/
$enlace = 0;
function conectar_bd () {
    $enlace = pg_connect("host=localhost port=5432 user=ed password=memi dbname=maps")
                        or die
                        ("Existio un error al intentar conectarse al servidor de base de datos");
}
function desconectar_bd() {
	global $enlace;
  	pg_close($enlace);
}
function consulta_bd($sql) {
	global $enlace;
  	$res = pg_query( $enlace, $sql ) or die ("Error en la consulta");
	return $res;
}
function extraer_tupla($res) {
	$registro = pg_fetch_array($res);
	return $registro;
}
function numero_filas($res) {
	$respuesta= pg_num_rows($res);
	return $respuesta;
}

function consulta($sql) {
	global $enlace;
  	$res = pg_query( $enlace, $sql ) or die ("Error en la consulta");
  	$registro = pg_fetch_array($res);
	return $registro;
}


?>

