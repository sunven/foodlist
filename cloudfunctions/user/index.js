const getWXContext = require('./getWXContext');


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getWXContext':
      return await getWXContext.main(event, context);
  }
};