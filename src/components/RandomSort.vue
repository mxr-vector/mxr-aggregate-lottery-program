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
    <h2>随机排序</h2>
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
  </div>
</template>

<style scoped lang="scss">
.randomSortMain {
  min-height: 400px;
  .el-textarea {
    width: 450px !important;
    height: 400px !important;
    ::v-deep .el-textarea__inner {
      height: 100%;
    }
  }
}
</style>
