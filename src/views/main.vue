<template>
  <div class="main-view">
    {{mes}}
    
    <router-view />
  </div>
</template>

<script lang="ts">  
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  
  @Component
  export default class Main extends Vue {
    mes: string = '你好'
    
    mounted() {
      console.log('这是一个vue-ts项目')
    }
  };
</script>

<style lang="less" scoped>
  
</style>