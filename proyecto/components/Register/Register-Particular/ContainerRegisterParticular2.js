import React, { useState, useCallback, useEffect, useMemo } from 'react'
import styles from '../../../styles/ContainerRegisterGeneral2.module.css'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop'
import { getCroppedImg, getRotatedImage } from '../../../crop/auxCrop'


const ContainerRegisterParticular2 = ({
    setVerdadero2,
    userCore,
    setUserCore,
    omitir,
    setOmitir
}) => {

    const [imageSrc, setImageSrc] = React.useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const [croppedImagePerfil, setCroppedImagePerfil] = useState(null)
    const [croppedImageFondo, setCroppedImageFondo] = useState(null)

    const [modalPerfil, setModalPerfil] = useState(false)
    const [modalFondo, setModalFondo] = useState(false)

    const [imagePerfilUpload, setImagePerfilUpload] = useState(false)
    const [imageFondoUpload, setImageFondoUpload] = useState(false)

    const [resultadoPerfil, setResultadoPerfil] = useState(false)
    const [resultadoFondo, setResultadoFondo] = useState(false)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])


    const showCroppedImagePerfil = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            )
            console.log('donee', { croppedImage })


            setCroppedImagePerfil(croppedImage)
            setResultadoPerfil(true)

            setImageSrc(null)
            setCrop({ x: 0, y: 0 })
            setRotation(0)
            setZoom(1)
            setCroppedAreaPixels(null)
            setModalPerfil(false)
            setImagePerfilUpload(false)
            setImageFondoUpload(false)
        

        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels, rotation])




    const showCroppedImageFondo = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            )
            console.log('donee', { croppedImage })


            setCroppedImageFondo(croppedImage)
            setResultadoFondo(true)

            setImageSrc(null)
            setCrop({ x: 0, y: 0 })
            setRotation(0)
            setZoom(1)
            setCroppedAreaPixels(null)
            setModalFondo(false)
            setImagePerfilUpload(false)
            setImageFondoUpload(false)

        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels, rotation])







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
                    <p>Arrastra una imagen o busca una en tu equipo.</p>
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
        borderColor: '#38B6FF',
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










    useEffect(() => {
        if (imagePerfilUpload.length >= 1) {
            const change = async () => {
                const file = imagePerfilUpload[0]
                console.log("llega1")
                let imageDataUrl = await readFile(file)

                setImageSrc(imageDataUrl)
                setModalPerfil(true)
                console.log("llega2")
            }
            change()
            return
        }
    }, [imagePerfilUpload]);



    useEffect(() => {
        if (imageFondoUpload.length >= 1) {
            const change = async () => {
                const file = imageFondoUpload[0]
                let imageDataUrl = await readFile(file)

                setImageSrc(imageDataUrl)
                setModalFondo(true)
            }

            change()
            return
        }


    }, [imageFondoUpload]);



    function readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        })
    }


    
    const handleSiguiente = async () => {
        console.log(imagePerfilUpload)
        let blobPerfil = await fetch(croppedImagePerfil).then(r => r.blob());
        let blobFondo = await fetch(croppedImageFondo).then(r => r.blob());



        if(croppedImagePerfil == null && croppedImageFondo == null){
            setUserCore({
                ...userCore,
            })
        }

        if(croppedImagePerfil != null && croppedImageFondo == null){
            setUserCore({
                ...userCore,
                imagePerfilUpload : blobPerfil,
            })
        }

        if(croppedImagePerfil == null && croppedImageFondo != null){
            setUserCore({
                ...userCore,
                imageFondoUpload : blobFondo
            })
        }
        if(croppedImagePerfil != null && croppedImageFondo != null){
            setUserCore({
                ...userCore,
                imagePerfilUpload : blobPerfil,
                imageFondoUpload : blobFondo
            })
        }

        setVerdadero2(true)
    }






    return (
        <div className={styles.div_supremo}>


            {
                modalPerfil ?
                    <div className={styles.modal_crop}>
                        <div className={styles.modal_crop_inside}>
                            <div className={styles.menu} onClick={() => setModalPerfil(false)}>
                                <div className={styles.bar}></div>
                                <div className={styles.bar}></div>
                                <div className={styles.bar}></div>
                            </div>
                            <div className={styles.div_cropper}>
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    rotation={rotation}
                                    zoom={zoom}
                                    aspect={1 / 1}
                                    onCropChange={setCrop}
                                    onRotationChange={setRotation}
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

                                <input
                                    type="range"
                                    value={rotation}
                                    min={0}
                                    max={360}
                                    step={1}
                                    aria-labelledby="Rotation"
                                    onChange={(e) => {
                                        setRotation(e.target.value)
                                    }}
                                    className={styles.zoom_range}
                                />


                            </div>

                            <button onClick={showCroppedImagePerfil}>Recortar</button>

                        </div>
                    </div>
                    : null
            }

            {
                modalFondo ?
                    <div className={styles.modal_crop}>
                        <div className={styles.modal_crop_inside}>
                            <div className={styles.menu} onClick={() => setModalFondo(false)}>
                                <div className={styles.bar}></div>
                                <div className={styles.bar}></div>
                                <div className={styles.bar}></div>
                            </div>
                            <div className={styles.div_cropper}>
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    rotation={rotation}
                                    zoom={zoom}
                                    aspect={2 / 1}
                                    onCropChange={setCrop}
                                    onRotationChange={setRotation}
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

                                <input
                                    type="range"
                                    value={rotation}
                                    min={0}
                                    max={360}
                                    step={1}
                                    aria-labelledby="Rotation"
                                    onChange={(e) => {
                                        setRotation(e.target.value)
                                    }}
                                    className={styles.zoom_range}
                                />


                            </div>

                            <button onClick={showCroppedImageFondo}>Recortar</button>

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
                                <label className={styles.label_desc}>Suba una imagen que represente su persona o empresa, la imagen se mostrara en su perfil y en sus publicaciones</label>
                                <Basic setImages={setImagePerfilUpload} />
                                {
                                    resultadoPerfil &&
                                    <div className={styles.div_img_perfil}>
                                        <img src={croppedImagePerfil} />
                                    </div>
                                }

                            </div>

                            <div className={styles.fields}>
                                <h3 className={styles.h3}>Imagen de <span className={styles.text_blue}>Portada:</span></h3>
                                <label className={styles.label_desc}>Incluya una imagen representativa que aparecera de forma decorativa en su perfil</label>
                                <Basic setImages={setImageFondoUpload} />
                                {
                                    resultadoFondo &&
                                    <div className={styles.div_img_fondo}>
                                        <img src={croppedImageFondo} />
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

export default ContainerRegisterParticular2