<script setup lang="ts">
import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {formatTime, KnuthShuffle} from "@/assets/ts/utils.ts";

const colors = ['#F0E68C', '#ADD8E6', '#F0FFF0', '#D3D3D3', '#FFB6C1', '#E0FFFF', '#EEE8AA', '#DB7093', '#FAFAD2', '#CD5C5C']
const startText = ref('开始') // 开始按钮文字
const title = ref('随机抽签器') // 标题
const isActive = ref(false) // 抽签器开关
const textarea = ref('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15') // 默认值

interface RuleClassify {
  content: string,
  open: boolean,
  date: string
}

const classify = ref<RuleClassify[]>([])
const loading = ref(false)

function begin() {
  classify.value = [] // 清空抽签器
  tableData.value = [] // 清空计数列表
  isActive.value = true; // 打开抽签器
  loading.value = true // 开始洗牌
  startText.value = '重新开始'
  textarea.value.split('\n').map((item) => {
    classify.value.push({content: item, open: false,date: formatTime(new Date())});
  })
  KnuthShuffle(classify.value)
  setTimeout(() => {
    loading.value = false // 结束洗牌
  }, 2000)

}


interface RuleTableData {
  content: string,
  date: string
}

const tableData = ref<RuleTableData[]>([]) // 抽签器数据
function pushTableData(item: RuleClassify) {
  if (!item.open) {
    item.open = true; // 打开卡牌结果
    tableData.value.push(item)
  }
}

function getAllCard() {
  classify.value.map((item) => {
    item.open = true
  })
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
               @click="pushTableData(item)">
            <span v-if="item.open">{{ item.content }}</span>
          </div>
        </div>
      </template>

      <template v-else>
        <el-input
            class="textareaStyle"
            v-model="textarea"
            :rows="8"
            type="textarea"
            placeholder="请输入抽签内容,每项以换行分隔"
        />
      </template>
    </el-aside>
    <el-main>
      <div>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;本系统采用Fisher-Yates随机排序法，确保每位用户都能得到公正的结果。只需简单地每行输入一个项目，即每个项目占一行。一旦点击“开始”，你的输入将会变为卡片形式，并随即进行混洗和翻转，增添趣味性。而且，为了让游戏更加个性化，你可以自由编辑卡片标题。但请注意，我们恳请各位保持诚实，不要尝试通过邮件要求特殊优待哦！</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;请确保你的行为符合当地的法律法规，任何违规操作的责任将由用户自行承担。此外，本页面所提供的服务是“现状”提供的，没有任何形式的保证，无论明示或暗示。让我们一起享受公平且愉快的体验吧！</p>
      </div>
      <div>
        <el-button type="primary" @click="begin()" size="large">{{ startText }}</el-button>
        <el-button @click="getAllCard()" size="large">显示全部</el-button>
      </div>
      <div>
        <el-button @click="isActive=false" size="large">编辑</el-button>
        <el-button @click="updateTitle()" size="large">修改标题</el-button>
      </div>
    </el-main>
  </el-container>


  <el-table :data="tableData"
            style="width: 100%"
            border
            empty-text="暂无数据">
    <el-table-column type="index" label="序列" align="center" width="80"/>
    <el-table-column prop="content" label="结果" align="center"/>
    <el-table-column prop="date" label="时间" align="center"/>
  </el-table>
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
    font-size: 32px;
    font-weight: bolder;
  }
}

.el-aside {
  overflow: hidden;
}

.textareaStyle {
  font-size: 32px;
  font-weight: bolder;
}

</style>
