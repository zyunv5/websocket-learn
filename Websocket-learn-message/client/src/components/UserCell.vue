<template>
  <div class="cell-wrapper" @click="$emit('click')">
    <div class="cell-title">
      <img :src="user.avator" alt>
      <span>{{user.name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "cell-cell",
  props: {
    user: Object
  }
};
</script>
<style scoped>
.cell-wrapper {
  background-color: #fff;
  box-sizing: border-box;
  color: inherit;
  min-height: 50px;
  display: flex;
  font-size: 16px;
  line-height: 1;
  overflow: hidden;
  padding: 0 8px;
  width: 100%;
  line-height: 50px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}
.cell-title {
  flex: 1;
}
.cell-title img {
  width: 2.5rem;
  height: 2.5rem;
  vertical-align: middle;
  margin-right: 0.6rem;
}
.cell-title span {
  display: inline-block;
  vertical-align: middle;
}
</style>
