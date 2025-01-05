<template>
  <div id="UserManageView">
    <!--  搜索条件  -->
    <a-form class="search" layout="inline" :model="searchParams">
      <a-form-item label="用户名">
        <a-input v-model:value="searchParams.username" placeholder="请输入用户名" allow-clear />
      </a-form-item>
      <a-form-item label="昵称">
        <a-input v-model:value="searchParams.nickname" placeholder="请输入昵称" allow-clear />
      </a-form-item>
      <a-form-item label="创建时间">
        <a-range-picker
          v-model:value="searchParams.createTimeRange"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="fetchData(1)">搜索</a-button>
      </a-form-item>
    </a-form>
    <div style="margin-bottom: 20px"></div>
    <!--  数据展示  -->
    <a-table
      :columns="columns"
      :data-source="dataList"
      :pagination="pagination"
      @change="handleTableChange"
      :loading="loading"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'avatar'">
          <a-image :src="record.avatar" :width="50"></a-image>
        </template>
        <template v-if="column.dataIndex === 'gender'">
          <a-tag v-if="record.gender === 1" color="blue">男</a-tag>
          <a-tag v-else color="red">女</a-tag>
        </template>
        <template v-if="column.dataIndex === 'age'">
          <span v-if="!record.age">暂无</span>
        </template>
        <template v-if="column.dataIndex === 'phone'">
          <span v-if="!record.phone">暂无</span>
        </template>
        <template v-if="column.dataIndex === 'email'">
          <span v-if="!record.email">暂无</span>
        </template>
        <template v-if="column.dataIndex === 'role'">
          <a-tag v-if="record.role === 1" color="red">管理员</a-tag>
          <a-tag v-else-if="record.role === 2" color="green">普通用户</a-tag>
        </template>
        <template v-if="column.dataIndex === 'createTime'">
          <span>{{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
        <template v-if="column.key === 'action'">
          <a-button type="primary" danger @click="deleteData(record.id)">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { computed, createVNode, onMounted, reactive, ref } from 'vue'
import { deleteUserUsingDelete, listUserUsingPost } from '@/api/userController.ts'
import { message, Modal } from 'ant-design-vue'
import dayjs from 'dayjs'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

/**
 * 表格列
 */
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    align: 'center',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    align: 'center',
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    align: 'center',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    align: 'center',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    align: 'center',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    align: 'center',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    align: 'center',
  },
  {
    title: '角色',
    dataIndex: 'role',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

const loading = ref(true)
/**
 * 数据
 */
const dataList = ref([])
/**
 * 总数
 */
const total = ref(0)
/**
 * 搜索条件
 */
const searchParams = reactive({
  current: 1,
  pageSize: 10,
  nickname: '',
  username: '',
  createTimeRange: [],
})
/**
 * 分页器
 */
const pagination = computed(() => {
  return {
    current: searchParams.current,
    pageSize: searchParams.pageSize,
    total: Number(total.value),
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条数据`,
  }
})

/**
 * 获取数据
 */
const fetchData = async (current) => {
  loading.value = true
  if (current) {
    searchParams.current = current
  }
  const res = await listUserUsingPost({ ...searchParams })
  if (res.code === 0) {
    dataList.value = res.data.records ?? []
    total.value = res.data.total ?? 0
  } else {
    message.error(res.msg)
  }
  loading.value = false
}

const handleTableChange = (pagination: any) => {
  searchParams.current = pagination.current
  searchParams.pageSize = pagination.pageSize
  fetchData()
}

const deleteData = (id) => {
  Modal.confirm({
    title: '您确认要删除吗?',
    icon: createVNode(ExclamationCircleOutlined),
    okText: '确认',
    cancelText: '取消',
    onOk() {
      deleteUserUsingDelete([id])
        .then((res) => {
          if (res.code === 0) {
            message.success('删除成功')
            fetchData()
          } else {
            message.error(res.msg)
          }
        })
        .catch(() => {
          message.error('删除失败')
        })
    },
  })
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
#UserManageView .search {
  margin-left: 30%;
}
</style>
