/**
This function is used to calculate tax and print receipts. The conditional statements are used to distinguish between taxable and non taxable goods based on an ID. Import duty is calculated based on an import flag and preset duty rate.
@author: Akshay
@param: {array of javascript objects} items An array of items
**/
var printReceipt = function (items) {
    var basicSalesTax = 10;
    var importDuty = 5;
    var totalTax = 0;
    var totalCost = 0;
    //The main div which contains the receipt
    var $salesReceiptDiv = $('#salesReceiptDiv');
    var $totalTaxDiv;
    var $totalCostDiv;
    $.each(items, function () {
        var $itemPriceDiv;
        if (this.id !== 1 && this.id !== 2 && this.id !== 3) {
            var salesTaxPerItem;
            var costOfItem = this.cost;
            salesTaxPerItem = (costOfItem * basicSalesTax) / 100;
            if (this.import == 'y') {
                salesTaxPerItem = salesTaxPerItem 
                    + (costOfItem * importDuty) / 100;
            }
            var totalPriceOfItem = costOfItem + salesTaxPerItem;
            this.totalPrice = totalPriceOfItem
            totalCost = totalCost + totalPriceOfItem;
            totalTax = totalTax + salesTaxPerItem;
        } else {
            var costOfItem = this.cost;
            var importDutyOfItem = 0;
            if (this.import == 'y') {
                importDutyOfItem = (costOfItem * importDuty) / 100;
            }
            var totalPriceOfItem = costOfItem + importDutyOfItem;
            this.totalPrice = totalPriceOfItem;
            totalCost = totalCost + totalPriceOfItem;
            totalTax = totalTax + importDutyOfItem;
        }
        $itemPriceDiv = $('<div id=' + this.id + '><label>' + this.quantity + ' ' + this.name + ' at ' + roundOff(totalPriceOfItem) + '</label></div>');
        $salesReceiptDiv.append($itemPriceDiv);
    });
    $totalTaxDiv = $('<div><label> Sales Taxes : ' + roundOff(totalTax).fixed(2) + '</label></div>');
    $totalCostDiv = $('<div><label> Total : ' + roundOff(totalCost).fixed(2) + '</label></div>');
    //Adding some space
    $salesReceiptDiv.append('&nbsp;&nbsp;&nbsp;&nbsp;');
    $salesReceiptDiv.append($totalTaxDiv);
    $salesReceiptDiv.append($totalCostDiv);
    //Adding some more space
    $salesReceiptDiv.append('&nbsp;&nbsp;&nbsp;&nbsp;');
};

/**This function rounds off a number to the nearest 1/20
@author: Akshay Singh
@param: {float} number 
@return: {float} Rounded off number
**/
var roundOff = function (number) {
    return (Math.round(number * 20) / 20).toFixed(2);
}

$(document).ready(function () {
    //ID for books is 1, medical products 2 and food 3
    //For cd's 4 and for perfumes its 5
    
    //Creating itemsets for each input run
    var itemSet1 = [{
        "id": 1,
            "name": "book ",
            "cost": 12.49,
            "totalPrice": 0,
            "import": "n",
            "quantity": 1
    }, {
        "id": 4,
            "name": "music CD",
            "cost": 14.99,
            "totalPrice": 0,
            "import": "n",
            "quantity": 1
    }, {
        "id": 3,
            "name": "chocolate bar",
            "cost": 0.85,
            "totalPrice": 0,
            "import": "n",
            "quantity": 1
    }];

    var itemSet2 = [{
        "id": 3,
            "name": "imported box of chocolates",
            "cost": 10.00,
            "totalPrice": 0,
            "import": "y",
            "quantity": 1
    }, {
        "id": 5,
            "name": "imported bottle of perfume",
            "cost": 47.50,
            "totalPrice": 0,
            "import": "y",
            "quantity": 1
    }];

    var itemSet3 = [{
        "id": 5,
            "name": "imported bottle of perfume",
            "cost": 27.99,
            "totalPrice": 0,
            "import": "y",
            "quantity": 1
    }, {
        "id": 5,
            "name": "bottle of perfume",
            "cost": 18.99,
            "totalPrice": 0,
            "import": "n",
            "quantity": 1
    }, {
        "id": 2,
            "name": "packet of headache pills",
            "cost": 9.75,
            "totalPrice": 0,
            "import": "n",
            "quantity": 1
    }, {
        "id": 3,
            "name": "box of imported chocolates",
            "cost": 11.25,
            "totalPrice": 0,
            "import": "y",
            "quantity": 1
    }];
    
    /*Uncomment any of the below statements 
    to get the output for that case*/
    //printReceipt(itemSet1);
    //printReceipt(itemSet2);
    printReceipt(itemSet3);
});