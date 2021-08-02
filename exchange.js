const alfy = require('alfy');
const Big = require('big.js');

const exchangeRateApi = (sourceCode) =>
  `https://www.ladydaily.com/currency/free/${sourceCode}/CNY`;

const matches = alfy.input.match(/([\d\.,]+)([A-Za-z]{3})/);

if (matches === null) {
  alfy.output([
    {
      title: 'waiting...'
    },
  ]);
  return;
}

const [, amount, code] = matches;

const prettifyCode = code.toUpperCase();

const { rate } = await alfy.fetch(exchangeRateApi(prettifyCode), {
  maxAge: 21600000, // 6 小时更新一次
});

const amountNum = parseFloat(amount.replace(/,/g, ''));
const ba = new Big(amountNum);
const result = ba.times(rate).toFixed(2);

alfy.output([
  {
    title: result,
    subtitle: `当前${prettifyCode}->CNY汇率：${rate.toFixed(3)}`,
    arg: result,
  },
]);
