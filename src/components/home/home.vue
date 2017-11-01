<template>
  <div class="home-wrap">
    <div class="logo">
      <img src="../../assets/img/logo@2x.png" alt="">
      <span>摩英官网后台管理系统</span>
    </div>
    <div class="login">
      <div class="header">
        <ul id="status" v-for="item in list" @click="loginType">
          <li @click="setStatus(item.index)" :class="{'active':status === item.index}">{{item.value}}</li>
        </ul>
      </div>
      <div class="content">
        <form action="">
          <input type="text" placeholder="账号">
          <input type="text" placeholder="密码">
          <button @click.prevent="login()">登录</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "",
  data() {
    return {
      status: '0',
      // type: 0,
      list: [
        {
          value: "行政",
          index: 0
        },
        {
          value: "管理",
          index: 1
        },
        {
          value: "教学",
          index: 2
        }
      ]
    };
  },
  mounted(){
    this.status =0;
  },
  // activated() {
  //   this.status=0;
  //   },
  methods: {
    loginType: function(e) {
      console.log(e);
      let statusString = e.target.innerHTML;
      switch (statusString) {
        case "行政":
          status = 0;
          break;
        case "管理":
          status = 1;
          break;
        case "教学":
          status = 2;
      }
    },
    setStatus(index) {
      this.status = index;
    },
    login() {
      let url = "";
      switch (status) {
        case "1":
          url = "/management";
          break;
        case "2":
          url = "/teaching";
          break;
        default:
          url = "/administration";
      }
      this.$router.push({
        path: url
      });
    }
  }
};
</script>

<style>
.home-wrap {
  /* background: url("../../assets/img/"); */
  background-color: rgb(48, 161, 236);
  position: absolute;
  height: 100%;
  width: 100%;
}

.home-wrap .logo {
  width: 100%;
  height: 300px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.home-wrap .logo img {
  width: 100px;
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
}

.home-wrap .logo span {
  color: #fff;
  position: relative;
  top: 226px;
  font-size: 22px;
}

.home-wrap .login {
  width: 447px;
  height: 348px;
  /* background-color: #fff; */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.home-wrap .login .header {
  font-size: 20px;
  background-color: transparent;
}

.home-wrap .login .header li {
  float: left;
  width: 149px;
  text-align: center;
  height: 68px;
  line-height: 68px;
  color: #747474;
  background: -webkit-radial-gradient(rgb(255, 255, 255), rgb(213, 213, 213));
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  cursor: pointer;
}

.home-wrap .login .header li:hover {
  color: rgb(48, 161, 236);
  background: #fff;
}

.home-wrap .login .header li.active {
  color: rgb(48, 161, 236);
  background: #fff;
}

.home-wrap .login .content {
  width: 100%;
  height: 280px;
  background-color: #fff;
  margin-top: 68px;
  padding: 24px;
}

.home-wrap .login .content input {
  width: 372px;
  height: 56px;
  display: block;
  border-radius: 10px;
  margin: 0 auto;
  margin-bottom: 24px;
  border: none;
  box-shadow: 2px 2px 2px 2px rgb(232, 232, 232) inset;
  padding-left: 20px;
  outline: none;
}

.home-wrap .login .content button {
  display: block;
  width: 170px;
  height: 56px;
  background-color: #018be5;
  color: #fff;
  border-radius: 10px;
  border: none;
  margin: 0 auto;
  font-size: 16px;
  cursor: pointer;
  outline: none;
}
</style>
