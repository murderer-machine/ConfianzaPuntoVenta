<?php

namespace alekas\models;

use alekas\core\Model;

class DatosSoat extends Model {

    protected static $table = "t_datos_soat";
    public $id;
    public $id_subagente_venta;
    public $id_empresa;
    public $id_producto;
    public $id_ramo;
    public $nro_poliza;
    public $placa;
    public $datos_cliente;
    public $importe;
    public $prima_neta;
    public $comision_broker;
    public $porcentaje;
    public $comision_agente;

    public function __construct($id, $id_subagente_venta, $id_empresa, $id_producto, $id_ramo, $nro_poliza, $placa, $datos_cliente, $importe, $prima_neta, $comision_broker, $porcentaje, $comision_agente) {
        $this->id = $id;
        $this->id_subagente_venta = $id_subagente_venta;
        $this->id_empresa = $id_empresa;
        $this->id_producto = $id_producto;
        $this->id_ramo = $id_ramo;
        $this->nro_poliza = $nro_poliza;
        $this->placa = $placa;
        $this->datos_cliente = $datos_cliente;
        $this->importe = $importe;
        $this->prima_neta = $prima_neta;
        $this->comision_broker = $comision_broker;
        $this->porcentaje = $porcentaje;
        $this->comision_agente = $comision_agente;
    }

    public function getId() {
        return $this->id;
    }

    public function getId_subagente_venta() {
        return $this->id_subagente_venta;
    }

    public function getId_empresa() {
        return $this->id_empresa;
    }

    public function getId_producto() {
        return $this->id_producto;
    }

    public function getId_ramo() {
        return $this->id_ramo;
    }

    public function getNro_poliza() {
        return $this->nro_poliza;
    }

    public function getPlaca() {
        return $this->placa;
    }

    public function getDatos_cliente() {
        return $this->datos_cliente;
    }

    public function getImporte() {
        return $this->importe;
    }

    public function getPrima_neta() {
        return $this->prima_neta;
    }

    public function getComision_broker() {
        return $this->comision_broker;
    }

    public function getPorcentaje() {
        return $this->porcentaje;
    }

    public function getComision_agente() {
        return $this->comision_agente;
    }

    public function setId($id): void {
        $this->id = $id;
    }

    public function setId_subagente_venta($id_subagente_venta): void {
        $this->id_subagente_venta = $id_subagente_venta;
    }

    public function setId_empresa($id_empresa): void {
        $this->id_empresa = $id_empresa;
    }

    public function setId_producto($id_producto): void {
        $this->id_producto = $id_producto;
    }

    public function setId_ramo($id_ramo): void {
        $this->id_ramo = $id_ramo;
    }

    public function setNro_poliza($nro_poliza): void {
        $this->nro_poliza = $nro_poliza;
    }

    public function setPlaca($placa): void {
        $this->placa = $placa;
    }

    public function setDatos_cliente($datos_cliente): void {
        $this->datos_cliente = $datos_cliente;
    }

    public function setImporte($importe): void {
        $this->importe = $importe;
    }

    public function setPrima_neta($prima_neta): void {
        $this->prima_neta = $prima_neta;
    }

    public function setComision_broker($comision_broker): void {
        $this->comision_broker = $comision_broker;
    }

    public function setPorcentaje($porcentaje): void {
        $this->porcentaje = $porcentaje;
    }

    public function setComision_agente($comision_agente): void {
        $this->comision_agente = $comision_agente;
    }

}
