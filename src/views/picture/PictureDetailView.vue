<template>
  <div class="picture-detail">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="返回"
      @back="() => router.back()"
    />
    <a-row :gutter="[16, 16]">
      <!-- 图片展示区 -->
      <a-col :sm="24" :md="16" :xl="18">
        <a-card title="图片预览" style="text-align: center">
          <a-image style="max-height: 600px; object-fit: contain" :src="picture.url" />
        </a-card>
      </a-col>
      <!-- 图片信息区 -->
      <a-col :sm="24" :md="8" :xl="6">
        <a-card title="图片信息">
          <a-descriptions :column="1">
            <a-descriptions-item label="作者">
              <a-space>
                <a-avatar :size="24" :src="picture.user?.avatar" />
                <div>{{ picture.user?.username }}</div>
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item label="名称">
              {{ picture.name ?? '未命名' }}
            </a-descriptions-item>
            <a-descriptions-item label="简介">
              {{ picture.introduction ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="分类">
              {{ picture.category ?? '默认' }}
            </a-descriptions-item>
            <a-descriptions-item label="标签">
              <a-tag v-for="tag in picture.tags" :key="tag">
                {{ tag }}
              </a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="格式">
              {{ picture.format ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="宽度">
              {{ picture.width ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="高度">
              {{ picture.height ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="宽高比">
              {{ picture.scale ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="大小">
              {{ formatSize(picture.size) }}
            </a-descriptions-item>
          </a-descriptions>
          <a-space wrap>
            <a-button :icon="h(DownloadOutlined)" type="primary" @click="doDownload">
              免费下载
            </a-button>
            <a-button :icon="h(EditOutlined)" v-if="canEdit" type="default" @click="doEdit">
              编辑
            </a-button>
            <a-button :icon="h(DeleteOutlined)" v-if="canEdit" danger @click="doDelete">
              删除
            </a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { deletePictureUsingDelete, getPictureVoByIdUsingGet } from '@/api/pictureController.ts'
import { message, Modal } from 'ant-design-vue'
import { computed, createVNode, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore.ts'
import router from '@/router'
import { h } from 'vue'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  DownloadOutlined,
} from '@ant-design/icons-vue'
import { downloadImage, formatSize } from '@/util'

const props = defineProps<{
  id: string | number
}>()

const picture = ref<API.PictureVO>({})

// 获取图片详情
const fetchPictureDetail = async () => {
  try {
    const res = await getPictureVoByIdUsingGet({
      id: props.id,
    })
    if (res.code === 0 && res.data) {
      picture.value = res.data
    } else {
      message.error('获取图片详情失败，' + res.msg)
    }
  } catch (e: any) {
    message.error('获取图片详情失败：' + e.message)
  }
}

const loginUserStore = useUserStore()
// 是否具有编辑权限
const canEdit = computed(() => {
  const loginUser = loginUserStore.userInfo
  // 未登录不可编辑
  if (!loginUser.id) {
    return false
  }
  // 仅本人或管理员可编辑
  const user = picture.value.user || {}
  return loginUser.id === user.id || loginUser.role === 1
})

// 编辑
const doEdit = () => {
  router.push('/picture/add?id=' + picture.value.id)
}
// 删除
const doDelete = () => {
  Modal.confirm({
    title: '您确认要删除吗?',
    icon: createVNode(ExclamationCircleOutlined),
    okText: '确认',
    cancelText: '取消',
    onOk() {
      const id = picture.value.id
      if (!id) {
        return
      }
      deletePictureUsingDelete({ id }).then((res) => {
        if (res.code === 0) {
          message.success('删除成功')
          router.back()
        } else {
          message.error('删除失败')
        }
      })
    },
  })
}

// 处理下载
const doDownload = () => {
  downloadImage(picture.value.url, picture.value.name)
}

onMounted(() => {
  fetchPictureDetail()
})
</script>

<style scoped></style>
