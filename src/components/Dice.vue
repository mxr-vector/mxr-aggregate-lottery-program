<script setup lang="ts">
import {nextTick, ref} from 'vue'

const boxRef = ref<HTMLElement | null>(null)
const isAnimating = ref(false)
const rotations = {
  x: ref(0),
  y: ref(0),
  z: ref(0),
};
const currentAxis = ref('x'); // 初始旋转轴为X轴

// const piceCount = ref(1)
// 定义一个函数来决定下一个旋转的轴和方向
const getNextRotation = () => {
  const axes = ['x', 'y', 'z'];
  const currentIndex = axes.indexOf(currentAxis.value);
  const nextIndex = (currentIndex + 1) % axes.length; // 循环到下一个轴
  const nextAxis = axes[nextIndex];

  // 额外旋转n圈
  const extraDegrees = 2 * 360;
  // 根据当前轴的旋转角度判断旋转方向，以确保每次旋转到下一个面
  let angle = 90;
  if (nextAxis === 'x') {
    angle = rotations.x.value % 360 === 0 ? 90 : -90;
  } else if (nextAxis === 'y') {
    angle = rotations.y.value % 360 === 0 ? 90 : -90;
  } else if (nextAxis === 'z') {
    angle = rotations.z.value % 360 === 0 ? 90 : -90;
  }
  angle += extraDegrees;
  currentAxis.value = nextAxis; // 更新当前旋转轴
  return {axis: nextAxis, angle};
};

async function roll() {
  if (isAnimating.value || !boxRef.value) return;

  isAnimating.value = true;

  const {axis, angle} = getNextRotation();
  console.log(angle)
  rotations[axis].value += angle; // 更新旋转角度

  await nextTick(); // 等待下一帧
  boxRef.value.style.transition = 'transform 2s ease';

  // 应用变换
  switch (axis) {
    case 'x':
      boxRef.value.style.transform = `rotateX(${rotations.x.value}deg)`;
      break;
    case 'y':
      boxRef.value.style.transform = `rotateY(${rotations.y.value}deg)`;
      break;
    case 'z':
      boxRef.value.style.transform = `rotateZ(${rotations.z.value}deg)`;
      break;
  }

  await new Promise(resolve => setTimeout(resolve, 2000)); // 等待动画结束
  boxRef.value.style.transition = ''; // 移除过渡效果
  isAnimating.value = false; // 动画结束
}


</script>

<template>
  <section>
    <div id="box" ref="boxRef">
      <p id="front">⚫</p>
      <p id="top">⚫⚫</p>
      <p id="back">⚫⚫⚫</p>
      <p id="bottom">⚫⚫⚫⚫</p>
      <p id="left">⚫⚫⚫⚫⚫</p>
      <p id="right">⚫⚫⚫⚫⚫⚫</p>
    </div>
  </section>

  <section>
    <el-button @click="roll()" :disabled="isAnimating" size="large">掷骰子</el-button>

<!--    <div class="flex flex-wrap gap-4 items-center">-->
<!--      <el-select-->
<!--          v-model="piceCount"-->
<!--          style="width: 80px"-->
<!--      >-->
<!--        <el-option-->
<!--            v-for="val in [1,2,3,4,5,6]"-->
<!--            :key="val"-->
<!--            :label="val"-->
<!--            :value="val"-->
<!--        />-->
<!--      </el-select>-->
<!--    </div>-->
  </section>

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
  animation-play-state: paused;
  /* animation: r 1s linear 0s infinite alternate; */
}

#box p {
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  border-radius: 25px;
  position: absolute;
  top: 0;
  left: 0;
}

#front {
  border: 2px solid #343a40;
  transform: translateZ(100px);
  /*background-color: rgba(210, 105, 30, 0.438);*/
  background-color: #fffaf0;
}

#top {
  border: 2px solid #343a40;
  transform: rotateX(90deg) translateZ(100px);
  /*background-color: rgba(22, 243, 232, 0.226);*/
  background-color: #fffaf0;
}

#back {
  border: 2px solid #343a40;
  transform: translateZ(-100px);
  /*background-color: rgba(13, 104, 241, 0.397);*/
  background-color: #fffaf0;
}

#bottom {
  border: 2px solid #343a40;
  transform: rotateX(-90deg) translateZ(100px);
  /*background-color: rgba(124, 238, 17, 0.315);*/
  background-color: #fffaf0;
}

#left {
  border: 2px solid #343a40;
  transform: rotateY(-90deg) translateZ(100px);
  /*background-color: rgba(233, 10, 177, 0.432);*/
  background-color: #fffaf0;
}

#right {
  border: 2px solid #343a40;
  transform: rotateY(90deg) translateZ(100px);
  /*background-color: rgba(238, 17, 17, 0.438);*/
  background-color: #fffaf0;
}
</style>
