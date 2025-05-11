<script setup lang="ts">
import { ref } from "vue";
import { KnuthShuffle } from "@/assets/ts/utils.ts";

// 输入区域的内容
const textarea = ref("张三\n李四\n王五\n赵六\n钱七\n孙八\n周九\n吴十");
// 分组方式：按人数分组或按组数分组
const groupMode = ref("byNumber"); // byNumber: 按每组人数, byGroup: 按组数
// 每组人数或组数
const groupValue = ref(3);
// 分组结果
const groupResult = ref<Array<Array<string>>>([]);
// 加载状态
const loading = ref(false);

// 开始分组
function beginGroup() {
  loading.value = true;
  
  // 获取所有名称并去除空行
  const names = textarea.value
    .split("\n")
    .filter(name => name.trim() !== "");
  
  // 使用洗牌算法打乱顺序
  KnuthShuffle(names);
  
  // 清空之前的分组结果
  groupResult.value = [];
  
  // 根据分组方式进行分组
  if (groupMode.value === "byNumber") {
    // 按每组人数分组
    const peoplePerGroup = Math.max(1, groupValue.value);
    const totalGroups = Math.ceil(names.length / peoplePerGroup);
    
    for (let i = 0; i < totalGroups; i++) {
      const start = i * peoplePerGroup;
      const end = Math.min(start + peoplePerGroup, names.length);
      groupResult.value.push(names.slice(start, end));
    }
  } else {
    // 按组数分组
    const totalGroups = Math.max(1, Math.min(groupValue.value, names.length));
    const groups: Array<Array<string>> = Array(totalGroups).fill(null).map(() => []);
    
    // 将人员分配到各组
    names.forEach((name, index) => {
      const groupIndex = index % totalGroups;
      groups[groupIndex].push(name);
    });
    
    groupResult.value = groups;
  }
  
  // 模拟分组过程的延迟
  setTimeout(() => {
    loading.value = false;
  }, 1500);
}

// 重置分组
function reset() {
  groupResult.value = [];
}
</script>

<template>
  <div class="randomGroupMain">
    <el-container>
      <el-aside width="400px">
        <el-input
          v-model="textarea"
          :rows="10"
          type="textarea"
          placeholder="请输入名称列表,每个名称占一行"
          class="nameInput"
        />
        
        <div class="groupSettings">
          <el-radio-group v-model="groupMode" class="modeSelect">
            <el-radio label="byNumber">按每组人数</el-radio>
            <el-radio label="byGroup">按组数</el-radio>
          </el-radio-group>
          
          <el-input-number 
            v-model="groupValue" 
            :min="1" 
            :max="20"
            size="large"
            :placeholder="groupMode === 'byNumber' ? '每组人数' : '分组数'"
          />
        </div>
        
        <div class="actionButtons">
          <el-button 
            type="primary" 
            @click="beginGroup()" 
            size="large"
            :loading="loading"
          >
            开始分组
          </el-button>
          <el-button @click="reset()" size="large">重置</el-button>
        </div>
      </el-aside>
      
      <el-main>
        <div class="algorithmInfo">
          <h3>随机分组算法说明</h3>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;本系统采用Fisher-Yates(Knuth shuffle)随机排序法对名单进行打乱，确保每个人被分配到各组的概率相等，从而保证分组结果的公平性。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;分组过程首先将所有名称随机打乱顺序，然后根据用户选择的分组方式（按每组人数或按组数）将打乱后的名单依次分配到各个组中。当按每组人数分组时，最后一组的人数可能会少于设定值；当按组数分组时，系统会尽量保证各组人数均衡。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;请确保输入的名单中每个名称占一行，且不包含重复名称，以获得最佳的分组效果。
          </p>
        </div>
        
        <div 
          v-loading="loading"
          element-loading-text="分组中..."
          element-loading-background="rgba(122, 122, 122, 0.8)"
          class="groupResult"
        >
          <template v-if="groupResult.length > 0">
            <div 
              v-for="(group, groupIndex) in groupResult" 
              :key="groupIndex"
              class="groupCard"
            >
              <h3>第{{ groupIndex + 1 }}组</h3>
              <div class="groupMembers">
                <el-tag 
                  v-for="(member, memberIndex) in group" 
                  :key="memberIndex"
                  size="large"
                  class="memberTag"
                >
                  {{ member }}
                </el-tag>
              </div>
            </div>
          </template>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.randomGroupMain {
  min-height: 500px;
  
  .nameInput {
    width: 100%;
    margin-bottom: 20px;
    font-size: 16px;
  }
  
  .groupSettings {
    margin: 20px 0;
    
    .modeSelect {
      margin-bottom: 15px;
    }
  }
  
  .actionButtons {
    margin-top: 20px;
  }
  
  .algorithmInfo {
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    h3 {
      margin-top: 0;
    }
    
    p {
      text-align: justify;
      line-height: 1.6;
    }
  }
  
  .groupResult {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    min-height: 200px;
    
    .groupCard {
      flex: 1 1 300px;
      border: 1px solid #dcdfe6;
      border-radius: 8px;
      padding: 15px;
      background-color: #f0f9eb;
      
      h3 {
        margin-top: 0;
        color: #409eff;
        border-bottom: 1px solid #e4e7ed;
        padding-bottom: 10px;
      }
      
      .groupMembers {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        
        .memberTag {
          margin: 5px;
        }
      }
    }
  }
}
</style>