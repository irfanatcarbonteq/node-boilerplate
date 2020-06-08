class PaginatedData {
    
    constructor(paginationConfig,numberOfItems) {
      this.paginationConfig = paginationConfig;
      this.numberOfItems = numberOfItems;
      this.items = [];
    }
  
    totalPages() {
      return Math.ceil(this.numberOfItems / this.paginationConfig.limit());
    }
  
    addItem(item) {
      this.items.push(item);
    }
  
    hasNext() {
      return this.paginationConfig.currentPage() < this.totalPages();
    }
  
    nextPage() {
      return this.paginationConfig.currentPage() + 1;
    }
  
    hasPrev() {
      return this.paginationConfig.currentPage() > 1;
    }
  
    prevPage() {
      return this.paginationConfig.currentPage() - 1;
    }
  
    paginatedItems() { 
      const paginationInfo = {
        totalItems: this.numberOfItems,
        totalPages: this.totalPages(),
        currentPage: this.paginationConfig.currentPage(),
        perPage: this.paginationConfig.limit()
      };
  
      if (this.hasNext()) {
        paginationInfo.nextPage = this.nextPage();
      }
  
      if (this.hasPrev()) {
        paginationInfo.prevPage = this.prevPage();
      }
  
      return {
        paginationInfo,
        data: this.items
      };
    }
  }
  
  module.exports = PaginatedData;