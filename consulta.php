<?php
$nombre  = $_POST['nombre'];
$mail    = $_POST['mail'];
$empresa = $_POST['empresa'];

$header  = 'From: ' . $mail . " \r\n";
$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain";

$mensaje = "Este mensaje fue enviado por " . $nombre . ", de la empresa " . $empresa . " \r\n";
$mensaje .= "Su e-mail es: " . $mail . " \r\n";
$mensaje .= "Mensaje: " . $_POST['mensaje'] . " \r\n";
$mensaje .= "Enviado el " . date('d/m/Y', time());

$para   = 'contacto@arandelasrosa.com.ar';
$asunto = 'Consulta desde arandelasrosa.com.ar';

$result = mail($para, $asunto, utf8_decode($mensaje), $header);
echo json_encode($result);
?>