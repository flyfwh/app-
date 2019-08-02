<template>
    <div class="shopcar-container">
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <div class="goods-list" v-for="item in goodslist" :key="item.id">
                            <mt-switch v-model="$store.getters.getSelected[item.id]" @change="changeSelected(item.id)"></mt-switch>
                            <img :src="item.thumb_path">
                            <div>
                                <h3>{{item.title}}</h3>
                                <p>
                                    <span class="price">￥{{item.sell_price}}</span>
                                    <numbox :initCount= "$store.getters.getInitCount[item.id]" :goodsid="item.id"></numbox>
                                    <a href="#" @click.prevent="del(item.id)">删除</a>
                                </p>
                            </div>
                        </div>
					</div>
				</div>
		</div>
        <!-- 结算区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <div class="jiesuan-container">
                            <div class="buy-message">
                                <p>总计（不含运费）</p>
                                <p>已勾选商品<span class="red">{{$store.getters.getCheckedMessage.count}}</span>件,&nbsp;&nbsp;
                                总价<span class="red">￥{{$store.getters.getCheckedMessage.money}}</span></p>
                            </div>
                            <div class="sure-buy">
                                <mt-button type="danger">去结算</mt-button>
                            </div>
                        </div>
					</div>
				</div>
		</div>
    </div>
</template>
<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
import { Toast } from 'mint-ui'
export default {
    data(){
        return{
            goodslist: []
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            //获取store中所有商品的id，并保存在idArr数组中
            var idArr = [];
            this.$store.state.car.forEach(item => {
                idArr.push(item.id);
            });
            //如果存在商品信息，从接口获取购物车商品列表
            if(idArr.length > 0){
                this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result =>{
                    if(result.body.status === 0){
                        this.goodslist = result.body.message;
                    }else{
                        Toast("获取购物车信息失败！")
                    }
                })
            }
        },
        //删除商品
        del(id){
            this.$store.commit("delGoods", id);
            this.getGoodsList();
        },
        //改变选中状态
        changeSelected(id){
            this.$store.commit("updatedSelected", id);
        }
    },
    
    components:{
        numbox
    }
}
</script>
<style lang="scss" scoped>
    .shopcar-container{
        .mui-card-content-inner{
            .goods-list{
                display: flex;
                img{
                    width: 4rem;
                    height: 4rem;
                }
                h3{
                    font-size: 14px;
                }
                .mui-numbox{
                    height: 30px;
                }
                .price{
                    color:red;
                    font-weight: bold;
                }
            }
        }
        .jiesuan-container{
            display: flex;
            justify-content: space-between;
            .red{
                color: red;
            }
        }
   } 
</style>