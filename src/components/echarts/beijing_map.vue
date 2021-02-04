<template>
  <dash_play_window v-for="camera of all_cameras" :key="camera"
                    :cam="camera"
                    :ref="el => player_windows.push(el)"
                    v-bind="$attrs"></dash_play_window>
  <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
import dash_play_window from "@/components/dash_play_window";

import 'echarts-gl'
import { GeoHash } from "@/geohash_tool";
import { ElMessage } from 'element-plus';

export default {
  name: "beijing_map",
  props: {
    all_cameras: Object
  },
  components: {
    dash_play_window,
  },
  inheritAttrs: false,
  data() {
    return {
      myChart: null,
      cameras: null,
      player_windows: [],
      option: {
        backgroundColor: '#f3f6f8',
        geo3D: {
          map: 'yx',
          show: false,
          zlevel: -10,
          boxWidth: 200,
          boxHeight: 4, //4:没有bar. 30:有bar,bar最高度30，按比例分配高度
          regionHeight: 3,
          shading: 'lambert',


          viewControl: {
            projection: 'perspective',
            autoRotate: false,
            damping: 0,
            rotateSensitivity: 2, //旋转操作的灵敏度
            rotateMouseButton: 'left', //旋转操作使用的鼠标按键
            zoomSensitivity: 2, //缩放操作的灵敏度
            panSensitivity: 2, //平移操作的灵敏度
            panMouseButton: 'right', //平移操作使用的鼠标按键

            distance: 200, //默认视角距离主体的距离
            center: [0, -25, 0],

            animation: true,
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'cubicInOut'
          },
        },

        series: [
          {
            type: 'map3D',
            map: 'yx',
            show: true,
            zlevel: 1,
            boxWidth: 200,
            //boxHeight: 4, //4:没有bar. 30:有bar,bar最高度30，按比例分配高度
            regionHeight: 3,
            shading: 'lambert',
            label: { // 标签的相关设置
              show: false,
            },

            itemStyle: {
              color:'#025894',
              areaColor: '#025894',
              opacity: 1,
              borderWidth: 1,
              borderColor: '#1cccff'
            },
            emphasis: {
              label: {
                show: false,

                textStyle: {
                  color: '#fff',
                  fontSize: 14,
                  backgroundColor: 'transparent' // 字体背景色
                }
              },
              borderColor: '#333',
              borderWidth: 5,
              itemStyle: {
                color:'#025894',
                areaColor: '#025894',
              }
            },
            light: {
              main: {
                shadow: true,
                shadowQuality: 'ultra',
              },

            },
            viewControl: {
              projection: 'perspective',
              autoRotate: false,
              damping: 0,
              rotateSensitivity: 2, //旋转操作的灵敏度
              rotateMouseButton: 'left', //旋转操作使用的鼠标按键
              zoomSensitivity: 2, //缩放操作的灵敏度
              panSensitivity: 2, //平移操作的灵敏度
              panMouseButton: 'right', //平移操作使用的鼠标按键

              distance: 200, //默认视角距离主体的距离
              center: [0, -25, 0],

              animation: true,
              animationDurationUpdate: 1000,
              animationEasingUpdate: 'cubicInOut'
            },
            data: [],
          },
          {
            type: 'scatter3D',
            coordinateSystem: 'geo3D',
            zlevel: 3,
            symbol: 'path://m232.99844,160.209511l15.863519,0l0,-14.211071l16.27296,0l0,14.211071l15.863521,0l0,14.577861l-15.863521,0l0,14.211069l-16.27296,0l0,-14.211069l-15.863519,0l0,-14.577861z',
            //symbol: 'circle',
            symbolSize: 16,

            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{b}',

                textStyle: {
                  color: '#fff',
                  fontSize: 14,
                  backgroundColor: 'transparent' // 字体背景色
                },

              }
            },

            data: [
              {
                name: "DataCenter",
                value: [116.73266347484265, 40.09792531288059, 2]
              },
            ],
            itemStyle: { //坐标点颜色
              color: '#ff0000',
              shadowBlur: 20,
              shadowColor: '#fff'
            },
            emphasis: {
              itemStyle: { //坐标点颜色
                color: '#1ca1d2',
              },
            }
          },
          {
            type: 'scatter3D',
            coordinateSystem: 'geo3D',
            zlevel: 2,
            symbol: 'none',
            symbolSize: 16,

            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: '{b}',

                textStyle: {
                  color: '#1ca1d2',
                  fontSize: 13,
                  backgroundColor: 'transparent' // 字体背景色
                },
              }
            },

            data: [
        {
          name: "东城",
          value: [116.424697,39.927967, 2],
        },
        {
          name: "西城",
          value: [116.358141,39.913919, 2]
        },
        {
          name: "朝阳",
          value: [116.765487,40.136573, 2]
        },
        {
          name: "丰台",
          value: [116.290679,39.857184, 2]
        },
        {
          name: "石景山",
          value: [116.17672,39.949198, 2]
        },
        {
          name: "海淀",
          value: [116.177807,40.062966, 2]
        },
        {
          name: "门头沟",
          value: [115.905234,40.010063, 2]
        },
        {
            name: "房山",
            value: [115.941902,39.708825, 2]
        },
        {
            name: "通州",
            value: [116.747351,39.814339, 2]
        },
        {
            name: "顺义",
            value: [116.737316,40.137897, 2]
        },
        {
            name: "昌平",
            value: [116.226118,40.225311, 2]
        },
        {
            name: "大兴",
            value: [116.402095,39.655493, 2]
        },
        {
            name: "怀柔",
            value: [116.621138,40.432762, 2]
        },
        {
            name: "平谷",
            value: [117.117604,40.192158, 2]
        },
        {
            name: "密云",
            value: [117.065719,40.500122, 2]
        },
        {
          name: "延庆",
          value: [116.016705,40.507607, 2]
        }
      ],
            itemStyle: { //坐标点颜色
              color: '#0ac1ef',
              shadowBlur: 20,
              shadowColor: '#fff'
            },
            emphasis: {
              itemStyle: { //坐标点颜色
                color: '#f00',
              },
            }
          },

          // 线 和 点
          {
            type: 'lines3D',
            coordinateSystem: 'geo3D',
            zlevel: 1, //设置这个才会有轨迹线的小尾巴
            polyline: false,
            effect: {
              show: true,
              period: 10,
              trailLength: 0.1,
              trailColor: '#17eafe',
              color: '#fff', //流动点颜色
              symbol: 'arrow',
              symbolSize: 6
            },
            lineStyle: {
              normal: {
                color: '#fff', //线条颜色
                width: 1,
                curveness: 0.5,
                shadowColor: '#fff',
              }
            },
            blendMode: 'lighter',
            data: [
              // {
              //   fromName: "卫校附设医院",
              //   toName: "黄安卫生院",
              //   coords: [
              //     [107.554558, 33.21843, 1],
              //     [107.61841747885131, 33.1884481733651, 1],
              //   ]
              // },
              // {
              //   fromName: "卫校附设医院",
              //   toName: "溢水卫生院",
              //   coords: [
              //     [107.554558, 33.21843, 1],
              //     [107.4494698095093, 33.25498544659004, 1]
              //   ]
              // },
            ],
          },
        ]
      }
    }
  },
  watch: {
    all_cameras(new_object, old_object) {
      console.log(old_object)
      this.cameras = new_object
    }
  },
  methods: {
    bar3D(geoJson) {
      let MapData = []
      let geohash_list = []
      let myChart = this.$echarts.init(document.getElementById("myChart"))
      let windows = this.player_windows
      this.myChart = myChart
      this.$echarts.registerMap('yx', geoJson)

      // 写入要显示的数据
      for (let camera of this.all_cameras) {
        let values = this.decode_geohash(camera.geohash)
        geohash_list.push(camera.geohash)
        values.push(2)
        MapData.push({
          name: camera.geohash,
          value: values
        })
      }
      this.option.series[1].data.push.apply(this.option.series[1].data, MapData)

      myChart.setOption(this.option)
      myChart.on('click', function (params) {
        for (let dom of windows) {
          if (dom.cam.geohash === params.name) {
            let index = geohash_list.indexOf(dom.cam.geohash)
            if (index !== -1) {
              if (dom.cam.online) {
                dom.show_popup()
              }else {
                // 弹出不在线警告
                ElMessage.warning({
                  message: "此监控不在线",
                  type: "warning"
                });
              }
              break
            }
          }
        }
        console.log(params.name)
      })
    },
    decode_geohash(geohash) {
      // 由geohash得到经纬度
      let res = GeoHash.decodeGeoHash(geohash)
      return [res.longitude, res.latitude]
    },
  },
  updated() {
    // TODO:把更多的代码从.then中拿出去
    this.$axios.get('/beijing.json')
        .then((json) => {
          this.bar3D(json.data)
        })
        .catch(err => {
          console.log(err)
        })
  }
}
</script>

<style scoped>

</style>