class Paginate extends HTMLElement {
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    this.paginationContainer = this.querySelector('.pagination-wrapper');
    this.itemsPerPage = parseInt(this.paginationContainer.getAttribute('data-per-page'));
    this.loadMoreBtn = this.querySelector('.load-more');
    this.loadMoreSpinner = this.querySelector('.load-more-spinner');

    this.nextUrl = this.paginationContainer.getAttribute('data-next-url');

    this.count_span = this.querySelector('#item_count');
    this.total_count_span = this.querySelector('#total_item_count');

    this.loadMoreBtn?.addEventListener('click', this.loadNextPage.bind(this));

    this.totalItemsDisplayed = 0;

    this.renderItemsCount();
  }

  renderItemsCount() {
    this.totalItemsDisplayed += this.itemsPerPage;

    if (!this.totalItemsDisplayed) {
    }

    const total_count = parseInt(this.total_count_span?.textContent);

    if (!total_count) {
      return;
    }

    if (this.totalItemsDisplayed > total_count || this.itemsPerPage > total_count) {
      this.totalItemsDisplayed = total_count;
    }

    this.count_span.textContent = this.totalItemsDisplayed;
  }

  toggleLoading(force) {
    this.loadMoreBtn.classList.toggle('hidden', force);
    this.loadMoreSpinner.classList.toggle('hidden', force);
  }

  loadNextPage(e) {
    if (this.nextUrl) {
      this.toggleLoading();
      this.renderNextPage(this.nextUrl);
    }
  }

  renderNextPage(url) {
    fetch(url)
      .then((resp) => resp.text())
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        const newProducts = doc.querySelector('.pagination-wrapper');

        const newUrl = newProducts.getAttribute('data-next-url');

        this.paginationContainer.innerHTML += newProducts.innerHTML;

        this.renderItemsCount();

        if (newUrl) {
          this.nextUrl = newUrl;
          this.paginationContainer.setAttribute('data-next-url', newUrl);
          this.loadMoreBtn.classList.toggle('hidden', false);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        this.loadMoreSpinner.classList.toggle('hidden', true);
      });
  }
}

customElements.define('pagination-block', Paginate);
