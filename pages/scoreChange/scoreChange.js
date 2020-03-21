// pages/scoreChange/scoreChange.js
var app=getApp();
var that
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scores:[],
    oldscore:[],
    newscore:[],
    isEastSeatWinning:null,
    number:10000,
    zijia:0,
    xiajia:0,
    duijia:0,
    shangjia:0


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    this.setData({
      isEastSeatWinning:options.isEastSeatWinning
    })

    
    //这里改场风
    // if (app.globalData.gameInfo.time - app.globalData.gameInfo.shareInfo.counter == 5) {
    //   app.globalData.gameInfo.shareInfo.prevalen =1
    // } else if (app.globalData.gameInfo.time - app.globalData.gameInfo.shareInfo.counter == 9){
    //   app.globalData.gameInfo.shareInfo.prevalen = 2

    // }
    // else if (app.globalData.gameInfo.time - app.globalData.gameInfo.shareInfo.counter == 13) {
    //   app.globalData.gameInfo.shareInfo.prevalen = 3

    // }else{
    //   app.globalData.gameInfo.shareInfo.prevalen = app.globalData.gameInfo.shareInfo.prevalen ;
    // }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      scores: app.globalData.gameInfo.scores
    })
    var len = this.data.scores.length;
    this.setData({
      oldscore: this.data.scores[len - 2],
      newscore: this.data.scores[len - 1]
    })
    this.setData({
      zijia: this.data.oldscore[0],
      xiajia: this.data.oldscore[1],
      duijia: this.data.oldscore[2],
      shangjia: this.data.oldscore[3]
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
   
    setTimeout(function(){
      change0(that.data.newscore[0]);
      change1(that.data.newscore[1]);
      change2(that.data.newscore[2]);
      change3(that.data.newscore[3]);
    },600)
    

  },
  btnconfirm:function(){
    
    //此处需要补充其他结束条件
    //todo负分结束

    var tflag=false;
    for(var item1 in this.data.newscore){
      if(this.data.newscore[item1]<0){
        tflag=true;
      }
    }


    if(tflag){//如果分数有负数



      app.globalData.gameInfo.state = 1;
      //修改对局状态为已完成
      wx.showToast({
        title: '游戏结束',
      })
      app.globalData.gameInfo.time=app.globalData.gameInfo.maxTime+1;
      util.onEndRound();

      //此处将数据存入云服务器
      wx.reLaunch({
        url: '../index/index',
      })



    }else{





    var flag=true;
    for(var item in this.data.newscore){
      if(this.data.newscore[item]>=30000){
        flag=false
      }
    }
    if(app.globalData.gameInfo.time==app.globalData.gameInfo.maxTime+1){
      if(flag){//全部小于30000分则继续
        app.globalData.gameInfo.maxTime+=1;
        wx.navigateBack({
          delta:1
        })
      }else{


        if(this.data.isEastSeatWinning){

          var zhuangjia = app.globalData.gameInfo.shareInfo.eastSeat//庄赢则庄家连庄，此时庄家不变

          var tag = false;
          if (app.globalData.gameInfo.scores[zhuangjia] < app.globalData.gameInfo.scores[0]) {
            tag = true
          }
          else if (app.globalData.gameInfo.scores[zhuangjia] < app.globalData.gameInfo.scores[1]) {
            tag = true
          }
          else if (app.globalData.gameInfo.scores[zhuangjia] < app.globalData.gameInfo.scores[2]) {
            tag = true
          }
          else if (app.globalData.gameInfo.scores[zhuangjia] < app.globalData.gameInfo.scores[3]) {
            tag = true
          } else {
            tag = false
          }//判断庄家是否为最大

          if (tag) {
            app.globalData.gameInfo.maxTime += 1;
            wx.navigateBack({
              delta:1
            })
          } else {
            app.globalData.gameInfo.state = 1;
            //修改对局状态为已完成
            wx.showToast({
              title: '游戏结束',
            })
            app.globalData.gameInfo.time = app.globalData.gameInfo.maxTime + 1;
            util.onEndRound();
            //此处将数据存入云服务器
            wx.reLaunch({
              url: '../index/index',
            })
          }




        }
        else{


          app.globalData.gameInfo.state = 1;
          //修改对局状态为已完成
          wx.showToast({
            title: '游戏结束',
          })
          //此处将数据存入云服务器
          app.globalData.gameInfo.time = app.globalData.gameInfo.maxTime + 1;
          util.onEndRound();
          wx.reLaunch({
            url: '../index/index',
          })

        }


       



        
    }

    }else{
      util.onEndRound();//此处将数据存入云服务器
      wx.navigateBack({
        delta:1
      })

      
    }
    
  }

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


var change0 = number => {
  var baseNumber = that.data.oldscore[0] //原数字
  var difference = number - that.data.oldscore[0] //与原数字的差
  var absDifferent = Math.abs(difference) //差取绝对值
  var changeTimes = absDifferent < 6 ? absDifferent : 6 //最多变化6次
  var changeUnit = absDifferent < 6 ? 1 : Math.floor(difference/6)
  //绝对差除以变化次数
  // 依次变化
  for (var i = 0; i < changeTimes; i += 1) {
    // 使用闭包传入i值，用来判断是不是最后一次变化
    (function (i) {
      setTimeout(() => {
        that.setData({
          zijia: that.data.zijia += changeUnit
        })
        // 差值除以变化次数时，并不都是整除的，所以最后一步要精确设置新数字
        if (i == changeTimes - 1) {
          that.setData({
            zijia: baseNumber + difference
          })
        }
      }, 250 * (i + 1))
    })(i)
  }
}


var change1 = number => {
  var baseNumber = that.data.oldscore[1] //原数字
  var difference = number - that.data.oldscore[1] //与原数字的差
  var absDifferent = Math.abs(difference) //差取绝对值
  var changeTimes = absDifferent < 6 ? absDifferent : 6 //最多变化6次
  var changeUnit = absDifferent < 6 ? 1 : Math.floor(difference / 6)
  //绝对差除以变化次数
  // 依次变化
  for (var i = 0; i < changeTimes; i += 1) {
    // 使用闭包传入i值，用来判断是不是最后一次变化
    (function (i) {
      setTimeout(() => {
        that.setData({
          xiajia: that.data.xiajia += changeUnit
        })
        // 差值除以变化次数时，并不都是整除的，所以最后一步要精确设置新数字
        if (i == changeTimes - 1) {
          that.setData({
            xiajia: baseNumber + difference
          })
        }
      }, 250 * (i + 1))
    })(i)
  }
}



var change2 = number => {
  var baseNumber = that.data.oldscore[2] //原数字
  var difference = number - that.data.oldscore[2] //与原数字的差
  var absDifferent = Math.abs(difference) //差取绝对值
  var changeTimes = absDifferent < 6 ? absDifferent : 6 //最多变化6次
  var changeUnit = absDifferent < 6 ? 1 : Math.floor(difference / 6)
  //绝对差除以变化次数
  // 依次变化
  for (var i = 0; i < changeTimes; i += 1) {
    // 使用闭包传入i值，用来判断是不是最后一次变化
    (function (i) {
      setTimeout(() => {
        that.setData({
          duijia: that.data.duijia += changeUnit
        })
        // 差值除以变化次数时，并不都是整除的，所以最后一步要精确设置新数字
        if (i == changeTimes - 1) {
          that.setData({
            duijia: baseNumber + difference
          })
        }
      }, 250 * (i + 1))
    })(i)
  }
}



var change3 = number => {
  var baseNumber = that.data.oldscore[3] //原数字
  var difference = number - that.data.oldscore[3] //与原数字的差
  var absDifferent = Math.abs(difference) //差取绝对值
  var changeTimes = absDifferent < 6 ? absDifferent : 6 //最多变化6次
  var changeUnit = absDifferent < 6 ? 1 : Math.floor(difference / 6)
  //绝对差除以变化次数
  // 依次变化
  for (var i = 0; i < changeTimes; i += 1) {
    // 使用闭包传入i值，用来判断是不是最后一次变化
    (function (i) {
      setTimeout(() => {
        that.setData({
          shangjia: that.data.shangjia += changeUnit
        })
        // 差值除以变化次数时，并不都是整除的，所以最后一步要精确设置新数字
        if (i == changeTimes - 1) {
          that.setData({
            shangjia: baseNumber + difference
          })
        }
      }, 250 * (i + 1))
    })(i)
  }
}