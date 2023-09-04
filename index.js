
receipt = {
  "CustomerName": "עידן בדין",
  "ID": "c03d6106-5b4f-4eb7-b61f-04a1ec1ebbba",
  "OriginalText": null,
  "Total": 232,
  "TotalNoVat": 198.29,
  "VatTotal": 33.71,
  "Vat": 0,
  "Currency": "ש\"ח",
  "Discount": "58.00",
  "Barcode": null,
  "TransactionNumber": "110000428",
  "PaymentTypeStr": null,
  "PaymentType": 7,
  "ReceiptType": 1,
  "UploadedDate": null,
  "CreatedDate": "2023-08-31T10:28:51.211Z",
  "Action": 1,
  "Target": "3",
  "AdditionalTargets": [],
  "POSId": null,
  "BusinessID": "f419d1ba-355c-49c5-a756-9d989c6ab24d",
  "BranchID": null,
  "POSInternalId": null,
  "tPOS": {
    "InternalID": "1",
    "Description": "1",
    "IsOnline": false
  },
  "tBranch": {
    "InternalID": "1",
    "Latitude": null,
    "Longitude": null,
    "Language": 2,
    "CompanyID": null,
    "BranchName": "לירזי כהן שור בע\"מ",
    "BranchAddress": "דוד סחרוב 21 ראשל\"צ,  MALL הזהב",
    "BranchAddressEng": null,
    "BranchPhone": "03-3019121",
    "Description": "",
    "IsOnline": false,
    "FranchiseeName": null,
    "VatNumber": "516780640",
    "SAPId": null
  },
  "tBusiness": null,
  "IsFavorite": false,
  "ExtraDiscreteField1": null,
  "ExtraDiscreteField2": null,
  "ExtraTextField1": null,
  "ExtraTextField2": null,
  "LoyaltyID": null,
  "LoyalName": null,
  "CashierName": "ויקה קושלניקוב",
  "Items": [
    {
      "Name": "תחתון גבוה מחטב",
      "Discount": null,
      "Position": null,
      "ItemCode": "3608",
      "Price": 290,
      "Quantity": 1,
      "DiscountCalc": 0,
      "Total": 290,
      "SubItems": [],
      "ParentId": null,
      "AdditionalData": [
        {
          "Key": "BarCode",
          "Value": "665415273038"
        },
        {
          "Key": "Discount",
          "Value": "58.00"
        },
        {
          "Key": "PriceAfterDiscount",
          "Value": "232.00"
        },
        {
          "Key": "AmountAfterDiscount",
          "Value": "232.00"
        },
        {
          "Key": "discountPercent",
          "Value": "20.00"
        },
        {
          "Key": "FashionProp1",
          "Value": "S~M"
        },
        {
          "Key": "FashionProp2",
          "Value": "Black"
        },
        {
          "Key": "FashionProp3",
          "Value": ""
        },
        {
          "Key": "Promo1",
          "Value": "232.00 ( 58.00)%20.00             "
        }
      ],
      "ItemInfo": null,
      "Categories": []
    }
  ],
  "AdditionalData": [
    {
      "Key": "SysPrnMemberId",
      "Value": ""
    },
    {
      "Key": "CustName",
      "Value": ""
    },
    {
      "Key": "CustCardCode",
      "Value": ""
    },
    {
      "Key": "NameDocumentOfPrint",
      "Value": "חשבונית מס / קבלה מס'"
    },
    {
      "Key": "TaxNumber",
      "Value": "110000428"
    },
    {
      "Key": "SaleNo",
      "Value": "1189"
    }
  ],
  "Payments": [
    {
      "Name": "מזומן",
      "PaymentCode": "1",
      "Amount": 232,
      "PaymentInfo": "",
      "LastDigits": null,
      "UID": null,
      "RRN": null,
      "AdditionalData": null
    }
  ],
  "MoneySaved": null,
  "ItemsCount": 1,
  "OrderID": null,
  "SuppressSMS": false
}

function formatNumber(number) {
  const formattedNumber = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS' }).format(number);
  return formattedNumber;
}

function getAddtionalValue(item, Key) {
  return item.AdditionalData && item.AdditionalData.find(a=>a.Key == Key) ? item.AdditionalData.find(a=>a.Key == Key).Value : "bve";
}

$(".businessName").text(receipt.tBranch.BranchName);
$(".businessAddress").text(receipt.tBranch.BranchAddress);
$(".businessPhone").text(receipt.tBranch.BranchPhone);
$(".transactionNumber").text("מספר עסקה - " + receipt.TransactionNumber);

var total = 0;
for(var i=0; i < receipt.Items.length; i++) {
  var item = receipt.Items[i];
  var price = item.Price;
  var discount = getAddtionalValue(item, "Discount");
  var itemPriceAfterDiscount = price - discount;
  $("#itemsTbl").append("<tr class='spaceUnder' style='font-size: 16px'><td id='itemNameCell' style='width: 160px'>"+item.Name+"</td><td>"+price.toFixed(2)+"</td><td style='padding-right: 10px'>"+itemPriceAfterDiscount.toFixed(2)+"</td></tr>");
  if(item.AdditionalData) {
    for(var ii=0; ii<item.AdditionalData.length; ii++) {
      var additionalItem = item.AdditionalData[ii];
      if(additionalItem.Key.indexOf("Prop") > -1 && additionalItem.Value.length > 0) {
        $("#itemsTbl").append("<tr><td colspan='3'><ul style='margin-bottom: 2px;margin-top: 3px;font-size: 12px; font-weight: bold'><li style='direction: rtl'>"+additionalItem.Value+"</li></ul></td></tr>");
      }
    }
  }

  if(item.Name.length >= 25) {
    $("#itemNameCell").css({"width": "180px"});
  }
  if(discount > 0) {
    $("#itemsTbl").append("<tr><td colspan='3' style='text-align: center;color: blue;font-weight: bold;padding: 10px 0'>סה\"כ הנחה: "+formatNumber(discount)+"</td></tr>")
  }

  if(receipt.Items.length > 1 && i < receipt.Items.length) {
    $("#itemsTbl").append("<tr class='hr'><td colspan='3'></td></tr>");
  }
  total += item.Total;
}

var totalNoTax = (receipt.Total / 1.17).toFixed(2);
var receiptTax = receipt.Total - totalNoTax;
var currency = receipt.Currency === "ש\"ח" ? "₪" : receipt.Currency;

if(receipt.Discount > 0 || 0.0) {
  $(".receipt-bottom").append("<div style='display: flex;justify-content: space-between'><div style='width: 50%;padding: 0 0 10px 15px'><p style='margin: 0'>"+formatNumber(receipt.Discount)+"</p></div><div style='width: 50%;text-align: right;padding: 0 15px 10px 0'><p style='margin: 0'>סה\"כ הנחה</p></div></div>");
}
$(".receipt-bottom").append("<div style='display: flex;justify-content: space-between'><div style='width: 50%;padding: 0 0 10px 15px'><p style='margin: 0'>"+formatNumber(totalNoTax)+"</p></div><div style='width: 50%;text-align: right;padding-right: 15px'><p style='margin: 0'>סכום לפני מע\"מ</p></div></div>");
$(".receipt-bottom").append("<div style='display: flex;justify-content: space-between'><div style='width: 50%;padding: 0 0 10px 15px'><p style='margin: 0'>"+formatNumber(receiptTax)+"</p></div><div style='width: 50%;text-align: right;padding-right: 15px'><p style='margin: 0'>מע\"מ</p></div></div>");
$(".receipt-bottom").append("<div style='display: flex;justify-content: space-between'><div style='width: 50%;padding: 0 0 10px 15px'><p style='margin: 0;font-weight: bold'>"+formatNumber(receipt.Total)+"</p></div><div style='width: 50%;text-align: right;padding-right: 15px'><p style='margin: 0;font-weight: bold'>סה\"כ לתשלום</p></div></div>");
if(receipt.Payments.length > 0) {
  $(".receipt-bottom").append("<div style='display: flex;justify-content: space-between'><div id='payments' style='width: 50%;padding: 0 0 20px 15px'></div><div style='width: 50%;text-align: right;padding: 0 15px 20px 0'><p style='margin: 0;font-weight: bold'>התקבל</p></div></div>");
}
for(var i = 0; i < receipt.Payments.length; i++) {
  var payment = receipt.Payments[i];
  var paymentName = payment.Name === "מזומן" ? "במזומן" : payment.Name === "אשראי" ? "באשראי" : payment.Name;
  if(receipt.Payments[0].Amount >= 0) {
    $("#payments").append("<p style='margin: 0;font-weight: bold'>"+paymentName+" "+formatNumber(payment.Amount)+"</p>")
  }
}