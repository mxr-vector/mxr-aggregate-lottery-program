<script setup lang="ts">
import { ref } from "vue";
import { KnuthShuffle } from "@/assets/ts/utils.ts";

const textarea = ref();
const loading = ref(false);
const origin = ref("");
function begin() {
  loading.value = true; // 开始洗牌
  origin.value = textarea.value;
  let tempArray: string[] = [];
  tempArray = textarea.value.split("\n");
  KnuthShuffle(tempArray);
  textarea.value = "";
  setTimeout(() => {
    tempArray.map((item, idx) => {
      textarea.value += item;
      if (idx < tempArray.length - 1) {
        textarea.value += "\n";
      }
    });
    loading.value = false; // 结束洗牌
  }, 2000);
}

function reset() {
  textarea.value = origin.value;
}
</script>

<template>
  <div class="randomSortMain">
    <el-container>
      <el-aside style="width: 450px">
        <el-input
          v-model="textarea"
          style="width: 240px"
          v-loading="loading"
          element-loading-text="排序中..."
          element-loading-background="rgba(122, 122, 122, 0.8)"
          :rows="8"
          type="textarea"
          placeholder="请输入排序内容,每项以换行分隔"
        >
        </el-input>

        <el-button style="margin-left: 10px" @click="begin()" type="primary">随机化</el-button>
        <el-button @click="reset()">复原</el-button>
      </el-aside>
      <el-main style="width: 500px">
        <div class="description">
          <h3>随机排序算法说明</h3>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;本功能采用Fisher-Yates(Knuth shuffle)随机排序算法，确保每次排序结果都是完全随机且公正的。使用方法非常简单：每行输入一个项目（每个项目占一行），点击"随机化"按钮后，系统会对所有项目进行随机排序并显示结果。如果需要恢复原始顺序，只需点击"复原"按钮即可。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;随机排序功能适用于多种场景，如抽签顺序确定、比赛对阵安排、任务分配等需要随机性的情况。系统会在排序过程中显示加载动画，并在完成后立即展示结果，操作简单直观。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;请注意，本功能提供的随机结果仅供参考，使用者应确保自己的行为符合相关法律法规。
          </p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.randomSortMain {
  min-height: 400px;
  .el-textarea {
    width: 450px !important;
    height: 400px !important;
    text-align: center;
    line-height: 80px;
    margin: 5px;
    font-size: 32px;
    font-weight: bolder;
    :v-deep .el-textarea__inner {
      height: 100%;
    }
  }
  
  .description {
    padding: 10px 20px;
    border-radius: 8px;
    margin-top: 10px;
    
    p {
      text-indent: 2em;
      line-height: 1.6;
      margin-bottom: 15px;
      font-size: 14px;
    }
  }
}
</style>
