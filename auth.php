<?
session_start();
include('conexion.php');
conectar_bd();

$email = $_POST['email'];
$password = $_POST['password'];

#echo $email.' '.$password;


$consulta= " select id_usuario from usuario where email_usuario = '$email' ";
#$respuesta = consulta_bd($consulta);
#$row    =   extraer_tupla($respuesta);
$row = consulta($consulta);
$id_usuario = $row['id_usuario'];
#echo $consulta;
#echo $respuesta.'<br />';
#echo $row;
#echo '<br />';
#echo $id_usuario;

if (empty($row))
    echo "usuario invalido <a href='ins_usuario.php'>Registrate</a>";

else{
#    echo 'usuario valido <br />';

    $_SESSION['id_usuario']=$id_usuario;
#    echo $_SESSION['id_usuario'];
    $consulta = " select password_usuario, permiso_usuario from usuario where id_usuario = $id_usuario ";
#    echo $consulta;
    $row = consulta($consulta);
    $pass = $row['password_usuario'];
    $permiso = $row['permiso_usuario'];



    if ( $pass == $password )
    {
#        $consulta = " select permiso_usuario from usuario where id_usuario = $id_usuario ";
#        echo $consulta;
#        $row = consulta($consulta);
#        $permiso = $row['password_usuario'];
#        $_SESSION['registrado'] = true;
        $insert = "insert into session values ($id_usuario,nextval('id_session'),'".date("d-m-Y")."','".date("H:m:s")."')";
        consulta_bd($insert);
#echo $insert;
        $_SESSION['permiso'] = $permiso;
        header( 'Location: index.php' );
#        echo "<script>windows.location.href='index.php'</script>";

#        $_SESSION['permiso'] = $permiso;
#        echo 'usuario validado ..... '.$_SESSION['permiso'];
        desconectar_bd();
    }
    else
    {
        desconectar_bd();
	    session_destroy();
        echo 'password invalido. te olvidaste tu password??.<br /> queries que te lo  <a href="#">recordemos</a>';

    }
}

#private function auth($strg)
#{
#    $res = false;

#    $consulta = " select password_usuario from usuario where id_usuario = '$id_usuario' ";
#    $row = consulta($consulta);
#    $pass = $row['password_usuario'];

#    if ( $pass == $strg )
#        $res = true

#    return $res;

#}

?>

