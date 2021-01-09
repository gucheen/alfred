const alfy = require('alfy');

const api = alfy.input === '1' ? 'https://www.v2ex.com/api/topics/hot.json' : 'https://www.v2ex.com/api/topics/latest.json'

const data = await alfy.fetch(api);

const items = data
	.map(item => {
    return {
      title: item.title,
      subtitle: item.content,
      arg: item.url,
      text: {
        largetype: item.content,
      },
    }
  });

alfy.output(items);
