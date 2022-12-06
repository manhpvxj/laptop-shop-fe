import PropType from 'prop-types';
import Slider from 'react-slick';
import { useState, useRef, useEffect } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Image from '../../../utils/Image';
import CarouselArrowIndex from './CarouselArrowIndex';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const RootStyle = styled('div')(() => ({
  '& .slick-slide': {
    float: 'right',
    '&:focus': { outline: 'none' },
  },
}));

// ----------------------------------------------------------------------

ProductDetailCarousel.PropType = {
  images: PropType.arrayOf(PropType.string),
};

export default function ProductDetailCarousel({ images }) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const [nav1, setNav1] = useState();

  const [nav2, setNav2] = useState();

  const slider1 = useRef(null);

  const slider2 = useRef(null);

  const settings1 = {
    speed: 320,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: false,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  const settings2 = {
    speed: 320,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    arrows: false,
    centerMode: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: images.length > 3 ? 3 : images.length,
  };

  useEffect(() => {
    if (slider1.current) {
      setNav1(slider1.current);
    }
    if (slider2.current) {
      setNav2(slider2.current);
    }
  }, []);

  const handlePrevious = () => {
    slider2.current?.slickPrev();
  };

  const handleNext = () => {
    slider2.current?.slickNext();
  };

  return (
    <RootStyle>
      <Box sx={{ p: 1 }}>
        <Box sx={{ zIndex: 0, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
          <Slider {...settings1} asNavFor={nav2} ref={slider1}>
            {images.map((img) => (
              <Image
                key={img}
                alt="large image"
                src={img}
              />
            ))}
          </Slider>
          <CarouselArrowIndex
            index={currentIndex}
            total={images.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </Box>
      </Box>

      <Box
        sx={{
          my: 3,
          mx: 'auto',
          '& .slick-current .isActive': { opacity: 1 },
          ...(images.length === 1 && { maxWidth: THUMB_SIZE * 1 + 16 }),
          ...(images.length === 2 && { maxWidth: THUMB_SIZE * 2 + 32 }),
          ...(images.length === 3 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(images.length === 4 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(images.length >= 5 && { maxWidth: THUMB_SIZE * 6 }),
          ...(images.length > 2 && {
            position: 'relative',
            '&:before, &:after': {
              top: 0,
              zIndex: 9,
              content: "''",
              height: '100%',
              position: 'absolute',
              width: (THUMB_SIZE * 2) / 3,
              backgroundImage: `linear-gradient(to left, ${alpha('#fff', 0)} 0%, ${'#fff'} 100%)`,
            },
            '&:after': { right: 0, transform: 'scaleX(-1)' },
          }),
        }}
      >
        <Slider {...settings2} asNavFor={nav1} ref={slider2}>
          {images.map((img, index) => (
            <Box key={img} sx={{ px: 0.75 }}>
              <Image
                disabledEffect
                alt="thumb image"
                src={img}
                sx={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  ...(currentIndex === index && {
                    border:`solid 3px #24C0F0`,
                  }),
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </RootStyle>
  );
}
