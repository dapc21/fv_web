<?php

//var_dump($_REQUEST);
$node = $_REQUEST['node'];
$json = '';
switch ($node){
    case 'src':
       $json = array();
        $json[] = array(
            'id'=>'src/app',
            'text'=>'app',
            'cls'=>'folder',
            'qtip'=>'carpeta contenedora de aplicacion',
        );
        $json[] = array(
            'id'=>'src/css',
            'text'=>'css',
            'cls'=>'folder',
            'qtip'=>'carpeta de estilos',
        );
        $json[] = array(
            'id'=>'src/js',
            'text'=>'js',
            'cls'=>'folder',
            'qtip'=>'Carpeta con archivos js específicos',
        );
        $json[] = array(
            'id'=>'src/images',
            'text'=>'images',
            'cls'=>'folder',
            'qtip'=>'carpeta de imágenes',
        );
        $json[] = array(
            'id'=>'src/server',
            'text'=>'server',
            'cls'=>'folder',
            'qtip'=>'Carpeta para dummys',
        );
        $json[] = array(
            'id'=>'src/index.php',
            'text'=>'index.php',
            'size'=>'928kb',
            'permissions'=>'755',
            'cls'=>'file',
            'leaf' => true,
            'qtip'=>'archivo inicial',
        );
        echo json_encode($json);
        break;
    case 'src/app':
       $json = array();
        $json[] = array(
            'id'=>'src/app/configs',
            'text'=>'configs',
            'cls'=>'folder',
            'qtip'=>'carpeta contenedora de configuracions',
        );
        $json[] = array(
            'id'=>'src/app/controller',
            'text'=>'controller',
            'cls'=>'folder',
            'qtip'=>'carpeta de controladores',
        );
        $json[] = array(
            'id'=>'src/app/lang',
            'text'=>'lang',
            'cls'=>'folder',
            'qtip'=>'Carpeta con archivos de lenguaje',
        );
        $json[] = array(
            'id'=>'src/app/model',
            'text'=>'model',
            'cls'=>'folder',
            'qtip'=>'carpeta de modelos',
        );
        $json[] = array(
            'id'=>'src/app/store',
            'text'=>'store',
            'cls'=>'folder',
            'qtip'=>'Carpeta para stores',
        );
        $json[] = array(
            'id'=>'src/app/view',
            'text'=>'view',
            'cls'=>'folder',
            'qtip'=>'carpeta de vistas',
        );
        echo json_encode($json);
        break;
    case 'src/css':
       $json = array();
        $json[] = array(
            'id'=>'src/css/config',
            'text'=>'config.css',
            'cls'=>'file',
            'qtip'=>'estilos',
        );
        $json[] = array(
            'id'=>'src/css/gray',
            'text'=>'gray',
            'cls'=>'file',
            'qtip'=>'tema gris',
        );
        $json[] = array(
            'id'=>'src/css/blue',
            'text'=>'blue',
            'cls'=>'file',
            'qtip'=>'tema blue',
        );
        
        echo json_encode($json);
        break;
}