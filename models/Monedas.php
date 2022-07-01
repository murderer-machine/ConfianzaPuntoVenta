<?php

namespace alekas\models;

use alekas\core\Model;

class Monedas extends Model {

    protected static $table = "t_monedas";
    public $id;
    public $nombre;
    public $simbolo;

    public function __construct($id, $nombre, $simbolo) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->simbolo = $simbolo;
    }

    public function getId() {
        return $this->id;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function getSimbolo() {
        return $this->simbolo;
    }

    public function setId($id): void {
        $this->id = $id;
    }

    public function setNombre($nombre): void {
        $this->nombre = $nombre;
    }

    public function setSimbolo($simbolo): void {
        $this->simbolo = $simbolo;
    }

}
