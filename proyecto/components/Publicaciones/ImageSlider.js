import React, { useEffect, useState } from 'react'
import styles from "../../styles/PublicacionExtendida.module.css"



const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    backgroundSize: "cover",
    backgroundPosition: "center",
};


const sliderStyles = {
    position: "relative",
    height: "100%",
};

const currentImage = {
    position: "absolute",
    backgroundColor: "#38363656",
    color: "white",
    textAlign: "center",
    width: "100%",
    padding: "10px 0",
    bottom: "10px"
}






const ImageSlider = ({ slides }) => {

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        console.log(currentIndex)
    }, [currentIndex])

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const slideStylesWidthBackground = {
        ...slideStyles,
        backgroundImage: `url(${slides[currentIndex]})`,
    };

    return (
        <div style={sliderStyles}>
            <div>
                <div onClick={goToPrevious} className={styles.leftArrowStyles}>
                <img className={styles.divImgSubmit1} src='/download.png'></img>
                </div>
                <div onClick={goToNext} className={styles.rightArrowStyles}>
                     <img className={styles.divImgSubmit2} src='/download.png'></img>
                </div>
            </div>
            <div style={slideStylesWidthBackground}></div>

            <p style={currentImage}>{currentIndex + 1} / {slides.length}</p>

        </div>
    )
}

export default ImageSlider