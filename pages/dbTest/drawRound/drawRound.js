//winningChoose

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state0: "立",
    state1: "直",
    ishide: 'true',
    theList: [false, false, false, false],
    color0: 'rgb(156, 44, 156)',
    color1: 'rgb(156, 44, 156)',
    color2: 'rgb(156, 44, 156)',
    color3: 'rgb(156, 44, 156)',
    color4: '#fff',
    color5: '#fff',
    color6: '#fff',
    color7: '#fff',
    sureTimes: 0,
    richi: [false, false, false, false],
    readyHand: [false, false, false, false],
    score:[]
  },

  f0: function (event) {
    this.setData({
      color0: this.data.color0 == 'rgb(156, 44, 156)' ? '#fff' : 'rgb(156, 44, 156)',
      color4: this.data.color4 == '#fff' ? 'rgb(156, 44, 156)' : '#fff',
      theList: [(this.data.theList[0] == false) ? true : false, this.data.theList[1], this.data.theList[2], this.data.theList[3]],
    })

  },

  f1: function (event) {
    this.setData({
      color1: this.data.color1 == 'rgb(156, 44, 156)' ? '#fff' : 'rgb(156, 44, 156)',
      color5: this.data.color5 == '#fff' ? 'rgb(156, 44, 156)' : '#fff',
      theList: [this.data.theList[0], (this.data.theList[1] == false) ? true : false, this.data.theList[2], this.data.theList[3]],
    })

  },

  f2: function (event) {
    this.setData({
      color2: this.data.color2 == 'rgb(156, 44, 156)' ? '#fff' : 'rgb(156, 44, 156)',
      color6: this.data.color6 == '#fff' ? 'rgb(156, 44, 156)' : '#fff',
      theList: [this.data.theList[0], this.data.theList[1], (this.data.theList[2] == false) ? true : false, this.data.theList[3]],
    })

  },

  f3: function (event) {
    this.setData({
      color3: this.data.color3 == 'rgb(156, 44, 156)' ? '#fff' : 'rgb(156, 44, 156)',
      color7: this.data.color7 == '#fff' ? 'rgb(156, 44, 156)' : '#fff',
      theList: [this.data.theList[0], this.data.theList[1], this.data.theList[2], (this.data.theList[3] == false) ? true : false]
    })

  },

  sure: function (event) {
    if (this.data.sureTimes == 0) {
      this.setData({
        richi: this.data.theList,
        sureTimes: 1,
        ishide: 'true',
        state0: "听",
        state1: "牌",
        theList: [false, false, false, false],
        color0: 'rgb(156, 44, 156)',
        color1: 'rgb(156, 44, 156)',
        color2: 'rgb(156, 44, 156)',
        color3: 'rgb(156, 44, 156)',
        color4: '#fff',
        color5: '#fff',
        color6: '#fff',
        color7: '#fff',
      })
    }
    else {
      this.setData({
        readyHand: this.data.theList,
      })
      var app = getApp();
      this.setData({
        score: [app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][0],                                   app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][1],
                app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][2],
                app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][3]]
      })

      app.globalData.gameInfo.drawInfo.richi = this.data.richi;
      app.globalData.gameInfo.drawInfo.readyHand = this.data.readyHand;
      for (var i = 0; i < 4; i++) {
        if (this.data.richi[i]) {
          this.data.score[i] = this.data.score[i]-1000;
          app.globalData.gameInfo.shareInfo.lastRichi += 1;
        }
      }
      var ReadyHand=0;
      for (var i = 0; i < 4; i++) {
        if (this.data.readyHand[i]) {
          ReadyHand+=1;
        }
      }
      if(ReadyHand==1){
        for (var i = 0; i < 4; i++) {
          if (this.data.readyHand[i]){
            this.data.score[i] = this.data.score[i]+3000;
          }
          else{
            this.data.score[i] = this.data.score[i] -1000;
          }
        }
      }
      else if (ReadyHand == 2) {
        for (var i = 0; i < 4; i++) {
          if (this.data.readyHand[i]) {
            this.data.score[i] = this.data.score[i] + 1500;
          }
          else {
            this.data.score[i] = this.data.score[i] - 1500;
          }
        }
      }
      else if (ReadyHand == 3) {
        for (var i = 0; i < 4; i++) {
          if (this.data.readyHand[i]) {
            this.data.score[i] = this.data.score[i] + 1000;
          }
          else {
            this.data.score[i] = this.data.score[i] - 3000;
          }
        }
      }
      app.globalData.gameInfo.scores.push(this.data.score);
      app.globalData.gameInfo.time=app.globalData.gameInfo.time+1;

      var isEastSeatWinning = false;
      if (this.data.readyHand[app.globalData.gameInfo.shareInfo.eastSeat] == true) {
        app.globalData.gameInfo.shareInfo.counter += 1;
        app.globalData.gameInfo.maxTime += 1;
      }
      else {
        app.globalData.gameInfo.shareInfo.eastSeat = (app.globalData.gameInfo.shareInfo.eastSeat + 1) % 4;
      }
      wx.redirectTo({
        url: '../scoreChange/scoreChange?isEastSeatWinning='+isEastSeatWinning,
      })
    }
  },
})
