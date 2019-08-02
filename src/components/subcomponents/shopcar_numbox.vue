<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" :value="initCount" ref="numbox" @change="changeCount" />
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js"
export default {
    data(){
		return{
		}
    },
    mounted(){
		mui('.mui-numbox').numbox();
	},
	methods:{
		changeCount(){
            this.$store.commit("updatedCount", {id: this.goodsid, count: this.$refs.numbox.value});
		}
    },
    props: ["initCount", "goodsid"]
}
</script>

<style lang="scss" scoped>

</style>


