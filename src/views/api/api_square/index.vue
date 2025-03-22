<script lang="ts" setup>
import { Refresh, Search } from "@element-plus/icons-vue"
import { onMounted, reactive, ref, watch } from "vue"
import { usePagination } from "@/hooks/usePagination"
import { searchApiInfo } from "@/api/api"
import router from "@/router"

defineOptions({
  // 命名当前组件
  name: "square"
})
onMounted(() => {
  handleSearch()
})
const tableData = ref([])
const loading = ref<boolean>(false)
// const dialogVisible = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
const searchData = reactive({
  searchKey: ""
})
const getApiInfo = () => {
  loading.value = true
  searchApiInfo({
    current: paginationData.currentPage,
    pageSize: paginationData.pageSize,
    searchText: searchData.searchKey || undefined
  })
    .then((res) => {
      paginationData.total = res.data.totalRow
      tableData.value = res.data.records
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? getApiInfo() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  // searchFormRef.value?.resetFields()
  searchData.searchKey = ""
  handleSearch()
}
/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], true, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" class="search-wrapper" shadow="never">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item label="查询关键词" prop="name">
          <el-input v-model="searchData.searchKey" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button :icon="Search" type="primary" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <!--      <div class="toolbar-wrapper">-->
      <!--        <div>-->
      <!--          <el-button :icon="CirclePlus" type="primary" @click="dialogVisible = true">新增api</el-button>-->
      <!--          <el-button :icon="Delete" type="danger">批量删除</el-button>-->
      <!--          <el-tooltip content="刷新当前页">-->
      <!--            <el-button :icon="RefreshRight" circle type="primary" @click="true" />-->
      <!--          </el-tooltip>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column align="center" label="apiId" prop="id" />
          <el-table-column align="center" label="名称" prop="name" />
          <el-table-column align="center" label="概要介绍" prop="description" />
          <el-table-column align="center" fixed="right" label="操作" width="150">
            <template #default="scope">
              <el-button
                bg
                size="small"
                text
                type="primary"
                @click="
                  router.push({
                    name: 'api_detail',
                    params: { apiId: scope.row.id }
                  })
                "
                >详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          :currentPage="paginationData.currentPage"
          :layout="paginationData.layout"
          :page-size="paginationData.pageSize"
          :page-sizes="paginationData.pageSizes"
          :total="parseInt(paginationData.total)"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;

  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
