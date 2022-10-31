<template>
  <div id="space" ref="space"></div>
</template>

<script>
// 空间系
// import * as THREE from 'three'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
export default {
  data() {
    return {
      axiesLength: 800,
      cylinderList: [
        {
          id: null,
          data: [],
        },
      ],
    }
  },
  computed: {
    meshList() {
      this.cylinderList.map((item) => {})
    },
  },
  methods: {
    renderInit() {
      let space = this.$refs.space
      /**
       * 创建场景对象Scene
       */
      this.scene = new THREE.Scene()

      /**
       * 相机设置
       */
      let width = space.offsetWidth //窗口宽度
      let height = space.offsetHeight //窗口高度
      let k = width / height //窗口宽高比
      let s = 800 //三维场景显示范围控制系数，系数越大，显示的范围越大
      //创建相机对象
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      this.camera.position.set(-300, -300, 300) //设置相机位置
      this.camera.up.x = 0
      this.camera.up.y = 0
      this.camera.up.z = 1

      this.camera.lookAt(this.scene.position) //设置相机方向(指向的场景对象)
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
      this.renderer.setSize(width, height) //设置渲染区域尺寸
      // this.renderer.setClearColor(0xb9d3ff, 1) //设置背景颜色
      space.appendChild(this.renderer.domElement) //body元素中插入canvas对象
      //执行渲染操作   指定场景、相机作为参数

      /**
       * 创建控制器控件
       */
      var controls = new OrbitControls(this.camera, this.renderer.domElement)
      controls.enableZoom = false // 禁止缩放
      controls.enablePan = false //禁止平移
      // controls.enableRotate = false //禁止旋转

      /*       controls.maxDistance = 1.5 // 最大缩放值
      controls.minDistance = 1 // 最小缩放值 */

      // 给控制器添加事件，不要通过定时器来实现交互，可以极大的优化性能
      controls.addEventListener('change', () => {
        this.renderer.render(this.scene, this.camera)
      })

      /**
       * 黑色材质
       */
      let blackMetirial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        linewidth: 10,
      })

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
      // gridXY.rotation.x = Math.PI / 2
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
      console.log(blackAxes)
      let blackAxesLine = new THREE.Line(blackAxes, blackMetirial)
      this.scene.add(blackAxesLine)

      /**
       * 创建坐标模型
       *
       */
      // TODO 辅助
      let axes = new THREE.AxesHelper(this.axiesLength)
      // axes.rotation.x -= Math.PI / 2
      axes.setColors(0xff0000, 0x00ff00, 0x0000ff)
      this.scene.add(axes)
      // TODO 坐标刻度
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
          -textE.parameters.options.size,
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
        let textMeshN = new THREE.Mesh(textN, blackMetirial)
        textMeshN.position.set(
          textN.parameters.options.size,
          (this.axiesLength / 2) * 1.5,
          0
        )
        this.scene.add(textMeshN)
      })

      /**
       * 光源设置
       */
      //点光源
      let point = new THREE.PointLight(0xffffff)
      point.position.set(400, 200, 300) //点光源位置
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
    draw(x, y, z, rotate1, rotate2) {
      let geometry = new THREE.CylinderGeometry(15, 15, 40, 40, 40)
      let material = new THREE.MeshLambertMaterial({
        color: 0x000000,
      })
      let cylinder = new THREE.Mesh(geometry, material) //网格模型对象Mesh
      cylinder.position.x = x
      cylinder.position.y = y
      cylinder.position.z = z
      this.scene.add(cylinder) //网格模型添加到场景中
    },
  },
  mounted() {
    this.renderInit()
    this.$bus.$on('drawCylinder', this.draw)
  },
}
</script>

<style>
#space {
  width: 100%;
  height: 600px;
  background-color: #eeeeee;
  display: flex;
  align-items: center;
}
</style>
