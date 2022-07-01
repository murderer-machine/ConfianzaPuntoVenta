<?php

namespace alekas\models;

use alekas\core\Model;

class Subagentes extends Model {

    protected static $table = "t_subagentes";
    public $id;
    public $nombres;
    public $apellidos;
    public $abreviatura;
    public $correo;
    public $celular;
    public $direccion;
    public $referencia;
    public $ubicacion;
    public $avatar;
    public $fecha_activacion;
    public $fecha_creacion;
    public $id_usuario;
    public $tipo_negocio;

    function __construct($id, $nombres, $apellidos, $abreviatura, $correo, $celular, $direccion, $referencia, $ubicacion, $avatar, $fecha_activacion, $fecha_creacion, $id_usuario, $tipo_negocio) {
        $this->id = $id;
        $this->nombres = $nombres;
        $this->apellidos = $apellidos;
        $this->abreviatura = $abreviatura;
        $this->correo = $correo;
        $this->celular = $celular;
        $this->direccion = $direccion;
        $this->referencia = $referencia;
        $this->ubicacion = $ubicacion;
        $this->avatar = $avatar;
        $this->fecha_activacion = $fecha_activacion;
        $this->fecha_creacion = $fecha_creacion;
        $this->id_usuario = $id_usuario;
        $this->tipo_negocio = $tipo_negocio;
    }

    function getId() {
        return $this->id;
    }

    function getNombres() {
        return $this->nombres;
    }

    function getApellidos() {
        return $this->apellidos;
    }

    function getAbreviatura() {
        return $this->abreviatura;
    }

    function getCorreo() {
        return $this->correo;
    }

    function getCelular() {
        return $this->celular;
    }

    function getDireccion() {
        return $this->direccion;
    }

    function getReferencia() {
        return $this->referencia;
    }

    function getUbicacion() {
        return $this->ubicacion;
    }

    function getAvatar() {
        return $this->avatar;
    }

    function getFecha_activacion() {
        return $this->fecha_activacion;
    }

    function getFecha_creacion() {
        return $this->fecha_creacion;
    }

    function getTipo_negocio() {
        return $this->tipo_negocio;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setNombres($nombres): void {
        $this->nombres = $nombres;
    }

    function setApellidos($apellidos): void {
        $this->apellidos = $apellidos;
    }

    function setAbreviatura($abreviatura): void {
        $this->abreviatura = $abreviatura;
    }

    function setCorreo($correo): void {
        $this->correo = $correo;
    }

    function setCelular($celular): void {
        $this->celular = $celular;
    }

    function setDireccion($direccion): void {
        $this->direccion = $direccion;
    }

    function setReferencia($referencia): void {
        $this->referencia = $referencia;
    }

    function setUbicacion($ubicacion): void {
        $this->ubicacion = $ubicacion;
    }

    function setAvatar($avatar): void {
        $this->avatar = $avatar;
    }

    function setFecha_activacion($fecha_activacion): void {
        $this->fecha_activacion = $fecha_activacion;
    }

    function setFecha_creacion($fecha_creacion): void {
        $this->fecha_creacion = $fecha_creacion;
    }

    function setTipo_negocio($tipo_negocio): void {
        $this->tipo_negocio = $tipo_negocio;
    }

    function setId_usuario($id_usuario): void {
        $this->id_usuario = $id_usuario;
    }

}
