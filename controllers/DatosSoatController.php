<?php

namespace alekas\controllers;

use alekas\models\DatosSoat;
use alekas\core\Controller;
use alekas\core\Request;
use alekas\corelib\Numeros;

class DatosSoatController extends Controller {

    public function agregar(Request $request) {
        $parametro = $request->parametrosJson();
        $prima_comercial = Numeros::convertirDecimal($parametro->importe) / 1.18;
        $factor = $parametro->id_producto->id_ramo == '66' ? $parametro->id_empresa_seguro->factor_soat : $parametro->id_empresa_seguro->factor_general;
        $prima_neta = Numeros::convertirDecimal($parametro->importe) / $factor;
        $gastos_emision = $parametro->id_producto->id_ramo === '66' ? $parametro->id_empresa_seguro->gastos_emision_minimo_soat : $parametro->id_empresa_seguro->gastos_emision_minimo;
        $prima_neta = $prima_comercial - $prima_neta;
        $prima_neta = $prima_neta > $gastos_emision ? Numeros::convertirDecimal($parametro->importe) / $factor : $prima_comercial - $gastos_emision;
        $comision = $parametro->id_producto->comision == '0.00' ? 0 : $prima_neta * $parametro->id_producto->comision / 100;
        $porcentaje = $comision * 100 / $prima_neta;
        $comision_agente = $comision / 2;

        $datos_soat = new DatosSoat(
                $id = null,
                $id_subagente_venta = $parametro->id_subagente_venta,
                $id_empresa = $parametro->id_empresa_seguro->id,
                $id_producto = $parametro->id_producto->id,
                $id_ramo = $parametro->id_producto->id_ramo,
                $nro_poliza = $parametro->nro_poliza,
                $placa = $parametro->placa,
                $datos_cliente = $parametro->datos_cliente,
                $importe = $parametro->importe,
                $prima_neta = $prima_neta,
                $comision_broker = $comision,
                $porcentaje = $parametro->id_producto->comision,
                $comision_agente = $comision_agente);
        $resultado = $datos_soat->create();
        return $this->json($resultado["error"]);
    }

}
