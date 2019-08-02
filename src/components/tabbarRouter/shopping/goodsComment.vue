<template>
    <div>
        <commentbox :id='this.$route.params.id'></commentbox>
    </div>
</template>

<script>
import commentbox from '../newslist/comment.vue'
export default {
    data(){
        return{}
    },
    components:{
        commentbox
    }
}
</script>

<style lang="scss" scoped>

</style>


