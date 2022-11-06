<template>
  <div>
    <button @click="reset">请求结果</button>
    <button @click="reset">查询结果</button>
    <button @click="reset">停止</button>
    <button @click="addCylinderGeometry">查询状态</button>
    <button @click="reset">复位</button>

    <div class="wrap">
      <div class="nav">
        <div class="btn">
          <div
            class="btn-item"
            :style="{ backgroundColor: this.lightColor }"
          ></div>
        </div>
        <div class="icon">
          <div class="icon-img">
            <img
              src="@/assets/avatar.jpg"
              style="height: 450px"
              alt="icon-img"
            />
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
          <div class="item">
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

          <div class="item">
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
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Dash Board 操作面板
 */
import { FakeAPI } from '@/api/request.js'
export default {
  data() {
    return {
      // 0：断开，1：连接中，-1：查询状态
      status: 0,
    }
  },
  computed: {
    lightColor() {
      if (this.status === 0) {
        return '#eb5a56'
      } else if (this.status === 1) {
        return '#62cb44'
      } else return '#f8bc33'
    },
  },
  methods: {
    addCylinderGeometry() {
      FakeAPI().then((resp) => {
        this.$bus.$emit('drawCylinderList', resp.data.value.result.data)
      })
    },
    reset() {
      this.$bus.$emit('resetCamera')
    },
  },
}
</script>

<style scoped>
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
  height: 490px;
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
  /* background-color: #eb5a56; */
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
  background: #eb5a56;
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
