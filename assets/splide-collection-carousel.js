function disableCarouselArrows(carousel_id) {
  const items = document?.querySelectorAll(`#${carousel_id} li.splide__slide`);
  const firstElement = items?.[0];
  const lastElement = items?.[items?.length - 1];

  const prevBtn = document?.querySelector(`#${carousel_id} .splide__arrow--prev`);
  const nextBtn = document?.querySelector(`#${carousel_id} .splide__arrow--next`);

  return function () {
    if (firstElement?.classList.contains('is-active')) {
      prevBtn.setAttribute('disabled', true);
    }

    if (lastElement?.classList.contains('is-active')) {
      nextBtn.setAttribute('disabled', true);
    }
  };
}

function createRelatedProducts(carouselId) {
  const id = `#${carouselId}`;
  try {
    const related_carousel = new Splide(id, {
      cover: true,
      pagination: false,
      perPage: 4,
      perMove: 1,
      focus: 0,
      omitEnd: true,
      drag: 'free',
      snap: true,
      autoWidth: true,
      breakpoints: {
        800: {
          perPage: 4,
        },
        400: {
          perPage: 2,
        },
      },
    });

    related_carousel.on('arrows:updated', disableCarouselArrows(carouselId));
    related_carousel.mount();
  } catch (error) {
    console.error(error);
    console.error(`Error mounting related carousel ${carouselId}`, error);
  }
}

try {
  const collectionCarousels = document.querySelectorAll('[id^="Collection-Carousel-"]');

  collectionCarousels.forEach((carousel) => {
    createRelatedProducts(carousel.id);
  });
} catch (error) {}
