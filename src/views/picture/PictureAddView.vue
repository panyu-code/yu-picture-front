<template>
  <a-page-header
    v-if="route.query.id"
    style="border: 1px solid rgb(235, 237, 240)"
    title="返回"
    @back="() => router.back()"
  />
  <div id="addPicturePage">
    <h2 style="margin-bottom: 16px; text-align: center">
      {{ route.query?.id ? '编辑图片' : '添加图片' }}
    </h2>
    <!-- 选择上传方式 -->
    <a-tabs v-if="!route.query?.id" v-model:activeKey="uploadType" @change="handleTabChange">
      <a-tab-pane key="file" tab="文件上传">
        <PictureUploadComponent :picture="picture" :on-success="onSuccess" />
      </a-tab-pane>
      <a-tab-pane key="url" tab="URL 上传" force-render>
        <UrlPictureUploadComponent :picture="picture" :on-success="onSuccess" />
      </a-tab-pane>
      <a-tab-pane key="batch" tab="批量上传" force-render>
        <div style="text-align: center; padding: 20px">
          <a-empty description="点击批量上传标签开始上传" />
        </div>
      </a-tab-pane>
    </a-tabs>
    <!-- 批量上传弹窗 -->
    <a-modal
      v-model:visible="batchModalVisible"
      title="批量上传图片"
      @ok="handleBatchSubmit"
      @cancel="handleBatchCancel"
      :confirmLoading="batchLoading"
      okText="开始上传"
      cancelText="取消"
    >
      <a-form :model="batchForm" layout="vertical">
        <a-form-item
          label="搜索关键词"
          name="searchText"
          :rules="[{ required: true, message: '请输入搜索关键词' }]"
        >
          <a-input
            v-model:value="batchForm.searchText"
            placeholder="请输入要搜索的图片关键词"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          label="上传数量"
          name="batchSize"
          :rules="[{ required: true, message: '请输入上传数量' }]"
        >
          <a-input-number
            v-model:value="batchForm.batchSize"
            :min="1"
            :max="30"
            style="width: 100%"
            placeholder="请输入要上传的图片数量"
            :precision="0"
            :controls="true"
            @change="handleCountChange"
            allow-clear
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 编辑模式下显示图片预览 -->
    <div
      v-if="route.query?.id && picture"
      style="
        text-align: center;
        margin-bottom: 20px;
        padding: 30px;
        background: #f5f5f5;
        border-radius: 8px;
      "
    >
      <a-image :src="picture.url" :width="600" :preview="true" />
    </div>
    <a-form
      v-if="picture || route.query?.id"
      layout="vertical"
      :model="pictureForm"
      @finish="handleSubmit"
    >
      <a-form-item label="id" name="id" style="display: none">
        <a-input v-model:value="pictureForm.id" />
      </a-form-item>
      <a-form-item label="名称" name="name">
        <a-input v-model:value="pictureForm.name" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item label="简介" name="introduction">
        <a-textarea
          v-model:value="pictureForm.introduction"
          placeholder="请输入简介"
          :autoSize="{ mixRows: 2, maxRows: 5 }"
          allowClear
        />
      </a-form-item>
      <a-form-item label="分类" name="category">
        <a-auto-complete
          v-model:value="pictureForm.category"
          placeholder="请输入分类"
          :options="categoryOptions"
          allowClear
        />
      </a-form-item>
      <a-form-item label="标签" name="tags">
        <a-select
          v-model:value="pictureForm.tags"
          :options="tagOptions"
          mode="tags"
          placeholder="请输入标签"
          allowClear
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">创建</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import PictureUploadComponent from '@/components/picture/PictureUploadComponent.vue'
import { onMounted, reactive, ref } from 'vue'
import {
  batchUploadUsingPost,
  editPictureUsingPost,
  getPictureVoByIdUsingGet,
  listPictureTagCategoryUsingGet,
} from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import UrlPictureUploadComponent from '@/components/picture/UrlPictureUploadComponent.vue'

const route = useRoute()
const picture = ref<API.PictureVO>()
const onSuccess = (newPicture: API.PictureVO) => {
  picture.value = newPicture
  pictureForm.name = newPicture.name
  pictureForm.id = newPicture.id
}
const pictureForm = reactive<API.PictureEditDTO>({})
const uploadType = ref<'file' | 'url' | 'batch'>('file')
const handleSubmit = async (values: any) => {
  const pictureId = picture.value?.id
  if (!pictureId) {
    return
  }
  const res = await editPictureUsingPost({ ...values, pictureId })
  if (res.code === 0) {
    message.success('创建成功!')
    await router.push(`/picture/detail/${pictureId}`)
  } else {
    message.error(res.msg)
  }
}
const categoryOptions = ref<string[]>([])
const tagOptions = ref<string[]>([])

// 获取标签和分类选项
const getTagCategoryOptions = async () => {
  const res = await listPictureTagCategoryUsingGet()
  if (res.code === 0 && res.data) {
    // 转换成下拉选项组件接受的格式
    tagOptions.value = (res.data.tagList ?? []).map((data: string) => {
      return {
        value: data,
        label: data,
      }
    })
    categoryOptions.value = (res.data.categoryList ?? []).map((data: string) => {
      return {
        value: data,
        label: data,
      }
    })
  } else {
    message.error('加载选项失败，' + res.data.message)
  }
}

const getPictureById = async () => {
  if (route.query?.id) {
    const res = await getPictureVoByIdUsingGet({ id: route.query.id as number })
    if (res.code === 0) {
      picture.value = res.data
      pictureForm.name = res.data.name
      pictureForm.id = res.data.id
      pictureForm.category = res.data.category
      pictureForm.tags = res.data.tags
      pictureForm.introduction = res.data.introduction
    } else {
      message.error('加载图片失败，' + res.msg)
    }
  }
}

// 批量上传相关
const batchModalVisible = ref(false)
const batchLoading = ref(false)
const batchForm = reactive({
  searchText: '',
  batchSize: 1,
})

const handleTabChange = (key: string) => {
  if (key === 'batch') {
    // 重置表单
    batchForm.searchText = ''
    batchForm.batchSize = 1
    batchModalVisible.value = true
  }
}

const handleBatchCancel = () => {
  batchModalVisible.value = false
  // 重置表单
  batchForm.searchText = ''
  batchForm.batchSize = 1
  uploadType.value = 'file' // 取消后回到文件上传标签
}

const handleBatchSubmit = async () => {
  if (!batchForm.searchText || !batchForm.batchSize) {
    message.error('请填写完整信息')
    return
  }
  batchLoading.value = true
  try {
    const result = await batchUploadUsingPost({ ...batchForm })
    if(result.code === 40101){
      message.error(result.msg)
      batchModalVisible.value = false
      return
    }
    if(result.code !== 0){
      message.error('批量上传失败，' + result.msg)
      batchModalVisible.value = false
      return
    }
    batchModalVisible.value = false
    message.success('批量上传任务已提交,成功上传数量' + result.data)
    // 重置表单
    batchForm.searchText = ''
    batchForm.batchSize = 1
    uploadType.value = 'file' // 提交后回到文件上传标签
  } finally {
    batchLoading.value = false
  }
}

const handleCountChange = (value: number) => {
  if (value < 1) {
    batchForm.batchSize = 1
  } else if (value > 30) {
    batchForm.batchSize = 30
  }
}

onMounted(() => {
  getTagCategoryOptions()
  getPictureById()
})
</script>

<style scoped>
#addPicturePage {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>
