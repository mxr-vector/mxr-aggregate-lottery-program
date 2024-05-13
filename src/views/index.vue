<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
import Dice from "@/components/Dice.vue";
import DrawTurntable from "@/components/DrawTurntable.vue";
import RandomDraw from "@/components/RandomDraw.vue";
import RandomSort from "@/components/RandomSort.vue";

const currentApply = ref(DrawTurntable);
const applyMap = new Map();

const curIdx = ref(0);

async function initData() {
  applyMap.set("随机轮盘", DrawTurntable);
  applyMap.set("骰子", Dice);
  applyMap.set("随机排序", RandomSort);
  applyMap.set("随机抽签器", RandomDraw);
}
function changeApply(idx: number, applyName: string) {
  curIdx.value = idx;
  currentApply.value = applyMap.get(applyName);
}

onBeforeMount(() => {
  initData();
});

onMounted(() => {});
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="headerTop">
        <el-row :gutter="20">
          <el-col
            :span="6"
            v-for="(applyName, index) in applyMap.keys()"
            :key="index"
          >
            <text
              :class="[curIdx == index ? 'textActive' : '']"
              @click="changeApply(index, applyName)"
            >
              {{ applyName }}
            </text>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <component :is="currentApply"></component>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.headerTop {
  height: 50px;
  background-color: #343a40;
  line-height: 50px;

  .el-col {
    text {
      user-select: none;
      cursor: pointer;
      color: #9a9481;
    }

    .textActive {
      color: white;
    }
  }
}
</style>
