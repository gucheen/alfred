const alfy = require('alfy');

const data = await alfy.fetch(`https://emoji-api.com/emojis?search=${alfy.input}&access_key=f9cc06e49828ba6571896dc5f794e7c74f16a48d`);

const items = data
	.map(item => {
    return {
      title: item.character,
      subtitle: `${item.unicodeName} - ${item.group} - ${item.subGroup} - ${item.codePoint}`,
      arg: item.character,
    }
  });

alfy.output(items);
