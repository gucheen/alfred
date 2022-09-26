import alfy from 'alfy'

const time = Math.floor(Date.now() / 100)

try {
  const data = await alfy.fetch(`https://www.smzdm.com/homepage/json_more?timesort=${time}&p=1&past_num=20`)

  const items = data.data
	.map(item => {
    if (item.yh_type === 'youhui') {
      return {
        uid: item.article_id,
        title: item.article_title,
        subtitle: `${item.article_mall} - ${item.article_price} - ${item.article_worthy}⬆ - ${item.article_unworthy}⬇ - ${item.article_comment}评`,
        arg: item.article_url,
      }
    } else {
      return {
        uid: item.article_id,
        title: item.article_title,
        subtitle: item.article_content,
        arg: item.article_url,
      }
    }
  })

  alfy.output(items)
} catch (error) {
  alfy.log(error)
}
