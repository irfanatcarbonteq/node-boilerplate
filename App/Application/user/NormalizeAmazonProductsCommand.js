const { Command } = require("simple-command-bus");
class NormalizeAmazonProductsCommand extends Command {
  constructor(upcList) {
    super();
    this.upcList = upcList;
  }

  upcList() {
    return this.upcList;
  }
}
module.exports = NormalizeAmazonProductsCommand;
