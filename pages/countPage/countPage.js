var app=getApp();
Page({
  data: {
    isEastSeatWinning:null,
    allRichi: [false, true, false, true], //立直
    winning: [false, true, false, false], //和牌
    lastWinner:true,
    seats: ["自", "下", "对", "上"],
    seatIndex:0,
    keyboardShow: false,
    specialShow: false,
    //1-国士无双，2-国士无双十三面听，3-四暗刻，4-四暗刻单骑，5-大三元，6-小四喜，7-大四喜，8-字一色，9-绿一色，10-清老头，11-九莲宝灯，12-纯正九连宝灯，13-四杠子，14-天和 / 地和，15-流局满贯
    special: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    richi: false,
    ippatsu: false,
    wRichi:false,
    chankan:false,
    rinshan:false,
    winOnLast:false,
    dora: 0,
    handTiles: [],
    showTiles: [],
    lastTile: {},
    details: [{},{},{},{}]
  },
  onLoad: function (options) {
    var that=this;
    that.setData({
      isEastSeatWinning: options.isEastSeatWinning,
      allRichi: app.globalData.gameInfo.winningInfo.richi,
      winning: app.globalData.gameInfo.winningInfo.winning,
    });
    for (var i = 0; i < 4; i++) {
      if (that.data.winning[i]) {
        that.setData({
          seatIndex: i,
          richi: that.data.allRichi[i]
        });
        break;
      }
    }
    for (var i = that.data.seatIndex + 1; i < 4; i++) {
      if (that.data.winning[i]) {
        that.setData({
          lastWinner: false
        });
        break;
      }
    }
  },
  InputOK:function(event){
    var specialIndex=[];
    if(this.data.specialShow){
      if (this.data.special[15]){
        specialIndex = [15];
      }else{
        for (var i = 0; i < this.data.special.length; i++){
          specialIndex[specialIndex.length]=i;
        }
      }
    }
    
    var d = {
      playerId: this.data.seatIndex,
      special: specialIndex, //特殊役，int数组
      dora: this.data.dora, //宝牌总数，int
      prevalent: "",
      dealerWind: "",
      tsumo: this.data.tsumo,//自摸
      ippatsu: this.data.ippatsu, //一发
      chankan: this.data.chankan, //枪杠
      richi: this.data.richi,//立直
      wRichi: this.data.wRichi, //双立直
      rinshan: this.data.rinshan, //岭上开花
      winOnLast: this.data.winOnLast, //河底捞鱼，海底捞月
      //m-万，p-筒，s-索，z-字-东南西北白发中，大写-暗杠
      tiles1: this.data.handTiles.map(function (i) { return i.id; }), //手牌
      tiles2: this.data.showTiles.map(function (i) { return i.map(function (j) { return j.id; }); }), //副露
      tiles3: [this.data.lastTile.id] //和牌
    };
  
    var that = this;
    var newDetails = that.data.details;
    newDetails[that.data.seatIndex] = d;
    that.setData({
      details: newDetails
    });

    if (!this.data.lastWinner){

      that.setData({
        lastWinner: true
      });
      for (var i = that.data.seatIndex + 1; i < 4; i++) {
        if (that.data.winning[i]) {
          that.setData({
            seatIndex: i,
            richi: that.data.allRichi[i]
          });
          break;
        }
      }
      for (var i = that.data.seatIndex + 1; i < 4; i++) {
        if (that.data.winning[i]) {
          that.setData({
            lastWinner: false
          });
          break;
        }
      }

      that.setData({
        specialShow: false,
        special: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        richi: that.data.allRichi[that.data.seatIndex],
        ippatsu: false,
        wRichi: false,
        chankan: false,
        rinshan: false,
        winOnLast: false,
        dora: 0,
        handTiles: [],
        showTiles: [],
        lastTile: {},
      });
    }else{
      var scoring = require('./Scoring.js');
      var data = {
        //[自家，下家，对家，上家]
        richi: this.data.allRichi, //立直
        winning: this.data.winning, //和牌
        //0-自家，1-下家，2-对家，3-上家
        eastSeat: app.globalData.gameInfo.shareInfo.eastSeat, //东家
        discard: app.globalData.gameInfo.winningInfo.discard, //放铳
        //0-东，1-南，2-西
        prevalent: app.globalData.gameInfo.shareInfo.prevalent, //场风
        counter: app.globalData.gameInfo.shareInfo.counter, //X本场
        lastRichi: app.globalData.gameInfo.shareInfo.lastRichi, //场上剩余立直棒
        detail: this.data.details
      };
      app.globalData.gameInfo.time = app.globalData.gameInfo.time + 1;
      var scorechanges=scoring.Score(data);
      console.log([app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][0] + scorechanges[0], app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][1] + scorechanges[1], app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][2] + scorechanges[2], app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][3] + scorechanges[3]])



      app.globalData.gameInfo.scores.push([app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][0] + scorechanges[0], app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][1] + scorechanges[1], app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][2] + scorechanges[2], app.globalData.gameInfo.scores[app.globalData.gameInfo.scores.length - 1][3] + scorechanges[3]]);
      app.globalData.gameInfo.shareInfo.lastRichi = 0;

      wx.redirectTo({
        url: '../scoreChange/scoreChange?isEastSeatWinning=' + this.data.isEastSeatWinning,
      })
      console.log(scoring.Score(data));
    } 
  },
  Input: function (event) {
    var that = this;
    var newHandTiles = that.data.handTiles;
    for(var i=0;i<newHandTiles.length;i++){
      newHandTiles[i].img = newHandTiles[i].img.replace('_r.png', '.png')
    }
    newHandTiles[newHandTiles.length] = { id: event.detail, img: '../../resource/mahjong/' + event.detail +'_r.png'}
    var newlastTile={ id: event.detail, img: '../../resource/mahjong/' + event.detail + '_r.png' }
    newHandTiles.sort(function (a, b) { return a.id.split("").reverse().join("") > b.id.split("").reverse().join("")?1:-1;})
    that.setData({
      handTiles:newHandTiles,
      lastTile:newlastTile
    });
  },
  InputChi: function (event) {
    var that = this;
    var newShowTiles = that.data.showTiles;
    var tile = event.detail;
    var chiTiles=[];
    if (tile[0] == "8" || tile[0] == "9"){
      chiTiles[0] = "7" + tile[1];
      chiTiles[1] = "8" + tile[1];
      chiTiles[2] = "9" + tile[1];
    }else{
      chiTiles[0] = parseInt(tile[0]) + tile[1];
      chiTiles[1] = (parseInt(tile[0])+1) + tile[1];
      chiTiles[2] = (parseInt(tile[0])+2) + tile[1];
    }
    var newChi = [{ id: chiTiles[0], img: '../../resource/mahjong/' + chiTiles[0] + '_b.png' }, { id: chiTiles[1], img: '../../resource/mahjong/' + chiTiles[1] + '_b.png' }, { id: chiTiles[2], img: '../../resource/mahjong/' + chiTiles[2] + '_b.png' }];
    newShowTiles[newShowTiles.length] = newChi;
    SortShowTiles(newShowTiles);
    that.setData({
      showTiles: newShowTiles,
    });
  },
  InputPon:function(event){
    var that = this;
    var newShowTiles = that.data.showTiles;
    var newPon = [{ id: event.detail, img: '../../resource/mahjong/' + event.detail + '_b.png' }, { id: event.detail, img: '../../resource/mahjong/' + event.detail + '_b.png' }, { id: event.detail, img: '../../resource/mahjong/' + event.detail + '_b.png' }];
    newShowTiles[newShowTiles.length]=newPon;
    SortShowTiles(newShowTiles);
    that.setData({
      showTiles: newShowTiles,
    });
  },
  InputKan: function (event) {
    var that = this;
    var newShowTiles = that.data.showTiles;
    var newKan = [{ id: event.detail, img: '../../resource/mahjong/' + event.detail + '_b.png' }, { id: event.detail, img: '../../resource/mahjong/' + event.detail + '_b.png' }, { id: event.detail, img: '../../resource/mahjong/' + event.detail + '_b.png' }, { id: event.detail, img: '../../resource/mahjong/' + event.detail + '_b.png' }];
    newShowTiles[newShowTiles.length] = newKan;
    SortShowTiles(newShowTiles);
    that.setData({
      showTiles: newShowTiles,
    });
  },
  InputClosedKan: function (event) {
    var that = this;
    var newShowTiles = that.data.showTiles;
    var newClosedKan = [{ id: event.detail, img: '../../resource/mahjong/b.png' }, { id: event.detail, img: '../../resource/mahjong/' + event.detail + '_b.png' }, { id: event.detail, img: '../../resource/mahjong/' + event.detail + '_b.png' }, { id: event.detail, img: '../../resource/mahjong/b.png' }];
    newShowTiles[newShowTiles.length] = newClosedKan;
    SortShowTiles(newShowTiles);
    that.setData({
      showTiles: newShowTiles,
    });
  },
  KeyboardChange: function (event) {
    var that = this;
    that.setData({
      keyboardShow: (!that.data.keyboardShow)
    })
    console.log("keyBoard Changed");
  },
  SpecialChange: function(event){
    var that = this;
    that.setData({
      specialShow: (!that.data.specialShow)
    })
    console.log("Special Changed");
  },
  TilesTap:function(event){
    console.log(event.currentTarget);
    var that = this;
    that.data.handTiles.splice(event.currentTarget.dataset.index, 1);
    that.setData({
      handTiles: that.data.handTiles
    });
  },
  ShowTilesTap: function (event) {
    console.log(event.currentTarget);
    var that = this;
    that.data.showTiles.splice(event.currentTarget.dataset.index, 1);
    that.setData({
      showTiles: that.data.showTiles
    });
  },
  DoraSub: function (event) {
    var that = this;
    if (that.data.dora > 0) {
      that.setData({
        dora: that.data.dora - 1
      });
    }
  },
  DoraAdd: function (event) {
    var that = this;
    that.setData({
      dora: that.data.dora + 1
    });
  },
  SpecialDetailChange:function(event){
    var index = event.currentTarget.dataset.value;
    var that = this;
    that.data.special[index] = !that.data.special[index];
    that.setData({
      special: that.data.special
    });
  },
  wRichiChange: function (event) {
    var that = this;
    that.data.wRichi = !that.data.wRichi;
    that.setData({
      wRichi: that.data.wRichi
    });
  },
  ippatsuChange: function (event) {
    var that = this;
    that.data.ippatsu = !that.data.ippatsu;
    that.setData({
      ippatsu: that.data.ippatsu
    });
  },
  chankanChange: function (event) {
    var that = this;
    that.data.chankan = !that.data.chankan;
    that.setData({
      chankan: that.data.chankan
    });
  },
  rinshanChange: function (event) {
    var that = this;
    that.data.rinshan = !that.data.rinshan;
    that.setData({
      rinshan: that.data.rinshan
    });
  },
  winOnLastChange: function (event) {
    var that = this;
    that.data.winOnLast = !that.data.winOnLast;
    that.setData({
      winOnLast: that.data.winOnLast
    });
  },

})
 function SortShowTiles(showTiles){
   showTiles.sort(function(a,b){
     if (a[0].id.split("").reverse().join("") > b[0].id.split("").reverse().join("")) {
       return 1;
     }
     if (a[0].id.split("").reverse().join("") == b[0].id.split("").reverse().join("")) {
       return a[1].id.split("").reverse().join("") > b[1].id.split("").reverse().join("")?1:-1;
     }
     return -1;
   });
 }