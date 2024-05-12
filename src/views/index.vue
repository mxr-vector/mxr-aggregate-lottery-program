<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import Dice from "@/components/Dice.vue";
import DrawTurntable from "@/components/DrawTurntable.vue";
import RandomDraw from "@/components/RandomDraw.vue";
import RandomSort from "@/components/RandomSort.vue";

const currentApply = ref(DrawTurntable)
const applyMap = new Map()

async function initData() {
  applyMap.set('随机轮盘', DrawTurntable);
  applyMap.set('骰子', Dice);
  applyMap.set('随机排序', RandomSort);
  applyMap.set('随机抽签器', RandomDraw);
}

onBeforeMount(() => {
  initData()
})

onMounted(() => {
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(applyName,index) in applyMap.keys()"
                  :key="index">
            <a href="javascript:void(0);" @click="currentApply = applyMap.get(applyName)">
              {{ applyName }}
            </a>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <component :is="currentApply"></component>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>

</style>
