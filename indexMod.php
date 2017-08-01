<?php
$controller = (isset($_REQUEST['m']))?$_REQUEST['m']:'Login';
$create     = (isset($_REQUEST['create']))?($_REQUEST['create']=='true')?true:false:true;
$edit       = (isset($_REQUEST['edit']))?($_REQUEST['edit']=='true')?true:false:true;
$delete     = (isset($_REQUEST['delete']))?($_REQUEST['delete']=='true')?true:false:true;
$lang       = (isset($_REQUEST['l']))?$_REQUEST['l']:substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 5);

//Se Cableó todo a español porque estaban dando problemas unos modulos por la falta de texto en inglés
$lang = 'es-ES';

?>
<!DOCTYPE>
<html>
    <head>
        <!-- Meta Data -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <!-- Datos Propios -->
        <title><?= $controller . ' - Field Vision'?></title>
        <link rel="icon" href="images/favicon.ico" type="image/x-icon"/>
        
        <!-- Javascripts -->
        <script type="text/javascript" >
        var strURL = 'http://190.144.39.246/fieldvision_dev/public';
        //var strURL = 'http://192.168.1.127:8080/fv-api/';

        //Soporte a URL GET
        var urlGET = {};           
        <?php
            foreach ($_GET as $key => $value) 
            {
                echo 'urlGET[\'' . $key . '\'] = \'' . $value . '\';' . "\n";
            }
        ?>
        </script>
        <script type="text/javascript" src="app/lang/<?php echo $controller."_".$lang ?>.js"></script>
        <script type="text/javascript" src="app/lang/<?php echo $lang ?>.js"></script>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/ext-4.2.1/ext-all.js"></script>
        <script type="text/javascript" src="js/ext-4.2.1/locale/ext-lang-es.js"></script>
        <script type="text/javascript" src="js/ext-4.2.1/examples/ux/Spotlight.js"></script>

        <!-- Google Maps Api -->
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBlSAPU17rA1Z00TI8vnOS-1az5lcvgPMU"></script>
        <!-- OpenLayers -->
        <script type="text/javascript" src="js/openlayers/OpenLayers.js"></script>
        <!--GeoExt-->
        <script type="text/javascript" src="js/geoext/examples/loader.js"></script>
        <link rel="stylesheet" type="text/css" href="js/geoext/examples/shared/example.css">
        <!--Polyline Encoder-->
        <script type="text/javascript" src="js/polyline.js"></script>

        <script type="text/javascript" src="app/app.js?controller=<?php echo $controller ?>" id="identificador_js"></script>
        <script type="text/javascript" src="app/configs/<?php echo $controller ?>.js"></script>
        <script type="text/javascript" src='vendor/js/vendor.js'></script>
        <script type="text/javascript" src='dist/formbuilder.js'></script>
        <script type="text/javascript" src='dist/formbuilderWindow.js'></script>
        <link rel="stylesheet" href="vendor/css/vendor.css" />
        <link rel="stylesheet" type="text/css" href="dist/formbuilder.css" />
        <?php
        if($create==true){
            ?><script type="text/javascript" src="app/permissions/<?php echo $controller ?>/create.js"></script><?php
        }
        if($edit==true){
            ?><script type="text/javascript" src="app/permissions/<?php echo $controller ?>/edit.js"></script><?php
        }
        if($delete==true){
            ?><script type="text/javascript" src="app/permissions/<?php echo $controller ?>/delete.js"></script><?php
        }
        ?>
        <script src="js/jquery.loader.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <link href='css/bootstrap.css' rel='stylesheet' type='text/css'>
        <link href="css/jquery.loader.css" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="js/ext-4.2.1/resources/ext-theme-neptune/ext-theme-neptune-all.css">
        <link rel="stylesheet" type="text/css" href="js/ext-4.2.1/examples/ux/grid/css/GridFilters.css" />
        <link rel="stylesheet" type="text/css" href="js/ext-4.2.1/examples/ux/grid/css/RangeMenu.css" />

<!--
        <link rel="stylesheet" type="text/css" href="geoext/geoext-all.css" />
        <script type="text/javascript" src="geoext1/GeoExt/lib/GeoExt.js"></script>-->

        <link rel="stylesheet" type="text/css" href="css/config.css">

		<link rel="stylesheet" type="text/css" href="css/main_menu.css">
    </head>
    <body>
        <div id="content" style="display: none;"></div>
        <div id="modalFormbuilder" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Gridfield - Fields Settings</h4>
              </div>
              <div id="bodyModalFormbuilder" class="modal-body">
                <p>Content not loaded.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close window</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div id="modalError" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Questions Info</h4>
              </div>
              <div id="bodyModalError" class="modal-body">
                <p>Error in response. Content not loaded.</p>
              </div>
              <div class="modal-footer">
                <button type="button" id="closeModalError" class="btn btn-default" data-dismiss="modal">Close window</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!-- 
            NOTA: Este script debe ir obligatoriamente aquí
            luego de renderizar el modal
        -->
        <script type="text/javascript" src='dist/modalFormbuilder.js'></script>
    </body>
</html>
