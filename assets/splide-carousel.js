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

function createRelatedProducts(carouselId, options) {
  const id = `#${carouselId}`;

  const carouselOptions = Object.assign(
    {},
    {
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
    },
    options
  );

  try {
    const related_carousel = new Splide(id, carouselOptions);

    related_carousel.on('arrows:updated', disableCarouselArrows(carouselId));
    related_carousel.mount();
  } catch (error) {
    console.error(error);
    console.error(`Error mounting related carousel ${carouselId}`, error);
  }
}

/**
 * Create teaser carousel
 */

try {
  const teaserCarousels = document.querySelectorAll('[id^="Teaser-Carousel-"]');
  const options = {
    cover: true,
    pagination: false,
    perPage: 1,
    perMove: 1,
    focus: 0,
    omitEnd: true,
    drag: 'free',
    snap: true,
    autoWidth: true,
    autoHeight: true,
  };

  teaserCarousels.forEach((carousel) => {
    createRelatedProducts(carousel.id, options);
  });
} catch (error) {
  console.error('Unable to create teaser carousel', error);
}

try {
  const teaserCarousels = document.querySelectorAll('[id^="Small-Teaser-Carousel-"]');
  const options = {
    cover: true,
    pagination: false,
    perMove: 1,
    focus: 0,
    omitEnd: true,
    drag: 'free',
    snap: true,
    autoWidth: true,
    autoHeight: true,
    gap: '48px',
    rewind: true,
    breakpoints: {
      800: {
        gap: '24px',
      },
    },
  };

  teaserCarousels.forEach((carousel) => {
    createRelatedProducts(carousel.id, options);
  });
} catch (error) {
  console.error('Unable to create teaser carousel', error);
}

try {
  const teaserCarousels = document.querySelectorAll('[id^="TikTok-Carousel-"]');
  const options = {
    cover: true,
    pagination: false,
    perMove: 1,
    focus: 0,
    drag: 'free',
    snap: true,
    autoWidth: true,
    autoHeight: true,
    gap: '48px',
    focus: 'center',
    breakpoints: {
      800: {
        gap: '24px',
      },
    },
  };

  teaserCarousels.forEach((carousel) => {
    createRelatedProducts(carousel.id, options);
  });
} catch (error) {
  console.error('Unable to create teaser carousel', error);
}

class SplideCarousel extends HTMLElement {
  constructor() {
    super();
    this.carousel_id = this.getAttribute('data-id');
    const options = this.getAttribute('data-options');
    this.carousel_options = options ? JSON.parse(options) : {};
    console.log(this.carousel_id);
    this.createRelatedProducts(this.carousel_id, this.carousel_options);
  }

  disableCarouselArrows(carousel_id) {
    const items = this.querySelectorAll(`#${carousel_id} li.splide__slide`);
    const firstElement = items?.[0];
    const lastElement = items?.[items?.length - 1];

    const prevBtn = this?.querySelector(`#${carousel_id} .splide__arrow--prev`);
    const nextBtn = this?.querySelector(`#${carousel_id} .splide__arrow--next`);

    return function () {
      if (firstElement?.classList.contains('is-active')) {
        prevBtn.setAttribute('disabled', true);
      }

      if (lastElement?.classList.contains('is-active')) {
        nextBtn.setAttribute('disabled', true);
      }
    };
  }

  createRelatedProducts(carousel_id, options) {
    const id = `#${carousel_id}`;

    const defaultOptions = {
      cover: true,
      pagination: false,
      perPage: 4,
      perMove: 1,
      focus: 0,
      omitEnd: true,
      drag: 'free',
      snap: true,
      autoWidth: true,
      gap: 2,
      breakpoints: {
        800: {
          perPage: 4,
        },
        400: {
          perPage: 2,
        },
      },
    };

    const carouselOptions = Object.assign({}, defaultOptions, options);

    try {
      const related_carousel = new Splide(id, carouselOptions);

      related_carousel.on('arrows:updated', this.disableCarouselArrows(carousel_id));
      related_carousel.mount();
    } catch (error) {
      console.error(error);
      console.error(`Error mounting related carousel ${carousel_id}`, error);
    }
  }
}

customElements.define('splide-carousel', SplideCarousel);
