class PaginationConfig {
    constructor(page = 1, perPage = 10) {
      this.page = Number(page);
      this.perPage = Number(perPage);
    }
  
    limit() {
      return this.perPage;
    }
  
    currentPage() {
      return this.page;
    }
  
    offset() {
      return (this.page - 1) * this.limit();
    }
  }
  
  module.exports = PaginationConfig;