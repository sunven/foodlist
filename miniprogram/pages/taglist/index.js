// pages/taglist/index.js
import { envList } from '../../envList'
const db = wx.cloud.database({
  env: envList.envId,
})
const _ = db.command
const tagCol = db.collection('tag')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tagList: [],
    name: '',
  },

  onSave() {
    tagCol
      .add({
        data: {
          name: this.data.name,
          time: Date.now(),
        },
      })
      .then(() => {
        this.getTagList()
      })
  },

  async getTagList() {
    const { data } = await tagCol.get()
    this.setData({
      tagList: data,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTagList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
})
