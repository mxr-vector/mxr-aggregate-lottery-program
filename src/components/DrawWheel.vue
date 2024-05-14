<script setup lang="ts">
import { onMounted, reactive, watch, ref } from "vue"; // 导入Vue的onMounted生命周期钩子

let canvas: HTMLCanvasElement | null = null; // 定义Canvas元素变量
let ctx: CanvasRenderingContext2D | null = null; // 定义2D上下文变量
let rotating = ref(false); // 标志位，表示是否正在旋转
let randomNumber: number = parseFloat((0.5 + Math.random()).toFixed(2)); // 随机数
const dpr = window.devicePixelRatio; // 获取设备像素比
let centerX: number; // 定义圆心X坐标变量
let centerY: number; // 定义圆心Y坐标变量
let rotateTimer: NodeJS.Timeout | null = null; // 定义定时器变量
let rotateTime: number = 3000 * randomNumber; // 旋转时间
let rotationAngle: number = 0;
let divideContentList = reactive([
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
]);
const colorArray = reactive<string[]>(
  divideContentList.map(() => randomLightColor())
);

onMounted(() => {
  // 获取 Canvas 元素和 2D 上下文
  canvas = document.getElementById("clockCanvas") as HTMLCanvasElement; // 获取Canvas元素
  if (canvas) {
    ctx = canvas.getContext("2d"); // 获取2D上下文

    if (ctx) {
      //此段代码是为了让canvas更清晰
      const { width, height } = canvas;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.scale(dpr, dpr);

      centerX = canvas.width / (2 * dpr); // 计算圆心X坐标
      centerY = canvas.height / (2 * dpr); // 计算圆心Y坐标
      ctx.translate(centerX, centerY); // 平移至圆心
      drawClock(); // 如果成功获取到2D上下文，则绘制

    }
  }
});

// 初始绘制整个时钟
function drawClock(): void {
  if (!canvas || !ctx) return; // 如果Canvas元素或2D上下文不存在，则返回

  drawClockFace(0, 0); // 绘制的外圆
  fillColorSectors(0, 0); // 填充颜色
  drawClockNumbers(0, 0); // 绘制的数字
  // 请求下一帧动画
  // requestAnimationFrame(drawClock);
}


// 绘制背景圆
function drawClockFace(centerX: number, centerY: number): void {
  if (!ctx) return; // 如果2D上下文不存在，则返回

  ctx.beginPath(); // 开始路径
  ctx.arc(centerX, centerY, 240, 0, Math.PI * 2); // 绘制圆形
  ctx.lineWidth = 2; // 设置线宽
  ctx.strokeStyle = "#000"; // 设置描边颜色
  ctx.stroke(); // 绘制描边
  ctx.closePath(); // 结束路径

}


// 绘制数字
function drawClockNumbers(centerX: number, centerY: number): void {
  if (!ctx) return;

  const radius = 200; // 数字的半径距离，相对于圆心
  const fontSize = 30 * dpr; // 数字的字体大小
  
  let angleIncrement = (Math.PI * 2) / divideContentList.length;// 每份的角度
  ctx.font = `${fontSize}px Arial`; // 设置字体样式
  ctx.fillStyle = "black";
  ctx.textBaseline = "middle"; // 文字垂直居中
  ctx.textAlign = "center"; // 文字水平居中

  for (let i = 0; i < divideContentList.length; i++) {

    const startAngle = angleIncrement * i;
    const endAngle = angleIncrement * (i + 1);
    const angleForText = (startAngle + endAngle) / 2; // 文字居中显示的角度
    const x = centerX + radius  * Math.cos(angleForText);
    const y = centerY + radius  * Math.sin(angleForText);

    ctx.fillText(divideContentList[i], x, y); // 绘制数字
  }

}
// 返回随机浅色调颜色
function randomLightColor(): string {

  const fixedLightColors: string[] = [
  'rgb(238,231,205)', // 陶土色
  '#C586C0', // 浅珊瑚色
  'rgb(147,112,219)', // 浅紫罗兰色
  'rgb(255,160,122)', // 浅橙色
  'rgb(148,255,148)', // 浅绿色
  '#FEE082', // 浅黄色
  "skyblue",// 浅蓝色
  ];
  const randomIndex = Math.floor(Math.random() * fixedLightColors.length);
  console.log(randomIndex)
  return fixedLightColors[randomIndex];
}

// 填充颜色
function fillColorSectors(centerX: number, centerY: number): void {
  if (!ctx) return;

  let angleI = (Math.PI * 2) / divideContentList.length;
  
  for (let i = 0; i < divideContentList.length; i++) {
    const beginAngle = angleI * i;
    const nextAngle = angleI * (i + 1);
    ctx.beginPath();
    ctx.arc(centerX, centerY, 240, beginAngle, nextAngle); // 绘制扇形
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = colorArray[i]; // 使用固定颜色数组中的颜色
    ctx.fill();
    ctx.closePath();
  }
}

// 监听数组变化  重绘
watch(divideContentList, () => {
  ctx?.clearRect(-centerX, -centerY, canvas!.width, canvas!.height); // 清空画布
  drawClock();
});

// 添加数据
function addData() {
  divideContentList.push("新增");
  colorArray.push(randomLightColor())
}
// 重置
function redraw() {
  ctx?.clearRect(-centerX, -centerY, canvas!.width, canvas!.height); // 清空画布
  ctx?.rotate(-rotationAngle); // 旋转到初始状态
  rotationAngle = 0;
  drawClock();
}

// 旋转
function rotateCircular() {
  // console.log(divideContentList);
  if (!canvas || !ctx) return; // 如果Canvas元素或2D上下文不存在，则返回
  ctx?.save();
  randomNumber = parseFloat((0.5 + Math.random()).toFixed(2));
  // console.log(randomNumber);
  const accelerationTime: number = rotateTime / 5; // 加速时间
  const decelerationTime: number = accelerationTime; // 减速时间
  let alRotatedTime: number = 0; // 旋转时间
  let rotationSpeed: number = 0.01 * randomNumber; // 旋转速度

  if (!rotating.value) {
    rotating.value = true; // 开始旋转

    rotateTimer = setInterval(() => {
      ctx?.clearRect(-centerX, -centerY, canvas!.width, canvas!.height); // 清空画布
      alRotatedTime += 16; // 旋转时间累加
      // console.log("时间", alRotatedTime, "速度", rotationSpeed);
      if (alRotatedTime < accelerationTime) {
        // 如果加速时间未到，则加速
        // console.log("加速");
        rotationSpeed += 0.002;
      } else if (alRotatedTime > decelerationTime || rotationSpeed > 0.3) {
        // 如果加速时间已到，则减速
        // console.log("减速");
        rotationSpeed >= 0 ? (rotationSpeed -= 0.0005) : ""; // 防止速度为负
      }
      drawClock(); // 绘制
      ctx?.rotate(rotationSpeed * Math.PI);
      rotationAngle += rotationSpeed * Math.PI;
    }, 16); // 每16毫秒旋转一次
    setTimeout(() => {
      clearInterval(rotateTimer!); // 停止旋转
      rotating.value = false; // 标志位重置
    }, rotateTime); // 旋转n秒后停止
  }
}
</script>

<template>
  <div class="turnMain">
    <div class="turnContent">
      <canvas id="clockCanvas" width="500" height="500"></canvas>
      <el-button type="primary" @click="rotateCircular">旋转</el-button>
      <el-button :disabled="rotating" @click="redraw">重置</el-button>
      <div class="result"></div>
    </div>
    <div class="control">
      <div
        class="controlItem"
        v-for="(item, index) in divideContentList"
        :key="index"
      >
        <input
          type="text"
          :value="item"
          @input="
            (e) => {
              divideContentList[index] = (e.target as HTMLInputElement).value;
            }
          "
        />
        <div class="deleteItem" @click="divideContentList.splice(index, 1)">
          删除
        </div>
      </div>
      <el-button :disabled="rotating" @click="addData">新增</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.turnMain {
  display: flex;
  justify-content: center;
}

.turnContent {
  position: relative;
  width: 500px;

  canvas {
    border: 1px solid #000;
  }

  .result {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 35px solid #5ddf61; /* 箭头颜色 */
    z-index: 5;
    top: 238px;
    right: 0;
  }
}

.control {
  width: 200px;
  margin-left: 50px;
  border: 1px solid #000;
  padding: 5px;

  .controlItem {
    display: flex;
    padding-bottom: 5px;
    position: relative;

    .deleteItem {
      display: none; /* 默认隐藏删除按钮 */
      position: absolute; /* 绝对定位使按钮位于控件项内部 */
      top: 0; /* 调整按钮位置 */
      right: 0; /* 使其靠右显示 */
      background-color: #fe2416; /* 示例背景色 */
      color: white; /* 文本颜色 */
      padding: 0 5px; /* 内边距 */
      cursor: pointer;
      font-size: 14px;
      line-height: 18px;
      border-radius: 5px;
    }
  }

  .controlItem:hover .deleteItem {
    display: block;
  }

  .controlItem:hover input {
    background-color: #e8e8e8;
  }

  input {
    flex: 1;
    width: 100%;
    outline: none;
    border: none;
    padding: 0;
    font-size: 18px;
  }
}
</style>
