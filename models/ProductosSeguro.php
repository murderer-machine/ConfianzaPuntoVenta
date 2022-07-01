<?php

namespace alekas\models;

use alekas\core\Model;

class ProductosSeguro extends Model {

    protected static $table = "t_productos_empresas_seguros";
    public $id;
    public $nombre;
    public $id_empresas_seguro;
    public $id_ramo;
    public $comision;

    public function __construct($id, $nombre, $id_empresas_seguro, $id_ramo, $comision) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->id_empresas_seguro = $id_empresas_seguro;
        $this->id_ramo = $id_ramo;
        $this->comision = $comision;
    }

    public function getId() {
        return $this->id;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function getId_empresas_seguro() {
        return $this->id_empresas_seguro;
    }

    public function getId_ramo() {
        return $this->id_ramo;
    }

    public function getComision() {
        return $this->comision;
    }

    public function setId($id): void {
        $this->id = $id;
    }

    public function setNombre($nombre): void {
        $this->nombre = $nombre;
    }

    public function setId_empresas_seguro($id_empresas_seguro): void {
        $this->id_empresas_seguro = $id_empresas_seguro;
    }

    public function setId_ramo($id_ramo): void {
        $this->id_ramo = $id_ramo;
    }

    public function setComision($comision): void {
        $this->comision = $comision;
    }

}
