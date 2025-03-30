<template>
    <div class="app-container">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>厂商管理</span>
                    <el-button v-if="checkPermission(['admin'])" type="primary" @click="handleAddBrand">添加厂商</el-button>
                </div>
            </template>
            <div class="card-content">
                <el-table :data="tableData" style="width: 100%" v-loading="loading">
                    <el-table-column prop="id" label="ID" />
                    <el-table-column prop="brandName" label="厂商名称" />
                    <el-table-column prop="description" label="描述" />
                    <el-table-column prop="country" label="所属国家" />
                    <el-table-column prop="website" label="官网">
                        <template #default="scope">
                            <a v-if="scope.row.website" :href="scope.row.website" target="_blank">{{ scope.row.website
                                }}</a>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="140">
                        <template #default="scope">
                            <el-button v-if="checkPermission(['admin'])" size="small"
                                @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button v-if="checkPermission(['admin'])" size="small" type="danger"
                                @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-container">
                    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                        :page-sizes="[10, 20, 30, 50]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>

                <!-- 添加/编辑对话框 -->
                <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%">
                    <el-form :model="formData" label-width="120px">
                        <el-form-item label="厂商名称" required>
                            <el-input v-model="formData.brandName" />
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="formData.description" type="textarea" :rows="3" />
                        </el-form-item>
                        <el-form-item label="所属国家">
                            <el-input v-model="formData.country" />
                        </el-form-item>
                        <el-form-item label="官网">
                            <el-input v-model="formData.website" placeholder="如 https://www.example.com" />
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogVisible = false">取消</el-button>
                            <el-button type="primary" @click="submitForm">确定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { pageBrandApi, removeBrandApi, getInfoBrandApi, saveBrandApi, updateBrandApi } from "@/api/sensor"
import type { PageBrandRes, GetInfoBrandRes } from "@/api/sensor/types/SensorBrand"
import { checkPermission } from "@/utils/permission" // 引入权限检查函数

interface BrandForm {
    id?: number
    brandName: string
    description?: string
    country?: string
    website?: string
}

const tableData = ref<PageBrandRes["data"]["records"]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 对话框相关
const dialogVisible = ref(false)
const dialogTitle = ref("添加厂商")
const formData = reactive<BrandForm>({
    brandName: "",
    description: "",
    country: "",
    website: ""
})

// 获取厂商列表
const fetchBrandList = () => {
    loading.value = true
    pageBrandApi({
        current: currentPage.value,
        pageSize: pageSize.value
    })
        .then(res => {
            if (res.code === 0) {
                tableData.value = res.data.records
                total.value = res.data.totalRow
            } else {
                ElMessage.error(res.message || "获取数据失败")
            }
        })
        .catch(error => {
            console.error("获取厂商列表失败:", error)
            ElMessage.error("获取数据失败，请稍后重试")
        })
        .finally(() => {
            loading.value = false
        })
}

// 添加厂商
const handleAddBrand = () => {
    dialogTitle.value = "添加厂商"
    // 重置表单
    Object.assign(formData, {
        id: undefined,
        brandName: "",
        description: "",
        country: "",
        website: ""
    })
    dialogVisible.value = true
}

// 编辑厂商
const handleEdit = (row: PageBrandRes["data"]["records"][0]) => {
    dialogTitle.value = "编辑厂商"
    getInfoBrandApi(row.id)
        .then(res => {
            if (res.code === 0) {
                // 填充表单数据
                Object.assign(formData, {
                    id: res.data.id,
                    brandName: res.data.brandName,
                    description: res.data.description,
                    country: res.data.country,
                    website: res.data.website
                })
                dialogVisible.value = true
            } else {
                ElMessage.error(res.message || "获取厂商详情失败")
            }
        })
        .catch(error => {
            console.error("获取厂商详情失败:", error)
            ElMessage.error("获取厂商详情失败，请稍后重试")
        })
}

// 删除厂商
const handleDelete = (row: PageBrandRes["data"]["records"][0]) => {
    ElMessageBox.confirm(`确定要删除厂商 ${row.brandName} 吗?`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    })
        .then(() => {
            removeBrandApi(row.id)
                .then(res => {
                    if (res.code === 0 && res.data) {
                        ElMessage.success("删除成功")
                        // 重新获取列表数据
                        fetchBrandList()
                    } else {
                        ElMessage.error(res.message || "删除失败")
                    }
                })
                .catch(error => {
                    console.error("删除厂商失败:", error)
                    ElMessage.error("删除失败，请稍后重试")
                })
        })
        .catch(() => {
            ElMessage.info("已取消删除")
        })
}

// 提交表单
const submitForm = () => {
    if (!formData.brandName) {
        ElMessage.warning("请输入厂商名称")
        return
    }

    if (formData.id) {
        // 更新
        updateBrandApi({
            id: formData.id,
            brandName: formData.brandName,
            description: formData.description,
            country: formData.country,
            website: formData.website
        })
            .then(res => {
                if (res.code === 0 && res.data) {
                    ElMessage.success("更新成功")
                    dialogVisible.value = false
                    fetchBrandList()
                } else {
                    ElMessage.error(res.message || "更新失败")
                }
            })
            .catch(error => {
                console.error("提交表单失败:", error)
                ElMessage.error("操作失败，请稍后重试")
            })
    } else {
        // 新增
        saveBrandApi({
            brandName: formData.brandName,
            description: formData.description,
            country: formData.country,
            website: formData.website
        })
            .then(res => {
                if (res.code === 0 && res.data) {
                    ElMessage.success("添加成功")
                    dialogVisible.value = false
                    fetchBrandList()
                } else {
                    ElMessage.error(res.message || "添加失败")
                }
            })
            .catch(error => {
                console.error("提交表单失败:", error)
                ElMessage.error("操作失败，请稍后重试")
            })
    }
}

const handleSizeChange = (val: number) => {
    pageSize.value = val
    fetchBrandList()
}

const handleCurrentChange = (val: number) => {
    currentPage.value = val
    fetchBrandList()
}

onMounted(() => {
    fetchBrandList()
})
</script>

<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.el-form-item {
    margin-bottom: 20px;
}
</style>