<script setup lang="ts">
import {ref} from "vue";
import {ElMessageBox} from "element-plus";

const teamA = ref("红队")
const scoreA = ref(0)
const teamB = ref("蓝队")
const scoreB = ref(0)

function reset() {
  scoreA.value = 0
  scoreB.value = 0
}

function updateTeam(team: string) {
  ElMessageBox.prompt("请输入队伍名称", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputPattern: /^.{1,6}$/,
    inputErrorMessage: "队伍名称长度不能超过6个字符",
  }).then(({value}) => {
    team === "A"
        ? teamA.value = value
        : teamB.value = value
  })
}


</script>

<template>
  <el-container class="mainBoard">
    <el-main>
      <el-row :gutter="40">
        <el-col :span="12">
          <div class="scoreHeader" @click="updateTeam('A')">
            {{ teamA }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="scoreHeader" @click="updateTeam('B')">
            {{ teamB }}
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="40">
        <el-col :span="12">
          <el-card class="scoreCard">
            <div class="scoreBody" @click="scoreA++">
              {{ scoreA }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="scoreCard">
            <div class="scoreBody" @click="scoreB++">
              {{ scoreB }}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

    <el-footer>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-button type="primary" @click="()=>{if(scoreA>0)scoreA--}">{{ teamA }}扣1分</el-button>
          <el-button type="primary" @click="reset()">重置</el-button>
          <el-button type="primary" @click="()=>{if(scoreB>0)scoreB--}">{{ teamB }}扣1分</el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<style scoped lang="scss">
.mainBoard {
  background-color: #2a2e34;
}

.scoreCard {
  margin-top: 20px;
  background-color: #696969;
  height: 660px;
}

.scoreHeader {
  height: 60px;
  font-size: 60px;
  color: #e6a23c;
  text-align: center;
}
.scoreHeader:hover{
  color: #d9d9d9;
  cursor: pointer;
}

.scoreBody {
  color: #ffff00;
  height: 600px;
  font-weight: bolder;
  line-height: 600px;
  text-align: center;
  font-size: 500px;
}

.scoreBody:hover{
  color: #e1e115;
  cursor: pointer;
}
</style>
