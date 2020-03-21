const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// pages/dbTest/dbTest.js

const app = getApp();
//检索是否存在用户记录。不存在则新建一个记录。
function searchDbByOpenId() {
  const db = wx.cloud.database();
  db.collection('MajongRecords').where({
    _openid: app.globalData.userInfo.openID
  }).get({
    success: res => {
      if (res.data.length == 0) {
        console.log("新用户");
        db.collection('MajongRecords').add({
          data: {
             games: []//[
            //   [
            //     [
            //       app.globalData.gameInfo.maxTime,
            //       app.globalData.gameInfo.time,
            //       app.globalData.gameInfo.shareInfo.eastSeat,
            //       app.globalData.gameInfo.shareInfo.prevalent,
            //       app.globalData.gameInfo.shareInfo.counter,
            //       app.globalData.gameInfo.shareInfo.lastRichi
            //     ],
            //     app.globalData.gameInfo.scores,
            //     new Date()
            //   ]
            // ]
          },
          success: function (res) {
            console.log("创建新记录成功。")
          }
        })
      } else {
        console.log("老用户");
      }
    }
  });
}

//为新用户创建记录
function createData() {
  const db = wx.cloud.database();
  db.collection('MajongRecords').add({
    data: {
      games:[]// [
      //   [
      //     [
      //       app.globalData.gameInfo.maxTime,
      //       app.globalData.gameInfo.time,
      //       app.globalData.gameInfo.shareInfo.eastSeat,
      //       app.globalData.gameInfo.shareInfo.prevalent,
      //       app.globalData.gameInfo.shareInfo.counter,
      //       app.globalData.gameInfo.shareInfo.lastRichi
      //     ],
      //     app.globalData.gameInfo.scores,
      //     new Date()
      //   ]
      // ]
    },
    success: function (res) {
      console.log("创建新纪录成功。")
    }
  })
}

//开始一局新的游戏
function createNewGame() {
  const db = wx.cloud.database();
  var id;
  db.collection('MajongRecords').where({
    _openid: app.globalData.userInfo.openID
  }).get({
    success: res => {
      id = res.data[0]._id;
      doCreateNewGame(id);
    },
    fail: err => {
      console.log(err);
    }
  });
}

function doCreateNewGame(id) {
  const db = wx.cloud.database();
  const _ = db.command;
  db.collection('MajongRecords').doc(id).update({
    data: {
      games: _.push(
        [
          [
            [
              app.globalData.gameInfo.maxTime,
              app.globalData.gameInfo.time,
              app.globalData.gameInfo.shareInfo.eastSeat,
              app.globalData.gameInfo.shareInfo.prevalent,
              app.globalData.gameInfo.shareInfo.counter,
              app.globalData.gameInfo.shareInfo.lastRichi
            ],
            app.globalData.gameInfo.scores,
            new Date()
          ]
        ]
      )
    },
    success: function (res) {
      console.log("成功创建新的一局游戏。")
    }
  })
}

//更新一局游戏（例如每巡结束算分之后）
function updateOneGame() {
  const db = wx.cloud.database();
  var id;
  db.collection('MajongRecords').where({
    _openid: app.globalData.userInfo.openID
  }).get({
    success: res => {
      id = res.data[0]._id;
      doUpdateOneGame(id);
    },
    fail: err => {
      console.log(err);
    }
  });
}

function doUpdateOneGame(id) {
  const db = wx.cloud.database();
  const _ = db.command;
  db.collection('MajongRecords').where({
    _openid: app.globalData.userInfo.openID
  }).get(
    {
      success: res => {
        var date = res.data[0].games[res.data[0].games.length - 1][2];
        db.collection('MajongRecords').doc(id).update({
          data: {
            games: _.pop()
          }
        });
        db.collection('MajongRecords').doc(id).update({
          data: {
            games: _.push(
              [
                [
                  [
                    app.globalData.gameInfo.maxTime,
                    app.globalData.gameInfo.time,
                    app.globalData.gameInfo.shareInfo.eastSeat,
                    app.globalData.gameInfo.shareInfo.prevalent,
                    app.globalData.gameInfo.shareInfo.counter,
                    app.globalData.gameInfo.shareInfo.lastRichi
                  ],
                  app.globalData.gameInfo.scores,
                  date
                ]
              ]
            )
          },
          success: function (res) {
            console.log("更新数据成功。")
          }
        })
      },
      fail: err => {
        console.log(err);
      }
    });
}

//获取用户最近一次对局的数据
//返回值为一个数组array
//array[0]为对局基本信息,为[maxTime,time,eastSeat,prevalent,counter,lastRichi]
//array[1]为对局得分纪录,e.g.[[25000,25000,25000,25000],...]
//array[2]为对局开始的时间
function getLastGameInfo() {
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
        console.log(array);
      },
      fail: err => {
        console.log(err);
      }
    });
  return array;
}

//获取用户最近（最多）20次对局的最终得分记录
//返回值为一个数组array,元素为array，包含对局最终得分以及对局创建时间
//e.g.array[i][0]=[25000,25000,25000,25000],array[i][2]="XXXX年XX月XX日 HH:mm:ss",
function getGamesHistory() {
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
        console.log(array)
        app.globalData.gameInfo.records=array
        console.log(app.globalData.gameInfo.records)
      },
      fail: err => {
        console.log(err);
      }
    });
  return array;
}



//数据库测试按钮




module.exports = {
  formatTime: formatTime,
  onCheckUser: searchDbByOpenId,
  onAddData: createData,
  onAddNewGame: createNewGame,
  onEndRound: updateOneGame,
  onCheckLastGameInfo: getLastGameInfo,
  onCheckGameHistory: getGamesHistory,

}
