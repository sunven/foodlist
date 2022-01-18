// pages/foodlist/index.js
// const { callWxCloudFunction } = require("../../utils/util");
import { callWxCloudFunction } from "../../utils/util";
import { envList } from "../../envList";
const db = wx.cloud.database({
  env: envList.envId,
});
const _ = db.command;
const searchHistoryCol = db.collection("searchHistory");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    searchHistoryList: [],
  },

  async onSearch(e) {
    const {
      target: {
        dataset: { item },
      },
    } = e;
    let keyword = item ? item.keyword : this.data.keyword;
    keyword = keyword.trim();
    if (!keyword) {
      return;
    }
    // const result = await callWxCloudFunction("user", {
    //   type: "getWXContext",
    // });
    // console.log(result);
    const { data } = await searchHistoryCol.where({ keyword }).get();
    if (data && data.length > 0) {
      searchHistoryCol.doc(data[0]._id).update({
        data: {
          count: _.inc(1),
          time: Date.now(),
        },
      });
    } else {
      searchHistoryCol.add({
        data: {
          keyword,
          time: Date.now(),
          count: 1,
        },
      });
    }
  },

  // keywordInput(e) {
  //   this.setData({
  //     keyword: e.detail.value,
  //   });
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { data } = await searchHistoryCol.get();
    this.setData({
      searchHistoryList: data,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
