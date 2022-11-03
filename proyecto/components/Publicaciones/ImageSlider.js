import React, { useEffect, useState } from 'react'



const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    backgroundSize: "cover",
    backgroundPosition: "center",
};

const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "white",
    zIndex: 1,
    cursor: "pointer",
    backgroundColor: "black",
    width: "50px"
};

const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "white",
    zIndex: 1,
    cursor: "pointer",
    backgroundColor: "black",
    width: "50px"
};

const sliderStyles = {
    position: "relative",
    height: "100%",
};

const currentImage = {
    position: "absolute",
    backgroundColor: "black",
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
                <div onClick={goToPrevious} style={leftArrowStyles}>
                    &#8656;
                </div>
                <div onClick={goToNext} style={rightArrowStyles}>
                    &#8658;
                </div>
            </div>
            <div style={slideStylesWidthBackground}></div>

            <p style={currentImage}>{currentIndex + 1} / {slides.length}</p>

        </div>
    )
}

export default ImageSlider