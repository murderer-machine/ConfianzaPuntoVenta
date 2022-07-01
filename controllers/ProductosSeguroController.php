<?php

namespace alekas\controllers;

use alekas\models\ProductosSeguro;
use alekas\core\Controller;
use alekas\core\Request;

class ProductosSeguroController extends Controller {

    public function mostrar(Request $request) {
        $parametros = $request->parametros();
        $productos_seguro = ProductosSeguro::select()->where([['id_empresas_seguro', $parametros['id']]])->run()->datos(true);
        return $productos_seguro;
    }

}
