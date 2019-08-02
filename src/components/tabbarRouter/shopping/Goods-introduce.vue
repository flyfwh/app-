<template>
    <div class="goodsintro-container">
        <div class="title">
            {{info.title}}
        </div>
        <hr>
        <div class="content" v-html="info.content">
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return{
            id: this.$route.params.id,      //将路由传递过来的参数id挂载到data上
            info: []    //商品信息
        }
        
    },
    created(){
        this.getIntroduce();
    },
    methods:{
        getIntroduce(){
            this.$http.get('api/goods/getdesc/' + this.id).then(result =>{
                if(result.body.status === 0){
                    this.info = result.body.message[0];
                    console.log(this.id);
                }else{
                    Toast("获取图文介绍失败！");
                }
            })
        }
    }
}
</script>

<style lang="scss" >
    .goodsintro-container{
        .title{
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px  0;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
    
</style>


