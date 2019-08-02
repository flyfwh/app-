
import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from '../components/tabbarRouter/HomeContainer.vue'
import MemberContainer from '../components/tabbarRouter/MemberContainer.vue'
import SearchContainer from '../components/tabbarRouter/SearchContainer.vue'
import ShopcarContainer from '../components/tabbarRouter/ShopcarContainer.vue'
import NewsContainer from '../components/tabbarRouter/newslist/NewsContainer.vue'
import PictureContainer from '../components/tabbarRouter/pictureshare/PictureContainer.vue'
import ShoppingContainer from '../components/tabbarRouter/shopping/ShoppingContainer.vue'
import NewsDetail from '../components/tabbarRouter/newslist/NewsDetail.vue'
import PictureDetail from '../components/tabbarRouter/pictureshare/picturedetail.vue'
import BuyGoods from '../components/tabbarRouter/shopping/BuyGoods.vue'
import GoodsIntroduce from '../components/tabbarRouter/shopping/Goods-introduce.vue'
import goodsComment from '../components/tabbarRouter/shopping/goodsComment.vue'
var router = new VueRouter({
  routes: [
    {path:'', component: HomeContainer},  //设置默认
    {path: '/home', component: HomeContainer}, //首页
    {path: '/member', component: MemberContainer},  //会员
    {path: '/search', component: SearchContainer},  //搜索
    {path: '/shopcar', component: ShopcarContainer},  //购物车
    {path: '/home/newslist', component: NewsContainer},   //新闻资讯
    {path: '/home/pictureslist', component: PictureContainer},   //新闻资讯
    {path: '/home/shoppinglist', component: ShoppingContainer},   //商品列表
    {path: '/home/buygoodslist/:id', component: BuyGoods},   //商品购买界面
    {path:'/home/newsdetail/:id', component: NewsDetail},   //新闻详情路由
    {path: '/home/picturedetail/:id', component: PictureDetail},   //分享图片详情
    {path: '/home/goodsintroduce/:id', component: GoodsIntroduce, name: 'goodsintroduce'},  //商品图文介绍
    {path: '/home/goodscommment/:id', component: goodsComment, name: 'goodscomment'}

  ],
  linkActiveClass: 'mui-active'          //覆盖路由默认的高亮的类
})
export default router
