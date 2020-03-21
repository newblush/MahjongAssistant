//scoreList
// pages/startround/startround.js
var util = require('../../utils/util.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: [[25000, 25000, 25000, 25000]],
    time: 0,
    max:1,
    b:0,
    c:1,
    d:0

  },

  btnhepai: function () {
    wx.navigateTo({
      url: '../winningChoose/winningChoose',
    })



  },
  btnhuangpai: function () {
    wx.navigateTo({
      url: '../drawRound/drawRound',
    })
  },
  btnstop: function () {
    //todo此处需要将本次对局存在服务器，对局状态为0
    app.globalData.gameInfo.time = app.globalData.gameInfo.maxTime + 1;
    util.onEndRound();
    wx.reLaunch({
      url: '../index/index',
    })

  

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      max: app.globalData.gameInfo.tryInfo.max,
    })



  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      time: getApp().globalData.gameInfo.time,
      score: getApp().globalData.gameInfo.scores,
      b: app.globalData.gameInfo.tryInfo.b,
      c: app.globalData.gameInfo.tryInfo.c,
      d: app.globalData.gameInfo.tryInfo.d
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})






