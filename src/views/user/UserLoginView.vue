<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">User Login</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="Account">
        <a-input
          v-model="form.userAccount"
          placeholder="Please enter account"
        />
      </a-form-item>
      <a-form-item
        field="userPassword"
        tooltip="Password must contain at least 8 digits"
        label="Password"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="Please enter password"
        />
      </a-form-item>
      <a-form-item :content-flex="false">
        <a-button html-type="submit" class="custom-button"> Login</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // Login and go to home page
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("Failed to login，" + res.message);
  }
};
</script>
<style scoped>
.custom-button {
  text-align: left;
  margin-right: 100px;
  background: #0a0e40 !important;
  color: white !important;
  border-color: #0a0e40 !important;
}

.custom-button:hover {
  background: #1a237e !important;
  border-color: #1a237e !important;
  color: white !important;
}
</style>
