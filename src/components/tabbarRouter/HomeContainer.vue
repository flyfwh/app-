<template>
    <div id="homecontainer">
        <!--轮播图区域-->
        <div class="swipe-container">
            <mt-swipe :auto="2000">
                <mt-swipe-item>
                    <img src="../../images/show_img1.jpg" alt="">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="../../images/show_img2.jpg" alt="">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="../../images/show_img3.jpg" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>

        <!--六宫格区域-->
        <div>
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <router-link to='/home/newslist'>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/image1.png" alt="新闻资讯">
		                    <div class="mui-media-body">新闻资讯</div></a></li>
                </router-link>
                <router-link to='/home/pictureslist'>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/image2.png" alt="图片分享">
		                    <div class="mui-media-body">图片分享</div></a></li>
                </router-link>
                <router-link to='/home/shoppinglist'>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/image3.png" alt="商品购买">
		                    <div class="mui-media-body">商品购买</div></a></li>
                </router-link>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/image4.png" alt="留言反馈">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/image5.png" alt="视频专区">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/image6.png" alt="联系我们">
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul>  
        </div>
    </div>
    
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    #homecontainer{
        
        height: 100%;

        
    }
    .mint-swipe{
            height: 200px;

            img{
                width: 100%;
            }
    }
        .mui-grid-view.mui-grid-9{
            border:0;
    }
        .mui-grid-view.mui-grid-9 .mui-table-view-cell{
            border:0;
    }
    .mui-grid-view.mui-grid-9{
        background-color: white;

        img{
            width: 100%;
        }
    }
</style>

