const alfy = require('alfy');
const Big = require('big.js');

const exchangeRateApi = (targetCode) => `https://www.dogedoge.com/currency/free/${targetCode}/CNY`;

const matches = alfy.input.match(/([\d\.,]+)([A-Za-z]{3})/);

if (matches === null) {
  return;
}

const [, amount, code] = matches;

const prettifyCode = code.toUpperCase();

const apiUrl = exchangeRateApi(prettifyCode);

const { rate } = await alfy.fetch(apiUrl, {
  maxAge: 7200000,
});

const ba = new Big(amount.replaceAll(',', ''));
const result = ba.times(rate);

alfy.output([
  {
    title: result,
    subtitle: `当前${prettifyCode}->CNY汇率：${rate.toFixed(3)}`,
    arg: result,
  },
]);
