<template>
    <div class="comment-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请发表您的评论" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>

        <!-- 评论区域 -->
        <div class="comment-list">
            <div class="comment-item" v-for="(item, i) in comments" :key="item.add_time">
                <div class="comment-title">
                    <span>第{{i+1}}楼</span>&nbsp;&nbsp;
                    <span>用户：{{item.user_name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>发表时间:{{ item.add_time | dateFormat }}</span>
                </div>
                <div class="comment-body">
                    {{ item.content }}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="nextPage">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            msg:[],
            pageIndex: 1,    //默认展示第一页
            comments:[]      //所有评论数据
        };
    },
    created(){
        this.getComments();
    },
    methods:{
        //获取评论方法
        getComments(){
            this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result=>{
                if(result.body.status === 0){
                    this.comments = this.comments.concat(result.body.message);
                }else{
                    Toast("获取评论信息失败！");
                }
            })
        },
        //添加评论方法
        addComment(){
            if(this.msg == ""){
                Toast("发表内容不能为空！");
            }else{
                this.$http.post("api/postcomment/" + this.$route.params.id, { content:this.msg.trim() })
                .then(result =>{
                if(result.body.status === 0){
                    Toast("发表成功");
                    //拼接一个评论对象
                    var cmt = {
                        user_name: "匿名用户",
                        add_time: Date.now(),
                        content: this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.msg = "";
                }else{
                    Toast("发表失败!");
                }
            })
            }
            
        },
        //更多评论
        nextPage(){
            this.pageIndex++;
            this.getComments();
        }
    },
    props: ["id"]
}
</script>

<style lang="scss" scoped>
    .comment-container{
        h3{
            font-size: 16px;
        }
        textarea{
            height: 80px;
        }
        .comment-list{
            font-size: 13px;
            padding: 10px 0;
            .comment-title{
                line-height: 30px;
                background-color:#ccc; 
            }
            .comment-body{
                line-height: 30px;
            }
        }
    }
</style>


