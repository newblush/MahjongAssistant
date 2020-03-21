//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //初始化云
    wx.cloud.init();
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.globalData.userInfo.openID = res.result.openid
      }
    });

  },
  globalData: {
    databaseCon:1,
    userInfo: {
      openID: 1
    },
    gameInfo: {
      tryInfo:{
        max:1,
        b:0,
        c:1,
        d:0



      },
      state: 0,//当前对局状态（0表示未完成，1表示已完成）
      maxTime: 4,//最大进行场次数（counter增加maxTime也增加）
      time: 1,//当前进行到的巡数
      shareInfo: {
        //0-自家，1-下家，2-对家，3-上家
        eastSeat: 0, //东家
        //0-东，1-南，2-西
        prevalent: 0, //场风
        counter: 0, //X本场
        lastRichi: 0, //场上剩余立直棒

      },
      winningInfo: {
        //[自家，下家，对家，上家]
        richi: [false, true, false, false], //立直
        winning: [false, false, false, false], //和牌
        //0-自家，1-下家，2-对家，3-上家
        discard: 0, //放铳
      },
      scores: [
        [25000, 25000, 25000, 25000] , [30000, 20000, 25000, 25000]//, [30000, 25000, 20000, 25000]
      ]//每局得分纪录此记录初始状态为含有一个 [25000, 25000, 25000, 25000]数组，此后每结束一旬，都加入一个包含四家分数的数组
      ,
      drawInfo: {
        //[自家，下家，对家，上家]
        richi: [false, true, false,false], //立直
        readyHand: [false, false, false, false], //听牌
      }
    }
  }
})

