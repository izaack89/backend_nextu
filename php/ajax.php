<?php

function getValor($precio){
    $nuevo_precio= str_replace("$", "", $precio);
    $nuevo_precio= str_replace(",", "", $nuevo_precio);
    return $nuevo_precio;
}
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

$information_json= file_get_contents(dirname(dirname(__FILE__))."/data-1.json");
$information = json_decode($information_json, true);

$action=$_POST["filterKey"];
if(empty($action)) { $action=$_GET["filterKey"]; }


switch ($action)
{	
    case 'get_selects':
            $select_values=array();
            $ciudades_tmp=array();
            $tipo_tmp=array();
            foreach ($information as $ciudades_json => $ciudad_json) {
                $ciudades_tmp[]= $ciudad_json['Ciudad'];
            }
            $ciudades = array_values(array_unique($ciudades_tmp));
            foreach ($information as $tipos_json => $tipo_json) {
                $tipo_tmp[]= $tipo_json['Tipo'];
            }
            $tipo = array_values(array_unique($tipo_tmp));
            
            $select_values["ciudades"]=$ciudades;
            $select_values["tipos"]=$tipo;
        echo json_encode($select_values);
    break;
    case 'busqueda_casas':
            $tipo_busqueda=trim($_POST['tipo_busqueda']);
            $tipo=trim($_POST['tipo']);
            $ciudad=trim($_POST['ciudad']);
            $rango_inferior=trim($_POST['from']);
            $rango_superior=trim($_POST['to']);
            $casas=array();
            if($tipo_busqueda=="todas"){
                foreach ($information as $casas_json => $casa_json) {
                    $casas[]= $casa_json;
                }
            }else{
                $guarda_info_ciudad=false;
                $guarda_info_tipo=false;
                foreach ($information as $casas_json => $casa_json) {
                    if($ciudad!="" && $casa_json['Ciudad']==$ciudad){
                        $guarda_info=true;
                    }else{
                        $guarda_info=false;
                    }
                    
                    if($tipo!="" && $casa_json['Tipo']==$tipo){
                        $guarda_info=true;
                    }else{
                        $guarda_info=false;
                    }
                    
                    if($rango_inferior<=getValor($casa_json['Precio']) && $rango_superior>=getValor($casa_json['Precio'])){
                        if($ciudad==""){
                            $guarda_info_ciudad=true;
                        }elseif($casa_json['Ciudad']==$ciudad){
                            $guarda_info_ciudad=true;
                        }else{
                            $guarda_info_ciudad=false;
                        }

                        if($tipo==""){
                            $guarda_info_tipo=true;
                        }elseif($casa_json['Tipo']==$tipo){
                            $guarda_info_tipo=true;
                        }else{
                            $guarda_info_tipo=false;
                        }
                        if($guarda_info_ciudad && $guarda_info_tipo){
                            $casas[]= $casa_json;
                        }
                    }
                }
            }
        echo json_encode($casas);
    break;
    default :
        echo "No information sent it!";
    break;
}
