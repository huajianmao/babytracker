//index.js

const util = require('../../utils/util.js')

//获取应用实例
const app = getApp()
const events = wx.getStorageSync('events') ||{
  feed: { name: "喝奶奶咯~", icon: "../../imgs/baby/bottle.png" },
  poops: { name: "拉臭臭了！", icon: "../../imgs/baby/cream.png" },
  pee: { name: "尿了个尿 :-)", icon: "../../imgs/baby/pee.png" },
  rest: { name: "宝宝在休息", icon: "../../imgs/baby/child.png" },
  unknown: { name: "暂时还不知道", icon: "../../imgs/unknown.png" },
}

Page({
  data: {
    events: events,
    records: wx.getStorageSync('records') || [
      { year: "2018", day: "01-22", time: "02:33:25", event: events.rest, picture: "", note: "说了，说了！说了，说了！说了，说了！" },
      { year: "2018", day: "01-23", time: "06:53:43", picture: "", note: "" },
      { year: "2018", day: "01-23", time: "08:24:46", event: events.feed, picture: "", note: "" },
      { year: "2018", day: "01-23", time: "10:33:22", event: events.pee, picture: "", note: "" },
      { year: "2018", day: "01-23", time: "11:34:52", event: events.feed, picture: "", note: "" },
      { year: "2018", day: "01-23", time: "13:46:22", event: events.poops, picture: "", note: "" },
      { year: "2018", day: "01-23", time: "16:18:32", event: events.feed, picture: "", note: "" }
    ],
    onAddingAction: true,
    newAction: {},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  addActionTap: function (e) {
    initNewAction()
  },
  setNewActionTime: function() {
    var newAction = this.data.newAction

    var now = new Date()
    const yearDayTime = util.formatYearDayTime(now)
    newAction.year = yearDayTime[0]
    newAction.day = yearDayTime[1]
    newAction.time = yearDayTime[2]
    this.setData({
      newAction: newAction
    })
  },
  setNewActionEvent: function(event) {
    var newAction = this.data.newAction
    newAction.event = event
    this.setData({
      newAction: newAction
    })
  },
  setNewActionNote: function(note) {
    var newAction = this.data.newAction
    newAction.note = note
    this.setData({
      newAction: newAction
    })
  },
  initNewAction: function() {
    this.setNewActionTime()
    this.setNewActionEvent({})
    this.setNewActionNote("")
  },
  cancelAddingTap: function(e) {
    this.setData({
      newAction: {},
      // onAddingAction: false,
    })
  },
  checkAddingTap: function(e) {
    this.setNewActionTime()
    var records = this.data.records
    records.unshift(this.data.newAction)
    wx.setStorageSync('records', records)

    this.setData({
      records: records,
      // onAddingAction: false,
      newAction: {}
    })
  },
  addingEventDirectlyTap: function(e) {
    this.eventSelectTap(e)
    this.checkAddingTap(e)
  },
  eventSelectTap: function(e) {
    this.setNewActionEvent(e.currentTarget.dataset.event)
  },
  bindTextAreaBlur: function (e) {
    var newAction = this.data.newAction
    newAction.note = e.detail.value
    this.setData({
      newAction: newAction
    })
  },
  recordChange: function(e) {
    // const recordID = e.currentTarget.dataset.index
    // wx.navigateTo({
    //   url: '../record/edit?record=' + recordID,
    // })
  },
  removeActionTap: function(e) {
    const recordID = e.currentTarget.dataset.index
    
    var records = this.data.records
    records.splice(recordID, 1);
    this.setData({
      records: records,
      // onAddingAction: false,
    })
    wx.setStorageSync('records', records)
  },
  // default actions
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
