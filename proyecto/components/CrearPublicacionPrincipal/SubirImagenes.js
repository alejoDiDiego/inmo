import React, { useCallback, useEffect, useState } from 'react'
import { getCroppedImg, getRotatedImage } from '../../crop/auxCrop'
import Cropper from 'react-easy-crop'
import styles from '../../styles/SubirImagenes.module.css'
import Image from 'next/image'



const SubirImagenes = ({
    imagenes,
    setImagenes
}) => {





    const [cargandoCorte, setCargandoCorte] = useState(false)
    const [imageSrc, setImageSrc] = React.useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const [modalPerfil, setModalPerfil] = useState(false)

    const [imagePerfilUpload, setImagePerfilUpload] = useState([])


    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])



    const showCroppedImagePerfil = useCallback(async () => {
        try {
            setCargandoCorte(true)
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            )
            console.log('donee', { croppedImage })


            let blobPerfil = await fetch(croppedImage).then(r => r.blob());

            setImagenes([...imagenes, blobPerfil])
            setCargandoCorte(false)



            setImageSrc(null)
            setCrop({ x: 0, y: 0 })
            setRotation(0)
            setZoom(1)
            setCroppedAreaPixels(null)
            setModalPerfil(false)
            setImagePerfilUpload([])


        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels, rotation])


    useEffect(() => {
        console.log(imagenes)
    }, [imagenes])





    useEffect(() => {
        if (typeof imagePerfilUpload == "undefined" || imagePerfilUpload.length == 0) {
            return
        }
        const change = async () => {
            console.log(imagePerfilUpload)
            const file = imagePerfilUpload
            console.log("llega1")
            let imageDataUrl = await readFile(file)

            setImageSrc(imageDataUrl)
            setModalPerfil(true)
            console.log("llega2")
        }
        change()
        return
    }, [imagePerfilUpload])



    function readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        })
    }








    const handleEliminar = (index) => {
        setImagenes(current =>
            current.filter(img => {
                return current.indexOf(img) != index
            })

        )
    }


    const handleIzquierda = (index, m) => {
        setImagenes(current => {
            const part1 = current.slice(0, index)
            const part2 = current.slice(index + 1)
            part1.splice(-1, 0, m)
            return [...part1, ...part2]
        })
    }

    const handleDerecha = (index, m) => {
        setImagenes(current => {
            const part1 = current.slice(0, index)
            const part2 = current.slice(index + 1)
            part2.splice(1, 0, m)
            return [...part1, ...part2]
        })
    }








    return (
        <div className={styles.main}>
            <div>
                <h2>Subir Imagenes</h2>
                <p>La primera imagen sera la principal de la publicacion</p>
                <p>ATENCION: si quiere volver a subir la ultima imagen cargada (por ejemplo si la borro), debe seleccionar otra imagen, cerrar la pestana de recortar y volver a cargar la imagen (que borro)</p>

                <div>
                    <label htmlFor='file-img-perfil'>Subir imagen</label>
                    <input className={styles.input_file} onChange={(e) => { setImagePerfilUpload(e.target.files[0]) }} accept="image/png, image/gif, image/jpeg" type="file" id='file-img-perfil' />
                </div>

                <div className={styles.div_imagenes}>
                    {
                        imagenes.map(m => {
                            let urlCreator = window.URL || window.webkitURL;
                            let index = imagenes.indexOf(m)
                            console.log(index)
                            return (
                                <div className={styles.div_img}>

                                    <div className={styles.iconos_img}>
                                        <img src='/delete.png' onClick={() => { handleEliminar(index) }} className={styles.delete_icon} />
                                        {
                                            imagenes.length > 1 ?
                                                (
                                                    <>
                                                        {
                                                            index + 1 != imagenes.length ?
                                                                (
                                                                    <img src='/arrow.png' onClick={() => { handleDerecha(index, m) }} className={styles.delete_icon} />
                                                                ) : null
                                                        }

                                                        {
                                                            index != 0 ?
                                                                (
                                                                    <img src='/arrow.png' onClick={() => { handleIzquierda(index, m) }} style={{ transform: "rotate(180deg)" }} className={styles.delete_icon} />
                                                                ) : null
                                                        }
                                                    </>
                                                ) : null
                                        }
                                    </div>

                                    <img className={styles.img_subir} key={index} src={urlCreator.createObjectURL(m)} />
                                </div>

                                //  https://www.flaticon.com/free-icon/right-arrow_467282?term=arrow&related_id=467282# 
                            )
                        })
                    }
                </div>





                {
                    modalPerfil ?
                        <div className={styles.modal_crop}>
                            <div className={styles.modal_crop_inside}>
                                {
                                    cargandoCorte == false ?
                                        (
                                            <div className={styles.menu} onClick={() => { setModalPerfil(false); setImagePerfilUpload([]); setCroppedAreaPixels(null); setZoom(1); setRotation(0) }}>
                                                <div className={styles.bar}></div>
                                                <div className={styles.bar}></div>
                                                <div className={styles.bar}></div>
                                            </div>
                                        ) : <div className={styles.menu_cargando}></div>
                                }

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
                                        style={{
                                            containerStyle: {
                                                backgroundColor: "white"
                                            }
                                        }}
                                    />
                                </div>


                                {
                                    cargandoCorte == false ?
                                        (
                                            <div className={styles.div_controls}>
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

                                                    <div className={styles.div_rotate}>
                                                        <button onClick={() => setRotation(rotation - 90)} className={styles.btn_rotate}>

                                                            <Image height={30} width={30} src="/rotate-left.png" />

                                                            {/*https://www.flaticon.com/premium-icon/rotate-left_3889488 */}
                                                        </button>

                                                        <button onClick={() => setRotation(rotation + 90)} className={styles.btn_rotate}>

                                                            <Image height={30} width={30} src="/rotate-right.png" />


                                                            {/*https://www.flaticon.com/premium-icon/rotate-right_3889492 */}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className={styles.button_recortar} onClick={showCroppedImagePerfil}>
                                                    <div className={styles.button_back}></div>
                                                    <div className={styles.button_content}><span>Recortar</span></div>
                                                </div>
                                            </div>


                                        ) :
                                        (
                                            <div className={styles.div_controls}>
                                                <p>cargando</p>
                                            </div>
                                        )

                                }




                            </div>
                        </div>
                        : null
                }


            </div>
        </div>
    )
}

export default SubirImagenes