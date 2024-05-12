<script setup lang="ts">
import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

const colors = ['#F0E68C', '#ADD8E6', '#F0FFF0', '#D3D3D3', '#FFB6C1', '#E0FFFF', '#EEE8AA', '#DB7093', '#FAFAD2', '#CD5C5C']
const title = ref('随机抽签器')
const isActive = ref(false)
const textarea = ref('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15')

interface RuleClassify {
  content: string,
  open: boolean
}

const classify = ref<RuleClassify[]>([])
const loading = ref(false)

function begin() {
  isActive.value = true; // 打开抽签器
  loading.value = true // 开始洗牌
  textarea.value.split('\n').map((item) => {
    classify.value.push({content: item, open: false});
  })
  KnuthShuffle(classify.value)
  setTimeout(() => {
    loading.value = false // 结束洗牌
  }, 2000)

}

function KnuthShuffle(array: RuleClassify[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function updateTitle() {
  ElMessageBox.prompt('请输入抽签标题', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
    inputErrorMessage: '标题不能为空',
  }).then(({value}) => {
    title.value = value;
    ElMessage.success('标题修改成功')
  }).catch(() => {
    ElMessage.info('取消修改')
  })
}
</script>

<template>
  <el-container>
    <el-aside width="900px">
      <h2>{{ title }}</h2>
      <template v-if="isActive">
        <div class="cardZ"
             v-loading="loading"
             element-loading-text="洗牌中..."
             element-loading-background="rgba(122, 122, 122, 0.8)">
          <div class="cardZItem"
               :style="{'background-color': colors[index % colors.length]}"
               v-for="(item, index) in classify"
               @click="item.open = true">
            <span v-if="item.open">{{ item.content }}</span>
          </div>
        </div>
      </template>

      <template v-else>
        <el-input
            v-model="textarea"
            :rows="15"
            type="textarea"
            :autosize="{ minRows: 15, maxRows: 15 }"
            placeholder="请输入抽签内容,每项以换行分隔"
        />
      </template>
    </el-aside>
    <el-main>
      <div>
        <el-button type="primary" @click="begin()">开始</el-button>
        <el-button>重置</el-button>
      </div>

      <div>
        <el-button @click="isActive=false">编辑</el-button>
        <el-button>显示全部</el-button>
        <el-button @click="updateTitle()">修改标题</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
.cardZ {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  .cardZItem {
    width: 280px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    margin: 5px;
  }
}

.el-aside {
  overflow: hidden;
}

</style>
