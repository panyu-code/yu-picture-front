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
    <PictureUploadComponent :picture="picture" :on-success="onSuccess" />
    <a-form v-if="picture" layout="vertical" :model="pictureForm" @finish="handleSubmit">
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
  editPictureUsingPost,
  getPictureVoByIdUsingGet,
  listPictureTagCategoryUsingGet,
} from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()
const picture = ref<API.PictureVO>()
const onSuccess = (newPicture: API.PictureVO) => {
  picture.value = newPicture
  pictureForm.name = newPicture.name
  pictureForm.id = newPicture.id
}
const pictureForm = reactive<API.PictureEditDTO>({})

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
