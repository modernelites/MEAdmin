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
        <input type="text" placeholder="账号" ref="username" required>
        <input type="text" placeholder="密码" ref="password" required autocomplete="off">
        <button @click="login()">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import md5 from 'js-md5';
  export default {
    name: "",
    data() {
      return {
        status: '0',
        // type: 0,
        list: [{
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
    mounted() {
      this.status = 0;
      //已登录判断 如已登录跳转至dep对应部门
      if (window.localStorage.getItem('user')) {
        let url = "/index",
          user = JSON.parse(window.localStorage.getItem('user'));
        console.log(user.DEP)
        switch (user.DEP) {
          case "1":
            url = "/management";
            break;
          case "2":
            url = "/teaching";
            break;
          case "0":
            url = "/administration";
        }
        this.$router.push({
          path: url
        });
      }
    },
    methods: {
      loginType: function (e) {
        // console.log(e);
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
        let url = "/index";
        let userName = this.$refs.username.value;
        let passWord = md5(md5(this.$refs.password.value));
        if (!userName || !this.$refs.password.value) {
          alert('账号或者密码为空 请重新输入');
          return;
        } else {
          if (!status) {
            this.$message({
              type: 'info',
              message: '请选择要登录的模块'
            });
          } else {
            var param = {
              username: userName,
              password: passWord,
              LoginType: 1
            };
            this.$http.post(this.ApiUrl + 'me/Account/Login', param).then((response) => {
              response = response.data;
              this.login = response;
              if (this.login.Status !== 200) {
                alert('账号或者密码错误请重新输入');
              } else {
                response.Data.DEP = status;
                window.localStorage.setItem('user', JSON.stringify(response.Data));
                switch (status) {
                  case "1":
                    url = "/management";
                    break;
                  case "2":
                    url = "/teaching";
                    break;
                  case "0":
                    url = "/administration";
                }
                this.$router.push({
                  path: url
                });
              }
            }, function (err) {
              console.log('请求发送失败', err);
            });
          }


        }

      }
    }
  };

</script>

<style lang="scss">
  // @import url("../../../static/css/reset.scss");
  .home-wrap {
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
    top: 58%;
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
