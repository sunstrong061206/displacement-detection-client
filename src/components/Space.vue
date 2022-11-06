<template>
  <div class="domain" id="space" ref="space"></div>
</template>

<script>
// 空间系

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

/**
 * 黑色材质
 */
let blackMetirial = new THREE.MeshBasicMaterial({
  color: 0x000000,
})
export default {
  data() {
    return {
      axiesLength: 1000,
      cylinderMeshList: [],
    }
  },
  methods: {
    initCarema() {
      /**
       * 相机设置
       */
      let space = this.$refs.space
      let k = space.offsetWidth / space.offsetHeight //窗口宽高比
      let s = 1200 //三维场景显示范围控制系数，系数越大，显示的范围越大
      //创建相机对象
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      this.camera.position.set(-300, -300, 300) //设置相机位置
      this.camera.up.x = 0
      this.camera.up.y = 0
      this.camera.up.z = 1
      this.camera.lookAt(this.scene.position) //设置相机方向(指向的场景对象)
    },
    initRenderer() {
      /**
       * 创建渲染器对象
       */
      this.renderer = new THREE.WebGLRenderer({
        // 着色精度
        precision: 'highp',
        alpha: true,
        // 抗锯齿
        antialias: true,
        powerPreference: 'high-performance',
      })
      this.renderer.setSize(space.offsetWidth, space.offsetHeight) //设置渲染区域尺寸
      // this.renderer.setClearColor(0xb9d3ff, 1) //设置背景颜色
      space.appendChild(this.renderer.domElement) //body元素中插入canvas对象
      //执行渲染操作   指定场景、相机作为参数
    },
    initController() {
      /**
       * 创建控制器控件
       */
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableZoom = false // 禁止缩放
      this.controls.enablePan = false //禁止平移
      // this.controls.enableRotate = false //禁止旋转

      /*       this.controls.maxDistance = 1.5 // 最大缩放值
      this.controls.minDistance = 1 // 最小缩放值 */

      // 给控制器添加事件，不要通过定时器来实现交互，可以极大的优化性能
      this.controls.addEventListener('change', () => {
        this.renderer.render(this.scene, this.camera)
      })
    },
    initGrid() {
      /**
       * 创建网格模型
       */
      this.mesh = new THREE.Mesh() //网格模型对象Mesh
      this.scene.add(this.mesh) //网格模型添加到场景中

      // 网格模型
      let gridXY = new THREE.GridHelper(
        this.axiesLength,
        20,
        0xf8dd9c,
        0xcccccc
      )
      gridXY.position.set(0, 0, 0)
      gridXY.rotation.x = Math.PI / 2
      this.mesh.add(gridXY)

      let gridYZ = new THREE.GridHelper(
        this.axiesLength,
        20,
        0xcccccc,
        0xcccccc
      )
      gridYZ.position.set(0, this.axiesLength / 2, this.axiesLength / 2)
      this.mesh.add(gridYZ)
      let gridXZ = new THREE.GridHelper(
        this.axiesLength,
        20,
        0xcccccc,
        0xcccccc
      )
      gridXZ.position.set(this.axiesLength / 2, 0, this.axiesLength / 2)
      gridXZ.rotation.z = Math.PI / 2
      this.mesh.add(gridXZ)
    },
    // TODO 辅助测试
    initAxes() {
      /**
       * 创建坐标模型
       *
       */
      let axes = new THREE.AxesHelper(this.axiesLength)
      // axes.rotation.x -= Math.PI / 2
      axes.setColors(0xff0000, 0x00ff00, 0x0000ff)
      this.scene.add(axes)
    },
    initScale() {
      /**
       * 创建刻度模型，明确坐标方向，指定坐标范围
       */
      let fontLoader = new FontLoader()
      fontLoader.load('optimer_regular.typeface.json', (font) => {
        // 文字 东 E
        let textE = new TextGeometry('W', {
          font: font,
          size: 100,
          height: 10,
          curveSegments: 4,
          bevelEnabled: true,
          bevelThickness: 10,
          bevelSize: 8,
          bevelSegments: 5,
        })

        let textMeshE = new THREE.Mesh(textE, blackMetirial)
        textMeshE.position.set(
          (-this.axiesLength / 2) * 1.5,
          -textE.parameters.options.size / 2,
          0
        )
        this.scene.add(textMeshE)

        let textN = new TextGeometry('N', {
          font: font,
          size: 100,
          height: 10,
          curveSegments: 4,
          bevelEnabled: true,
          bevelThickness: 10,
          bevelSize: 8,
          bevelSegments: 5,
        })
        let textNMesh = new THREE.Mesh(textN, blackMetirial)
        textNMesh.position.set(
          -textN.parameters.options.size / 2,
          (this.axiesLength / 2) * 1.25,
          0
        )
        this.scene.add(textNMesh)

        // x坐标刻度
        let xOrigin = new TextGeometry(String(0), {
          font: font,
          size: 50,
          height: 10,
          curveSegments: 4,
        })
        let xOriginMesh = new THREE.Mesh(xOrigin, blackMetirial)
        xOriginMesh.position.set(
          -xOrigin.parameters.options.size / 2,
          -(this.axiesLength / 2) * 1.2,
          0
        )
        this.scene.add(xOriginMesh)

        let xMax = new TextGeometry(String(this.axiesLength / 2), {
          font: font,
          size: 50,
          height: 10,
          curveSegments: 4,
        })
        let xMaxMesh = new THREE.Mesh(xMax, blackMetirial)
        xMaxMesh.position.set(
          this.axiesLength / 2 - xMax.parameters.options.size / 2,
          -(this.axiesLength / 2) * 1.2,
          0
        )
        this.scene.add(xMaxMesh)

        let xMin = new TextGeometry(String(-this.axiesLength / 2), {
          font: font,
          size: 50,
          height: 10,
          curveSegments: 4,
        })
        let xMinMesh = new THREE.Mesh(xMin, blackMetirial)
        xMinMesh.position.set(
          -this.axiesLength / 2 - xMin.parameters.options.size,
          -(this.axiesLength / 2) * 1.2,
          0
        )
        this.scene.add(xMinMesh)

        // y坐标刻度
        let yMax = new TextGeometry(String(this.axiesLength / 2), {
          font: font,
          size: 50,
          height: 10,
          curveSegments: 4,
        })
        yMax.rotateZ(-Math.PI / 4)
        let yMaxMesh = new THREE.Mesh(yMax, blackMetirial)
        yMaxMesh.position.set(
          (-this.axiesLength / 2) * 1.3,
          this.axiesLength / 2,
          0
        )
        this.scene.add(yMaxMesh)

        let yMin = new TextGeometry(String(-this.axiesLength / 2), {
          font: font,
          size: 50,
          height: 10,
          curveSegments: 4,
        })
        yMin.rotateZ(-Math.PI / 4)
        let yMinMesh = new THREE.Mesh(yMin, blackMetirial)
        yMinMesh.position.set(
          (-this.axiesLength / 2) * 1.3,
          -this.axiesLength / 2 + yMin.parameters.options.size / 2,
          0
        )
        this.scene.add(yMinMesh)

        // z坐标刻度
        let zMax = new TextGeometry(String(this.axiesLength / 2), {
          font: font,
          size: 50,
          height: 10,
          curveSegments: 4,
        })
        let zMaxMesh = new THREE.Mesh(zMax, blackMetirial)
        zMaxMesh.position.set(
          (-this.axiesLength / 2) * 1.25,
          (this.axiesLength / 2) * 1.05,
          this.axiesLength - zMax.parameters.options.size / 2
        )
        zMax.rotateX(Math.PI / 2)
        this.scene.add(zMaxMesh)

        let zMid = new TextGeometry(String(this.axiesLength / 2), {
          font: font,
          size: 50,
          height: 10,
          curveSegments: 4,
        })
        let zMidMesh = new THREE.Mesh(zMid, blackMetirial)
        zMidMesh.position.set(
          (-this.axiesLength / 2) * 1.25,
          (this.axiesLength / 2) * 1.05,
          this.axiesLength / 2 - zMid.parameters.options.size / 2
        )
        zMid.rotateX(Math.PI / 2)
        this.scene.add(zMidMesh)

        let zMin = new TextGeometry(String(0), {
          font: font,
          size: 50,
          height: 10,
          curveSegments: 4,
        })
        let zMinMesh = new THREE.Mesh(zMin, blackMetirial)
        zMinMesh.position.set(
          (-this.axiesLength / 2) * 1.15,
          (this.axiesLength / 2) * 1.05,
          zMin.parameters.options.size / 2
        )
        zMin.rotateX(Math.PI / 2)
        this.scene.add(zMinMesh)
      })
    },
    threeInit() {
      /**
       * 创建场景对象Scene
       */
      this.scene = new THREE.Scene()

      this.initCarema()
      this.initRenderer()
      this.initController()
      this.initGrid()

      // TODO 辅助测试-修改
      // this.initAxes()

      /**
       * 画线，明确坐标轴x,y,z
       */
      let blackAxes = new THREE.BufferGeometry()
      let pointsArray = []
      pointsArray.push(
        new THREE.Vector3(this.axiesLength / 2, -this.axiesLength / 2, 0),
        new THREE.Vector3(-this.axiesLength / 2, -this.axiesLength / 2, 0),
        new THREE.Vector3(-this.axiesLength / 2, this.axiesLength / 2, 0),
        new THREE.Vector3(
          -this.axiesLength / 2,
          this.axiesLength / 2,
          this.axiesLength
        )
      )
      blackAxes.setFromPoints(pointsArray)
      let blackAxesLine = new THREE.Line(blackAxes, blackMetirial)
      this.scene.add(blackAxesLine)

      this.initScale()

      /**
       * 光源设置
       */
      //点光源
      let point = new THREE.PointLight(0xffffff)
      point.position.set(...this.camera.position) //点光源位置
      this.scene.add(point) //点光源添加到场景中
      //环境光
      let ambient = new THREE.AmbientLight(0x444444)
      this.scene.add(ambient)

      this.render()
    },
    render() {
      // 当浏览器空闲，就不断调用传入的函数
      requestAnimationFrame(this.render)
      /* this.scene.rotation.x += 0.02 // 围绕 x 轴旋转
      this.scene.rotation.y += 0.02 // 围绕 y 轴旋转 */
      // 通过场景和相机，把最终显示的东西渲染出来，渲染到 renderer.domElement 上
      this.renderer.render(this.scene, this.camera)
    },
    // (x,y,z)为圆柱体几何中心的坐标，方位角，旋转角
    drawCylinderList(arr, index) {
      this.cylinderMeshList.forEach((cylinderMesh) => {
        this.scene.remove(cylinderMesh)
      })
      this.cylinderMeshList = []
      arr.forEach(
        ({
          xPosition,
          yPosition,
          zPosition,
          inclinationAngle,
          azimuthAngle,
        }) => {
          inclinationAngle = (inclinationAngle * Math.PI) / 180
          azimuthAngle = (azimuthAngle / 180) * Math.PI
          let cylinder = new THREE.CylinderGeometry(50, 50, 100, 40, 40)
          cylinder.rotateX(Math.PI / 2) // 先立起来
          let material = new THREE.MeshLambertMaterial({
            color: 0xff8066,
          })
          let cylinderMesh = new THREE.Mesh(cylinder, material) //网格模型对象Mesh
          cylinderMesh.position.x = xPosition
          cylinderMesh.position.y = yPosition
          cylinderMesh.position.z = zPosition
          cylinderMesh.rotateOnAxis(
            new THREE.Vector3(
              Math.cos(inclinationAngle),
              Math.sin(inclinationAngle),
              0
            ),
            azimuthAngle
          )
          this.cylinderMeshList.push(cylinderMesh)
          this.scene.add(cylinderMesh) //网格模型添加到场景中
        }
      )
    },
    resetCamera() {
      this.controls.reset()
    },
  },
  mounted() {
    this.threeInit()
    this.$bus.$on('drawCylinderList', this.drawCylinderList)
    this.$bus.$on('resetCamera', this.resetCamera)
  },
}
</script>

<style>
.domain {
  width: 100%;
  height: 97%;
}
</style>
