'use strict';

function printReceipt(inputs) {
    let itemDetailList = getItemDetailList(inputs);
    console.log(buildReceiptHeader() + buildReceiptBody(itemDetailList) + buildReceiptFooter(itemDetailList));
}

function getItemDetailsByBarcode(barcode) {
    const items = loadAllItems();
    for (let i = 0; i < items.length; i++) {
        if (items[i].barcode === barcode) {
            return items[i];
        }
    }
}

function getItemDetailList(inputs) {
    let itemMap = {};
    let itemCount = {};
    let order = [];
    for (let i = 0; i < inputs.length; i++) {
        let item = getItemDetailsByBarcode(inputs[i]);
        if (itemCount[item.barcode]) {
            itemCount[item.barcode]++;
        } else {
            itemCount[item.barcode] = 1;
            itemMap[item.barcode] = item;
            order.push(item.barcode);
        }
    }
    let result = [];
    for (let i = 0; i < order.length; i++) {
        result.push({detail: itemMap[order[i]], count: itemCount[order[i]]});
    }
    return result;
}

function buildReceiptBody(itemDetailList) {
    let result = "";
    for (let i = 0; i < itemDetailList.length; i++) {
        result += formatItemAsReceiptBody(itemDetailList[i].detail, itemDetailList[i].count);
    }
    result += "----------------------\n";
    return result;
}

function buildReceiptHeader() {
    return "***<没钱赚商店>收据***\n";
}

function buildReceiptFooter(itemDetailList) {
    let result = "";
    let total = 0;
    for (let i = 0; i < itemDetailList.length; i++) {
        total += itemDetailList[i].detail.price * itemDetailList[i].count;
    }
    result += "总计：" + formatDecimal(total) + "(元)\n";
    result += "**********************";
    return result;
}

function formatItemAsReceiptBody(item, count) {
    return "名称：" + item.name + "，数量：" + count + item.unit + "，单价：" + formatDecimal(item.price) + "(元)，小计：" + formatDecimal(item.price * count) + "(元)\n";
}

function formatDecimal(value) {
    return parseFloat(value).toFixed(2);
}
