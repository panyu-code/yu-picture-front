<template>
  <div class="picture-upload">
    <!--  图片上传组件  -->
    <a-upload
      list-type="picture-card"
      :show-upload-list="false"
      :custom-request="handleUpload"
      :before-upload="beforeUpload"
    >
      <img v-if="picture?.url" :src="picture?.url" alt="avatar" />
      <div v-else>
        <loading-outlined v-if="loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">点击或拖拽上传图片</div>
      </div>
    </a-upload>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { UploadProps } from 'ant-design-vue'
import { uploadPictureUsingPost } from '@/api/pictureController.ts'

interface Props {
  picture?: API.VO
  onSuccess?: (newPicture: API.PictureVO) => void
}

const props = withDefaults(defineProps<Props>(), {})

const loading = ref<boolean>(false)
/**
 * 上传图片
 * @param file
 */
const handleUpload = async ({ file }: any) => {
  loading.value = true
  try {
    const params = props.picture ? { pictureId: props.picture.id } : {}
    const res = await uploadPictureUsingPost(params, {}, file)
    if (res.code === 0) {
      message.success('上传成功')
      props.onSuccess?.(res.data)
    } else {
      message.error('上传失败' + res.msg)
    }
  } catch (error) {
    message.error('上传失败' + error.message)
    console.error(error)
  } finally {
    loading.value = false
  }
}

/**
 * 上传前的校验
 * @param file
 */
const beforeUpload = (file: UploadProps['fileList'][number]) => {
  const isJpgOrPng =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/webp' ||
    file.type === 'image/jpg'
  if (!isJpgOrPng) {
    message.error('不支持上传该格式的图片!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('不能上传超过2M的图片!')
  }
  return isJpgOrPng && isLt2M
}
</script>

<style scoped>
.picture-upload :deep(.ant-upload) {
  width: 100% !important;
  height: 100% !important;
  min-height: 152px;
  min-width: 152px;
}

.picture-upload img {
  max-width: 100%;
  max-height: 480px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
