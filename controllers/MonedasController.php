<?php

namespace alekas\controllers;

use alekas\models\Monedas;
use alekas\core\Controller;
use alekas\core\Request;

class MonedasController extends Controller {

    public function mostrar(Request $request) {
        $parametros = $request->parametros();
        $ramos = Ramos::select()->run()->datos(true);
        return $ramos;
    }

}
