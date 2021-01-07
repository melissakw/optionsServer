var express = require("express");
const axios = require('axios');

var router = express.Router();

const formatDate = (date) => {
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  var yyyy = date.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
};

router.get("/", async (req, res, next) => {
  const tdEndpoint = process.env.BASE_URL;
  const tdKey = process.env.SECRET_KEY;
  
  var today = new Date();
  const todayFormatted = formatDate(today);
  
  var endDate = new Date();
  endDate.setDate(today.getDate() + 365); 
  const endDateFormatted = formatDate(endDate);

  try {
    const response = await axios.get(tdEndpoint, {
      params: {
        apikey: tdKey,
        symbol: req.query.symbol.toUpperCase(),
        includeQuotes:true,
        strategy: 'SINGLE',
        fromDate: todayFormatted,
        toDate: endDateFormatted,
        expMonth: 'ALL',
      }
    });
    let json = response.data
    res.send(json);
  } catch (e) {
    console.log(e);
  }
  var ctx = req.query;
  ctx.endpoint = tdEndpoint;
  res.send(ctx);

});

module.exports = router;