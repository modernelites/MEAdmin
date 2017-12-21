<template>
  <div>
    <my-header></my-header>
    <div class="home">
      <div class="content_wrapper">
        <div class="content_left">
          <ul class="list">
            <li class="item" @click="select(0)" :class="{active:selectType===0}">
              <a href="#/management/banner">banner</a>
            </li>
            <li class="item" @click="select(1)" :class="{active:selectType===1}">
              <a href="#/management/course">课程列表</a>
            </li>
            <li class="item" @click="select(2)" :class="{active:selectType===2}">
              <a href="#/management/recommendCourse">推荐课程</a>
            </li>
            <li class="item" @click="select(3)" :class="{active:selectType===3}">
              <a href="#/management/service">客服</a>
            </li>
            <li class="item" @click="select(4)" :class="{active:selectType===4}">
              <a href="#/management/organization">子机构</a>
            </li>
            <li class="item" @click="select(5)" :class="{active:selectType===5}">
              <a href="#/management/lecturerManage">讲师管理</a>
            </li>
            <li class="item" @click="select(6)" :class="{active:selectType===6}">
              <a href="#/management/publicNumber">公众号管理</a>
            </li>
            <li class="item" @click="select(7)" :class="{active:selectType===7}">
              <a href="#/management/about">关于我们</a>
            </li>
            <li class="item" @click="select(8)" :class="{active:selectType===8}">
              <a href="#/management/moreFile">多媒体文件管理</a>
            </li>
            <li class="item" @click="select(9)" :class="{active:selectType===9}">
              <a href="#/management/ideaFeedback">意见反馈管理</a>
            </li>
            <li class="item" @click="select(10)" :class="{active:selectType===10}">
              <a href="#/management/wonderfulImage">精彩图集管理</a>
            </li>
          </ul>
        </div>
        <div class="content_right">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import myHeader from "@/components/header/header";
  export default {
    name: "management",
    data() {
      return {
        selectType: 0
      };
    },
    components: {
      myHeader: myHeader
    },
    methods: {
      select(type) {
        this.selectType = type;
      },
      selectUrl() {
        let url = window.location.href;
        if (url.indexOf("banner") > 0) {
          this.selectType = 0;
        }
        if (url.indexOf("course") > 0) {
          this.selectType = 1;
        }
        if (url.indexOf("recommendCourse") > 0) {
          this.selectType = 2;
        }
        if (url.indexOf("service") > 0) {
          this.selectType = 3;
        }
        if (url.indexOf("organization") > 0) {
          this.selectType = 4;
        }
        if (url.indexOf("lecturerManage") > 0) {
          this.selectType = 5;
        }
        if (url.indexOf("publicNumber") > 0) {
          this.selectType = 6;
        }
        if (url.indexOf("about") > 0) {
          this.selectType = 7;
        }
        if (url.indexOf("moreFile") > 0) {
          this.selectType = 8;
        }
        if (url.indexOf("ideaFeedback") > 0) {
          this.selectType = 9;
        }
        if (url.indexOf("wonderfulImage") > 0) {
          this.selectType = 10;
        }
      }
    },
    mounted() {
      this.selectUrl();
      eventBus.$emit("loginType", 1);
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .home {
    /*max-width: 1440px;*/
    margin: 0 auto;
  }

  .home .content_wrapper {
    display: flex;
    height: calc(100vh - 80px);
  }

  .home .content_wrapper .content_left {
    flex: 0 0 200px;
    background: linear-gradient(180deg, #008ae5, #078ee7);
    padding-top: 44px;
  }

  .content_left .list .item a {
    display: block;
    height: 60px;
    line-height: 60px;
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    border-left: 8px solid transparent;
    transition: all.3s ease;
  }

  .content_left .list .item.active a {
    border-left: 8px solid #063a5d;
    background: #0c75ba;
  }

  .content_left .list .item:hover a {
    border-left: 8px solid #063a5d;
    background: #0c75ba;
  }

  .home .content_wrapper .content_right {
    flex: 1;
  }

  .home .content_right {
    background: #efefef;
  }

  .conmon_nav {
    height: 44px;
    padding: 0 20px;
    border-bottom: 4px solid #dedddd;
  }

  .conmon_nav .common_list {
    float: left;
    line-height: 44px;
  }

  .conmon_nav .right_area {
    float: right;
    font-size: 0;
  }

  .conmon_nav .right_area .common_icon {
    padding-top: 20px;
  }

  .common_icon {
    display: inline-block;
    width: 14px;
    height: 14px;
  }

  .conmon_nav .common_icon {
    margin-left: 12px;
  }

  .cmomon_add_icon {
    background: url("./../../assets/img/add.png") no-repeat center;
  }

  .cmomon_mod_icon {
    background: url("./../../assets/img/modification.png") no-repeat center;
  }

  .cmomon_del_icon {
    background: url("./../../assets/img/delete@2x.png") no-repeat center;
  }

  .conmon_nav .common_list .common_item {
    float: left;
    position: relative;
  }

  .conmon_nav .common_list .common_item+.common_item {
    margin-left: 20px;
  }

  .conmon_nav .common_list .common_item a {
    display: block;
    font-size: 18px;
    color: #000;
  }

  .conmon_nav .common_list .common_item.active:after {
    content: " ";
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 6px;
    background: #068de7;
  }

  .conmon_nav .common_list .common_item.active a {
    color: #068de7;
  }

  .common_table {
    padding: 20px;
  }

  .common_table .table {
    width: 100%;
  }

  .common_table tr {
    height: 40px;
    line-height: 40px;
    padding-left: 12px;
  }

  .common_table tr th {
    height: 40px;
    line-height: 40px;
    background: #a4c8df;
    text-align: left;
  }

  .common_table tr th:nth-last-child(1),
  .common_table tr th:nth-last-child(2) {
    background: #efefef;
    width: 50px;
  }

  .common_table tr td:nth-last-child(1),
  .common_table tr td:nth-last-child(2) {
    background: #efefef;
  }

  .common_table tr th:nth-child(1),
  .common_table tr td:nth-child(1) {
    padding-left: 12px;
  }

  .common_table tbody tr:nth-child(odd) {
    background: #fff;
  }

  .common_table tbody .common_icon {
    display: block;
    width: 100%;
    min-width: 14px;
  }

</style>
