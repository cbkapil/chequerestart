import express from "express";
import { pnbcashslip } from "../../bankslip/pnbbankslip.js";
import { sbicashSlip } from "../../bankslip/sbiBankslip.js";
import { unioncashSlip} from "../../bankslip/unionBankslip.js";
import auth from "../Auth.js";
import puppeteer from 'puppeteer';

const router = express.Router();

var samplepdf = '';



router.post("/recashprint",auth, async (req, res,next) => {
    console.log("me hu req.body ",req.body.data);
    const data = req.body.data;

//   data.push(CashSlips) ;
//   // res.status(200).send({ CashSlips});


//   console.log("hellllll",data);

  var firmname = data[0]?.firmname;
  var bankname = data[0]?.bankname;
  var branchname = data[0]?.branch;
  var accountno = data[0]?.account;
  var date = new Date(data[0]?.depositdate).toLocaleDateString('es-CL');
  var totalamount = data[0]?.totalamount;
  var twothousandqty = (data[0]?.twothousand)?(data[0]?.twothousand[0].quantity) : 0
  var twothousandamount = (data[0]?.twothousand)?(data[0]?.twothousand[0].amount) :0
  var fivehundredqty = (data[0]?.fivehundered)?(data[0]?.fivehundered[0].quantity): 0
  var fivehundredamount = (data[0]?.fivehundered)?(data[0]?.fivehundered[0].amount):0 
  var twohundredqty = (data[0]?.twohundered)?(data[0]?.twohundered[0].quantity) : 0
  var twohundredamount = (data[0]?.twohundered)?(data[0]?.twohundered[0].amount) : 0
  var onehundredqty = (data[0]?.onehundered)?(data[0]?.onehundered[0].quantity) : 0
  var onehundredamount = (data[0]?.onehundered)?(data[0]?.onehundered[0].amount) : 0
  var fiftyqty = (data[0]?.fifty)?(data[0]?.fifty[0].quantity) : 0
  var fiftyamount = (data[0]?.fifty)?(data[0]?.fifty[0].amount) : 0
  var twentyqty = (data[0]?.twenty)?(data[0]?.twenty[0].quantity) : 0
  var twentyamount = (data[0]?.twenty)?(data[0]?.twenty[0].amount) : 0
  var tenqty = (data[0]?.ten)?(data[0]?.ten[0].quantity) : 0
  var tenamount = (data[0]?.ten)?(data[0]?.ten[0].amount) : 0
  var fiveqty = (data[0]?.five)?(data[0]?.five[0].quantity) : 0
  var fiveamount = (data[0]?.five)?(data[0]?.five[0].amount) : 0
  var coinsamount = (data[0]?.coins)?(data[0]?.coins) : 0

  console.log("me hu bankname",bankname);
  var wamount = '';
  wamount = numberToWord(totalamount)
  // wamount =String(wamount)
  console.log("Me hu wamount", typeof(wamount))

  function numberToWord(num) {
    console.log("numbers",num);
    // Handle special cases
    if (num === 0) return 'zero';
    if (num < 0) return 'negative ' + numberToWord(-num);
  
    // Set up arrays for the words for the different place values
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  
    // Initialize the result as an empty string
    let result = '';
  
    // Handle millions place
    if (num >= 1000000) {
      result += numberToWord(Math.floor(num / 1000000)) + ' million ';
      num %= 1000000;
    }
  
    // Handle thousands place
    if (num >= 1000) {
      result += numberToWord(Math.floor(num / 1000)) + ' thousand ';
      num %= 1000;
    }
  
    // Handle hundreds place
    if (num >= 100) {
      result += numberToWord(Math.floor(num / 100)) + ' hundred ';
      num %= 100;
    }
  
    // Handle tens and ones place
    if (num >= 10) {
      if (num < 20) {
        result += teens[num - 10] + ' ';
      } else {
        result += tens[Math.floor(num / 10)] + ' ';
        result += ones[num % 10] + ' ';
      }
    } else {
      result += ones[num] + ' ';
    }
  
    // Trim the trailing space and return the result
    return result.trim();
  }
  
//   console.log(numberToWord(123456789)); // Output: "one hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine"
  



  var accno = accountno.toString().split("").map(n => {
    return(`<div class="block">${n}</div>`)
})

var rightAccno = accountno.toString().split("").map(n => {
  return(`<div class="box">${n}</div>`)
})


console.log("ddddd",date);
var dateStr = date.toString().split("");
var datenew = dateStr.toString().replace(/-/g,"");

console.log('lolol', datenew)

 var accDate = datenew.split(",").map(n => {
  if(n !== ""){
    return (`<div class="datecolumn">${n}</div>`)
  }else{
    return ""
  }
 })


var accnoBlocks = accno.toString().split(",").join("")
var accnoBlocksRight = rightAccno.toString().split(",").join("")
var accoudate = accDate.toString().split(",").join("")
  


 samplepdf = await samplepdfFunc(
                              bankname,
                              firmname,
                              branchname,
                              date,
                              totalamount,
                              twothousandqty,
                              twothousandamount,
                              fivehundredqty,
                              fivehundredamount,
                              twohundredqty,
                              twohundredamount,
                              onehundredqty,
                              onehundredamount,
                              fiftyqty,
                              fiftyamount,
                              twentyqty,
                              twentyamount,
                              tenqty,
                              tenamount,
                              fiveqty,
                              fiveamount,
                              coinsamount,
                              wamount,
                              accnoBlocks,
                              accnoBlocksRight,
                              accoudate
                            )
                                // console.log("samplepdfffff",samplepdf)
                            try {
                                // Create a browser instance
                                const browser = await puppeteer.launch();
                              
                                // Create a new page
                                const page = await browser.newPage();
                              
                              
                                await page.setContent(samplepdf, {encoding : 'utf-8', waitUntil:'domcontentloaded' });
                              
                                // To reflect CSS used for screens instead of print
                                await page.emulateMediaType('screen');
                              
                                // Downlaod the PDF
                                const pdf = await page.pdf({
                                //   path: 'result.pdf',
                                  // margin: { top: '50px', right: '50px', bottom: '0px', left: '50px' },
                                  format: 'A4',
                                  printBackground: true,
                                  landscape : true,
                                });

                                console.log("pddffff",pdf);
                    
                                    // Close the browser instance
                                    await browser.close();
                    
                                res.send(pdf);
                              
                            
                              
                           
                        } catch (error) {
                            console.log(error)
                        }




  
});



function samplepdfFunc(
  bankname,
  firmname,
  branchname,
  date,
  totalamount,
  twothousandqty,
  twothousandamount,
  fivehundredqty,
  fivehundredamount,
  twohundredqty,
  twohundredamount,
  onehundredqty,
  onehundredamount,
  fiftyqty,
  fiftyamount,
  twentyqty,
  twentyamount,
  tenqty,
  tenamount,
  fiveqty,
  fiveamount,
  coinsamount,
  wamount,
  accnoBlocks,
  accnoBlocksRight,
  accoudate
  
){
  var slipdata = '';
  switch (bankname) {
    case "Union Bank Of India":
       slipdata = unioncashSlip(firmname,
        branchname,
        totalamount,
        twothousandqty,
        twothousandamount,
        fivehundredqty,
        fivehundredamount,
        twohundredqty,
        twohundredamount,
        onehundredqty,
        onehundredamount,
        fiftyqty,
        fiftyamount,
        twentyqty,
        twentyamount,
        tenqty,
        tenamount,
        fiveqty,
        fiveamount,
        coinsamount,
        wamount,
        accnoBlocks,
        accnoBlocksRight,
        accoudate)
      break;
    case "State Bank of India":
       slipdata = sbicashSlip(firmname,
        branchname,
        date,
        totalamount,
        twothousandqty,
        twothousandamount,
        fivehundredqty,
        fivehundredamount,
        twohundredqty,
        twohundredamount,
        onehundredqty,
        onehundredamount,
        fiftyqty,
        fiftyamount,
        twentyqty,
        twentyamount,
        tenqty,
        tenamount,
        coinsamount,
        wamount,
        accnoBlocks,
        accnoBlocksRight);
      break;
      case "Punjab National Bank":
       slipdata = pnbcashslip(firmname,
        branchname,
        totalamount,
        twothousandqty,
        twothousandamount,
        fivehundredqty,
        fivehundredamount,
        twohundredqty,
        twohundredamount,
        onehundredqty,
        onehundredamount,
        fiftyqty,
        fiftyamount,
        twentyqty,
        twentyamount,
        tenqty,
        tenamount,
        fiveqty,
        fiveamount,
        coinsamount,
        wamount,
        accnoBlocks,
        accnoBlocksRight,
        accoudate)
      break;

   
  }

 return slipdata


};


export default router;


