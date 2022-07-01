import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Image, Modal } from 'react-bootstrap'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
const Inicio = ({ idsubagenteventa, handleCloseDatosSoat, cargarVentas }) => {
    const [empresasSeguro, setEmpresasSeguro] = useState([])
    const [productos, setProductos] = useState([])
    const [ramos, setRamos] = useState('')
    const [datos, setDatos] = useState({
        id_subagente_venta: idsubagenteventa,
        id_empresa_seguro: {},
        id_producto: {},
        nro_poliza: '',
        placa: '',
        importe: '',
        datos_cliente: '',
        correo: '',
        celular: '',
    })
    const [validacion, setValidacion] = useState({
        id_empresa_seguro: true,
        id_producto: true,
        nro_poliza: true,
        placa: true,
        importe: true,
        datos_cliente: true,
    })
    const validarVocuher = () => {
        let id_empresa_seguro = Object.keys(datos.id_empresa_seguro).length == 0 ? false : true
        let id_producto = Object.keys(datos.id_producto).length == 0 ? false : true
        let nro_poliza = datos.nro_poliza == '' ? false : true
        let placa = datos.placa == '' ? false : true
        let importe = datos.importe == '' ? false : true
        let datos_cliente = datos.datos_cliente == '' ? false : true
        setValidacion({
            ...validacion,
            id_empresa_seguro: id_empresa_seguro,
            id_producto: id_producto,
            nro_poliza: nro_poliza,
            placa: placa,
            importe: importe,
            datos_cliente: datos_cliente,
        })
        return id_empresa_seguro && id_producto && nro_poliza && placa && importe && datos_cliente
    }
    const cargarEmpresas = () => {
        fetch('/empresasseguros/mostrar')
            .then(response => response.json())
            .then(data => setEmpresasSeguro(data))
    }
    const cargarProductos = () => {
        fetch(`/productosseguros/mostrar?id=${Object.keys(datos.id_empresa_seguro).length === 0 ? '' : datos.id_empresa_seguro.id}`)
            .then(response => response.json())
            .then(data => setProductos(data))
    }
    const cargarRamos = () => {
        fetch(`/ramos/mostrar?id=${Object.keys(datos.id_producto).length === 0 ? '' : datos.id_producto.id_ramo}`)
            .then(response => response.json())
            .then(data => setRamos(data))
    }
    const registrarDatosSoat = () => {
        if (validarVocuher()) {
            var url = '/datossoat/agregar'
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => alert('Error:', error))
                .then(response => {
                    if (response == 0) {
                        alert('agregado')
                        handleCloseDatosSoat()
                        cargarVentas()
                    }
                    if (response == 1) {
                        alert('ocurrio un error')
                    }
                })
        } else {

        }
    }
    const handleInputChange = (event) => {
        const { type, checked, name, value } = event.target
        setDatos({
            ...datos,
            [name]:
                {
                    'checkbox': checked,
                    'text': value,
                    'number': value,
                }[type]
        })
    }
    useEffect(() => {
        cargarRamos()
    }, [datos.id_producto])
    useEffect(() => {
        cargarProductos()
    }, [datos.id_empresa_seguro])
    useEffect(() => {
        cargarEmpresas()
    }, [])
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Card className="p-3">
                            <Row>
                                <Col xs={12} lg={12} className="mb-3">
                                    <Autocomplete
                                        options={empresasSeguro}
                                        getOptionLabel={(option) => Object.keys(option).length === 0 ? '' : `${option.nombre.toUpperCase()}`}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="Seleccione Empresa"
                                                error={!validacion.id_empresa_seguro}
                                                variant="outlined"
                                                size="small"
                                                autoComplete="off"
                                                fullWidth={true} />
                                        }
                                        noOptionsText="No hay opciones"
                                        value={datos.id_empresa_seguro}
                                        onChange={(event, newValue) => {
                                            if (newValue == null) {
                                                setDatos({
                                                    ...datos,
                                                    id_empresa_seguro: {},
                                                    id_producto: {}
                                                })
                                            } else {
                                                setDatos({
                                                    ...datos,
                                                    id_empresa_seguro: newValue,
                                                    id_producto: {}
                                                })
                                            }
                                        }}
                                    />
                                    {/* {JSON.stringify(datos.id_empresa_seguro)} */}
                                </Col>
                                <Col xs={12} lg={12} className="mb-3">
                                    <Autocomplete
                                        options={productos}
                                        getOptionLabel={(option) => Object.keys(option).length === 0 ? '' : `${option.nombre.toUpperCase()}`}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                error={!validacion.id_producto}
                                                label="Seleccione Producto"
                                                variant="outlined"
                                                size="small"
                                                autoComplete="off"
                                                fullWidth={true} />
                                        }
                                        noOptionsText="No hay opciones"
                                        value={datos.id_producto}
                                        onChange={(event, newValue) => {
                                            if (newValue == null) {
                                                setDatos({
                                                    ...datos,
                                                    id_producto: {}
                                                })
                                            } else {
                                                setDatos({
                                                    ...datos,
                                                    id_producto: newValue
                                                })
                                            }
                                        }}
                                    />
                                    {/* {JSON.stringify(datos.id_producto)} */}
                                </Col>
                                <Col xs={12} lg={6} className="mb-3">
                                    <TextField
                                        label="Ramo"
                                        value={ramos.toUpperCase()}
                                        type="text"
                                        fullWidth={true}
                                        variant="outlined"
                                        size="small"
                                        autoComplete="off"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        disabled
                                    />
                                    {/* {JSON.stringify(ramos)} */}
                                </Col>
                                <Col xs={12} lg={6} className="mb-3">
                                    <TextField
                                        label="Nº Póliza"
                                        error={!validacion.nro_poliza}
                                        name="nro_poliza"
                                        value={datos.nro_poliza}
                                        type="text"
                                        fullWidth={true}
                                        variant="outlined"
                                        size="small"
                                        autoComplete="off"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleInputChange}
                                    />
                                    {/* {JSON.stringify(datos.nro_poliza)} */}
                                </Col>
                                <Col xs={12} lg={2} className="mb-3">
                                    <TextField
                                        label="Placa"
                                        error={!validacion.placa}
                                        name="placa"
                                        value={datos.placa}
                                        type="text"
                                        fullWidth={true}
                                        variant="outlined"
                                        size="small"
                                        autoComplete="off"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleInputChange}
                                    />
                                    {/* {JSON.stringify(datos.placa)} */}
                                </Col>
                                <Col xs={12} lg={6} className="mb-3">
                                    <TextField
                                        label="Datos del Cliente"
                                        error={!validacion.datos_cliente}
                                        name="datos_cliente"
                                        value={datos.datos_cliente}
                                        type="text"
                                        fullWidth={true}
                                        variant="outlined"
                                        size="small"
                                        autoComplete="off"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleInputChange}
                                    />
                                    {/* {JSON.stringify(datos.datos_cliente)} */}
                                </Col>
                                <Col xs={12} lg={4} className="mb-3">
                                    <TextField
                                        label="Importe"
                                        error={!validacion.importe}
                                        name="importe"
                                        value={datos.importe}
                                        type="text"
                                        fullWidth={true}
                                        variant="outlined"
                                        size="small"
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                    />
                                    {/* {JSON.stringify(datos.importe)} */}
                                </Col>
                                <Col xs={12} lg={6} className="mb-3">
                                    <TextField
                                        label="Correo"
                                        name="correo"
                                        value={datos.correo}
                                        type="text"
                                        fullWidth={true}
                                        variant="outlined"
                                        size="small"
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                    />
                                    {/* {JSON.stringify(datos.importe)} */}
                                </Col>
                                <Col xs={12} lg={6} className="mb-3">
                                    <TextField
                                        label="Celular"
                                        name="celular"
                                        value={datos.celular}
                                        type="text"
                                        fullWidth={true}
                                        variant="outlined"
                                        size="small"
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                    />
                                    {/* {JSON.stringify(datos.importe)} */}
                                </Col>
                                <Col xs={12}>
                                    <Button variant="contained" type="button" className="btn-principal mt-2" onClick={() => {
                                        registrarDatosSoat()
                                    }}>Registrar</Button>
                                    {/* {JSON.stringify(datos)} */}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Inicio;