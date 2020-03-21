Component({

  externalClasses: ['majkeyboard'],

  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
    buttonBorder: {
      type: String,
      value: "1px solid #ccc"
    },
    backgroundColor: {
      type: String,
      value: "#fff"
    },
    //1为当前键盘，未来可能增添新格式
    keyBoardType: {
      type: Number,
      value: 1,
    }
  },
  data: {
    chi: false,
    pon: false,
    kan: false,
    closedKan: false,
    majTiles1: [
      { id: '1m', img: '../../resource/mahjong/1m.png' },
      { id: '2m', img: '../../resource/mahjong/2m.png' },
      { id: '3m', img: '../../resource/mahjong/3m.png' },
      { id: '4m', img: '../../resource/mahjong/4m.png' },
      { id: '5m', img: '../../resource/mahjong/5m.png' },
      { id: '6m', img: '../../resource/mahjong/6m.png' },
      { id: '7m', img: '../../resource/mahjong/7m.png' },
      { id: '8m', img: '../../resource/mahjong/8m.png' },
      { id: '9m', img: '../../resource/mahjong/9m.png' }
    ],
    majTiles2: [
      { id: '1p', img: '../../resource/mahjong/1p.png' },
      { id: '2p', img: '../../resource/mahjong/2p.png' },
      { id: '3p', img: '../../resource/mahjong/3p.png' },
      { id: '4p', img: '../../resource/mahjong/4p.png' },
      { id: '5p', img: '../../resource/mahjong/5p.png' },
      { id: '6p', img: '../../resource/mahjong/6p.png' },
      { id: '7p', img: '../../resource/mahjong/7p.png' },
      { id: '8p', img: '../../resource/mahjong/8p.png' },
      { id: '9p', img: '../../resource/mahjong/9p.png' }
    ],
    majTiles3: [
      { id: '1s', img: '../../resource/mahjong/1s.png' },
      { id: '2s', img: '../../resource/mahjong/2s.png' },
      { id: '3s', img: '../../resource/mahjong/3s.png' },
      { id: '4s', img: '../../resource/mahjong/4s.png' },
      { id: '5s', img: '../../resource/mahjong/5s.png' },
      { id: '6s', img: '../../resource/mahjong/6s.png' },
      { id: '7s', img: '../../resource/mahjong/7s.png' },
      { id: '8s', img: '../../resource/mahjong/8s.png' },
      { id: '9s', img: '../../resource/mahjong/9s.png' }
    ],
    majTiles4: [
      { id: '1z', img: '../../resource/mahjong/1z.png' },
      { id: '2z', img: '../../resource/mahjong/2z.png' },
      { id: '3z', img: '../../resource/mahjong/3z.png' },
      { id: '4z', img: '../../resource/mahjong/4z.png' },
      { id: '5z', img: '../../resource/mahjong/5z.png' },
      { id: '6z', img: '../../resource/mahjong/6z.png' },
      { id: '7z', img: '../../resource/mahjong/7z.png' }
    ],
    del: { id: 'del', img: '../../resource/backspace.png'},
    keyNumber: '1234567890',
    keyEnInput1: 'QWERTYUIOP',
    keyEnInput2: 'ASDFGHJKL',
    keyEnInput3: 'ZXCVBNM',
  },
  methods: {
    okTap: function (event) { this.triggerEvent('ok');},
    tilesTap: function (event) {
      let val = event.currentTarget.dataset.value.id;
      console.log(val);
      if (this.data.chi) { this.triggerEvent('inputChi', val); }
      else if (this.data.pon) { this.triggerEvent('inputPon', val); }
      else if (this.data.kan) { this.triggerEvent('inputKan', val); }
      else if (this.data.closedKan) { this.triggerEvent('inputClosedKan', val); }
      else { this.triggerEvent('input', val); }
    },
    chiTap: function (event) {
      var that = this;
      that.setData({
        chi: !that.data.chi
      });
      if (that.data.chi) {
        that.setData({
          pon: false,
          kan: false,
          closedKan: false
        });
      }
    },
    ponTap: function (event) {
      var that = this;
      that.setData({
        pon: !that.data.pon
      });
      if (that.data.pon) {
        that.setData({
          chi: false,
          kan: false,
          closedKan: false
        });
      }
    },
    kanTap: function (event) {
      var that = this;
      that.setData({
        kan: !that.data.kan
      });
      if (that.data.kan) {
        that.setData({
          pon: false,
          chi: false,
          closedKan: false
        });
      }
    },
    closedKanTap: function (event) {
      var that = this;
      that.setData({
        closedKan: !that.data.closedKan
      });
      if (that.data.closedKan) {
        that.setData({
          pon: false,
          kan: false,
          chi: false
        });
      }
    },
  }
});