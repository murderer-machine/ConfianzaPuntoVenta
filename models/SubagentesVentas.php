<?php

namespace alekas\models;

use alekas\core\Model;

class SubagentesVentas extends Model {

    protected static $table = "t_subagentes_ventas";
    public $id;
    public $id_subagente;
    public $nombre_archivo_pdf;
    public $id_usuario;
    public $pagado;
    public $fecha_creacion;

    function __construct($id, $id_subagente, $nombre_archivo_pdf, $id_usuario, $pagado, $fecha_creacion) {
        $this->id = $id;
        $this->id_subagente = $id_subagente;
        $this->nombre_archivo_pdf = $nombre_archivo_pdf;
        $this->id_usuario = $id_usuario;
        $this->pagado = $pagado;
        $this->fecha_creacion = $fecha_creacion;
    }

    function getId() {
        return $this->id;
    }

    function getId_subagente() {
        return $this->id_subagente;
    }

    function getNombre_archivo_pdf() {
        return $this->nombre_archivo_pdf;
    }

    function getId_usuario() {
        return $this->id_usuario;
    }

    function getPagado() {
        return $this->pagado;
    }

    function getFecha_creacion() {
        return $this->fecha_creacion;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setId_subagente($id_subagente): void {
        $this->id_subagente = $id_subagente;
    }

    function setNombre_archivo_pdf($nombre_archivo_pdf): void {
        $this->nombre_archivo_pdf = $nombre_archivo_pdf;
    }

    function setId_usuario($id_usuario): void {
        $this->id_usuario = $id_usuario;
    }

    function setPagado($pagado): void {
        $this->pagado = $pagado;
    }

    function setFecha_creacion($fecha_creacion): void {
        $this->fecha_creacion = $fecha_creacion;
    }

}
