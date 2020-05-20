<template>
    <div class="cell-wrapper" v-if="userInfo">
        <div class="cell-title">
            <img :src="userInfo.avator" alt="">
            <span>{{userInfo.name}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"info-cell",
    props:{
        userInfo:Object
    },
}
</script>
<style scoped>
.cell-wrapper{
    background-color: #fff;
    box-sizing: border-box;
    color: inherit;
    min-height: 50px;
    display: flex;
    font-size: 16px;
    line-height: 1;
    overflow: hidden;
    padding: 0 8px;
    width:100%;
    line-height: 50px;
    border-bottom: 1px solid #d9d9d9;
}
.cell-title{
    flex:1;
}
.cell-title img{
    width:2.5rem;
    height: 2.5rem;
    vertical-align: middle;
    margin-right: 0.6rem;
}
.cell-title span{
    display:inline-block;
    vertical-align: middle;
}
</style>
