const totalAmount = (accounts) => {

    let total = 0;

    accounts.forEach(account => {
        total += account.amount;
    });

    return total;
};

export {totalAmount};