const properties = require("./properties");
module.exports = () => {
  //use config module to get the privatekey, if no private key set, end the application
  if (!properties.MYPRIVATEKEY) {
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
  }
};
