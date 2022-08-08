import React, { useState, useCallback, useEffect, useMemo } from 'react'
import styles from '../../../styles/ContainerRegisterParticular2.module.css'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop'

const CRP2 = ({
    setVerdadero2,
    userCore,
    setUserCore,
    omitir,
    setOmitir
}) => {

    const [imagePerfilUpload, setImagePerfilUpload] = useState([])
    const [imagePerfilURL, setImagePerfilURL] = useState("")
    const [imgPerfil, setImgPerfil] = useState(false)

    const [imageFondoUpload, setImageFondoUpload] = useState([])
    const [imageFondoURL, setImageFondoURL] = useState("")
    const [imgFondo, setImgFondo] = useState(false)


    const [imgPerfilStyle, setImgPerfilStyle] = useState({})
    const [imgFondoStyle, setImgFondoStyle] = useState({})


    useEffect(() => {
        console.log(imgPerfilStyle)
    }, [imgPerfilStyle])



    function Basic(props) {
        const { acceptedFiles,
            getRootProps,
            getInputProps,
            isFocused,
            isDragAccept,
            isDragReject,
        } = useDropzone({ accept: { 'image/*': [] } });

        const style = useMemo(() => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }), [
            isFocused,
            isDragAccept,
            isDragReject
        ]);


        const files = acceptedFiles.map(file => (
            props.setImages([file])
        ));

        return (
            <div className="container">
                <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            </div>
        );
    }

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const focusedStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };






    const [resultadoPerfil, setResultadoPerfil] = useState(false)
    const [resultadoFondo, setResultadoFondo] = useState(false)

    const [modalPerfil, setModalPerfil] = useState(false)
    const [modalFondo, setModalFondo] = useState(false)

    const [modal, setModal] = useState(false)


    const CROP_AREA_ASPECT = 1 / 1;

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedArea, setCroppedArea] = useState(null);
    const [corteActual, setCorteActual] = useState({})
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
        setCroppedArea(croppedArea)
    }, [])






    const handleCrop = () => {
        // let aux = {}
        // console.log(croppedArea)
        // aux = croppedArea
        // console.log("aux")
        // console.log(aux)
        // let aux2 = aux
        // setCorteActual(aux2);
        // console.log("corte boton")
        // console.log(corteActual)
        // if(modalPerfil == true && modalFondo == false){
        //     setResultadoPerfil(true)
        //     cropFunction(corteActual, "perfil")
        //     setModalPerfil(false)
        // } else if(modalFondo == true && modalPerfil == false){
        //     setResultadoFondo(true)
        //     cropFunction(corteActual, "fondo")
        //     setModalFondo(false)
        // }


        setCorteActual(croppedArea)
        setCorteActual((state) => {
            console.log(state)
            console.log("corte boton")
            console.log(corteActual)
            if (modalPerfil == true && modalFondo == false) {
                setResultadoPerfil(true)
                cropFunction(state, "perfil")
                setModalPerfil(false)
            } else if (modalFondo == true && modalPerfil == false) {
                setResultadoFondo(true)
                cropFunction(state, "fondo")
                setModalFondo(false)
            }

        })



    }


    const cropFunction = (corteActual, tipo) => {

        console.log(corteActual)
        const scale = 100 / corteActual.width;
        const transform = {
            x: `${-corteActual.x * scale}%`,
            y: `${-corteActual.y * scale}%`,
            scale,
            width: "calc(100% + 0.5px)",
            height: "auto"
        };

        const imageStyle = {
            transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
            width: transform.width,
            height: transform.height
        };



        if (tipo == "perfil") {
            setImgPerfilStyle(imageStyle)
        } else if (modalFondo == true && modalPerfil == false) {
            setImgFondoStyle(imageStyle)
        }

    }






    useEffect(() => {
        if (imagePerfilUpload.length < 1) return;
        const newImageUrls = [];
        imagePerfilUpload.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImagePerfilURL(newImageUrls);
        setResultadoPerfil(false)
        setImgPerfil(true)
        setModalPerfil(true)
        console.log("llega")
        console.log(modalPerfil)
    }, [imagePerfilUpload]);

    useEffect(() => {
        if (imageFondoUpload.length < 1) return;
        const newImageUrls = [];
        imageFondoUpload.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImageFondoURL(newImageUrls);
        setResultadoFondo(false)
        setImgFondo(true)
        setModalFondo(true)
    }, [imageFondoUpload]);



    const handleSiguiente = () => {
        console.log(imagePerfilUpload)
        setUserCore({
            ...userCore,
            imagePerfilUpload,
            imageFondoUpload
        })

        setVerdadero2(true)
    }








    return (
        <div className={styles.div_supremo}>


            {
                modalPerfil == true || modalFondo == true ?
                <div className={styles.modal_crop}>
                    <div className={styles.modal_crop_inside}>
                        <div className={styles.menu} onClick={() => {modalPerfil ? setModalPerfil(false) : modalFondo ? setModalFondo(false) : null}}>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                        </div>
                        <div className={styles.div_cropper}>
                            <Cropper
                                image={modalPerfil ? imagePerfilURL : modalFondo ? imageFondoURL : null}
                                crop={crop}
                                zoom={zoom}
                                aspect={1 / 1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div className={styles.controls}>
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e) => {
                                    setZoom(e.target.value)
                                }}
                                className={styles.zoom_range}
                            />
                        </div>

                        <button onClick={handleCrop}>Recortar</button>

                    </div>
                </div>
                : null
            }





            <div className={styles.main_container}>
                <div className={styles.inside_container}>
                    <div className={styles.div_header}>
                        <h2>Crea tu cuenta en <span className={styles.text_blue}>Inmo</span></h2>

                    </div>
                    <div className={styles.form}>

                        <div className={styles.div_fields}>
                            <div className={styles.fields}>
                                <h3>Imagen de <span className={styles.text_blue}>Perfil:</span></h3>
                                <label className={styles.label_desc1}>Suba una imagen que represente su persona o empresa, la imagen se mostrara en su perfil y en sus publicaciones</label>
                                <Basic setImages={setImagePerfilUpload} />
                                {
                                    resultadoPerfil &&
                                    <div className={styles.div_img}>
                                        <img src={imagePerfilURL} style={imgPerfilStyle} />
                                    </div>

                                }
                            </div>

                            <div className={styles.fields}>
                                <h3 className={styles.h3}>Imagen de <span className={styles.text_blue}>Portada:</span></h3>
                                <label className={styles.label_desc2}>Incluya una imagen representativa que aparecera de forma decorativa en su perfil</label>
                                <Basic setImages={setImageFondoUpload} />
                                {
                                    resultadoFondo &&
                                    <div className={styles.div_img}>
                                        <img src={imageFondoURL} style={imgFondoStyle} />
                                    </div>


                                }
                            </div>



                            <div className={styles.buttons}>
                                <button className={styles.button} onClick={handleSiguiente}>Siguiente</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.div_detalle}>
                <div className={styles.div_inside_detalle}>
                    <p>Una buena imagen ilustrativa aporta mucho a la primera impresion de tu empresa dentro de la pagina.</p>
                    <img src="/icono_about.png" />
                </div>
            </div>
        </div>
    )
}

export default CRP2