import React, { useState, useCallback, useEffect, useMemo } from 'react'
import styles from '../../../styles/ContainerRegisterParticular2.module.css'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop'



const ContainerRegisterParticular2 = ({
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


    const [modal, setModal] = useState(false)


    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedArea, setCroppedArea] = useState(null);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
        setCroppedArea(croppedArea)
    }, [])



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





    // useEffect(() => {
    //     if (imagePerfilUpload == null) { setImgPerfil(false); return; }
    //     setImagePerfilURL(URL.createObjectURL(new Blob(imagePerfilUpload, {type: "image/*"})))
    //     setImgPerfil(true)
    // }, [imagePerfilUpload])

    // useEffect(() => {
    //     if (imageFondoUpload == null) { setImgFondo(false); return; }
    //     setImageFondoURL(URL.createObjectURL(imageFondoUpload))
    //     setImgFondo(true)
    // }, [imageFondoUpload])

    useEffect(() => {
        if (imagePerfilUpload.length < 1) { return; }
        const newImageUrls = [];
        imagePerfilUpload.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImagePerfilURL(newImageUrls);
        setImgPerfil(true)
        setModal(true)
    }, [imagePerfilUpload]);

    useEffect(() => {
        if (imageFondoUpload.length < 1) return;
        const newImageUrls = [];
        imageFondoUpload.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImageFondoURL(newImageUrls);
        setImgFondo(true)
        setModal(true)
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


    const handleEliminarImgPerfil = () => {
        setImagePerfilUpload([])
        setImagePerfilURL("")
        setImgPerfil(false)
    }

    const handleEliminarImgFondo = () => {
        setImageFondoUpload([])
        setImageFondoURL("")
        setImgFondo(false)
    }




    return (
        <div className={styles.div_supremo}>


            {
                modal &&
                <div className={styles.modal_crop}>
                    <div className={styles.modal_crop_inside}>
                        <div className={styles.menu} onClick={() => setModal(false)}>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                        </div>
                        <div className={styles.div_cropper}>
                            <Cropper
                                image={imagePerfilURL}
                                crop={crop}
                                zoom={zoom}
                                aspect={3 / 3}
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

                        <button>Recortar</button>

                    </div>
                </div>
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
                            </div>

                            <div className={styles.fields}>
                                <h3 className={styles.h3}>Imagen de <span className={styles.text_blue}>Portada:</span></h3>
                                <label className={styles.label_desc2}>Incluya una imagen representativa que aparecera de forma decorativa en su perfil</label>
                                <Basic setImages={setImageFondoUpload} />
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

export default ContainerRegisterParticular2