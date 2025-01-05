<template>
  <div class="PictureManageView">
    <!--  搜索条件  -->
    <a-form class="search" layout="inline" :model="searchParams">
      <a-form-item label="关键词">
        <a-input v-model:value="searchParams.searchText" placeholder="请输入关键词" allow-clear />
      </a-form-item>
      <a-form-item label="类型">
        <a-input v-model:value="searchParams.category" placeholder="请输入类型" allow-clear />
      </a-form-item>
      <a-form-item label="标签" name="tags">
        <a-select
          style="width: 200px"
          v-model:value="searchParams.tags"
          mode="tags"
          placeholder="请输入标签"
          allowClear
        />
      </a-form-item>
      <a-form-item label="审核状态" name="reviewStatus">
        <a-select
          v-model:value="searchParams.reviewStatus"
          :options="PIC_REVIEW_STATUS_OPTIONS"
          placeholder="请输入审核状态"
          style="min-width: 180px"
          allow-clear
        />
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
        <template v-if="column.dataIndex === 'url'">
          <a-image :src="record.url" :width="100"></a-image>
        </template>
        <template v-if="column.dataIndex === 'tags'">
          <a-space wrap>
            <a-tag color="blue" v-for="tag in JSON.parse(record.tags || '[]')" :key="tag">
              {{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template v-if="column.dataIndex === 'introduction'">
          {{ record.introduction ?? '暂无简介' }}
        </template>
        <template v-if="column.dataIndex === 'username'">
          <a-tag v-if="record.username === 'admin'" color="red">{{ record.username }}</a-tag>
          <a-tag v-else color="green">{{ record.username }}</a-tag>
        </template>
        <template v-if="column.dataIndex === 'info'">
          <div>格式：{{ record.format }}</div>
          <div>宽度：{{ record.width }}</div>
          <div>高度：{{ record.height }}</div>
          <div>纵横比：{{ record.scale }}</div>
          <div>大小：{{ (record.size / 1024 / 1024).toFixed(2) + 'MB' }}</div>
        </template>
        <template v-if="column.dataIndex === 'createTime'">
          <span>{{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
        <template v-if="column.dataIndex === 'reviewMessage'">
          {{ recode }}
          <div>审核状态：{{ PIC_REVIEW_STATUS_MAP[record.reviewStatus] }}</div>
          <div>审核信息：{{ record.reviewMessage }}</div>
          <div>审核人：{{ record.reviewerId }}</div>
        </template>
        <template v-if="column.key === 'action'">
          <a-space wrap>
            <a-button
              type="primary"
              v-if="record.reviewStatus !== PIC_REVIEW_STATUS_ENUM.PASS"
              @click="handleReview(record, PIC_REVIEW_STATUS_ENUM.PASS)"
              >通过
            </a-button>
            <a-button
              type="primary"
              danger
              v-if="record.reviewStatus !== PIC_REVIEW_STATUS_ENUM.REJECT"
              @click="handleReview(record, PIC_REVIEW_STATUS_ENUM.REJECT)"
              >拒绝
            </a-button>
            <a-button type="link" :href="`/picture/add?id=${record.id}`">编辑</a-button>
            <a-button type="primary" danger @click="deleteData(record.id)">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { computed, createVNode, onMounted, reactive, ref, watch } from 'vue'
import { deleteUserUsingDelete, listUserUsingPost } from '@/api/userController.ts'
import { message, Modal } from 'ant-design-vue'
import dayjs from 'dayjs'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import {
  deletePictureUsingDelete,
  doPictureReviewUsingPost,
  listPictureByPageUsingPost,
} from '@/api/pictureController.ts'
import {
  PIC_REVIEW_STATUS_ENUM,
  PIC_REVIEW_STATUS_MAP,
  PIC_REVIEW_STATUS_OPTIONS,
} from '@/constant'

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
    title: '图片',
    dataIndex: 'url',
    align: 'center',
  },
  {
    title: '名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '简介',
    dataIndex: 'introduction',
    align: 'center',
  },
  {
    title: '类型',
    dataIndex: 'category',
    align: 'center',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    align: 'center',
  },
  {
    title: '图片信息',
    dataIndex: 'info',
    align: 'center',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    title: '审核信息',
    dataIndex: 'reviewMessage',
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
  searchText: '',
  category: '',
  tags: [],
  createTimeRange: [],
  reviewStatus: null,
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
  console.log('current----' + current)
  if (current) {
    searchParams.current = current
  }
  const res = await listPictureByPageUsingPost({ ...searchParams })
  if (res.code === 0) {
    console.log(res.data.records)
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
      deletePictureUsingDelete({ id })
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

const handleReview = async (record: API.Picture, reviewStatus: number) => {
  const reviewMessage =
    reviewStatus === PIC_REVIEW_STATUS_ENUM.PASS ? '管理员操作通过' : '管理员操作拒绝'
  const res = await doPictureReviewUsingPost({
    id: record.id,
    reviewStatus,
    reviewMessage,
  })
  if (res.code === 0) {
    message.success('审核操作成功')
    // 重新获取列表
    await fetchData()
  } else {
    message.error('审核操作失败，' + res.data.message)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.PictureManageView .search {
  margin-left: 20%;
}
</style>
