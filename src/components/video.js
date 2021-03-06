/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

function getVideo (weex) {
  const {
    extractComponentStyle,
    mapNativeEvents
  } = weex
  const { dispatchNativeEvent } = weex.utils

  return {
    name: 'weex-video',
    props: {
      src: String,
      playStatus: {
        type: String,
        default: 'pause',
        validator (value) {
          return ['play', 'pause'].indexOf(value) !== -1
        }
      },
      autoplay: {
        type: [String, Boolean],
        default: false
      },
      autoPlay: {
        type: [String, Boolean],
        default: false
      },
      playsinline: {
        type: [String, Boolean],
        default: true
      },
      controls: {
        type: [String, Boolean],
        default: false
      }
    },

    render (createElement) {
      if (this.playStatus === 'play') {
        this.$nextTick(function () {
          try {
            this.$el && this.$el.play()
          }
          catch (err) {
            dispatchNativeEvent(this && this.$el, 'error', {
              message: err.message
            })
          }
        })
      }
      else if (this.playStatus === 'pause') {
        this.$nextTick(function () {
          this.$el && this.$el.pause()
        })
      }

      return createElement('html:video', {
        attrs: {
          'weex-type': 'video',
          autoplay: ((this.autoplay !== 'false' && this.autoplay !== false)
            || (this.autoPlay !== 'false' && this.autoPlay !== false)),
          'webkit-playsinline': this.playsinline,
          controls: this.controls,
          src: this.src
        },
        on: mapNativeEvents(this, {
          play: 'start',
          error: 'fail'
        }),
        staticClass: 'weex-video weex-el',
        staticStyle: extractComponentStyle(this)
      })
    }
  }
}

export default {
  init (weex) {
    weex.registerComponent('video', getVideo(weex))
  }
}
