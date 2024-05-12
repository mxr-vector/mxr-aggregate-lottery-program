<script setup lang="ts">
import {ref} from 'vue'

const boxRef = ref<HTMLElement | null>(null)
const isBan = ref(false)

async function roll() {
  if (boxRef.value) {
    isBan.value = true;
    boxRef.value.style.animationPlayState = 'running'
  }
  setTimeout(() => {
    if (boxRef.value) {
      boxRef.value.style.animationPlayState = 'paused';
      isBan.value = false;
    }
  }, Math.floor(Math.random() * 1000 * 6))
}


</script>

<template>
  <section>
    <div id="box" ref="boxRef">
      <p id="front">正面</p>
      <p id="top">顶面</p>
      <p id="back">背面</p>
      <p id="bottom">底面</p>
      <p id="left">左面</p>
      <p id="right">右面</p>
    </div>
  </section>
  <el-button @click="roll()" :disabled="isBan">掷骰子</el-button>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

section {
  width: 200px;
  height: 200px;
  /* 设置景深 */
  perspective: 10000px;
  margin: 50px auto;
}

@keyframes r {
  from {
    transform: rotateX(0deg) rotateY(0deg)
  }
  to {
    transform: rotateX(360deg) rotateY(360deg)
  }
}

#box {
  width: 200px;
  height: 200px;
  perspective: 10000px;
  /* 既是p标签的舞台，自己也是section标签的演员 要设置transform-style*/
  transform-style: preserve-3d;
  position: relative;
  animation: r 1s linear 0s infinite alternate;
  animation-play-state: paused;

}

#box p {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 0;
  left: 0;
}

#front {
  transform: translateZ(100px);
  background-color: rgba(210, 105, 30, 0.438);
}

#top {
  transform: rotateX(90deg) translateZ(100px);
  background-color: rgba(22, 243, 232, 0.226);
}

#back {
  transform: translateZ(-100px);
  background-color: rgba(13, 104, 241, 0.397);
}

#bottom {
  transform: rotateX(-90deg) translateZ(100px);
  background-color: rgba(124, 238, 17, 0.315);
}

#left {
  transform: rotateY(-90deg) translateZ(100px);
  background-color: rgba(233, 10, 177, 0.432);
}

#right {
  transform: rotateY(90deg) translateZ(100px);
  background-color: rgba(238, 17, 17, 0.438);
}
</style>
