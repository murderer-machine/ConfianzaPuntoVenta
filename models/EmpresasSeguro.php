<?php

namespace alekas\models;

use alekas\core\Model;

class EmpresasSeguro extends Model {

    protected static $table = "t_empresas_seguro";
    public $id;
    public $nombres;
    public $ruc;
    public $factor_general;
    public $factor_soat;
    public $gastos_emision;
    public $gastos_emision_minimo;
    public $gastos_emision_minimo_soat;
    public $activo;
    public $logo;

    public function __construct($id, $nombres, $ruc, $factor_general, $factor_soat, $gastos_emision, $gastos_emision_minimo, $gastos_emision_minimo_soat, $activo, $logo) {
        $this->id = $id;
        $this->nombres = $nombres;
        $this->ruc = $ruc;
        $this->factor_general = $factor_general;
        $this->factor_soat = $factor_soat;
        $this->gastos_emision = $gastos_emision;
        $this->gastos_emision_minimo = $gastos_emision_minimo;
        $this->gastos_emision_minimo_soat = $gastos_emision_minimo_soat;
        $this->activo = $activo;
        $this->logo = $logo;
    }

    public function getId() {
        return $this->id;
    }

    public function getNombres() {
        return $this->nombres;
    }

    public function getRuc() {
        return $this->ruc;
    }

    public function getFactor_general() {
        return $this->factor_general;
    }

    public function getFactor_soat() {
        return $this->factor_soat;
    }

    public function getGastos_emision() {
        return $this->gastos_emision;
    }

    public function getGastos_emision_minimo() {
        return $this->gastos_emision_minimo;
    }

    public function getGastos_emision_minimo_soat() {
        return $this->gastos_emision_minimo_soat;
    }

    public function getActivo() {
        return $this->activo;
    }

    public function getLogo() {
        return $this->logo;
    }

    public function setId($id): void {
        $this->id = $id;
    }

    public function setNombres($nombres): void {
        $this->nombres = $nombres;
    }

    public function setRuc($ruc): void {
        $this->ruc = $ruc;
    }

    public function setFactor_general($factor_general): void {
        $this->factor_general = $factor_general;
    }

    public function setFactor_soat($factor_soat): void {
        $this->factor_soat = $factor_soat;
    }

    public function setGastos_emision($gastos_emision): void {
        $this->gastos_emision = $gastos_emision;
    }

    public function setGastos_emision_minimo($gastos_emision_minimo): void {
        $this->gastos_emision_minimo = $gastos_emision_minimo;
    }

    public function setGastos_emision_minimo_soat($gastos_emision_minimo_soat): void {
        $this->gastos_emision_minimo_soat = $gastos_emision_minimo_soat;
    }

    public function setActivo($activo): void {
        $this->activo = $activo;
    }

    public function setLogo($logo): void {
        $this->logo = $logo;
    }

}
