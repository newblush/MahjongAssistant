//gameHistory
var util = require('../../utils/util.js');
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    games: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //TODO
    //此处从服务去历史对局数据，替换games数据











    const db = wx.cloud.database();
    var array = new Array();
    db.collection('MajongRecords').where({
      _openid: app.globalData.userInfo.openID
    }).get(
      {
        success: res => {
          var len = res.data[0].games.length;
          for (var i = 0; i < 20; i++) {
            if (len - i - 1 < 0) {
              break;
            } else {
              var list = new Array();
              var temp = res.data[0].games[len - i - 1][1].length;
              var date = res.data[0].games[len - i - 1][2];
              date = new Date(date.$date);
              var dateStr = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
              list.push(res.data[0].games[len - i - 1][1][temp - 1]);
              list.push(dateStr);
              array.push(list);
            }
          }
          this.setData({
            games:array
          })
        },
        fail: err => {
          console.log(err);
        }
      });

























  



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