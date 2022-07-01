<?php

namespace alekas\controllers;

use alekas\models\Ramos;
use alekas\core\Controller;
use alekas\core\Request;

class RamosController extends Controller {

    public function mostrar(Request $request) {
        $parametros = $request->parametros();
        $ramos = Ramos::select()->where([['id', $parametros['id']]])->run()->datos();
        return $this->json(count($ramos) <= 0 ? '' : $ramos[0]['descripcion']);
    }

}
