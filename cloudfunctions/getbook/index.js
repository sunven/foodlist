// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require("axios")
const doubanbook = require("doubanbook")

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const res = await axios.get("https://search.douban.com/book/subject_search?search_text=9787201097190&cat=1001")
  let reg = /window\.__DATA__ = "(.*)"/;
  let bookinfo = null
  if (reg.test(res.data)) {
    bookinfo = doubanbook(RegExp.$1);
  }
  return bookinfo
}