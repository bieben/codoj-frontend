<template>
  <div id="viewProblemView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="problem">
          <a-tab-pane key="problem" title="Problem">
            <a-card v-if="problem" :title="problem.title">
              <a-descriptions
                title="Judge Config"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="Time Limit">
                  {{ problem.judgeConfig?.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="Memory Limit">
                  {{ problem.judgeConfig?.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="Stack Limit">
                  {{ problem.judgeConfig?.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="problem.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of problem.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="Comment" disabled>
            Comment</a-tab-pane
          >
          <a-tab-pane key="answer" title="Answer">
            Cannot see the answer</a-tab-pane
          >
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="Language"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="Select language"
            >
              <a-option>java</a-option>
              <a-option>python</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>html</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code as string"
          :language="form.language"
          :handle-change="changeCode"
        />
        <a-divider :size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit">
          Submit
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, withDefaults, defineProps } from "vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import {
  ProblemControllerService,
  ProblemSubmitAddRequest,
  ProblemVO,
} from "../../../generated";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const problem = ref<ProblemVO>();

const loadData = async () => {
  const res = await ProblemControllerService.getProblemVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    problem.value = res.data;
  } else {
    message.error("Load Failed，" + res.message);
  }
};

const form = ref<ProblemSubmitAddRequest>({
  language: "java",
  code: "",
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!problem.value?.id) {
    return;
  }

  const res = await ProblemControllerService.doProblemSubmitUsingPost({
    ...form.value,
    problemId: problem.value.id,
  });
  if (res.code === 0) {
    message.success("Submit Success");
  } else {
    message.error("Submit Failed," + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const changeCode = (value: string) => {
  form.value.code = value;
};
</script>

<style>
#viewProblemView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewProblemView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
