<template>
  <div>
    <p>{{formattedCurrentTime }}</p>
  </div>
  <footer class="index-footer">
    <div class="clearfix index-footer-info index-con">
      <div class="lianxi fl">
        <h2>联系方式</h2>
        <p>QQ交流群： 287048847 |
          gitee：<a href="https://gitee.com/WangJiaHui202144/aggregate-lottery-system">aggregate-lottery-system.com</a> |
          github：XXXXXX
        </p>
        <p>技术支持：vector</p>
      </div>

      <div class="erweima fr">
        <img src="@/assets/images/qrcode.png"/>
        <p>联系我们</p>
      </div>
    </div>

    <div class="index-footer-bottom">
      <div class="index-con clearfix">
        <p class="fl">
          该项目秉持开放共享的精神，完全开源。欢迎您访问我们的代码仓库地址，不仅能够查看源代码详情，还可以参与贡献和定制您自己的功能。探索、学习或贡献，一切尽在您的掌握之中。
        </p>
      </div>
    </div>
  </footer>


  <el-backtop :bottom="100">
    <img src="@/assets/images/huojian.svg" style="height: 100%;width: 100%;" alt="top图标">
  </el-backtop>

</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";

const formattedCurrentTime = ref()
onMounted(()=>{
  setInterval(updateTime,1000)
})

async function updateTime(){
  const now = new Date();
  formattedCurrentTime.value = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}
</script>
<style scoped>
</style>
