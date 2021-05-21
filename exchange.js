const alfy = require('alfy');
const Big = require('big.js');
const FIXER_KEY = require('./fixer-key');

const exchangeRateApi = `http://data.fixer.io/api/latest?access_key=${FIXER_KEY}&format=1`;

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

const { rates } = await alfy.fetch(exchangeRateApi, {
  maxAge: 21600000, // 6 小时更新一次
});

const ba = new Big(1);
const direactRate = ba.div(rates[prettifyCode]).times(rates.CNY);
const result = direactRate.times(amount.replace(/,/g, '')).toFixed(2);

alfy.output([
  {
    title: result,
    subtitle: `当前${prettifyCode}->CNY汇率：${direactRate.toFixed(3)}`,
    arg: result,
  },
]);
