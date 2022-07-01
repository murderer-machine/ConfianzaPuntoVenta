<?php

namespace alekas\models;

use alekas\core\Model;

class Usuarios extends Model {

    protected static $table = "t_usuarios";
    public $id;
    public $dni;
    public $nombres;
    public $apellidos;
    public $direccion;
    public $correo;
    public $celular;
    public $password;
    public $fecha_creacion = fecha;

    function __construct($id, $dni, $nombres, $apellidos, $direccion, $correo, $celular, $password) {
        $this->id = $id;
        $this->dni = $dni;
        $this->nombres = $nombres;
        $this->apellidos = $apellidos;
        $this->direccion = $direccion;
        $this->correo = $correo;
        $this->celular = $celular;
        $this->password = $password;
    }

    function getId() {
        return $this->id;
    }

    function getDni() {
        return $this->dni;
    }

    function getNombres() {
        return $this->nombres;
    }

    function getApellidos() {
        return $this->apellidos;
    }

    function getDireccion() {
        return $this->direccion;
    }

    function getCorreo() {
        return $this->correo;
    }

    function getCelular() {
        return $this->celular;
    }

    function getPassword() {
        return $this->password;
    }

    function getFecha_creacion() {
        return $this->fecha_creacion;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setDni($dni): void {
        $this->dni = $dni;
    }

    function setNombres($nombres): void {
        $this->nombres = $nombres;
    }

    function setApellidos($apellidos): void {
        $this->apellidos = $apellidos;
    }

    function setDireccion($direccion): void {
        $this->direccion = $direccion;
    }

    function setCorreo($correo): void {
        $this->correo = $correo;
    }

    function setCelular($celular): void {
        $this->celular = $celular;
    }

    function setPassword($password): void {
        $this->password = $password;
    }

    function setFecha_creacion($fecha_creacion): void {
        $this->fecha_creacion = $fecha_creacion;
    }

}
