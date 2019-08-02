<template>
    <div class="detailContainer">
        <h3>{{infolist.title}}</h3>
        <div class="show-date">
            <span>发表时间：{{infolist.add_time | dateFormat}}</span>
            <span>点击{{infolist.click}}次</span>
        </div>
        <hr>
        <div class="thumbs">
            <vue-preview  :slides="imglist"  ></vue-preview>
        </div>
        <div class="show-info" v-html="infolist.content"></div>
        <comment :id="id"></comment>
    </div>
    
</template>

<script>
import {Toast} from 'mint-ui'
//导入评论组件
import comment from '../newslist/comment.vue'
export default {
    data(){
        return{
            id: this.$route.params.id,
            infolist: [],
            imglist:[]
        }
    },
    created(){
        this.getDetail();
        this.getImages();
    },
    methods:{
        getDetail(){
            this.$http.get("api/getimageInfo/" + this.id).then(result =>{
                if(result.body.status === 0){
                    this.infolist = result.body.message[0];
                }else{
                    Toast("获取图片详情失败");
                }
            })
        },
        getImages(){
            this.$http.get("api/getthumimages/" + this.id).then(result =>{
                if(result.body.status === 0){
                    result.body.message.forEach(item => {
                        item.w = 600;
                        item.h = 400;
                        item.src = item.src;
                        item.msrc = item.src;
                    });
                    this.imglist = result.body.message;
                }else{
                    Toast("获取图片详情失败");
                }
            })
        }
    },
    components:{
        comment
    }
}
</script>

<style lang="scss" scoped>
    .detailContainer{
        padding: 2px;
        h3{
            font-size: 16px;
            color:#007aff;
            text-align: center;
            padding: 10px 0;
            font-weight: bold;
        }
        .show-date{
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #666;
        }
        .thumbs {
        /deep/ .my-gallery {
            display: flex;
            flex-wrap: wrap;
            figure {
            width: 30%;
            margin: 5px;
            img {
                width: 100%;
             }
            }
         }
        }
        .show-info{
            line-height: 30px;
            font-size: 12px;
            font-weight: bold;
        }
    }
    
</style>


