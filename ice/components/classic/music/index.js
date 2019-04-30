// components/classic/music/index.js
import {
  classicBeh
} from '../classic_beh.js'
// const bam = wx.getBackgroundAudioManager()
const bam = wx.getBackgroundAudioManager()

Component({
  /**
   * Component properties
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  /**
   * Component initial data
   */
  data: {
    isPlay: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  attached() {
    this._recoverStatus()
    this._monitorSwitch()
  },

  /**
   * Component methods
   */
  methods: {
    onPlay() {
      if (!this.data.isPlay) {
        bam.title = this.properties.title
        // bam.epname = '此时此刻'
        // bam.singer = '许巍'
        bam.src = this.properties.src
        this.setData({
          isPlay: true
        })
      } else {
        bam.pause()
        this.setData({
          isPlay: false
        })
      }
    },
    _recoverStatus() {
      if (bam.paused) {
        this.setData({
          isPlay: false
        })
        return
      }
      if (bam.src === this.properties.src) {
        this.setData({
          isPlay: true
        })
      }
    },
    _monitorSwitch(){
      bam.onPlay(()=>{
        this._recoverStatus()
      })
      bam.onPause(()=>{
        this._recoverStatus()
      })
      bam.onStop(()=>{
        this._recoverStatus()
      })
      bam.onEnded(()=>{
        this._recoverStatus()
      })
    }
  }
})