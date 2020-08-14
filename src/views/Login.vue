<template>
  <div class="login-container">
    <van-nav-bar class="bd" :title="'登录'" left-arrow @click-left="$router.back()" />
    <van-form @submit="onSubmit">
      <van-field
        class="bd"
        v-model="username"
        name="userName"
        label="用户名"
        placeholder="请输入用户名"
        :rules="loginRules.username"
      />
      <van-field
        class="bd"
        v-model="password"
        type="password"
        name="passWord"
        label="密码"
        placeholder="请输入密码"
        :rules="loginRules.password"
      />
      <div class="btn-login">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <div class="register">
      <a
        class="btn-register"
        href="javascript:;"
        @click="$router.push({name:'register',params:{
            routerType: 'push',
        }})"
      >注册新用户</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      loginRules: {
        username: [{ required: true, message: '请填写用户名' }],
        password: [{ required: true, message: '请填写密码' }],
      },
    }
  },
  methods: {
    onSubmit() {},
  },
}
</script>
<style lang="less" scoped>
.login-container {
  .van-nav-bar {
    height: 134px;
  }
  /deep/ .van-nav-bar .van-icon {
    color: unset;
  }
  .btn-login {
    margin-top: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-button--info {
      background-color: #d81e06;
      border: unset;
    }
    .van-button--block {
      width: 676px;
    }
  }
  .bd {
    border-bottom: 1px solid #e5e5e5;
  }
  .register {
    float: right;
    .btn-register {
      font-size: 28px;
      color: #999;
      padding: 8px;
    }
  }
}
</style>
