import React from 'react'
import Cropper from 'react-easy-crop'
import styles from '../../styles/ModalCrop.module.css'
import Image from 'next/image'

const ModalCrop = (
    imageSrc,
    crop,
    rotation,
    zoom,
    setCrop,
    setRotation,
    onCropComplete,
    setZoom,
    aspect,
    tipo,
    showCroppedImagePerfil,
    showCroppedImageFondo
) => {
    return (

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
                        aspect={aspect}
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

                    <div className={styles.button_recortar} onClick={tipo === "perfil" ? showCroppedImagePerfil : tipo === "fondo" && showCroppedImageFondo}>
                        <div className={styles.button_back}></div>
                        <div className={styles.button_content}><span>Recortar</span></div>
                    </div>
                </div>



            </div>
        </div>

    )
}

export default ModalCrop