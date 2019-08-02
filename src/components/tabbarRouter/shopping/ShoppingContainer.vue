<template>
    <div class="goodsContainer">
        <div class="goodslist">
            <router-link class="goods-item" v-for="item in goodslist" tag="div" :key="item.id" :to="'/home/buygoodslist/' + item.id">
                <img :src="item.img_url" alt="">
                <h1 class="goods-detail">{{item.title}}</h1>
                <div class="goods-bottom">
                    <div class="price">
                        <span class="lowerprice">￥{{item.sell_price}}</span>
                        <span class="higherprice">￥{{item.market_price}}</span>
                    </div>
                    <p class="sell">
                        <span >热卖中</span>
                        <span>剩{{item.stock_quantity}}件</span>
                    </p>
                </div>
            </router-link>
        </div>
        <!-- 加载更多商品按钮 -->
        <mt-button type='danger' size='large' plain @click="moreGoods">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageIndex: 1,
            goodslist: []
        }
    },
    created(){
        this.getGoosList();
    },
    methods:{
        getGoosList(){
            this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then(result => {
                if(result.body.status === 0){
                    this.goodslist = this.goodslist.concat(result.body.message);
                }else{
                    console.log("获取商品列表失败");
                }
            })
        },
        moreGoods(){
            this.pageIndex++;
            this.getGoosList();
        }
    }
}
</script>

<style lang="scss" scoped>
    .goodslist{
        
        display: flex;
        flex-wrap: wrap;
        padding:0 5px;
        justify-content: space-between;
        .goods-item{
            margin-top: 7px;
            width: 49%;
            border:1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-bottom: 2px;
            .goods-detail{
                font-size: 14px;
                font-weight: bold;
            }
            img{
                width: 100%;
            }
            .goods-bottom{
                background-color: rgba(9, 9, 9, .1);
            }
            .price{
                padding: 5px 0;
                .lowerprice{
                color: red;
                font-size: 14px;
                font-weight: bold;
                
                }
                
                .higherprice{
                    font-size: 14px;
                    text-decoration: line-through;
                }
            }
            .sell{
                font-size: 12px;
                margin: 0;
                padding: 3px 0;
                display: flex;
                justify-content: space-between;
                
            }
            
        }
    }
</style>

