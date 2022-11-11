<template>
  <div class="wrap">
    <div class="nav">
      <div class="btn">
        <div class="btn-item"></div>
      </div>
      <div class="icon">
        <div class="icon-img">
          <img src="@/assets/avatar.jpg" style="height: 450px" alt="icon-img" />
        </div>
        <div class="icon-con">
          <h2>Admin</h2>
        </div>
      </div>
      <div class="line"></div>
      <div class="title">
        <p>实时</p>
      </div>
      <div class="current">
        <div class="item" @click="connect">
          <div class="light"></div>
          <div class="licon">
            <span class="iconfont icon-connect"></span>
          </div>
          <div class="con">连接</div>
          <div class="ricon"></div>
        </div>

        <div class="item">
          <div class="light"></div>
          <div class="licon">
            <span class="iconfont icon-xitongzhuangtai"></span>
          </div>
          <div class="con">状态</div>
          <div class="ricon"></div>
        </div>

        <div class="item" @click="stop">
          <div class="light"></div>
          <div class="licon">
            <span class="iconfont icon-jieshu"></span>
          </div>
          <div class="con">停止</div>
          <div class="ricon"></div>
        </div>
      </div>
      <div class="line"></div>
      <div class="title">
        <p>查询</p>
      </div>
      <div class="serve">
        <div class="item">
          <div class="light"></div>
          <div class="licon">
            <span class="iconfont icon-querylist"></span>
          </div>
          <div class="con">查询</div>
          <div class="ricon">
            <span class="iconfont icon-24gl-calendar"></span>
          </div>
        </div>
      </div>

      <div class="line"></div>
      <div class="title">
        <p>控制</p>
      </div>
      <div class="serve">
        <div class="item" @click="reset">
          <div class="light"></div>
          <div class="licon">
            <span class="iconfont icon-Reset-Settings"></span>
          </div>
          <div class="con">复位</div>
          <div class="ricon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Dash Board 操作面板
 */
import { FakeAPI } from '@/api/request.js'
import addr from '../../config/addr.js'
export default {
  data() {
    return {
      // 0：断开，1：连接中，-1：查询状态
      status: 0,
    }
  },
  /*   computed: {
    lightColor() {
      if (this.status === 0) {
        return '#eb5a56'
      } else if (this.status === 1) {
        return '#62cb44'
      } else return '#f8bc33'
    },
  }, */
  methods: {
    socketOnOpen() {
      this.status = 1
      this.addCylinderGeometry()
      if (this.connectInstance) this.connectInstance.close()
      this.connectInstance = this.$notify({
        message: '连接建立成功',
        type: 'success',
        position: 'bottom-left',
      })
      document
        .getElementsByTagName('body')[0]
        .style.setProperty('--themeColor', '#62cb44')
    },
    socketOnMessage(mes) {
      console.log(mes)
    },
    socketOnClose() {
      if (this.status !== 0) {
        if (this.tempInstance) this.tempInstance.close()
        if (this.stopInstance) this.stopInstance.close()
        this.stopInstance = this.$notify({
          message: '连接断开成功',
          type: 'success',
          position: 'bottom-left',
        })
      }

      this.status = 0
      document
        .getElementsByTagName('body')[0]
        .style.setProperty('--themeColor', '#eb5a56')
    },
    connect() {
      if (this.status === 1) {
        if (this.connectInstance) this.connectInstance.close()
        this.connectInstance = this.$notify({
          message: '不可以重复连接',
          type: 'warning',
          position: 'bottom-left',
        })
        return
      }
      // 建立WebSocket连接
      this.socket = new WebSocket(
        `${addr.WEBSOCKET_ADDR}1e9789be-2749-4b50-aa8d-b1bba226a83f`
      )
      this.socket.onopen = this.socketOnOpen
      this.socket.onclose = this.socketOnClose
    },
    stop() {
      if (this.status !== 1) return
      if (this.tempInstance) this.tempInstance.close()
      this.tempInstance = this.$notify({
        message: '连接正在断开...',
        type: 'info',
        position: 'bottom-left',
      })
      this.socket.close()
    },
    // 模拟数据
    addCylinderGeometry() {
      FakeAPI().then((resp) => {
        console.log('resp', resp)
        if (resp.data.type === 8) {
          this.$bus.$emit('drawCylinderList', resp.data.value.result.data)
          this.$bus.$emit('updateInfoTable', resp.data.value.result.data)
        }
      })
    },
    reset() {
      this.$bus.$emit('resetCamera')
    },
  },
  beforeDestroy() {
    this.socket.close()
  },
}
</script>

<style lang="scss" scoped>
$themeColor: var(--themeColor, #eb5a56);
.wrap {
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.6);
}

.nav {
  /* width:280px; */
  width: 110px;
  height: 615px;
  background: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  border-radius: 20px;
  transition: 0.5s;
}

.nav:hover {
  width: 280px;
}

.btn {
  width: 60px;
  height: 10px;
  display: flex;
  justify-content: space-around;
  margin-left: 25px;
  margin-top: 25px;
}

.btn-item {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  // background-color: #eb5a56;
  background: $themeColor;
}

.icon {
  width: 250px;
  height: 60px;
  margin-left: 25px;
  margin-top: 20px;
  display: flex;
}

.icon-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.3);
}
.icon-img img {
  width: 100%;
  height: 100% !important;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}
.icon-con {
  height: 60px;
  margin-left: 20px;
}

.icon-con p {
  padding-top: 5px;
}

.icon-con h2 {
  font-weight: 400;
}

.line {
  width: 60px;
  height: 1px;
  background: rgba(255, 255, 255, 0.6);
  margin: 20px 25px;
  transition: 0.5s;
}

.nav:hover .line {
  width: 230px;
}

.title {
  width: 60px;
  margin-left: 25px;
  margin-bottom: 15px;
  font-size: 14px;
}

.current {
  width: 230px;
  margin-left: 25px;
}

.item {
  display: flex;
  position: relative;
  transition: 0.5s;
  border-radius: 6px;
  cursor: pointer;
}

.item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.licon {
  width: 60px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.con {
  width: 0;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  overflow: hidden;
  position: relative;
  left: -20px;
  opacity: 0;
}

.nav:hover .con {
  width: 160px;
  opacity: 1;
}

.ricon {
  width: 0;
  height: 50px;
  transition: 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  opacity: 0;
}

.nav:hover .ricon {
  width: 60px;
  opacity: 1;
}

.iconfont {
  font-size: 26px;
}

.ricon .iconfont {
  font-size: 20px;
  color: #62cb44;
}

.light {
  width: 6px;
  height: 50px;
  background: $themeColor;
  // background: #eb5a56;
  position: absolute;
  left: -25px;
  transition: 0.5s;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  opacity: 0;
}
.item:hover .light {
  opacity: 1;
}

.serve {
  width: 60px;
  background: rgba(0, 0, 0, 0.7);
  margin-left: 25px;
  border-radius: 10px;
  /* overflow: hidden; */
  transition: 0.5s;
}

.nav:hover .serve {
  width: 230px;
}
</style>
