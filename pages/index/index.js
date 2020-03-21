//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  continueGame:function(){





    const db = wx.cloud.database();
    var array = new Array();
    db.collection('MajongRecords').where({
      _openid: app.globalData.userInfo.openID
    }).get(
      {
        success: res => {
          array.push(res.data[0].games[res.data[0].games.length - 1][0])
          array.push(res.data[0].games[res.data[0].games.length - 1][1])
          array.push(res.data[0].games[res.data[0].games.length - 1][2])
          if(array[0][0]+1==array[0][1]){
            wx.showToast({
              title: '无可继续的游戏',
            })
          }else{
            //array[0]为对局基本信息,为[maxTime,time,eastSeat,prevalent,counter,lastRichi]
            //array[1]为对局得分纪录,e.g.[[25000,25000,25000,25000],...]
            //array[2]为对局开始的时间
            app.globalData.gameInfo.maxTime=array[0][0];
            app.globalData.gameInfo.time=array[0][1];
            app.globalData.gameInfo.shareInfo.eastSeat=array[0][2]
            app.globalData.gameInfo.shareInfo.prevalent = array[0][3]
            app.globalData.gameInfo.shareInfo.counter = array[0][4]
            app.globalData.gameInfo.shareInfo.lastRichi = array[0][5]
            app.globalData.gameInfo.scores=array[1]
            wx.redirectTo({
              url: '../scoreList/scoreList',
            })





          }

        },
        fail: err => {
          console.log(err);
        }
      });
    









  },
  startgame: function () {


    app.globalData.gameInfo = {
      tryInfo: {
        max: 1,
        b: 0,
        c: 1,
        d: 0
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
        [25000, 25000, 25000, 25000]
      ]//每局得分纪录此记录初始状态为含有一个 [25000, 25000, 25000, 25000]数组，此后每结束一旬，都加入一个包含四家分数的数组
      ,
      drawInfo: {
        //[自家，下家，对家，上家]
        richi: [false, true, false, false], //立直
        readyHand: [false, false, false, false], //听牌
      }
    };
    //每开始一局游戏就进行数据初始化
    
    util.onAddNewGame();//向数据库载入一条新的信息


    wx.redirectTo({
      url: '../eastChoose/eastChoose',
    })
  },
  viewscore: function () {
    wx.navigateTo({
      url: '../gameHistory/gameHistory',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.userInfo.openID = res.result.openid
        console.log(app.globalData.userInfo.openID)
      }
    });

  },

  goToDbTest: function(){
    wx.navigateTo({
      url: '../dbTest/dbTest',
    })
  }
})