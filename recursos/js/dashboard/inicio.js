import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Menu from '../menu/menu_horizontal'
import { Container, Row, Col, Card, Image, Modal } from 'react-bootstrap'
// import { useDropzone } from 'react-dropzone'
import Dropzone from 'react-dropzone'
import './inicio.scss'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Document, Page, pdfjs } from "react-pdf"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
const Inicio = () => {
    const [subagentes, setSubagentes] = useState([])
    const [acceptedFiles, setAcceptedFiles] = useState([])
    const [acceptedFilesVoucher, setAcceptedFilesVoucher] = useState([])
    const [ventas, setVentas] = useState([])
    const [condicionVentas, setCondicionVentas] = useState(true)
    const [datos, setDatos] = useState({
        id_subagente: {},
        observaciones_poliza : '',
    })
    const [datosVoucher, setDatosVoucher] = useState({
        id_subagente_venta: '',
        fecha_operacion: '',
        nro_operacion: '',
        banco: '',
        nombre_cuenta: '',
        nombre_archivo_imagen: '',
        observaciones: '',
    })
    const [validacionVoucher, setValidacionVoucher] = useState({
        id_subagente_venta: true,
        fecha_operacion: true,
        nro_operacion: true,
        banco: true,
        nombre_cuenta: true,
        nombre_archivo_imagen: true,

        acceptedFilesVoucher: true,
    })
    const [show, setShow] = useState(false)
    const [mensajeCertificado, setMensajeCertificado] = useState(false)
    const [spinner_certificado, setSpinner_certificado] = useState(false)
    const [spinner_voucher, setSpinner_voucher] = useState(false)
    const [mensajesValidacionCargaCertificado, setMensajesValidacionCargaCertificado] = useState({
        success: false,
        error: false,
    })
    const [mensajesValidacionCargaVoucher, setMensajesValidacionCargaVoucher] = useState({
        condicion: false,
        mensaje: '',
    })
    //Renders
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            <small>{file.path} - {file.size} bytes</small><br />
        </li>
    ))
    const filesVoucher = acceptedFilesVoucher.map(file => (
        <li key={file.path}>
            <small>{file.path} - {file.size} bytes</small><br />
        </li>
    ))
    //UseEffect
    useEffect(() => {
        mostrarSubagentes()
    }, [])
    useEffect(() => {
        cargarVentas()
    }, [condicionVentas])
    const LimpiarValidacionCargaCertificado = () => {
        setMensajesValidacionCargaCertificado({
            success: false,
            error: false,
        })
    }
    //Funciones
    const mostrarSubagentes = async () => {
        await fetch('/subagentes/mostrar')
            .then(response => response.json())
            .then(data => setSubagentes(data))
    }
    const subirCertificado = () => {
        if (!acceptedFiles.length || Object.keys(datos.id_subagente).length === 0) {
            setMensajeCertificado(true)
        } else {
            setMensajeCertificado(false)
            setSpinner_certificado(true)
            var formData = new FormData()
            for (const file of acceptedFiles) {
                formData.append('documento[]', file, file.name)
            }
            formData.append('id_subagente', datos.id_subagente.id)
            formData.append('nombre_subagente', datos.id_subagente.abreviatura)
            var url = `/subagentes/subir`
            fetch(url, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if (response == 0) {
                        setMensajesValidacionCargaCertificado({
                            success: true,
                            error: false,
                        })
                        setSpinner_certificado(false)
                        setCondicionVentas(!condicionVentas)
                        setAcceptedFiles([])
                        setDatos({ ...datos, id_subagente: {} })
                    }
                    if (response != 0) {
                        setMensajesValidacionCargaCertificado({
                            success: false,
                            error: true,
                        })
                        LimpiarValidacionCargaCertificado()
                        setSpinner_certificado(false)
                    }
                });
        }
    }
    const subirVoucher = () => {
        setSpinner_voucher(true)
        setMensajesValidacionCargaVoucher({
            condicion: false,
            mensaje: ''
        })
        if (validarVocuher()) {
            var formData = new FormData()
            for (const file of acceptedFilesVoucher) {
                formData.append('documento[]', file, file.name)
            }
            formData.append('id_subagente_venta', datosVoucher.id_subagente_venta)
            formData.append('fecha_operacion', datosVoucher.fecha_operacion)
            formData.append('nro_operacion', datosVoucher.nro_operacion)
            formData.append('banco', datosVoucher.banco)
            formData.append('nombre_cuenta', datosVoucher.nombre_cuenta)
            formData.append('nombre_archivo_imagen', datosVoucher.nombre_archivo_imagen)
            formData.append('observaciones', datosVoucher.observaciones)
            var url = `/subagentes/subirvoucher`
            fetch(url, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    setSpinner_voucher(false)
                    if (response == 0) {
                        handleClose()
                        setCondicionVentas(!condicionVentas)
                        setMensajesValidacionCargaCertificado({
                            success: false,
                            error: false,
                        })
                    }
                    if (response == 1) {
                        setMensajesValidacionCargaVoucher({
                            condicion: true,
                            mensaje: 'Error al guardar datos voucher.'
                        })
                    }
                    if (response == 2) {
                        setMensajesValidacionCargaVoucher({
                            condicion: true,
                            mensaje: 'Error al subir el archivo.'
                        })
                    }
                });
        } else {
            setSpinner_voucher(false)
        }
    }
    const validarVocuher = () => {
        let id_subagente_venta = datosVoucher.id_subagente_venta == '' ? false : true
        let fecha_operacion = datosVoucher.fecha_operacion == '' ? false : true
        let nro_operacion = datosVoucher.nro_operacion == '' ? false : true
        let banco = datosVoucher.banco == '' ? false : true
        let nombre_cuenta = datosVoucher.nombre_cuenta == '' ? false : true
        let nombre_archivo_imagen = datosVoucher.nombre_archivo_imagen == '' ? false : true
        let acceptedFilesVoucher_ = !acceptedFilesVoucher.length ? false : true
        setValidacionVoucher({
            ...validacionVoucher,
            id_subagente_venta: id_subagente_venta,
            fecha_operacion: fecha_operacion,
            nro_operacion: nro_operacion,
            banco: banco,
            nombre_cuenta: nombre_cuenta,
            nombre_archivo_imagen: nombre_archivo_imagen,
            acceptedFilesVoucher: acceptedFilesVoucher_
        })
        return id_subagente_venta && fecha_operacion && nro_operacion && banco && nombre_cuenta && nombre_archivo_imagen && acceptedFilesVoucher_
    }
    const cargarVentas = () => {
        fetch('/subagentes/ventas')
            .then(response => response.json())
            .then(data => setVentas(data))
    }
    const handleClose = () => {
        setShow(false)
        setDatosVoucher({
            id_subagente_venta: '',
            fecha_operacion: '',
            nro_operacion: '',
            banco: '',
            nombre_cuenta: '',
            nombre_archivo: '',
            observaciones: '',
            ruta_voucher: '',
        })
    }
    const handleShow = (id, nombre_archivo_imagen) => {
        setShow(true)
        setDatosVoucher({
            ...datosVoucher,
            id_subagente_venta: id,
            nombre_archivo_imagen: nombre_archivo_imagen,
        })
        setAcceptedFilesVoucher([])
    }
    const handleInputChange = (event) => {
        const { type, checked, name, value } = event.target
        setDatosVoucher({
            ...datosVoucher,
            [name]: type === 'checkbox' ? checked : value
        })
    }
    const handleInputChangeDatos = (event) => {
        const { type, checked, name, value } = event.target
        setDatos({
            ...datos,
            [name]: type === 'checkbox' ? checked : value
        })
    }
    const [url_pdf, setUrl_pdf] = useState('')
    const [showpdf, setShowpdf] = useState(false)
    const handleClosepdf = () => {
        setShowpdf(false)
    }
    const handleShowpdf = (ruta) => {
        setZoom(1.0)
        setUrl_pdf(ruta)
        setShowpdf(true)
    }

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [zoom, setZoom] = useState(1.0);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <Menu modulo="inicio">
            <Container className="mt-2">
                <Row className="d-flex justify-content-center">
                    {/* <Col xs={12}>
                        {JSON.stringify(datosVoucher)}
                    </Col> */}
                    <Col xs={12} lg={12}>
                        <Card className="p-3">
                            <Row>
                                {mensajeCertificado ? (<>
                                    <Col xs={12} className="mb-2">
                                        <Alert severity="error">
                                            <AlertTitle>Falta completar campos</AlertTitle>
                                            <ul>
                                                <li>Verifique si ha seleccionado un certificado.</li>
                                                <li>verifique si ha seleccionado un punto de venta.</li>
                                            </ul>
                                        </Alert>
                                    </Col>
                                </>) : (<></>)}
                                <Col xs={12} lg={12} className="mb-2">
                                    <Dropzone onDrop={acceptedFiles => {
                                        setAcceptedFiles(acceptedFiles)
                                        LimpiarValidacionCargaCertificado()
                                    }} accept=".pdf" multiple={false} >
                                        {({ getRootProps, getInputProps }) => (
                                            <>
                                                <div {...getRootProps({ className: 'dropzone m-0 p-3 mb-2' })} >
                                                    <input {...getInputProps()} />
                                                    Seleccione o arrastre
                                                </div>
                                                <h6>Archivo seleccionado : </h6>
                                                <ol>{files}</ol>
                                            </>
                                        )}
                                    </Dropzone>
                                </Col>
                                <Col xs={12} lg={12} className="mb-2">
                                    <TextField
                                        label="Observaciones"
                                        value={datos.observaciones}
                                        type="text"
                                        fullWidth={true}
                                        variant="outlined"
                                        placeholder="Aqui ingrese celular y correo del cliente"
                                        multiline
                                        rows={2}
                                        autoComplete="off"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleInputChange}
                                    />
                                </Col>
                                <Col xs={12} lg={6} className="mb-2">
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={subagentes}
                                        getOptionLabel={(option) => Object.keys(option).length === 0 ? '' : `PV. ${option.abreviatura.toUpperCase()}`}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="Seleccione punto de venta"
                                                variant="outlined"
                                                size="small"
                                                autoComplete="off"
                                                fullWidth={true} />
                                        }
                                        value={datos.id_subagente}
                                        onChange={(event, newValue) => {
                                            if (newValue == null) {
                                                setDatos({
                                                    ...datos,
                                                    id_subagente: {}
                                                })
                                            } else {
                                                setDatos({
                                                    ...datos,
                                                    id_subagente: newValue
                                                })
                                            }
                                        }}
                                    />
                                </Col>
                              
                                <Col xs={12} lg={6} className="d-flex justify-content-center align-items-center" className="mb-2">
                                    <Button variant="contained" type="button" className="btn-principal" onClick={subirCertificado} disabled={spinner_certificado}>{spinner_certificado ? (<CircularProgress size={15} className="spinner_blanco mr-2" />) : (<></>)}Ingresar</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={12} lg={12} className="text-center">
                        {!ventas.length ? (<>
                            <Card className="p-3 my-1">
                                No se encontraron resultados.
                            </Card>
                        </>) : (<></>)}
                        {mensajesValidacionCargaCertificado.success ? (<>
                            <Card className="p-3 my-1">
                                <Row>
                                    <Col xs={12}>
                                        <Alert severity="success">
                                            Se subio y agrego correctamente.
                                        </Alert>
                                    </Col>
                                </Row>
                            </Card>
                        </>) : (<></>)}
                        {mensajesValidacionCargaCertificado.error ? (<>
                            <Card className="p-3 my-1">
                                <Row>
                                    <Col xs={12}>
                                        <Alert severity="error">
                                            <b>Error</b> informar al área de sistemas.
                                        </Alert>
                                    </Col>
                                </Row>
                            </Card>
                        </>) : (<></>)}
                    </Col>
                    <Col xs={12} lg={12}>
                        {ventas.map((venta, key_venta) => (
                            <Card className="p-3 my-1" key={key_venta}>
                                <Row className="d-flex align-items-center text-center">
                                    <Col xs={2}>{venta.id}</Col>
                                    <Col xs={5}>
                                        <h5 className="m-0"><b>PV. {venta.id_subagente.abreviatura.toUpperCase()}</b></h5>
                                        {venta.fecha_creacion}<br />
                                    </Col>
                                    <Col xs={2}>
                                        <a href={venta.ruta} target="_blank"><Image src="./img/descarga.svg" className="iconos_" /></a>
                                        <a href="#" onClick={() => { handleShowpdf(venta.ruta) }} className="mr-1"><Image src="./img/pdf.svg" className="iconos_" /></a>
                                    </Col>
                                    <Col xs={3}>{venta.pagado == 0 ? (<>
                                        <Button variant="contained" type="button" className="btn-principal" size="small" onClick={() => { handleShow(venta.id, venta.ruta_voucher) }}>Voucher</Button>
                                    </>) : (<></>)}</Col>
                                </Row>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Body>
                    <Row>
                        <Col xs={12} className="mb-3">
                            <TextField
                                label="Fecha operación"
                                error={!validacionVoucher.fecha_operacion}
                                name="fecha_operacion"
                                value={datosVoucher.fecha_operacion}
                                onChange={handleInputChange}
                                type="date"
                                fullWidth={true}
                                variant="outlined"
                                size="small"
                                autoComplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Col>
                        <Col xs={12} className="mb-3">
                            <TextField
                                label="Nro operación"
                                error={!validacionVoucher.nro_operacion}
                                name="nro_operacion"
                                value={datosVoucher.nro_operacion}
                                onChange={handleInputChange}
                                type="text"
                                fullWidth={true}
                                variant="outlined"
                                size="small"
                                autoComplete="off"
                            />
                        </Col>
                        <Col xs={12} className="mb-3">
                            <TextField
                                label="Banco"
                                error={!validacionVoucher.banco}
                                name="banco"
                                value={datosVoucher.banco}
                                onChange={handleInputChange}
                                type="text"
                                fullWidth={true}
                                variant="outlined"
                                size="small"
                                autoComplete="off"
                            />
                        </Col>
                        <Col xs={12} className="mb-3">
                            <TextField
                                label="Nombre Cuenta"
                                error={!validacionVoucher.nombre_cuenta}
                                name="nombre_cuenta"
                                value={datosVoucher.nombre_cuenta}
                                onChange={handleInputChange}
                                type="text"
                                fullWidth={true}
                                variant="outlined"
                                size="small"
                                autoComplete="off"
                            />
                        </Col>
                        <Col xs={12} className="mb-3">
                            <TextField
                                label="Observaciones"
                                name="observaciones"
                                value={datosVoucher.observaciones_poliza}
                                onChange={handleInputChangeDatos}
                                type="text"
                                fullWidth={true}
                                variant="outlined"
                                size="small"
                                autoComplete="off"
                                multiline
                                rowsMax={4}
                            />
                        </Col>
                        <Col>
                            <Dropzone onDrop={acceptedFiles => setAcceptedFilesVoucher(acceptedFiles)} accept="image/*" multiple={true} maxFiles={3} >
                                {({ getRootProps, getInputProps }) => (
                                    <>
                                        <div {...getRootProps({ className: `dropzone m-0 p-3 mb-2 ${!validacionVoucher.acceptedFilesVoucher ? 'dropzone_error' : ''}` })} >
                                            <input {...getInputProps()} />
                                            Seleccione o arrastre
                                        </div>
                                        <h6>Archivo seleccionado : </h6>
                                        <ol>{filesVoucher}</ol>
                                    </>
                                )}
                            </Dropzone>
                        </Col>
                    </Row>
                    {mensajesValidacionCargaVoucher.condicion ? (<>
                        <Col xs={12}>
                            <Alert severity="error">
                                <AlertTitle>Detalle del error</AlertTitle>
                                <ul>
                                    <li>{mensajesValidacionCargaVoucher.mensaje}</li>
                                </ul>
                            </Alert>
                        </Col>
                    </>) : (<></>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" type="button" className="btn-principal mr-2" size="small" onClick={subirVoucher} disabled={spinner_voucher}>{spinner_voucher ? (<CircularProgress size={15} className="spinner_blanco mr-2" />) : (<></>)} Agregar</Button>
                    <Button variant="contained" type="button" className="btn-principal" size="small" onClick={handleClose} disabled={spinner_voucher}>{spinner_voucher ? (<CircularProgress size={15} className="spinner_blanco mr-2" />) : (<></>)} Cancelar</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showpdf} onHide={handleClosepdf} size="lg">
                <Modal.Body>
                    <button onClick={() => { setZoom(zoom + 0.5) }}> + </button>
                    <button onClick={() => { zoom <= 0.5 ? {} : setZoom(zoom - 0.5) }}> - </button>
                    <Document
                        file={url_pdf}
                        onLoadSuccess={onDocumentLoadSuccess}
                        renderMode="canvas"
                        loading="Cargando PDF"
                    >
                        <Page pageNumber={pageNumber} scale={zoom} loading="Cargando PDF" />
                    </Document>
                    <p>Página {pageNumber} de {numPages}</p>
                </Modal.Body>
            </Modal>
        </Menu>
    )
}
export default Inicio;
if (document.getElementById("inicio")) {
    ReactDOM.render(<Inicio />, document.getElementById("inicio"));
}