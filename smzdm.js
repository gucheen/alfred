const alfy = require('alfy');

const time = Math.floor(Date.now() / 1000);

const data = await alfy.fetch(`https://www.smzdm.com/homepage/json_more?timesort=${time}&p=1&past_num=20`);

const items = data.data
	.map(item => {
    if (item.article_type === '好价') {
      return {
        title: item.article_title,
        subtitle: `${item.article_mall} - ${item.article_price} - ${item.article_worthy}⬆ - ${item.article_unworthy}⬇ - ${item.article_comment}评`,
        arg: item.article_url,
      }
    } else {
      return {
        title: item.article_title,
        subtitle: item.article_content,
        arg: item.article_url,
      }
    }
  });

alfy.output(items);
