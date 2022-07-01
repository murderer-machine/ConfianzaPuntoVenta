<?php

require_once '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

use alekas\core\Aplicacion;
use alekas\controllers\auth\SessionController;
use alekas\controllers\SubagentesController;
use alekas\controllers\EmpresasSeguroController;
use alekas\controllers\ProductosSeguroController;
use alekas\controllers\RamosController;
use alekas\controllers\DatosSoatController;

$url = $_GET['alekas_url'] ?? "/";

$app = new Aplicacion($url, dirname(__DIR__));

//Rutas GET
$app->ruta->get('logout', [SessionController::class, 'logout']);
$app->ruta->get('subagentes/mostrar', [SubagentesController::class, 'mostrar']);
$app->ruta->get('subagentes/ventas', [SubagentesController::class, 'ventasNoPagado']);
$app->ruta->get('subagentes/ventaspagado', [SubagentesController::class, 'ventasPagado']);
$app->ruta->get('subagentes/ventaspagadopdf', [SubagentesController::class, 'ventasPagadoPDF']);

$app->ruta->get('empresasseguros/mostrar', [EmpresasSeguroController::class, 'mostrar']);
$app->ruta->get('productosseguros/mostrar', [ProductosSeguroController::class, 'mostrar']);
$app->ruta->get('ramos/mostrar', [RamosController::class, 'mostrar']);

//Rutas POST
$app->ruta->post('login', [SessionController::class, 'login']);
$app->ruta->post('subagentes/subir', [SubagentesController::class, 'subir']);
$app->ruta->post('subagentes/subirvoucher', [SubagentesController::class, 'subirVoucher']);
$app->ruta->post('datossoat/agregar', [DatosSoatController::class, 'agregar']);

//Vistas
$app->ruta->get('/', 'ingreso');
$app->ruta->get('inicio', 'inicio');
$app->ruta->get('ventas', 'ventas');

//Funciones


$app->Run();

