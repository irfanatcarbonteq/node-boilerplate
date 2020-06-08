const AWS_ACCESS_KEY_ID = "AKIAIIPDUCHNYENQBRZA";
const AWS_SECRET_ACCESS_KEY = "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";
//const AMAZON_HOST = "mws.amazonservices.co.uk";
const AMAZON_HOST = "mws.amazonservices.com";
const SELLER_ID = "AZ77FYE00PNZ7";
const MWS_AUTH_TOKEN = "amzn.mws.46b914af-c96b-266a-ab88-c048bb45cbd5";
//const MARKET_PLACE_ID = "A1F83G8C2ARO7P";
const MARKET_PLACE_ID = "ATVPDKIKX0DER";

const amazonMws = require("amazon-mws")(
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
);

exports.api = async (req, res) => {
  //amazonMws.setHost(AMAZON_HOST);
  amazonMws.products.searchFor(
    {
      Version: "2011-10-01",
      Action: "GetMatchingProduct",
      SellerId: SELLER_ID,
      MWSAuthToken: MWS_AUTH_TOKEN,
      MarketplaceId: MARKET_PLACE_ID,
      "ASINList.ASIN.1": "B07T73RLVN",
    },
    function (error, response) {
      if (error) {
        console.log("error products", error);
        return;
      }
      console.log("response ", response);
    }
  );
  res.status(200).json({ status: "ok" });
};
