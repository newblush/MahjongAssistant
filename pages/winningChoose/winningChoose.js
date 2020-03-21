//winningChoose

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state0: "立",
    state1: "直",
    ishide:'true',
    color0: 'rgb(156, 44, 156)',
    color1: 'rgb(156, 44, 156)',
    color2: 'rgb(156, 44, 156)',
    color3: 'rgb(156, 44, 156)',
    color4: '#fff',
    color5: '#fff',
    color6: '#fff',
    color7: '#fff',
    sureTimes:0,
    isdisable: [false, false, false, false],
    theList: [false, false, false, false],
    richi:[false,false,false,false],
    readyHand: [false, false, false, false],
    winning: [false, false, false, false],
    discard: -1,
    winningMen:0,
  },

  f0:function(event){
      this.setData({
        color0: this.data.color0 == 'rgb(156, 44, 156)' ? '#fff' : 'rgb(156, 44, 156)',
        color4: this.data.color4 == '#fff' ? 'rgb(156, 44, 156)' : '#fff',
        theList: [(this.data.theList[0] == false) ? true : false, this.data.theList[1], this.data.theList[2], this.data.theList[3]],      
      })

    if(this.data.state0=='放'){
      if (this.data.winning[0] && this.data.winningMen > 1) {
        wx.showToast({
          title: '多人胡牌时，胡牌者与放统者不能相同',
          icon: 'none',
        });
        this.setData({
          theList: [false, false, false, false],
          color0: 'rgb(156, 44, 156)',
          color4: '#fff'
        })
      }
      else {
        this.setData({
          isdisable: [this.data.isdisable[0], this.data.isdisable[1] == false ? true : false, this.data.isdisable[2] == false ? true : false, this.data.isdisable[3] == false ? true : false],
        })
      }
    }
  },

  f1: function (event) {
    this.setData({
      color1: this.data.color1 == 'rgb(156, 44, 156)' ? '#fff' : 'rgb(156, 44, 156)',
      color5: this.data.color5 == '#fff' ? 'rgb(156, 44, 156)' : '#fff',
      theList: [this.data.theList[0], (this.data.theList[1] == false) ? true : false, this.data.theList[2], this.data.theList[3]],
    })

    if (this.data.state0 == '放') {
      if (this.data.winning[1] && this.data.winningMen > 1) {
        wx.showToast({
          title: '多人胡牌时，胡牌者与放统者不能相同',
          icon: 'none',
        });
        this.setData({
          theList: [false, false, false, false],
          color1: 'rgb(156, 44, 156)',
          color5: '#fff'
        })
      }
      else {
        this.setData({
          isdisable: [this.data.isdisable[0] == false ? true : false, this.data.isdisable[1],this.data.isdisable[2] == false ? true : false, this.data.isdisable[3] == false ? true : false],
        })
      }
    }
  },

  f2: function (event) {
    this.setData({
      color2: this.data.color2 == 'rgb(156, 44, 156)' ? '#fff' : 'rgb(156, 44, 156)',
      color6: this.data.color6 == '#fff' ? 'rgb(156, 44, 156)' : '#fff',
      theList: [this.data.theList[0], this.data.theList[1], (this.data.theList[2] == false) ? true : false, this.data.theList[3]],
    })

    if (this.data.state0 == '放') {
      if (this.data.winning[2] && this.data.winningMen > 1){
        wx.showToast({
          title: '多人胡牌时，胡牌者与放统者不能相同',
          icon: 'none',
        }) ;
        this.setData({
          theList: [false, false, false, false],
          color2: 'rgb(156, 44, 156)',
          color6: '#fff'
        })
      }
      else{
        this.setData({
          isdisable: [this.data.isdisable[0] == false ? true : false, this.data.isdisable[1] == false ? true : false, this.data.isdisable[2],this.data.isdisable[3] == false ? true : false],
        })
      }
    }
  },

  f3: function (event) {
    this.setData({
      color3: this.data.color3 == 'rgb(156, 44, 156)' ? '#fff' : 'rgb(156, 44, 156)',
      color7: this.data.color7 == '#fff' ? 'rgb(156, 44, 156)' : '#fff',
      theList: [this.data.theList[0], this.data.theList[1], this.data.theList[2], (this.data.theList[3] == false) ? true : false]
    })

    if (this.data.state0 == '放') {
      if (this.data.winning[3] && this.data.winningMen > 1) {
        wx.showToast({
          title: '多人胡牌时，胡牌者与放统者不能相同',
          icon: 'none',
        });
        this.setData({
          theList: [false, false, false, false],
          color3: 'rgb(156, 44, 156)',
          color7: '#fff'
        })
      }
      else {
        this.setData({
          isdisable: [this.data.isdisable[0] == false ? true : false, this.data.isdisable[1] == false ? true : false, this.data.isdisable[2] == false ? true : false,this.data.isdisable[3]],
        })
      }
    }
  },

  sure: function (event) {
    if (this.data.sureTimes == 0) {
      this.setData({
        richi: this.data.theList,
        sureTimes: 1,
        state0: "胡",
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

    else if (this.data.sureTimes == 1) {
      this.setData({
        winning: this.data.theList,
        sureTimes: 2,
        state0: "放",
        state1: "统",
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
      for(var i=0;i<4;i++){
        if(this.data.winning[i]){
          this.setData({
            winningMen:this.data.winningMen+1,
          })
        }
      }
      //三人胡牌，进行流局处理
      if(this.data.winningMen==3){
        var app=getApp();
        var score = [app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][0],                                   app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][1], 
                     app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][2],                                   app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][3]];
        for (var i = 0; i < 4; i++) {
          if (this.data.richi[i]) {
            score[i] = score[i] - 1000;
            app.globalData.gameInfo.shareInfo.lastRichi += 1;
          }
        }
        app.globalData.gameInfo.scores.push(score);
        app.globalData.gameInfo.time+=1

        
        var isEastSeatWinning = false;
        if (this.data.winning[app.globalData.gameInfo.shareInfo.eastSeat] == true) {
          app.globalData.gameInfo.shareInfo.counter += 1;
          app.globalData.gameInfo.maxTime += 1;
          app.globalData.gameInfo.tryInfo.d += 1
          isEastSeatWinning = true;
        }
        else {
          app.globalData.gameInfo.tryInfo.c += 1
          if (app.globalData.gameInfo.tryInfo.c == 5) {
            app.globalData.gameInfo.tryInfo.c = 1
            app.globalData.gameInfo.tryInfo.b += 1
            app.globalData.gameInfo.shareInfo.prevalent = app.globalData.gameInfo.tryInfo.b % 4
            app.globalData.gameInfo.tryInfo.max -= 1

          }
          app.globalData.gameInfo.tryInfo.d =0;
          app.globalData.gameInfo.shareInfo.counter=0;
          app.globalData.gameInfo.shareInfo.eastSeat = (app.globalData.gameInfo.shareInfo.eastSeat + 1) % 4;
        }


        wx.redirectTo({
          url: '../scoreChange/scoreChange?isEastSeatWinning='+isEastSeatWinning,
        })
      }
      //四人胡牌，进行报错
      else if(this.data.winningMen==4){
        this.setData({
          sureTimes: 1,
          state0: "胡",
          state1: "牌",
        })
        wx.showToast({
          title: '胡牌人数不得大于3',
          icon:'none',
        }) 
      }
    }
    else{
      for(var i=0;i<4;i++){
        if(this.data.theList[i]){
          this.setData({
            discard: i,
          })
        }
      }
      if(this.data.discard>=0){
        var app=getApp();
        app.globalData.gameInfo.winningInfo.richi=this.data.richi;
        app.globalData.gameInfo.winningInfo.winning=this.data.winning;
        app.globalData.gameInfo.winningInfo.discard=this.data.discard;
        for(var i=0;i<4;i++){
          if(this.data.richi[i]){
            app.globalData.gameInfo.shareInfo.lastRichi+=1;
          }
        }

        var isEastSeatWinning = false;
        if (this.data.winning[app.globalData.gameInfo.shareInfo.eastSeat] == true) {
          app.globalData.gameInfo.shareInfo.counter += 1;
          app.globalData.gameInfo.maxTime += 1;
          app.globalData.gameInfo.tryInfo.d += 1;
          isEastSeatWinning = true;
        }
        else {
          app.globalData.gameInfo.tryInfo.c += 1
          if (app.globalData.gameInfo.tryInfo.c==5){
            app.globalData.gameInfo.tryInfo.c = 1
            app.globalData.gameInfo.tryInfo.b += 1
            app.globalData.gameInfo.shareInfo.prevalent = app.globalData.gameInfo.tryInfo.b%4
            app.globalData.gameInfo.tryInfo.max -= 1

          }
          app.globalData.gameInfo.tryInfo.d = 0;
          app.globalData.gameInfo.shareInfo.counter=0;
          app.globalData.gameInfo.shareInfo.eastSeat = (app.globalData.gameInfo.shareInfo.eastSeat + 1) % 4;
        }
        console.log(app.globalData.gameInfo.shareInfo.lastRichi)
        wx.redirectTo({
          url: '../countPage/countPage?isEastSeatWinning='+isEastSeatWinning,
        })
      }
      else {
        wx.showToast({
          title: '放统者不能为空',
          icon: 'none',
        })
        this.setData({
          sureTimes: 2,
        })
      }
    }
  },
})
  