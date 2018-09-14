<template>
  <div class="head">
    <div class="content_wrapper clearfix">
      <div class="content_left">
        <img class="logo" src="./../../assets/img/logoWhite@2x.png" alt="bg-logo" width="50" height="40">
        <span class="title">摩英教育</span>
      </div>
      <div class="content_right">
        <input type="text" name="text" class="text_input">
        <img src="./../../assets/img/search@2x.png" alt="search" class="search_icon">
        <span class="dep">{{department}}</span>
        <button type="button" @click="logOut()" class="button out_btn">退出登录</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'head',
    data() {
      return {
        loginType: '',
        department: ''
      }
    },
    methods: {
      logOut() {
            // this.$http.post(this.ApiUrl + 'me/Account/Logout').then((response) => {
            //   console.log(response)
            // }, function (err) {
            //   console.log('请求发送失败', err);
            // });
        localStorage.removeItem('user')
        this.$router.push({
          path: '/'
        });
      }
    },

    mounted() {
      let _this = this;
      eventBus.$on("loginType", function (val) {
        _this.loginType = val;
        switch (val) {
          case 0:
            _this.department = '行政'
            break;
          case 1:
            _this.department = '管理'
            break;
          case 2:
            _this.department = '教学'
        }
      });
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head {
    /*max-width: 1440px;*/
    margin: 0 auto;
    background: linear-gradient(90deg, #008ae5, #078ee7);
    height: 80px;
  }

  .content_wrapper {
    padding: 0 25px;
  }

  .content_left {
    float: left;
    height: 80px;
    font-size: 0;
  }

  .content_left .logo {
    display: inline-block;
    padding-top: 20px;
    vertical-align: top;
  }

  .content_left .title {
    vertical-align: top;
    display: inline-block;
    padding-top: 28px;
    padding-left: 25px;
    font-size: 24px;
    color: #fff;
  }

  .content_right {
    float: right;
    padding-top: 30px;
    font-size: 0;
  }

  .content_right .text_input {
    display: inline-block;
    vertical-align: top;
    outline: none;
    border: none;
    background: transparent;
    border-bottom: 1px solid #fff;
    width: 268px;
    height: 25px;
    font-size: 14px;
    padding-left: 15px;
    color: #fff;
  }

  .content_right .search_icon {
    vertical-align: top;
    display: inline-block;
    margin-right: 16px;
  }

  .content_right .dep {
    display: inline-block;
    vertical-align: top;
    position: relative;
    color: #fff;
    font-size: 18px;
    line-height: 1;
    padding: 0 16px;
  }

  .content_right .dep:before {
    content: ' ';
    display: block;
    width: 1px;
    height: 16px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: #fff;
  }

  .content_right .dep:after {
    content: ' ';
    display: block;
    width: 1px;
    height: 16px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: #fff;
  }

  .content_right .out_btn {
    vertical-align: top;
    font-size: 14px;
    margin-left: 16px;
    font-size: 14px;
    color: #fff;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
  }

</style>
