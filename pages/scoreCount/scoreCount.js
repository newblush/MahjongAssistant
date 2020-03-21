//scoreCount
// pages/suanfen/suanfen.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEastSeatWinning:null

  },
  btnreturn: function () {

    wx.redirectTo({
      url: '../winningChoose/winningChoose',
    })
   
  },
  btnconfirm: function () {
    //todo
    //此处由苗神写算完分后将本轮后的比分（不是分数的变化）添加进scores里面然后跳转至scoreChange页面
    //app.globalData.gameInfo.scores.push[]
    app.globalData.gameInfo.time = app.globalData.gameInfo.time + 1;
    wx.redirectTo({
      url: '../scoreChange/scoreChange?isEastSeatWinning='+this.data.isEastSeatWinning,
    })



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isEastSeatWinning:options.isEastSeatWinning
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