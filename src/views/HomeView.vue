<template>
  <div class="home-view">
    <!--  搜索框  -->
    <div class="search">
      <a-input-search
        v-model:value="searchParams.searchText"
        placeholder="请输入关键词搜索"
        enter-button="搜索"
        size="large"
        @search="onSearch"
        allow-clear
        @change="onSearch"
      />
    </div>
    <!--   分类和标签筛选 -->
    <div class="category-filter">
      <a-tabs v-model:active-key="selectedCategory" @change="onSearch">
        <a-tab-pane key="all" tab="全部"></a-tab-pane>
        <a-tab-pane v-for="category in categoryList" :key="category" :tab="category"></a-tab-pane>
      </a-tabs>
    </div>
    <div class="tag-filter">
      <span style="margin-right: 8px">标签：</span>
      <a-space :size="[0, 8]" wrap>
        <a-checkable-tag
          v-for="(tag, index) in tagList"
          :key="tag"
          v-model:checked="selectedTagList[index]"
          @change="onSearch"
        >
          {{ tag }}
        </a-checkable-tag>
      </a-space>
    </div>
    <!--  图片列表  -->
    <div class="picture-list">
      <a-list
        :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
        :data-source="dataList"
        :pagination="pagination"
        :loading="loading"
      >
        <template #renderItem="{ item: picture }">
          <a-list-item>
            <a-card class="card-list" hoverable @click="toDetail(picture.id)">
              <template #cover>
                <img :alt="picture.name" :src="picture.url" />
              </template>
              <a-card-meta :title="picture.name">
                <template #description>
                  <a-flex>
                    <a-tag color="green">
                      {{ picture.category ?? '默认' }}
                    </a-tag>
                    <a-tag v-for="tag in picture.tags" :key="tag">{{ tag }}</a-tag>
                  </a-flex>
                </template>
              </a-card-meta>
            </a-card>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import {
  listPictureTagCategoryUsingGet,
  listPictureVoByPageUsingPost,
} from '@/api/pictureController.ts'
import router from '@/router'

const dataList = ref<API.PictureVO[]>([])

const loading = ref(true)
/**
 * 总数
 */
const total = ref(0)
/**
 * 搜索条件
 */
const searchParams = reactive({
  current: 1,
  pageSize: 12,
  searchText: '',
  category: '',
  tags: [],
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
    onChange: (current: number, pageSize: number) => {
      searchParams.current = current
      searchParams.pageSize = pageSize
      fetchData()
    },
  }
})

/**
 * 获取数据
 */
const fetchData = async () => {
  loading.value = true
  const params = {
    ...searchParams,
    tags: [],
  }
  if (selectedCategory.value !== 'all') {
    params.category = selectedCategory.value
  }
  selectedTagList.value.forEach((tag, index) => {
    if (tag) {
      params.tags.push(tagList.value[index])
    }
  })
  const res = await listPictureVoByPageUsingPost(params)
  if (res.code === 0) {
    dataList.value = res.data.records ?? []
    total.value = res.data.total ?? 0
  } else {
    message.error(res.msg)
  }
  loading.value = false
}

const onSearch = () => {
  searchParams.current = 1
  fetchData()
}

const categoryList = ref<string[]>([])
const tagList = ref<string[]>([])
const selectedCategory = ref<string>('all')
const selectedTagList = ref<string[]>([])

// 获取标签和分类选项
const getTagCategoryOptions = async () => {
  const res = await listPictureTagCategoryUsingGet()
  if (res.code === 0 && res.data) {
    // 转换成下拉选项组件接受的格式
    tagList.value = res.data.tagList ?? []
    categoryList.value = res.data.categoryList ?? []
  } else {
    message.error('加载选项失败，' + res.msg)
  }
}

const toDetail = (id: string) => {
  if (id) {
    router.push(`/picture/detail/${id}`)
  }
}

onMounted(() => {
  fetchData()
  getTagCategoryOptions()
})
</script>

<style scoped>
.home-view img {
  height: 300px;
  width: 100%;
  object-fit: cover;
}

.home-view .search {
  margin: 0 auto 30px;
  max-width: 800px;
}

.home-view .category-filter {
  margin-left: 50px;
  max-width: 800px;
}

.home-view .tag-filter {
  margin-left: 60px;
  margin-bottom: 20px;
  max-width: 800px;
}

.home-view .card-list :hover {
  transform: scale(1.05);
}
</style>
