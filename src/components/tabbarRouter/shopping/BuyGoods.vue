<template>
    <div class="goods-container">
        <!-- 商品图片轮播图 -->
       <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-swipe :auto="2000">
                            <mt-swipe-item v-for="item in lunbolist" :key="item.src">
                                <img :src="item.src" alt="">
                            </mt-swipe-item>
                        </mt-swipe>
					</div>
				</div>
			</div>
             <!-- 小球 -->
                <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                >
                    <div class="flagbox" v-show="flag" ref="ball"></div>
                </transition>
            <!-- 商品信息 -->
            <div class="mui-card card-container">
               
                
				<div class="mui-card-header title">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div class="price">
                            市场价：<span class="market-price">{{goodsinfo.market_price}}</span>&nbsp;&nbsp;
                            销售价：<span class="sell-price">{{goodsinfo.sell_price}}</span>
                        </div>
                        <div class="buy">
                            <span>购买数量：</span>
                            <numbox @getCount="getCount"></numbox> 
                        </div>
                        <div class="buy-button">
                            <mt-button type='primary'>立即购买</mt-button>
                            <mt-button type='danger' @click="addCar">加入购物车</mt-button>
                        </div>
					</div>
				</div>
			</div>
            <!-- 商品参数 -->
			<div class="mui-card goods-canshu">
				<div class="mui-card-header"><h3>商品参数</h3></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品编号：{{goodsinfo.goods_no}}</p>
                        <p>库存情况：{{goodsinfo.stock_quantity}}</p>
                        <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="danger" size="large" plain @click="getdec(id)">图文介绍</mt-button><br>
                    <mt-button type="primary" size="large" plain @click="getcomment(id)">商品评价</mt-button>
                </div>
			</div>
     </div>
</template>

<script>
import { Toast } from 'mint-ui'
//导入数字选择框组件
import numbox from '../../subcomponents/goods_numbox.vue'
export default {
    data(){
        return{
            id: this.$route.params.id,  //将路由参数对象中的id挂载到data中
            lunbolist: [],   //存放轮播图片路径
            goodsinfo: [],   //商品信息
            flag: false,     //小球状态
            buyCounts: 1     //购买数量
        }
    },
    created(){
        this.getlunbo();
        this.getInfo();
    },
    methods:{
        // 从数据接口获取轮播图地址
        getlunbo(){
             this.$http.get("api/getthumimages/" + this.id).then(result =>{
                if(result.body.status === 0){
                    this.lunbolist = result.body.message;
                }else{
                    Toast("获取图片详情失败");
                }
            })
        },
        //从数据接口获取商品信息
        getInfo(){
            this.$http.get("api/goods/getinfo/" + this.id).then(result =>{
                if(result.body.status === 0){
                    this.goodsinfo = result.body.message[0];
                }else{
                    Toast("获取图片详情失败");
                }
            })
        },
        //获得购买数量
        getCount(count){
            this.buyCounts = count;
        },
        //点击加入购物车触发事件
        addCar(){
            this.flag = !this.flag;
            //拼接出一个新的商品对象，保存到store中的car数组中
            var goodsinfo = {
                id: this.id,
                count: this.buyCounts,
                price: this.goodsinfo.sell_price,
                selected: true
            };
            this.$store.commit("addToCar", goodsinfo);
        },
        //跳转至图文介绍界面
        getdec(id){
            this.$router.push({ name: 'goodsintroduce', params: {id} });
        },
        //跳转至商品评价
        getcomment(id){
            this.$router.push({ name: 'goodscomment', params: {id} });
        },
        beforeEnter(el){
            el.style.transform = "translate(0, 0)";
        },
        enter(el, done){
            el.offsetWidth;
            // 获取小球在页面中的位置
            const ballposition = this.$refs.ball.getBoundingClientRect();
            //获得购物车徽标位置
            const badgeposition = document.getElementById("badge").getBoundingClientRect();
            //小球与购物车徽标横坐标距离
            const xdistance = badgeposition.left - ballposition.left;
            // 小球与购物车徽标纵坐标距离
            const ydistance = badgeposition.top - ballposition.top;
            el.style.transform = `translate(${xdistance}px, ${ydistance}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4, -0.3, 1, .68)";
            done();
        },
        afterEnter(el){
            this.flag = !this.flag;
        }

    },
    components:{
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .goods-container{
        .mint-swipe{
            text-align: center;
            height: 150px;

            img{
                height: 100%;
            }
        }
        .flagbox{
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background-color: red;
                position: absolute;
                top: 23rem;
                left: 8rem;
                z-index: 99;
            }
        .card-container{
            position: relative;
            
            .title{
            font-weight: bold;
        }
        .price{
            font-weight: bold;
            .market-price{
                text-decoration: line-through;
            }
            .sell-price{
                color: red;
            }
        }
        .buy{
            margin-top: 5px;
            .mui-numbox{
                height: 30px;
            }
        }
        .buy-button{
            margin-top: 10px;
            .mint-button{
                font-size: 12px;
                height: 30px;
                position: relative;
            }
         }
    }
        
        
        .goods-canshu{
            h3{
                font-size: 16px;
            }
            p{
                font-size: 12px;
            }
            .mui-card-footer{
                display: block;
            }
        }
    }
</style>


