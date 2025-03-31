<template>
  <div>
    <p>{{ formattedCurrentTime }}</p>
  </div>
  <footer class="index-footer">
    <div class="index-footer-info index-con">
      <div class="lianxi bottomItem">
        <h2>联系方式</h2>
        <p>QQ交流群: 287048847</p>
        <p>gitee: <a href="https://gitee.com/WangJiaHui202144/aggregate-lottery-system">Aggregate-lottery-system</a></p>
        <p>github: <a href="https://github.com/YuanJie2001/Aggregate-lottery-system">Aggregate-lottery-system</a></p>
        <p>技术支持: vector</p>
      </div>

      <div class="erweima bottomItem">
        <img src="@/assets/images/qrcode.png"/>
        <p>联系我们</p>
      </div>
    </div>

    <div class="index-footer-bottom">
      <div class="index-con clearfix">
        <p class="bottomText">
          该项目秉持开放共享的精神，完全开源。欢迎您访问我们的代码仓库地址，不仅能够查看源代码详情，还可以参与贡献和定制您自己的功能。探索、学习或贡献，一切尽在您的掌握之中。
        </p>
      </div>
    </div>
  </footer>

  <el-backtop :bottom="100">
    <img
        src="@/assets/images/huojian.svg"
        style="height: 100%; width: 100%"
        alt="top图标"
    />
  </el-backtop>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import {formatTime} from "@/assets/ts/utils.ts";

const formattedCurrentTime = ref();
onMounted(() => {
  setInterval(() => {
    formattedCurrentTime.value = formatTime(new Date());
  }, 1000);
});
</script>
<style scoped>
.clearfix {
  display: flex;
  justify-content: center;
}

.bottomText {
  width: 100%;
  text-align: center;
}
</style>
