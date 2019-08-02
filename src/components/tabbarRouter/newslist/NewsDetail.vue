<template>
    <div class="detailContainer">
        <!-- 标题 -->
        <h1>{{detail.title}}</h1>
        <div class="show-message">
            <span>发表时间：{{detail.add_time}}</span>
            <span>点击{{detail.click}}次</span>
        </div>
        <hr>
        <!--内容-->
        <div class="content" v-html="detail.content"></div>

        <!-- 评价子组件 -->
        <comment-box :id="id"></comment-box>
    </div>
</template>

<script>
import comment from './comment.vue'
export default {
    data(){
        return{
            id: this.$route.params.id,  //将url地址传递过来的id值，挂载到data上
            detail:{}
        };
    },
    created() {
            this.getDetails()
        },
    methods:{
        getDetails(){
            this.$http.get('api/getnew/' + this.id).then(result => {
                if(result.body.status === 0){
                    this.detail = result.body.message[0]
                }else{
                    
                    Toast("获取新闻信息失败！")
                }
            })
        }
    },
    components:{   //注册子组件的节点
        "comment-box": comment
    }
}
</script>

<style lang="scss" scoped>
    .detailContainer{
        padding: 4px;
        h1{
            color:red;
            padding-top: 5px;
            font-size: 14px;
            text-align: center;
        }
        .show-message{
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            color: #266aff;
        }
    }
</style>
