// pages/login/login.js
var util = require('../../utils/util.js');
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
          util.onCheckUser();
          wx.redirectTo({
            // url: '../index/index',
            url: '../index/index',
          })
          
        }
      }
    })
  },
  bindGetUserInfo: function (e) {//点击的“拒绝”或者“允许
    if (e.detail.userInfo) {
      util.onCheckUser();//点击了“允许”按钮，
      wx.redirectTo({
        // url: '../index/index',
        url: '../index/index',
      })
    }
  }
})
