<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div style="font-size:18px;line-height:40px;text-align: center">
      <img src="@/assets/images/404.webp"/>
      <img src="@/assets/gif/rocket.gif" width="240" height="240"/>
      <p>⬆️</p>
      <p>页面被神秘力量吸走了,将在{{ countDown }}秒跳转或
        <a href="javaScript:void(0);" @click="goIndexPage" style="color: #03a9f4">点击跳转</a>
      </p>
      <img src="@/assets/gif/loading.gif" width="620" height="240"/>
    </div>

  </div>
</template>
<script setup lang="ts">
import router from "@/router";
import {ref} from "vue";

const countDown = ref(3)
let time1 = window.setTimeout(goIndexPage, countDown.value * 1000) // 倒计时自动触发跳转
let time2 = setInterval(() => {
  countDown.value--
}, 1000);

function goIndexPage() {
  if (time1 != undefined) {
    window.clearTimeout(time1)
  }
  if (time2 != undefined) {
    window.clearInterval(time2)
  }
  router.replace('/index')
  window.open('https://www.qq.com/babygohome')
}


</script>
