<script setup lang="ts">
import {nextTick, ref} from "vue";
import {RefreshRight} from "@element-plus/icons-vue";

const boxRef = ref<HTMLElement | null>(null);
const isAnimating = ref(false);
const rotations = {
  x: ref(0),
  y: ref(0),
  z: ref(0),
};
const currentAxis = ref("x"); // 初始旋转轴为X轴

const piceCount = ref(1);

const getNextRotation = () => {
  const axes = ["x", "y", "z"];
  const currentIndex = axes.indexOf(currentAxis.value);
  const nextIndex = (currentIndex + 1) % axes.length; // 循环到下一个轴
  const nextAxis = axes[nextIndex];

  // 额外旋转n圈
  // 360和1080都是90的倍数，因此我们找出这个范围内90度倍数的最小值和最大值
  const minAngle = 360; // 或者直接写作 4 * 90，因为360度相当于4个90度
  const maxAngle = 1080; // 同理，1080度是12个90度

  // 计算这个范围内有多少个90度的间隔
  const intervalCount = (maxAngle - minAngle) / 90;

  // 生成一个随机的整数，代表选中的间隔位置
  const randomInterval = Math.floor(Math.random() * intervalCount);

  // 计算实际的角度值
  const randomAngle = minAngle + randomInterval * 90;
  // 根据当前轴的旋转角度判断旋转方向，以确保每次旋转到下一个面
  let angle = 90;
  switch (nextAxis) {
    case "x":
      angle = rotations.x.value % 360 === 0 ? randomAngle : -randomAngle;
      break;
    case "y":
      angle = rotations.y.value % 360 === 0 ? randomAngle : -randomAngle;
      break;
    case "z":
      angle = rotations.z.value % 360 === 0 ? randomAngle : -randomAngle;
      break;
  }
  currentAxis.value = nextAxis; // 更新当前旋转轴
  return {axis: nextAxis, angle};
};

async function roll() {
  if (isAnimating.value || !boxRef.value) return;

  isAnimating.value = true;

  const {axis, angle} = getNextRotation();
  rotations[axis].value = angle; // 更新旋转角度
  // console.log(rotations[axis].value);
  await nextTick(); // 等待下一帧
  boxRef.value.style.transition = "transform 2s ease";

  // 应用变换
  switch (axis) {
    case "x":
      console.log("x", rotations.x.value);
      boxRef.value.style.transform = `rotateX(${rotations.x.value}deg)`;
      break;
    case "y":
      console.log("y", rotations.y.value);
      boxRef.value.style.transform = `rotateY(${rotations.y.value}deg)`;
      break;
    case "z":
      console.log("z", rotations.z.value);
      boxRef.value.style.transform = `rotateZ(${rotations.z.value}deg)`;
      break;
  }

  await new Promise((resolve) => setTimeout(resolve, 2000)); // 等待动画结束
  boxRef.value.style.transition = ""; // 移除过渡效果
  isAnimating.value = false; // 动画结束
}
</script>

<template>
  <section>
    <div id="box" ref="boxRef">
      <div id="front" class="surface">
        <div>⚫</div>
      </div>
      <div id="top" class="surface">
        <div>⚫⚫</div>
      </div>
      <div id="back" class="surface">
        <div>⚫⚫⚫</div>
      </div>
      <div id="bottom" class="surface">
        <div>⚫⚫</div>
        <div>⚫⚫</div>
      </div>
      <div id="left" class="surface">
        <div>⚫⚫</div>
        <div>⚫⚫⚫</div>
      </div>
      <div id="right" class="surface">
        <div>⚫⚫⚫</div>
        <div>⚫⚫⚫</div>
      </div>
    </div>

  </section>

  <section>
    <el-button @click="roll()" :disabled="isAnimating" type="primary"
    >掷骰子
      <el-icon>
        <RefreshRight/>
      </el-icon>
    </el-button>

    <div class="flex flex-wrap gap-4 items-center">
      <el-select v-model="piceCount" style="width: 80px">
        <el-option
            v-for="val in [1, 2, 3, 4, 5, 6]"
            :key="val"
            :label="val"
            :value="val"
        />
      </el-select>
    </div>
  </section>
</template>

<style scoped lang="scss">
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
    transform: rotateX(0deg) rotateY(0deg);
  }
  to {
    transform: rotateX(360deg) rotateY(360deg);
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
  .surface {
    width: 200px;
    height: 200px;
    border-radius: 25px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

#front {
  border: 2px solid #343a40;
  transform: scale3d(0.5,0.5,0.5) translateZ(100px);
  /*background-color: rgba(210, 105, 30, 0.438);*/
  background-color: #fffaf0;
}

#top {
  border: 2px solid #343a40;
  transform: scale3d(0.5,0.5,0.5) rotateX(90deg) translateZ(100px);
  /*background-color: rgba(22, 243, 232, 0.226);*/
  background-color: #fffaf0;
}

#back {
  border: 2px solid #343a40;
  transform: scale3d(0.5,0.5,0.5) translateZ(-100px);
  /*background-color: rgba(13, 104, 241, 0.397);*/
  background-color: #fffaf0;
}

#bottom {
  border: 2px solid #343a40;
  transform: scale3d(0.5,0.5,0.5) rotateX(-90deg) translateZ(100px);
  /*background-color: rgba(124, 238, 17, 0.315);*/
  background-color: #fffaf0;
}

#left {
  border: 2px solid #343a40;
  transform: scale3d(0.5,0.5,0.5) rotateY(-90deg) translateZ(100px);
  /*background-color: rgba(233, 10, 177, 0.432);*/
  background-color: #fffaf0;
}

#right {
  border: 2px solid #343a40;
  transform: scale3d(0.5,0.5,0.5) rotateY(90deg) translateZ(100px);
  /*background-color: rgba(238, 17, 17, 0.438);*/
  background-color: #fffaf0;
}
</style>
