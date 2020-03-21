//eastChoose
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    halforwhole: false,//半场false，全场true
    theList: [0, 0, 0, 0],//记录庄家
    color0: 'rgb(156, 44, 156)',
    color1: 'rgb(156, 44, 156)',
    color2: 'rgb(156, 44, 156)',
    color3: 'rgb(156, 44, 156)',
    color4: '#fff',
    color5: '#fff',
    color6: '#fff',
    color7: '#fff',

  },
  f0:function(){
    this.setData({
      color0: this.data.color0 == 'rgb(156, 44, 156)' ? '#fff' : 'rgb(156, 44, 156)',
      color4: this.data.color4 == '#fff' ? 'rgb(156, 44, 156)' : '#fff',
      theList: [(this.data.theList[0] == 0) ? 1 : 0, this.data.theList[1], this.data.theList[2], this.data.theList[3]],
    })

  },
  f1:function(){
    this.setData({
      color1: this.data.color1 == 'rgb(156, 44, 156)' ? '#fff' : 'rgb(156, 44, 156)',
      color5: this.data.color5 == '#fff' ? 'rgb(156, 44, 156)' : '#fff',
      theList: [this.data.theList[0], (this.data.theList[1] == 0) ? 1 : 0, this.data.theList[2], this.data.theList[3]],
    })

  },
  f2:function(){
    this.setData({
      color2: this.data.color2 == 'rgb(156, 44, 156)' ? '#fff' : 'rgb(156, 44, 156)',
      color6: this.data.color6 == '#fff' ? 'rgb(156, 44, 156)' : '#fff',
      theList: [this.data.theList[0], this.data.theList[1], (this.data.theList[2] == 0) ? 1 : 0, this.data.theList[3]],
    })

  },
  f3:function(){
    this.setData({
      color3: this.data.color3 == 'rgb(156, 44, 156)' ? '#fff' : 'rgb(156, 44, 156)',
      color7: this.data.color7 == '#fff' ? 'rgb(156, 44, 156)' : '#fff',
      theList: [this.data.theList[0], this.data.theList[1], this.data.theList[2], (this.data.theList[3] == 0) ? 1 : 0]
    })

  },
  changechoose: function (event) {
    if (event.detail.value == "half") {
      this.setData({
        halforwhole: false
      })

    } else {
      this.setData({
        halforwhole: true
      })
    }
  },


  //按钮绑定事件
  btnclick: function () {
    if (this.data.halforwhole) {
      app.globalData.gameInfo.maxTime = 8;
      app.globalData.gameInfo.tryInfo.max=2;
    } else {
      app.globalData.gameInfo.maxTime = 4;
      app.globalData.gameInfo.tryInfo.max=1;
    }
    var count=0;
    for(var item in this.data.theList){
      if(this.data.theList[item]==1){count++}
    }

    if(count>=2||count==0){
      wx.showToast({
        title: '请选择正确的庄家',
        icon:'none',
      })
      this.setData({
        color0: 'rgb(156, 44, 156)',
        color1: 'rgb(156, 44, 156)',
        color2: 'rgb(156, 44, 156)',
        color3: 'rgb(156, 44, 156)',
        color4: '#fff',
        color5: '#fff',
        color6: '#fff',
        color7: '#fff',
        theList:[0,0,0,0]
        })

    }else{
      if(this.data.theList[0]==1){
        app.globalData.gameInfo.shareInfo.eastSeat=0;
      }
      else if (this.data.theList[1] == 1){
        app.globalData.gameInfo.shareInfo.eastSeat = 1;
      }
      else if (this.data.theList[2] == 1){
        app.globalData.gameInfo.shareInfo.eastSeat = 2;
      }
      else{
        app.globalData.gameInfo.shareInfo.eastSeat = 3;
      }

      wx.redirectTo({
        url: '../scoreList/scoreList',
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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