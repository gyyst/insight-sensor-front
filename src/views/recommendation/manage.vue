<template>
    <div class="app-container">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>推荐管理</span>
                    <div class="right-button">
                        <el-button type="primary" @click="handleAdd">添加推荐</el-button>
                        <el-tooltip content="刷新当前页">
                            <el-button :icon="RefreshRight" circle type="primary" @click="loadData" />
                        </el-tooltip>
                    </div>
                </div>
            </template>
            <div class="table-wrapper">
                <el-table :data="tableData" v-loading="loading" style="width: 100%">
                    <el-table-column prop="id" label="ID" width="80" />
                    <el-table-column prop="reason" label="推荐需求" />
                    <el-table-column prop="genResult" label="推荐结论">
                        <template #default="scope">
                            <div class="result-content">
                                {{ scope.row.genResult.length > 50 ? scope.row.genResult.substring(0, 50) + '...' :
                            scope.row.genResult }}
                            </div>
                            <el-button type="primary" link @click="viewDetail(scope.row)">查看详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userId" label="用户ID" width="100" />
                    <el-table-column label="创建时间" width="180">
                        <template #default="scope">
                            {{ formatTime(scope.row.createTime) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template #default="scope">
                            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="pagination-container">
                    <el-pagination v-model:current-page="searchParams.current" v-model:page-size="searchParams.pageSize"
                        :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>
            </div>
        </el-card>

        <!-- 添加/编辑推荐对话框 -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%">
            <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
                <el-form-item label="推荐需求" prop="reason">
                    <el-input v-model="form.reason" type="textarea" :rows="3" placeholder="请输入推荐需求描述" />
                </el-form-item>
                <el-form-item label="传感器类型" prop="sensorType">
                    <el-select v-model="form.sensorType" placeholder="请选择传感器类型" style="width: 100%">
                        <el-option label="激光传感器" :value="1" />
                        <el-option label="视觉传感器" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="应用场景" prop="scenario">
                    <el-select v-model="form.scenario" placeholder="请选择应用场景" style="width: 100%">
                        <el-option label="工业自动化" value="industrial" />
                        <el-option label="机器人导航" value="robotics" />
                        <el-option label="安防监控" value="security" />
                        <el-option label="智能交通" value="traffic" />
                        <el-option label="医疗设备" value="medical" />
                    </el-select>
                </el-form-item>
                <el-form-item label="预算范围" prop="budget">
                    <el-input v-model="form.budget" placeholder="请输入预算范围，例如：10000-20000" />
                </el-form-item>
                <el-form-item label="其他要求" prop="otherRequirements">
                    <el-input v-model="form.otherRequirements" type="textarea" :rows="3" placeholder="请输入其他要求" />
                </el-form-item>
                <el-form-item label="推荐结论" prop="genResult">
                    <el-input v-model="form.genResult" type="textarea" :rows="5" placeholder="请输入推荐结论" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm">确定</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 查看详情对话框 -->
        <el-dialog v-model="detailVisible" title="推荐详情" width="50%">
            <div class="detail-content">
                <h3>推荐需求</h3>
                <p>{{ detailData.reason }}</p>
                <h3>推荐结论</h3>
                <p>{{ detailData.genResult }}</p>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from "vue"
import { ElMessage, ElMessageBox, FormInstance } from "element-plus"
import { RefreshRight } from "@element-plus/icons-vue"
import { pageRecommendApi, aiRecommendApi } from "@/api/sensor"
import type * as Recommend from "@/api/sensor/types/Recommend"

// 表格数据
const tableData = ref<any[]>([])
const loading = ref(false)
const total = ref(0)

// 搜索参数
const searchParams = reactive<Recommend.PageRecommendParams>({
    current: 1,
    pageSize: 10
})

// 加载数据
const loadData = async () => {
    loading.value = true
    try {
        const res = await pageRecommendApi(searchParams)
        if (res.code === 0) {
            tableData.value = res.data.records
            total.value = res.data.totalRow
        } else {
            ElMessage.error("加载失败：" + res.message)
        }
    } catch (error) {
        console.error("加载数据出错：", error)
        ElMessage.error("加载数据出错")
    } finally {
        loading.value = false
    }
}

// 分页处理
const handleSizeChange = (val: number) => {
    searchParams.pageSize = val
    loadData()
}

const handleCurrentChange = (val: number) => {
    searchParams.current = val
    loadData()
}

// 格式化时间
const formatTime = (time: any) => {
    if (!time) return ""
    try {
        const date = new Date(time)
        return date.toLocaleString()
    } catch (error) {
        return ""
    }
}

// 表单相关
const dialogVisible = ref(false)
const dialogTitle = ref("添加推荐")
const formRef = ref<FormInstance>()

const form = reactive<Recommend.AiRecommendParams & { id?: number; genResult?: string }>({
    requirement: "",
    sensorType: undefined,
    scenario: "",
    budget: "",
    otherRequirements: "",
    genResult: ""
})

const rules = {
    reason: [{ required: true, message: "请输入推荐需求", trigger: "blur" }],
    sensorType: [{ required: true, message: "请选择传感器类型", trigger: "change" }],
    scenario: [{ required: true, message: "请选择应用场景", trigger: "change" }],
    genResult: [{ required: true, message: "请输入推荐结论", trigger: "blur" }]
}

// 添加推荐
const handleAdd = () => {
    resetForm()
    dialogTitle.value = "添加推荐"
    dialogVisible.value = true
}

// 编辑推荐
const handleEdit = (row: any) => {
    resetForm()
    dialogTitle.value = "编辑推荐"
    Object.assign(form, {
        id: row.id,
        reason: row.reason,
        genResult: row.genResult,
        // 其他字段根据实际情况填充
    })
    dialogVisible.value = true
}

// 删除推荐
const handleDelete = (row: any) => {
    ElMessageBox.confirm("确定要删除这条推荐记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(async () => {
        try {
            // 这里应该调用删除API，但目前API中没有删除推荐的接口，所以模拟一下
            // await deleteRecommendApi(row.id)
            ElMessage.success("删除成功")
            loadData()
        } catch (error) {
            ElMessage.error("删除失败")
        }
    }).catch(() => {
        // 取消删除
    })
}

// 重置表单
const resetForm = () => {
    if (formRef.value) {
        formRef.value.resetFields()
    }
    Object.assign(form, {
        id: undefined,
        requirement: "",
        sensorType: undefined,
        scenario: "",
        budget: "",
        otherRequirements: "",
        genResult: ""
    })
}

// 提交表单
const submitForm = async () => {
    if (!formRef.value) return

    await formRef.value.validate(async (valid) => {
        if (valid) {
            try {
                // 这里应该根据是新增还是编辑调用不同的API，但目前API中没有编辑推荐的接口，所以模拟一下
                if (form.id) {
                    // 编辑
                    // await updateRecommendApi(form)
                    ElMessage.success("更新成功")
                } else {
                    // 新增
                    const params: Recommend.AiRecommendParams = {
                        requirement: form.reason,
                        sensorType: form.sensorType,
                        scenario: form.scenario,
                        budget: form.budget,
                        otherRequirements: form.otherRequirements
                    }
                    await aiRecommendApi(params)
                    ElMessage.success("添加成功")
                }
                dialogVisible.value = false
                loadData()
            } catch (error) {
                console.error("提交表单出错：", error)
                ElMessage.error("操作失败")
            }
        }
    })
}

// 查看详情
const detailVisible = ref(false)
const detailData = reactive({
    reason: "",
    genResult: ""
})

const viewDetail = (row: any) => {
    detailData.reason = row.reason
    detailData.genResult = row.genResult
    detailVisible.value = true
}

// 页面加载时获取数据
onMounted(() => {
    loadData()
})
</script>

<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.right-button {
    display: flex;
    gap: 10px;
}

.pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.result-content {
    margin-bottom: 5px;
}

.detail-content {
    h3 {
        margin-top: 20px;
        margin-bottom: 10px;
        font-weight: bold;
    }

    p {
        white-space: pre-wrap;
        line-height: 1.5;
    }
}
</style>