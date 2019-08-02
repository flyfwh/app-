<template>
    <div>
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll" >
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"  v-for="item in categorys" 
                    :key="item.id" @click="getImg(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片显示区域 -->
        <div class="show-picture">
            <ul>
                <router-link v-for="item in list" :key="item.id" tag="li" :to="'/home/picturedetail/' + item.id">
                    <img v-lazy="item.img_url">
                    <div class="info">
                    <div class="info-title">
                        {{item.title}}
                    </div>
                    <div class="info-body">
                        {{item.zhaiyao}}
                    </div>
                </div>
                </router-link>
                
            </ul>
        </div>
    </div>
</template>

<script>
//导入mui的js文件
import mui from '../../../lib/mui/js/mui.min.js'
//导入Toast提示框
import { Toast } from 'mint-ui'

export default {
    data(){
        return {
            categorys: [],   //图片类别
            list: []  //图片信息
        }
    },
    created(){
        this.getAllCategory();
        this.getImg(0);
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
	    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods: {
        //从接口获取所有图片类别
        getAllCategory(){
            this.$http.get('api/getimgcategory').then(result => {
                if(result.body.status === 0){
                    result.body.message.unshift({title: "全部", id: 0});
                    this.categorys = result.body.message;
                }else{
                    Toast("获取图片类别失败！");
                }
            })
        },
        //获取对应类别的图片
        getImg(id){
            this.$http.get('api/getimages/' + id).then(result => {
                if(result.body.status == 0){
                    this.list = result.body.message;
                }else{
                    Toast("获取图片失败！");
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .show-picture{
        
        ul{
            margin: 0;
            padding:0 10px;
            padding-bottom: 0;
            li{
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            position: relative;
                img{
                    width: 100%;
                    vertical-align: middle;
                }
                img[lazy=loading] {
                    width: 40px;
                    height: 300px;
                    margin: auto;
                }
                .info{
                    background-color: rgba(0, 0, 0, .2);
                    position: absolute;
                    bottom: 0;
                    text-align: left;
                    color: white;
                    .info-title{
                        font-size: 14px;
                    }
                    .info-body{
                        font-size: 12px;
                    }
                }
            }
            
        }
        
        
    }
    
    li{
        list-style-type: none;
    }
    .mui-slider{
        touch-action: pan-x;
    }
</style>

