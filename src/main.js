//JS文件入口
import Vue from 'vue'
//导入vue-router的包
import VueRouter from 'vue-router'
//导入vue-resource
import VueResource from 'vue-resource'
//导入vuex
import Vuex from 'vuex'
//引入vue-preview
import VuePreview from 'vue-preview'
//安装vue-preview
Vue.use(VuePreview)
//手动安装Vuex
Vue.use(Vuex)
//手动安装VueRouter
Vue.use(VueRouter)
Vue.use(VueResource)
//导入mint-ui样式文件
import 'mint-ui/lib/style.css'
//导入mui文件
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import router from './router/router.js'
import app from './App.vue'

//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(datastr, pattern="YYYY-MM-DD hh:mm:ss"){
    return moment(datastr).format(pattern)
})

//每次进入网站，从本地获取购物车信息
var car = JSON.parse(localStorage.getItem('car') || '[]');

//创建一个状态管理模式
var store = new Vuex.Store({
  state: {
    car:car //将购物车中的商品数据，用一个数组存储起来，设计成{id:商品id, count: 购买数量, price: 商品价格, selected: false  选泽状态}
  },
  mutations:{
    //点击添加购物车，将购物车信息保存进store里面
    addToCar(state, goodsinfo){
      var flag = false;     //判断car中存不存在该商品，默认不存在
      //在store里的car数组里找到该商品，则不添加新商品信息，其数量增加
      state.car.some(item =>{
        if(item.id == goodsinfo.id){
          flag = true;
          item.count += parseInt(goodsinfo.count);
          return true;
        }
      });
      //如果不存在该商品，将新商品添加进car中
      if(!flag){
        state.car.push(goodsinfo);
      }
      //当car更新后，将car数组 存储到本地 localStorage中
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    //修改购物车商品数量
    updatedCount(state, data) {
      state.car.some(item =>{
        if(item.id == data.id){
          item.count = parseInt(data.count);
          return true;
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    //删除商品
    delGoods(state, id){
      state.car.some((item, i) =>{
        if(item.id == id){
          state.car.splice(i,1);
          return true;
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    // 改变商品选泽状态
    updatedSelected(state, id){
      state.car.some(item =>{
        if(item.id == id){
          item.selected = !item.selected;
          localStorage.setItem('car', JSON.stringify(state.car));
          return true;
        }
      })
    }
  },
  getters:{
    //获得商品总数量
    getCounts(state){
      var c = 0;
      state.car.forEach(item =>{
        c += item.count;
      });
      return c;
    },
    //获得购物车所有信息
    getGoods(state){
      return state.car;
    },
    //获得各个商品的个数，并存进count中
    getInitCount(state){
      var count = {};
      state.car.forEach(item =>{
        count[item.id] = item.count;
      });
      return count;
    },
     // 获取选中状态
     getSelected(state, id){
       var c = [];
      state.car.forEach(item =>{
          c[item.id] = item.selected;
        })
      return c;
    },
    // 获得选中商品个数和价格
    getCheckedMessage(state){
      var c ={
        count: 0, //选中个数
        money: 0  //选中商品总价格
      }
      state.car.forEach(item =>{
        if(item.selected == true){
          c.count += item.count;
          c.money += item.price;
        }
      })
      return c;
    }
  }
})

//全局配置数据接口根路径
Vue.http.options.root='http://www.liulongbin.top:3005/';
Vue.http.options.emulateJSON = true;

//引入mint-ui组件
// import { Header,Tabbar, TabItem,Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Tabbar.name, Tabbar);
// Vue.component(TabItem.name, TabItem);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
import { stat } from 'fs';



/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  render: c=>c(app),
  //把路由加载进去
  router,
  store   //将vuex创建的store挂载到VM实例上
})
