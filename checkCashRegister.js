function checkCashRegister(price, cash, cid) {
    let moneyInReg = 0;
    let returnToCostumer = cash - price;
    let change = [];
    let bills = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

    for (let i = bills.length - 1; i >= 0; i--) {
        moneyInReg += cid[i][1];
        let toDeduct = Math.floor(returnToCostumer / bills[i]) * bills[i];
        if (toDeduct <= cid[i][1]) {
            returnToCostumer -= toDeduct;
            if (toDeduct == 0) continue;
            let newArr = [];
            newArr.push(cid[i][0]);
            newArr.push(toDeduct);
            change.push(newArr);
            moneyInReg -= toDeduct;
        } else {
            returnToCostumer -= cid[i][1];
            moneyInReg -= cid[i][1];
            let newArr = [];
            newArr.push(cid[i][0]);
            newArr.push(cid[i][1]);
            change.push(newArr);
        }
        returnToCostumer = Math.round(returnToCostumer * 100) / 100
    }

    if (returnToCostumer > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (moneyInReg == 0) {
        return { status: "CLOSED", change: cid };
    } else {
        return { status: "OPEN", change: change };
    }
}