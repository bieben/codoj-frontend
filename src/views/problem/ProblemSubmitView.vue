<template>
  <div id="problemSubmitView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item
        field="problemId"
        label="Problem ID"
        style="min-width: 240px"
      >
        <a-input :v-model="searchParams.problemId" placeholder="Please Enter" />
      </a-form-item>
      <a-form-item field="language" label="Language" style="min-width: 240px">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          placeholder="Select Language"
        >
          <a-option>java</a-option>
          <a-option>python</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
          <a-option>html</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">Search</a-button>
      </a-form-item>
    </a-form>
    <a-divider :size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #judgeInfo="{ record }">
        {{ JSON.stringify(record.judgeInfo) }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Problem,
  ProblemControllerService,
  ProblemSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<ProblemSubmitQueryRequest>({
  problemId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await ProblemControllerService.listProblemSubmitByPageUsingPost({
    ...searchParams.value,
    sortField: "createTime",
    sortOrder: "descend",
  });
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = Number(res.data.total);
  } else {
    message.error("Load Failed，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "Submission ID",
    dataIndex: "id",
  },
  {
    title: "Language",
    dataIndex: "language",
  },
  {
    title: "Judge Info",
    slotName: "judgeInfo",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Problem ID",
    dataIndex: "problemId",
  },
  {
    title: "User ID",
    dataIndex: "userId",
  },
  {
    title: "Create Time",
    slotName: "createTime",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

/**
 * 跳转到做题页面
 * @param problem
 */
const toProblemPage = (problem: Problem) => {
  router.push({
    path: `/view/problem/${problem.id}`,
  });
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#problemSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
