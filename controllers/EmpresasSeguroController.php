<?php

namespace alekas\controllers;

use alekas\models\EmpresasSeguro;
use alekas\core\Controller;
use alekas\core\Request;

class EmpresasSeguroController extends Controller {

    public function mostrar() {
      
        $empresas_seguro = EmpresasSeguro::select()->where([['activo', 1]])->run()->datos(true);
        return $empresas_seguro;
    }

}
