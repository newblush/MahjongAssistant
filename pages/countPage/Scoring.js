//参考https://wenku.baidu.com/view/0985733eeefdc8d376ee32ae.html
module.exports = {
  Score: Score
}

function Score(getData) {
  //假数据
  var data = getData;
  console.log(data);

  var scores = [0, 0, 0, 0];
  var lastRichi = data.lastRichi;
  for (var i = 0; i < 4; i++) {
    if (data.richi[i] === true) {
      scores[i] -= 1000;
      data.lastRichi++;
    }
  }
  //根据对象t计算点数
  for (var i = 0; i < 4; i++) {
    if (data.winning[i] === true) {

      //detail传值
      //场风
      switch (data.prevalent) {
        case 0: data.detail[i].prevalent = "1z"; break;
        case 1: data.detail[i].prevalent = "2z"; break;
        case 2: data.detail[i].prevalent = "3z"; break;
      }
      //自摸
      if (data.discard == i) { data.detail[i].tsumo = true; }
      else { data.detail[i].tsumo = false; }
      //立直
      data.detail[i].richi = data.richi[i];
      //自风
      switch ((i - data.eastSeat + 4) % 4) {
        case 0: data.detail[i].dealerWind = "1z"; break;
        case 1: data.detail[i].dealerWind = "2z"; break;
        case 2: data.detail[i].dealerWind = "3z"; break;
        case 3: data.detail[i].dealerWind = "4z"; break;
      }


      var t = Calculate(data.detail[i]);
      if (data.eastSeat === i) {
        //亲家
        if (data.discard === i) {
          //自摸
          var score = 0;
          switch (t.han) {
            case 1:
              switch (t.fu) {
                case 30: score = 500; break;
                case 40: score = 700; break;
                case 50: score = 800; break;
                case 60: score = 1000; break;
                case 70: score = 1200; break;
                case 80: score = 1300; break;
                case 90: score = 1500; break;
                case 100: score = 1600; break;
              }
              break;
            case 2:
              switch (t.fu) {
                case 20: score = 700; break;
                case 30: score = 1000; break;
                case 40: score = 1300; break;
                case 50: score = 1600; break;
                case 60: score = 2000; break;
                case 70: score = 2300; break;
                case 80: score = 2600; break;
                case 90: score = 2900; break;
                case 100: score = 3200; break;
                case 110: score = 3600; break;
              }
              break;
            case 3:
              switch (t.fu) {
                case 20: score = 1300; break;
                case 25: score = 1600; break;
                case 30: score = 2000; break;
                case 40: score = 2600; break;
                case 50: score = 3200; break;
                case 60: score = 3900; break;
                default: score = 4000;
              }
              break;
            case 4:
              switch (t.fu) {
                case 20: score = 2600; break;
                case 25: score = 3200; break;
                case 30: score = 3900; break;
                default: score = 4000;
              }
              break;
            case 5:
              score = 4000; break;
            case 6:
            case 7:
              score = 6000; break;
            case 8:
            case 9:
            case 10:
              score = 8000; break;
            case 11:
            case 12:
              score = 12000; break;
            default:
              score = 16000 * (t.han / 13);
          }
          scores[i] += 3 * score;
          for (var j = 0; j < 4; j++) {
            if (i != j) {
              scores[j] -= score;
            }
          }
        }
        else {
          //荣和
          var score = 0;
          switch (t.han) {
            case 1:
              switch (t.fu) {
                case 30: score = 1500; break;
                case 40: score = 2000; break;
                case 50: score = 2400; break;
                case 60: score = 2900; break;
                case 70: score = 3400; break;
                case 80: score = 3900; break;
                case 90: score = 4400; break;
                case 100: score = 4800; break;
                case 110: score = 5300; break;
              }
              break;
            case 2:
              switch (t.fu) {
                case 25: score = 2400; break;
                case 30: score = 2900; break;
                case 40: score = 3900; break;
                case 50: score = 4800; break;
                case 60: score = 5800; break;
                case 70: score = 6800; break;
                case 80: score = 7700; break;
                case 90: score = 8700; break;
                case 100: score = 9600; break;
                case 110: score = 10600; break;
              }
              break;
            case 3:
              switch (t.fu) {
                case 25: score = 4800; break;
                case 30: score = 5800; break;
                case 40: score = 7700; break;
                case 50: score = 9600; break;
                case 60: score = 11600; break;
                default: score = 12000;
              }
              break;
            case 4:
              switch (t.fu) {
                case 25: score = 9600; break;
                case 30: score = 11600; break;
                default: score = 12000;
              }
              break;
            case 5:
              score = 12000; break;
            case 6:
            case 7:
              score = 18000; break;
            case 8:
            case 9:
            case 10:
              score = 24000; break;
            case 11:
            case 12:
              score = 36000; break;
            default:
              score = 48000 * (t.han / 13);
          }
          scores[i] += score;
          scores[data.discard] -= score;
        }
      } else {
        //子家
        if (data.discard === i) {
          //自摸
          var score1 = 0;
          var score2 = 0;
          switch (t.han) {
            case 1:
              switch (t.fu) {
                case 30: score1 = 300; score2 = 500; break;
                case 40: score1 = 400; score2 = 700; break;
                case 50: score1 = 400; score2 = 800; break;
                case 60: score1 = 500; score2 = 1000; break;
                case 70: score1 = 600; score2 = 1200; break;
                case 80: score1 = 700; score2 = 1300; break;
                case 90: score1 = 800; score2 = 1500; break;
                case 100: score1 = 800; score2 = 1600; break;
              }
              break;
            case 2:
              switch (t.fu) {
                case 20: score1 = 400; score2 = 700; break;
                case 30: score1 = 500; score2 = 1000; break;
                case 40: score1 = 700; score2 = 1300; break;
                case 50: score1 = 800; score2 = 1600; break;
                case 60: score1 = 1000; score2 = 2000; break;
                case 70: score1 = 1200; score2 = 2300; break;
                case 80: score1 = 1300; score2 = 2600; break;
                case 90: score1 = 1500; score2 = 2900; break;
                case 100: score1 = 1600; score2 = 3200; break;
                case 110: score1 = 1800; score2 = 3600; break;
              }
              break;
            case 3:
              switch (t.fu) {
                case 20: score1 = 700; score2 = 1300; break;
                case 25: score1 = 800; score2 = 1600; break;
                case 30: score1 = 1000; score2 = 2000; break;
                case 40: score1 = 1300; score2 = 2600; break;
                case 50: score1 = 1600; score2 = 3200; break;
                case 60: score1 = 2000; score2 = 3900; break;
                default: score1 = 2000; score2 = 4000; break;
              }
              break;
            case 4:
              switch (t.fu) {
                case 20: score1 = 1300; score2 = 2600; break;
                case 25: score1 = 1600; score2 = 3200; break;
                case 30: score1 = 2000; score2 = 3900; break;
                default: score1 = 2000; score2 = 4000; break;
              }
              break;
            case 5:
              score1 = 2000; score2 = 4000; break;
            case 6:
            case 7:
              score1 = 3000; score2 = 6000; break;
            case 8:
            case 9:
            case 10:
              score1 = 4000; score2 = 8000; break;
            case 11:
            case 12:
              score1 = 6000; score2 = 12000; break;
            default:
              score1 = 8000 * (t.han / 13); score2 = 16000 * (t.han / 13); break;
          }
          scores[i] += (2 * score1 + score2);
          scores[data.eastSeat] -= score2
          for (var j = 0; j < 4; j++) {
            if (i != j && j != data.eastSeat) {
              scores[j] -= score1;
            }
          }
        }
        else {
          //荣和
          var score = 0;
          switch (t.han) {
            case 1:
              switch (t.fu) {
                case 30: score = 1000; break;
                case 40: score = 1300; break;
                case 50: score = 1600; break;
                case 60: score = 2000; break;
                case 70: score = 2300; break;
                case 80: score = 2600; break;
                case 90: score = 2900; break;
                case 100: score = 3200; break;
                case 110: score = 3600; break;
              }
              break;
            case 2:
              switch (t.fu) {
                case 25: score = 1600; break;
                case 30: score = 2000; break;
                case 40: score = 2600; break;
                case 50: score = 3200; break;
                case 60: score = 3900; break;
                case 70: score = 4500; break;
                case 80: score = 5200; break;
                case 90: score = 5800; break;
                case 100: score = 6400; break;
                case 110: score = 7100; break;
              }
              break;
            case 3:
              switch (t.fu) {
                case 25: score = 3200; break;
                case 30: score = 3900; break;
                case 40: score = 5200; break;
                case 50: score = 6400; break;
                case 60: score = 7700; break;
                default: score = 8000;
              }
              break;
            case 4:
              switch (t.fu) {
                case 25: score = 6400; break;
                case 30: score = 7700; break;
                default: score = 8000;
              }
              break;
            case 5:
              score = 8000; break;
            case 6:
            case 7:
              score = 12000; break;
            case 8:
            case 9:
            case 10:
              score = 16000; break;
            case 11:
            case 12:
              score = 24000; break;
            default:
              score = 32000 * (t.han / 13);
          }
          scores[i] += score;
          scores[data.discard] -= score;
        }
      }

    }
  }
  //计算场棒
  for (var i = data.discard; ; i++) {
    if (data.winning[i % 4] === true) {
      if (i === data.discard) {
        scores[i] += (300 * data.counter + 1000 * data.lastRichi);
        for (var j = 0; j < 4; j++) {
          if (i != j) {
            scores[j] -= 100 * data.counter;
          }
        }
      }
      else {
        scores[i % 4] += (300 * data.counter + 1000 * data.lastRichi);
        scores[data.discard] -= 300 * data.counter;
      }
      break;
    }
  }
  return scores;
}

function Calculate(detail) {
  console.log(detail);
  //13*n番表示n倍役满
  var t = { han: 0, fu: 20, yaku: [], sampleScore: 0 };
  if (detail.special.length != 0) {
    for (var i = 0; i < detail.special.length; i++) {
      //1-国士无双，2-国士无双十三面听，3-四暗刻，4-四暗刻单骑，5-大三元，6-小四喜，7-大四喜，8-字一色，9-绿一色，10-清老头，11-九莲宝灯，12-纯正九连宝灯，13-四杠子，14-天和/地和，15-流局满贯
      switch (detail.special[i]) {
        case 1: t.han += 13; t.yaku[t.yaku.length] = "国士无双";
        case 2: t.han += 26; t.yaku[t.yaku.length] = "国士无双十三面听";
        case 3: t.han += 13; t.yaku[t.yaku.length] = "四暗刻";
        case 4: t.han += 26; t.yaku[t.yaku.length] = "四暗刻单骑";
        case 5: t.han += 13; t.yaku[t.yaku.length] = "大三元";
        case 6: t.han += 13; t.yaku[t.yaku.length] = "小四喜";
        case 7: t.han += 26; t.yaku[t.yaku.length] = "大四喜";
        case 8: t.han += 13; t.yaku[t.yaku.length] = "字一色";
        case 9: t.han += 13; t.yaku[t.yaku.length] = "绿一色";
        case 10: t.han += 13; t.yaku[t.yaku.length] = "清老头";
        case 11: t.han += 13; t.yaku[t.yaku.length] = "九莲宝灯";
        case 12: t.han += 26; t.yaku[t.yaku.length] = "纯正九连宝灯";
        case 13: t.han += 13; t.yaku[t.yaku.length] = "四杠子";
        case 14: t.han += 13; t.yaku[t.yaku.length] = detail.dealerWind == "1z" ? "天和" : "地和";
        case 15: t.han = 5; t.fu = 20; t.yaku[t.yaku.length] = "流局满贯";
      }
    }
    return t;
  }

  var posibleWin = CheckWin(detail.tiles1);
  //console.log(posibleWin);
  var posibleT = [];

  if (posibleWin.length == 0) { return t; }

  for (var i = 0; i < posibleWin.length; i++) {
    t = { han: 0, fu: 20, yaku: [], sampleScore: 0 };
    var winningTiles = {
      prevalent: detail.prevalent,
      dealerWind: detail.dealerWind,
      tsumo: detail.tsumo,//自摸
      ippatsu: detail.ippatsu, //一发
      chankan: detail.chankan, //枪杠
      richi: detail.richi,//立直
      wRichi: detail.wRichi, //双立直
      rinshan: detail.rinshan, //岭上开花
      winOnLast: detail.winOnLast, //河底捞鱼，海底捞月
      handTiles: posibleWin[i],
      showTiles: detail.tiles2,
      lastTile: detail.tiles3[0],
      dora: detail.dora
    };
    //console.log(winningTiles);

    // console.log(IsBigThreeDragons(winningTiles));
    // console.log(IsNineGates(winningTiles));
    // console.log(IsPureNineGates(winningTiles));
    // console.log(IsThirteenOrphans13Wait(winningTiles));
    // console.log(IsThirteenOrphans(winningTiles));
    // console.log(IsAllSequences(winningTiles));

    //役满情况
    if (IsThirteenOrphans(winningTiles)) { t.han += 13; t.yaku[t.yaku.length] = "国士无双"; }
    if (IsThirteenOrphans13Wait(winningTiles)) { t.han += 26; t.yaku[t.yaku.length] = "国士无双十三面听"; }
    if (IsFourConcealedTriplets(winningTiles)) { t.han += 13; t.yaku[t.yaku.length] = "四暗刻"; }
    if (IsFourConcealedTripletsSingleWait(winningTiles)) { t.han += 26; t.yaku[t.yaku.length] = "四暗刻单骑"; }
    if (IsBigThreeDragons(winningTiles)) { t.han += 13; t.yaku[t.yaku.length] = "大三元"; }
    if (IsSmallWinds(winningTiles)) { t.han += 13; t.yaku[t.yaku.length] = "小四喜"; }
    if (IsBigWinds(winningTiles)) { t.han += 26; t.yaku[t.yaku.length] = "大四喜"; }
    if (IsAllHonors(winningTiles)) { t.han += 13; t.yaku[t.yaku.length] = "字一色"; }
    if (IsAllGreen(winningTiles)) { t.han += 13; t.yaku[t.yaku.length] = "绿一色"; }
    if (IsAllTerminals(winningTiles)) { t.han += 13; t.yaku[t.yaku.length] = "清老头"; }
    if (IsNineGates(winningTiles)) { t.han += 13; t.yaku[t.yaku.length] = "九莲宝灯"; }
    if (IsPureNineGates(winningTiles)) { t.han += 26; t.yaku[t.yaku.length] = "纯正九连宝灯"; }
    if (IsFourQuads(winningTiles)) { t.han += 13; t.yaku[t.yaku.length] = "四杠子"; }

    if (t.han != 0) { return t; }
    //不役满情况
    if (IsFlush(winningTiles)) { t.han += IsConcealed(winningTiles.showTiles) ? 6 : 5; t.yaku[t.yaku.length] = "清一色"; }
    else if (IsHalfFlush(winningTiles)) { t.han += IsConcealed(winningTiles.showTiles) ? 3 : 2; t.yaku[t.yaku.length] = "混一色"; }
    if (IsTwoSetsOfIdenticalSequences(winningTiles)) { t.han += 3; t.yaku[t.yaku.length] = "二杯口"; }
    else if (IsOneSetOfIdenticalSequences(winningTiles)) { t.han += 1; t.yaku[t.yaku.length] = "一杯口"; }
    if (IsTerminalInEachMeld(winningTiles)) { t.han += IsConcealed(winningTiles.showTiles) ? 3 : 2; t.yaku[t.yaku.length] = "纯全带幺九"; }
    else if (IsTerminalOrHonorInEachMeld(winningTiles)) { t.han += IsConcealed(winningTiles.showTiles) ? 2 : 1; t.yaku[t.yaku.length] = "混全带幺九"; }
    if (IsSmallThreeDragons(winningTiles)) { t.han += 2; t.yaku[t.yaku.length] = "小三元"; }
    if (IsAllTerminalsOrHonors(winningTiles)) { t.han += 2; t.yaku[t.yaku.length] = "混老头"; }
    if (winningTiles.wRichi) { t.han += 2; t.yaku[t.yaku.length] = "双立直"; }
    else if (winningTiles.richi) { t.han += 1; t.yaku[t.yaku.length] = "立直"; }
    if (IsThreeQuads(winningTiles)) { t.han += 2; t.yaku[t.yaku.length] = "三杠子"; }
    if (IsThreeConcealedTriplets(winningTiles)) { t.han += 2; t.yaku[t.yaku.length] = "三暗刻"; }
    if (IsThreeColoredTriplets(winningTiles)) { t.han += 2; t.yaku[t.yaku.length] = "三色同刻"; }
    if (winningTiles.handTiles.length == 7) { t.han += 2; t.yaku[t.yaku.length] = "七对子"; }
    if (IsAllTriplets(winningTiles)) { t.han += 2; t.yaku[t.yaku.length] = "对对和"; }
    if (IsThreeColoredStraight(winningTiles)) { t.han += IsConcealed(winningTiles.showTiles) ? 2 : 1; t.yaku[t.yaku.length] = "三色同顺"; }
    if (IsStraight(winningTiles)) { t.han += IsConcealed(winningTiles.showTiles) ? 2 : 1; t.yaku[t.yaku.length] = "一气贯通"; }
    if (winningTiles.dora != 0) { t.han += winningTiles.dora; t.yaku[t.yaku.length] = "宝牌"; }
    if (winningTiles.rinshan) { t.han += 1; t.yaku[t.yaku.length] = "岭上开花"; }
    if (winningTiles.winOnLast) { t.han += 1; t.yaku[t.yaku.length] = winningTiles.tsumo ? "海底摸月" : "河底捞鱼"; }
    if (IsHasWhiteDragon(winningTiles)) { t.han += 1; t.yaku[t.yaku.length] = "役牌-白"; }
    if (IsHasGreenDragon(winningTiles)) { t.han += 1; t.yaku[t.yaku.length] = "役牌-发"; }
    if (IsHasRedDragon(winningTiles)) { t.han += 1; t.yaku[t.yaku.length] = "役牌-中"; }
    if (IsHasPrevalent(winningTiles)) { t.han += 1; t.yaku[t.yaku.length] = "役牌-场风"; }
    if (IsHasDealerWind(winningTiles)) { t.han += 1; t.yaku[t.yaku.length] = "役牌-自风"; }
    if (winningTiles.tsumo && IsConcealed(winningTiles.showTiles)) { t.han += 1; t.yaku[t.yaku.length] = "门前清自摸和"; }
    if (winningTiles.ippatsu) { t.han += 1; t.yaku[t.yaku.length] = "一发"; }
    if (IsAllSequences(winningTiles)) { t.han += 1; t.yaku[t.yaku.length] = "平和"; }
    if (IsAllSimples(winningTiles)) { t.han += 1; t.yaku[t.yaku.length] = "断幺九"; }
    console.log(t);
    //如果累计役满
    if (t.han >= 13) { t.han = 13; }
    //如果大于等于满贯
    if (t.han >= 5) { t.sampleScore = SampleScore(t.han, t.fu); posibleT[posibleT.length] = t; continue; }
    //七对子固定25符
    if (winningTiles.handTiles.length == 7) { t.fu = 25; t.sampleScore = SampleScore(t.han, t.fu); posibleT[posibleT.length] = t; continue; }
    //非七对子
    //和了方式带来的符
    if (winningTiles.tsumo) { t.fu += 2; }
    else if (IsConcealed(winningTiles.showTiles)) { t.fu += 10; }
    //听牌型带来的符
    if (winningTiles.handTiles[winningTiles.handTiles.length - 1].includes(winningTiles.lastTile)) { t.fu += 2 }
    else if (IsSingleWait(winningTiles.handTiles, winningTiles.lastTile)) { t.fu += 2 }
    //雀头带来的符
    var pair = winningTiles.handTiles[winningTiles.handTiles.length - 1];
    if (pair.includes("5z") || pair.includes("6z") || pair.includes("7z") || pair.includes(winningTiles.prevalent)) { t.fu += 2 }
    if (pair.includes(winningTiles.dealerWind)) { t.fu += 2 }
    //面子带来的符
    for (var i = 0; i < winningTiles.handTiles.length - 1; i++) {
      if (IsTriplet(winningTiles.handTiles[i][0], winningTiles.handTiles[i][1], winningTiles.handTiles[i][2])) {
        if (winningTiles.handTiles[i][0][0] == "1" || winningTiles.handTiles[i][0][0] == "9" || winningTiles.handTiles[i][0][1] == "z") {
          t.fu += 8;
        } else {
          t.fu += 4;
        }
      }
    }
    for (var i = 0; i < winningTiles.showTiles.length - 1; i++) {
      if (IsClosedKan(winningTiles.showTiles[i])) {
        if (winningTiles.showTiles[i][0][0] == "1" || winningTiles.showTiles[i][0][0] == "9" || winningTiles.showTiles[i][0][1] == "z") {
          t.fu += 32;
        } else {
          t.fu += 16;
        }
      } else if (IsKan(winningTiles.showTiles[i])) {
        if (winningTiles.showTiles[i][0][0] == "1" || winningTiles.showTiles[i][0][0] == "9" || winningTiles.showTiles[i][0][1] == "z") {
          t.fu += 16;
        } else {
          t.fu += 8;
        }
      } else if (IsTriplet(winningTiles.showTiles[i][0], winningTiles.showTiles[i][1], winningTiles.showTiles[i][2])) {
        if (winningTiles.showTiles[i][0][0] == "1" || winningTiles.showTiles[i][0][0] == "9" || winningTiles.showTiles[i][0][1] == "z") {
          t.fu += 4;
        } else {
          t.fu += 2;
        }
      }
    }
    //不足1番30符
    if (t.han == 1 && t.fu < 30) { t.fu = 30; }
    t.fu = Math.ceil(t.fu / 10) * 10;
    t.sampleScore = SampleScore(t.han, t.fu);
    posibleT[posibleT.length] = t;
  }
  posibleT.sort(function (a, b) { return b.sampleScore - a.sampleScore });
  return posibleT[0];

  //return t;
}

//是否门前清
function IsConcealed(showTiles) {
  if (showTiles.length == 0) { return true; }
  for (var i = 0; i < showTiles.length; i++) {
    if (!IsClosedKan(showTiles[i])) {
      return false;
    }
  }
  return true;
}

//计算一个模板分数
function SampleScore(han, fu) {
  if (han == 0) { return 0; }
  var score = 0;
  switch (han) {
    case 1:
      switch (fu) {
        case 30: score = 500; break;
        case 40: score = 700; break;
        case 50: score = 800; break;
        case 60: score = 1000; break;
        case 70: score = 1200; break;
        case 80: score = 1300; break;
        case 90: score = 1500; break;
        case 100: score = 1600; break;
        case 110: score = 1800; break;
      }
      break;
    case 2:
      switch (fu) {
        case 20: score = 700; break;
        case 25: score = 800; break;
        case 30: score = 1000; break;
        case 40: score = 1300; break;
        case 50: score = 1600; break;
        case 60: score = 2000; break;
        case 70: score = 2300; break;
        case 80: score = 2600; break;
        case 90: score = 2900; break;
        case 100: score = 3200; break;
        case 110: score = 3600; break;
      }
      break;
    case 3:
      switch (fu) {
        case 20: score = 1300; break;
        case 25: score = 1600; break;
        case 30: score = 2000; break;
        case 40: score = 2600; break;
        case 50: score = 3200; break;
        case 60: score = 3900; break;
        default: score = 4000;
      }
      break;
    case 4:
      switch (fu) {
        case 20: score = 2600; break;
        case 25: score = 3200; break;
        case 30: score = 3900; break;
        default: score = 4000;
      }
      break;
    case 5:
      score = 4000; break;
    case 6:
    case 7:
      score = 6000; break;
    case 8:
    case 9:
    case 10:
      score = 8000; break;
    case 11:
    case 12:
      score = 12000; break;
    default:
      score = 16000 * (han / 13);
  }
  return score;
}

//坎张听或边张听
function IsSingleWait(tiles, lastTile) {
  for (var i = 0; i < tiles.length - 1; i++) {
    if (IsSequence(tiles[i][0], tiles[i][1], tiles[i][2])) {
      if (tiles[i].includes(lastTile)) {
        if (tiles[i][1] == lastTile || (tiles[i][0][0] == "1" && tiles[i][1][0] == "2") || (tiles[i][1][0] == "8" && tiles[i][2][0] == "9")) {
          return true;
        }
      }
    }
  }
  return false;
}

//四暗刻单骑
function IsFourConcealedTripletsSingleWait(tiles) {
  var counter = 0;
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (IsTriplet(tiles.handTiles[i][0], tiles.handTiles[i][1], tiles.handTiles[i][2])) {
      counter += 1;
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (IsClosedKan(tiles.showTiles[i])) {
      counter += 1;
    }
  }
  if (counter == 4 && tiles.handTiles[tiles.handTiles.length - 1].includes(tiles.lastTile)) {
    return true;
  }
  return false;
}

//四暗刻
function IsFourConcealedTriplets(tiles) {
  var counter = 0;
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (IsTriplet(tiles.handTiles[i][0], tiles.handTiles[i][1], tiles.handTiles[i][2])) {
      counter += 1;
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (IsClosedKan(tiles.showTiles[i])) {
      counter += 1;
    }
  }
  if (counter == 4 && tiles.tsumo && !tiles.handTiles[tiles.handTiles.length - 1].includes(tiles.lastTile)) {
    return true;
  }
  return false;
}

//三暗刻
function IsThreeConcealedTriplets(tiles) {
  var counter = 0;
  var j = [];
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (IsTriplet(tiles.handTiles[i][0], tiles.handTiles[i][1], tiles.handTiles[i][2])) {
      counter += 1;
    } else {
      j = tiles.handTiles[i];
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (IsClosedKan(tiles.showTiles[i])) {
      counter += 1;
    }
  }
  if (counter == 4 && !IsFourConcealedTriplets(tiles) && !IsFourConcealedTripletsSingleWait(tiles)) {
    return true;
  }
  if (counter == 3) {
    if (!j.includes(tiles.lastTile) && !tiles.handTiles[tiles.handTiles.length - 1].includes(tiles.lastTile)) {
      if (tiles.tsumo) { return true; }
      return false;
    }
    return true;
  }
  return false;
}

//对对和
function IsAllTriplets(tiles) {
  var counter = 0;
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (IsTriplet(tiles.handTiles[i][0], tiles.handTiles[i][1], tiles.handTiles[i][2])) {
      counter += 1;
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (!IsSequence(tiles.showTiles[i][0], tiles.showTiles[i][1], tiles.showTiles[i][2])) {
      counter += 1;
    }
  }
  if (counter == 4) {
    return true;
  }
  return false;
}

//七对子
function IsSevenPairs(tiles) {
  if (tiles.handTiles.length == 7) {
    return true;
  }
  return false;
}

//国士无双十三面听
function IsThirteenOrphans13Wait(tiles) {
  var o = ["1m", "9m", "1p", "9p", "1s", "9s", "1z", "2z", "3z", "4z", "5z", "6z", "7z"];
  if (tiles.showTiles.length == 0) {
    var j = [];
    var differ = [];
    for (var i = 0; i < tiles.handTiles.length; i++) {
      j = j.concat(tiles.handTiles[i]);
    }
    differ = CheckDifference(j, o);
    if (differ.length == 1 && differ[0] == tiles.lastTile && o.includes(differ[0])) {
      return true;
    }
  }
  return false;
}

//国士无双
function IsThirteenOrphans(tiles) {
  var o = ["1m", "9m", "1p", "9p", "1s", "9s", "1z", "2z", "3z", "4z", "5z", "6z", "7z"];
  if (tiles.showTiles.length == 0) {
    var j = [];
    var differ = [];
    for (var i = 0; i < tiles.handTiles.length; i++) {
      j = j.concat(tiles.handTiles[i]);
    }
    differ = CheckDifference(j, o);
    if (differ.length == 1 && differ[0] != tiles.lastTile && o.includes(differ[0])) {
      return true;
    }
  }
  return false;
}

//大三元
function IsBigThreeDragons(tiles) {
  var counter = 0;
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (tiles.handTiles[i][0] == "5z" || tiles.handTiles[i][0] == "6z" || tiles.handTiles[i][0] == "7z") {
      counter += 1;
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (tiles.showTiles[i][0].toLowerCase() == "5z" || tiles.showTiles[i][0].toLowerCase() == "6z" || tiles.showTiles[i][0].toLowerCase() == "7z") {
      counter += 1;
    }
  }
  if (counter == 3) {
    return true;
  }
  return false;
}

//小三元
function IsSmallThreeDragons(tiles) {
  var counter = 0;
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (tiles.handTiles[i][0] == "5z" || tiles.handTiles[i][0] == "6z" || tiles.handTiles[i][0] == "7z") {
      counter += 1;
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (tiles.showTiles[i][0].toLowerCase() == "5z" || tiles.showTiles[i][0].toLowerCase() == "6z" || tiles.showTiles[i][0].toLowerCase() == "7z") {
      counter += 1;
    }
  }
  var pair = tiles.handTiles[tiles.handTiles.length - 1][1];
  if (counter == 2 && (pair == "5z" || pair == "6z" || pair == "7z")) {
    return true;
  }
  return false;
}

//大四喜
function IsBigWinds(tiles) {
  var counter = 0;
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (tiles.handTiles[i][0] == "1z" || tiles.handTiles[i][0] == "2z" || tiles.handTiles[i][0] == "3z" || tiles.handTiles[i][0] == "4z") {
      counter += 1;
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (tiles.showTiles[i][0].toLowerCase() == "1z" || tiles.showTiles[i][0].toLowerCase() == "2z" || tiles.showTiles[i][0].toLowerCase() == "3z" || tiles.showTiles[i][0].toLowerCase() == "4z") {
      counter += 1;
    }
  }
  if (counter == 4) {
    return true;
  }
  return false;
}

//小四喜
function IsSmallWinds(tiles) {
  var counter = 0;
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (tiles.handTiles[i][0] == "1z" || tiles.handTiles[i][0] == "2z" || tiles.handTiles[i][0] == "3z" || tiles.handTiles[i][0] == "4z") {
      counter += 1;
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (tiles.showTiles[i][0].toLowerCase() == "1z" || tiles.showTiles[i][0].toLowerCase() == "2z" || tiles.showTiles[i][0].toLowerCase() == "3z" || tiles.showTiles[i][0].toLowerCase() == "4z") {
      counter += 1;
    }
  }
  var pair = tiles.handTiles[tiles.handTiles.length - 1][1];
  if (counter == 3 && (pair == "1z" || pair == "2z" || pair == "3z" || pair == "4z")) {
    return true;
  }
  return false;
}

//字一色
function IsAllHonors(tiles) {
  var counter = 0;
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (tiles.handTiles[i][0][1] == "z") {
      counter += 1;
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (tiles.showTiles[i][0][1].toLowerCase() == "z") {
      counter += 1;
    }
  }
  var pair = tiles.handTiles[tiles.handTiles.length - 1][1];
  if (counter == 4 && pair[1] == "z") {
    return true;
  }
  return false;
}

//绿一色
function IsAllGreen(tiles) {
  for (var i = 0; i < tiles.handTiles.length; i++) {
    for (var j = 0; j < tiles.handTiles[i].length; j++) {
      var tile = tiles.handTiles[i][j];
      if (tile != "2s" && tile != "3s" && tile != "4s" && tile != "6s" && tile != "8s" && tile != "6z") {
        return false;
      }
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    for (var j = 0; j < tiles.showTiles[i].length; j++) {
      var tile = tiles.showTiles[i][j].toLowerCase();
      if (tile != "2s" && tile != "3s" && tile != "4s" && tile != "6s" && tile != "8s" && tile != "6z") {
        return false;
      }
    }
  }
  return true;
}

//清老头
function IsAllTerminals(tiles) {
  for (var i = 0; i < tiles.handTiles.length; i++) {
    for (var j = 0; j < tiles.handTiles[i].length; j++) {
      var tile = tiles.handTiles[i][j];
      if ((tile[0] != "1" && tile[0] != "9") || tile[1] == "z") {
        return false;
      }
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    for (var j = 0; j < tiles.showTiles[i].length; j++) {
      var tile = tiles.showTiles[i][j];
      if ((tile[0] != "1" && tile[0] != "9") || tile[1].toLowerCase() == "z") {
        return false;
      }
    }
  }
  return true;
}

//混老头
function IsAllTerminalsOrHonors(tiles) {
  for (var i = 0; i < tiles.handTiles.length; i++) {
    for (var j = 0; j < tiles.handTiles[i].length; j++) {
      var tile = tiles.handTiles[i][j];
      if (tile[0] != "1" && tile[0] != "9" && tile[1] != "z") {
        return false;
      }
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    for (var j = 0; j < tiles.showTiles[i].length; j++) {
      var tile = tiles.showTiles[i][j];
      if (tile[0] != "1" && tile[0] != "9" && tile[1].toLowerCase != "z") {
        return false;
      }
    }
  }
  return true;
}

//断幺九
function IsAllSimples(tiles) {
  for (var i = 0; i < tiles.handTiles.length; i++) {
    for (var j = 0; j < tiles.handTiles[i].length; j++) {
      var tile = tiles.handTiles[i][j];
      if (tile[0] == "1" || tile[0] == "9" || tile[1] == "z") {
        return false;
      }
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    for (var j = 0; j < tiles.showTiles[i].length; j++) {
      var tile = tiles.showTiles[i][j];
      if (tile[0] == "1" || tile[0] == "9" || tile[1].toLowerCase() == "z") {
        return false;
      }
    }
  }
  return true;
}

//役牌
function IsHasWhiteDragon(tiles) {
  if (IsSevenPairs(tiles)) { return false; }
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (tiles.handTiles[i][0] == "5z") {
      return true;
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (tiles.showTiles[i][0].toLowerCase() == "5z") {
      return true;
    }
  }
  return false;
}
function IsHasGreenDragon(tiles) {
  if (IsSevenPairs(tiles)) { return false; }
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (tiles.handTiles[i][0] == "6z") {
      return true;
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (tiles.showTiles[i][0].toLowerCase() == "6z") {
      return true;
    }
  }
  return false;
}
function IsHasRedDragon(tiles) {
  if (IsSevenPairs(tiles)) { return false; }
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (tiles.handTiles[i][0] == "7z") {
      return true;
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (tiles.showTiles[i][0].toLowerCase() == "7z") {
      return true;
    }
  }
  return false;
}
function IsHasPrevalent(tiles) {
  if (IsSevenPairs(tiles)) { return false; }
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (tiles.handTiles[i][0] == tiles.prevalent) {
      return true;
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (tiles.showTiles[i][0].toLowerCase() == tiles.prevalent) {
      return true;
    }
  }
  return false;
}
function IsHasDealerWind(tiles) {
  if (IsSevenPairs(tiles)) { return false; }
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (tiles.handTiles[i][0] == tiles.dealerWind) {
      return true;
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (tiles.showTiles[i][0].toLowerCase() == tiles.dealerWind) {
      return true;
    }
  }
  return false;
}

//四杠子
function IsFourQuads(tiles) {
  var counter = 0;
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (IsKan(tiles.showTiles[i]) || IsClosedKan(tiles.showTiles[i])) {
      counter += 1;
    }
  }
  if (counter == 4) {
    return true;
  }
  return false;
}

//三杠子
function IsThreeQuads(tiles) {
  var counter = 0;
  for (var i = 0; i < tiles.showTiles.length; i++) {
    if (IsKan(tiles.showTiles[i]) || IsClosedKan(tiles.showTiles[i])) {
      counter += 1;
    }
  }
  if (counter == 3) {
    return true;
  }
  return false;
}

//九连宝灯
function IsNineGates(tiles) {
  var m = ["1m", "1m", "1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "9m", "9m"];
  var p = ["1p", "1p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "9p", "9p"];
  var s = ["1s", "1s", "1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "9s", "9s"];
  if (IsFlush(tiles) && tiles.showTiles.length == 0) {
    var color = tiles.lastTile[1];
    var j = [];
    var differ = [];
    for (var i = 0; i < tiles.handTiles.length; i++) {
      j = j.concat(tiles.handTiles[i]);
    }

    if (color == "m") { differ = CheckDifference(j, m); }
    if (color == "p") { differ = CheckDifference(j, p); }
    if (color == "s") { differ = CheckDifference(j, s); }
    if (differ.length == 1 && differ[0] != tiles.lastTile) {
      return true;
    }
  }
  return false;
}

//纯正九莲宝灯
function IsPureNineGates(tiles) {
  var m = ["1m", "1m", "1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "9m", "9m"];
  var p = ["1p", "1p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "9p", "9p"];
  var s = ["1s", "1s", "1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "9s", "9s"];
  if (IsFlush(tiles) && tiles.showTiles.length == 0) {
    var color = tiles.lastTile[1];
    var j = [];
    var differ = [];
    for (var i = 0; i < tiles.handTiles.length; i++) {
      j = j.concat(tiles.handTiles[i]);
    }
    if (color == "m") { differ = CheckDifference(j, m); }
    if (color == "p") { differ = CheckDifference(j, p); }
    if (color == "s") { differ = CheckDifference(j, s); }
    if (differ.length == 1 && differ[0] == tiles.lastTile) {
      return true;
    }
  }
  return false;
}

function CheckDifference(arr1, arr2) {
  for (var i = 0; i < arr2.length; i++) {
    if (arr1.includes(arr2[i])) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
      continue;
    }
    return arr1;
  }
  return arr1;
}

//清一色
function IsFlush(tiles) {
  var color = tiles.lastTile[1];
  for (var i = 0; i < tiles.handTiles.length; i++) {
    for (var j = 0; j < tiles.handTiles[i].length; j++) {
      if (tiles.handTiles[i][j][1] != color) {
        return false;
      }
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    for (var j = 0; j < tiles.showTiles[i].length; j++) {
      if (tiles.showTiles[i][j][1].toLowerCase() != color) {
        return false;
      }
    }
  }
  return true;
}

//二杯口
function IsTwoSetsOfIdenticalSequences(tiles) {
  if (tiles.showTiles.length != 0 || tiles.handTiles.length == 7) { return false; }
  if (tiles.showTiles.length != 0) { return false; }
  var counter = 0;
  var j = [];
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (IsSequence(tiles.handTiles[i][0], tiles.handTiles[i][1], tiles.handTiles[i][2])) {
      counter += 1;
      if (!j.includes(tiles.handTiles[i][0])) { j[j.length] = tiles.handTiles[i][0]; }
    }
  }
  if (counter == 4) {
    if (j.length <= 2) {
      return true;
    }
  }
  return false;
}

//一杯口
function IsOneSetOfIdenticalSequences(tiles) {
  if (tiles.showTiles.length != 0 || tiles.handTiles.length == 7) { return false; }
  var counter = 0;
  var j = [];
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (IsSequence(tiles.handTiles[i][0], tiles.handTiles[i][1], tiles.handTiles[i][2])) {
      counter += 1;
      if (!j.includes(tiles.handTiles[i][0])) { j[j.length] = tiles.handTiles[i][0]; }
    }
  }
  if (counter >= 2) {
    if (j.length < counter) {
      return true;
    }
  }
  return false;
}

//混一色
function IsHalfFlush(tiles) {
  var color = tiles.lastTile[1];
  for (var i = 0; i < tiles.handTiles.length; i++) {
    for (var j = 0; j < tiles.handTiles[i].length; j++) {
      if (tiles.handTiles[i][j][1] != color && tiles.handTiles[i][j][1] != "z") {
        return false;
      }
    }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    for (var j = 0; j < tiles.showTiles[i].length; j++) {
      if (tiles.showTiles[i][j][1].toLowerCase() != color && tiles.showTiles[i][j][1].toLowerCase() != "z") {
        return false;
      }
    }
  }
  return true;
}

//纯全带幺九
function IsTerminalInEachMeld(tiles) {
  for (var i = 0; i < tiles.handTiles.length; i++) {
    var hasTerminal = false;
    for (var j = 0; j < tiles.handTiles[i].length; j++) {
      var tile = tiles.handTiles[i][j];
      if ((tile[0] == "1" || tile[0] == "9") && tile[1] != "z") {
        hasTerminal = true;
        break;
      }
    }
    if (!hasTerminal) { return false; }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    var hasTerminal = false;
    for (var j = 0; j < tiles.showTiles[i].length; j++) {
      var tile = tiles.showTiles[i][j];
      if ((tile[0] == "1" || tile[0] == "9") && tile[1].toLowerCase != "z") {
        hasTerminal = true;
        break;
      }
    }
    if (!hasTerminal) { return false; }
  }
  return true;
}

//混全带幺九
function IsTerminalOrHonorInEachMeld(tiles) {
  for (var i = 0; i < tiles.handTiles.length; i++) {
    var hasTerminalOrHonor = false;
    for (var j = 0; j < tiles.handTiles[i].length; j++) {
      var tile = tiles.handTiles[i][j];
      if (tile[0] == "1" || tile[0] == "9" || tile[1] == "z") {
        hasTerminalOrHonor = true;
        break;
      }
    }
    if (!hasTerminalOrHonor) { return false; }
  }
  for (var i = 0; i < tiles.showTiles.length; i++) {
    var hasTerminalOrHonor = false;
    for (var j = 0; j < tiles.showTiles[i].length; j++) {
      var tile = tiles.showTiles[i][j];
      if (tile[0] == "1" || tile[0] == "9" || tile[1].toLowerCase == "z") {
        hasTerminalOrHonor = true;
        break;
      }
    }
    if (!hasTerminalOrHonor) { return false; }
  }
  return true;
}

//三色同刻
function IsThreeColoredTriplets(tiles) {
  if (tiles.handTiles.length == 7) { return false; }
  var counter = 0;
  var j = [];
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (IsTriplet(tiles.handTiles[i][0], tiles.handTiles[i][1], tiles.handTiles[i][2]) && tiles.handTiles[i][0][1] != "z") {
      counter += 1;
      if (!j.includes(tiles.handTiles[i][0][0])) { j[j.length] = tiles.handTiles[i][0][0]; }
    }
  }
  for (var i = 0; i < tiles.showTiles.length - 1; i++) {
    if (!IsSequence(tiles.showTiles[i][0], tiles.showTiles[i][1], tiles.showTiles[i][2])) {
      counter += 1;
      if (!j.includes(tiles.showTiles[i][0][0])) { j[j.length] = tiles.showTiles[i][0][0]; }
    }
  }
  if ((counter == 4 && j.length <= 2) || (counter == 3 && j.length == 1)) {
    return true;
  }
  return false;
}

//三色同顺
function IsThreeColoredStraight(tiles) {
  if (tiles.handTiles.length == 7) { return false; }
  var counter = 0;
  var j = [];
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (IsSequence(tiles.handTiles[i][0], tiles.handTiles[i][1], tiles.handTiles[i][2])) {
      counter += 1;
      j[j.length] = tiles.handTiles[i][0];
    }
  }
  for (var i = 0; i < tiles.showTiles.length - 1; i++) {
    if (IsSequence(tiles.showTiles[i][0], tiles.showTiles[i][1], tiles.showTiles[i][2])) {
      counter += 1;
      j[j.length] = tiles.showTiles[i][0]
    }
  }
  if (counter == 4) {
    if (j[0][0] == j[1][0] && j[0][1] != j[1][1]) {
      if (j[0][0] == j[2][0] && j[0][1] != j[2][1] && j[1][1] != j[2][1]) {
        return true;
      }
      if (j[0][0] == j[3][0] && j[0][1] != j[3][1] && j[1][1] != j[3][1]) {
        return true;
      }
    }
    if (j[0][0] == j[2][0] && j[0][1] != j[2][1]) {
      if (j[0][0] == j[3][0] && j[0][1] != j[3][1] && j[2][1] != j[3][1]) {
        return true;
      }
    }
    if (j[1][0] == j[2][0] && j[1][1] != j[2][1]) {
      if (j[1][0] == j[3][0] && j[1][1] != j[3][1] && j[2][1] != j[3][1]) {
        return true;
      }
    }
  }
  if (counter == 3) {
    if (j[0][0] == j[1][0] && j[0][1] != j[1][1]) {
      if (j[0][0] == j[2][0] && j[0][1] != j[2][1] && j[1][1] != j[2][1]) {
        return true;
      }
    }
  }
  return false;
}

//一气贯通
function IsStraight(tiles) {
  var allTiles = tiles.handTiles.concat(tiles.showTiles);
  if ((allTiles.includes(["1m", "2m", "3m"]) && allTiles.includes(["4m", "5m", "6m"]) && allTiles.includes(["7m", "8m", "9m"])) ||
    (allTiles.includes(["1p", "2p", "3p"]) && allTiles.includes(["4p", "5p", "6p"]) && allTiles.includes(["7p", "8p", "9p"])) ||
    (allTiles.includes(["1s", "2s", "3s"]) && allTiles.includes(["4s", "5s", "6s"]) && allTiles.includes(["7s", "8s", "9s"]))) {
    return true;
  }
  return false;
}

//平和
function IsAllSequences(tiles) {
  if (tiles.showTiles.length != 0 || tiles.handTiles.length == 7) { return false; }
  var counter = 0;
  var twoSideWait = false;
  var possibleWait = ["23", "34", "45", "56", "67", "78"];
  for (var i = 0; i < tiles.handTiles.length - 1; i++) {
    if (IsSequence(tiles.handTiles[i][0], tiles.handTiles[i][1], tiles.handTiles[i][2])) {
      counter += 1;
      if (tiles.handTiles[i].includes(tiles.lastTile)) {
        var wait = "";
        for (var j = 0; j < 3; j++) {
          if (tiles.handTiles[i][j] != tiles.lastTile) {
            wait += tiles.handTiles[i][j][0];
          }
        }
        if (possibleWait.includes(wait)) {
          twoSideWait = true;
        }
      }
    }
  }
  if (counter == 4 && twoSideWait) {
    return true;
  }
  return false;
}

//将手牌分为七对子或面子+雀头
function CheckWin(tiles) {
  //国士无双牌型
  var o = ["1m", "9m", "1p", "9p", "1s", "9s", "1z", "2z", "3z", "4z", "5z", "6z", "7z"];
  var newTiles = tiles;
  if (tiles.length == 14) {
    var differ = CheckDifference(tiles, o);
    if (differ.length == 1) {
      if (o.includes(differ[0])) {
        return [[newTiles.concat(o)]];
      }
    }
  }

  //正常牌型
  var allWinningTiles = [];
  tiles.sort();
  var pairsIndex = FindPair(tiles);

  if (pairsIndex.length == 0) { return []; }
  if (pairsIndex.length == 7) {
    var winningtiles = [];
    for (var i = 0; i < pairsIndex.length; i++) {
      winningtiles[winningtiles.length] = [tiles[pairsIndex[i]], tiles[pairsIndex[i]]];
    }
    allWinningTiles[allWinningTiles.length] = winningtiles;
  }
  var lastPair = "";
  //console.log(pairsIndex);
  for (var i = 0; i < pairsIndex.length; i++) {
    if (tiles[pairsIndex[i]] == lastPair) {
      continue;
    } else {
      lastPair = tiles[pairsIndex[i]];
    }
    var newTiles = RemovePair(tiles, pairsIndex[i]);

    // console.log(newTiles);
    // console.log(IsAllSequenceOrTriplet(newTiles));
    // console.log(IsAllTripletOrSequence(newTiles));

    //顺子优先
    var winningtiles = IsAllSequenceOrTriplet(newTiles);
    if (winningtiles.length - 1 == newTiles.length / 3) {
      winningtiles[winningtiles.length - 1] = [tiles[pairsIndex[i]], tiles[pairsIndex[i]]];
      allWinningTiles[allWinningTiles.length] = winningtiles;
    }
    //刻子优先
    var winningtiles = IsAllTripletOrSequence(newTiles);
    //console.log(winningtiles)
    if (winningtiles.length - 1 == newTiles.length / 3) {
      winningtiles[winningtiles.length - 1] = [tiles[pairsIndex[i]], tiles[pairsIndex[i]]];
      allWinningTiles[allWinningTiles.length] = winningtiles;
    }
  }
  return allWinningTiles;
}

//对子
function FindPair(tiles) {
  var pairsIndex = [];
  for (var i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] == tiles[i + 1]) {
      pairsIndex[pairsIndex.length] = i;
      i++;
    }
  }
  return pairsIndex;
}

function RemovePair(tiles, index) {
  var newTiles = [];
  newTiles = newTiles.concat(tiles.slice(0, index));
  newTiles = newTiles.concat(tiles.slice(index + 2));
  return newTiles;
}

function IsAllSequenceOrTriplet(tiles) {
  if (tiles.length == 0) {
    return [[]];
  }
  var lastI = "";
  for (var i = 0; i < tiles.length - 2; i++) {
    if (tiles[i] == lastI) {
      continue;
    } else {
      lastI = tiles[i];
    }
    var lastJ = "";
    for (var j = i + 1; j < tiles.length - 1; j++) {
      if (tiles[j] == lastJ) {
        continue;
      } else {
        lastJ = tiles[j];
      }
      var lastK = "";
      for (var k = j + 1; k < tiles.length; k++) {
        if (tiles[k] == lastK) {
          continue;
        } else {
          lastK = tiles[k];
        }
        if (IsSequence(tiles[i], tiles[j], tiles[k])) {
          return ([[tiles[i], tiles[j], tiles[k]]].concat(IsAllSequenceOrTriplet(RemoveSequenceOrTriplet(tiles, i, j, k))));
        }
      }
    }
  }
  var lastI = "";
  for (var i = 0; i < tiles.length - 2; i++) {
    if (tiles[i] == lastI) {
      continue;
    } else {
      lastI = tiles[i];
    }
    var lastJ = "";
    for (var j = i + 1; j < tiles.length - 1; j++) {
      if (tiles[j] == lastJ) {
        continue;
      } else {
        lastJ = tiles[j];
      }
      var lastK = "";
      for (var k = j + 1; k < tiles.length; k++) {
        if (tiles[k] == lastK) {
          continue;
        } else {
          lastK = tiles[k];
        }
        if (IsTriplet(tiles[i], tiles[j], tiles[k])) {
          return ([[tiles[i], tiles[j], tiles[k]]].concat(IsAllSequenceOrTriplet(RemoveSequenceOrTriplet(tiles, i, j, k))));
        }
      }
    }
  }
  return [];
}

function IsAllTripletOrSequence(tiles) {
  if (tiles.length == 0) {
    return [[]];
  }
  var lastI = "";
  for (var i = 0; i < tiles.length - 2; i++) {
    if (tiles[i] == lastI) {
      continue;
    } else {
      lastI = tiles[i];
    }
    var lastJ = "";
    for (var j = i + 1; j < tiles.length - 1; j++) {
      if (tiles[j] == lastJ) {
        continue;
      } else {
        lastJ = tiles[j];
      }
      var lastK = "";
      for (var k = j + 1; k < tiles.length; k++) {
        if (tiles[k] == lastK) {
          continue;
        } else {
          lastK = tiles[k];
        }
        if (IsTriplet(tiles[i], tiles[j], tiles[k])) {
          return ([[tiles[i], tiles[j], tiles[k]]].concat(IsAllTripletOrSequence(RemoveSequenceOrTriplet(tiles, i, j, k))));
        }
      }
    }
  }
  var lastI = "";
  for (var i = 0; i < tiles.length - 2; i++) {
    if (tiles[i] == lastI) {
      continue;
    } else {
      lastI = tiles[i];
    }
    var lastJ = "";
    for (var j = i + 1; j < tiles.length - 1; j++) {
      if (tiles[j] == lastJ) {
        continue;
      } else {
        lastJ = tiles[j];
      }
      var lastK = "";
      for (var k = j + 1; k < tiles.length; k++) {
        if (tiles[k] == lastK) {
          continue;
        } else {
          lastK = tiles[k];
        }
        if (IsSequence(tiles[i], tiles[j], tiles[k])) {
          return ([[tiles[i], tiles[j], tiles[k]]].concat(IsAllTripletOrSequence(RemoveSequenceOrTriplet(tiles, i, j, k))));
        }
      }
    }
  }
  return [];
}

function RemoveSequenceOrTriplet(tiles, i, j, k) {
  var newTiles = [];
  newTiles = newTiles.concat(tiles.slice(0, i));
  newTiles = newTiles.concat(tiles.slice(i + 1, j));
  newTiles = newTiles.concat(tiles.slice(j + 1, k));
  newTiles = newTiles.concat(tiles.slice(k + 1));
  return newTiles;
}

//刻子
function IsTriplet(tile1, tile2, tile3) {
  if (tile1 == tile2 && tile2 == tile3) {
    return true;
  }
  return false;
}

//顺子
function IsSequence(tile1, tile2, tile3) {
  if (tile1[1].toLowerCase() == "z" || tile2[1].toLowerCase() == "z" || tile3[1].toLowerCase() == "z") {
    return false;
  }
  if (tile1[1] == tile2[1] && tile2[1] == tile3[1]) {
    if (parseInt(tile1[0]) + 1 == parseInt(tile2[0]) && parseInt(tile2[0]) + 1 == parseInt(tile3[0])) {
      return true;
    }
  }
  return false;
}

//明杠
function IsKan(tiles) {
  if (tiles.length == 4) {
    if (tiles[0][1] == "m" || tiles[0][1] == "p" || tiles[0][1] == "s" || tiles[0][1] == "z") {
      return true;
    }
  }
  return false;
}

//暗杠
function IsClosedKan(tiles) {
  if (tiles.length == 4) {
    if (tiles[0][1] == "M" || tiles[0][1] == "P" || tiles[0][1] == "S" || tiles[0][1] == "Z") {
      return true;
    }
  }
  return false;
}