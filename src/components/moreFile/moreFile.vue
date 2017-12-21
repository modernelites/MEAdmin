<template>
  <div class="courseList">
    <div class="conmon_nav">
      <ul class="common_list clearfix">
        <li class="common_item" @click="select(0)" :class="{active:selectType===0}">
          <a href="javascript:;">摩英熙计划</a>
        </li>
        <li class="common_item" @click="select(1)" :class="{active:selectType===1}">
          <a href="javascript:;">助教</a>
        </li>
      </ul>
      <div class="right_area">
        <a href="javascript:;" @click="morefile=true" class="cmomon_add_icon common_icon"></a>
        <a href="javascript:;" class="cmomon_mod_icon common_icon"></a>
        <a href="javascript:;" class="cmomon_del_icon common_icon"></a>
      </div>
    </div>
    <div class="common_wrapper">
      <div class="content_item" :class="{active:selectType===0}">
        <div class="common_table">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" name="checkbox"> 序号</th>
                <th>姓名</th>
                <th>照片</th>
                <th>视频</th>
                <th>简历</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" name="checkbox">01</td>
                <td>姓名</td>
                <td>照片</td>
                <td>视频</td>
                <td>简历</td>
                <td>
                  <a href="javascript:;" class="common_icon cmomon_mod_icon"></a>
                </td>
                <td>
                  <a href="javascript:;" class="common_icon cmomon_del_icon"></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="content_item" :class="{active:selectType===1}">
        <div class="common_table">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" name="checkbox"> 序号</th>
                <th>姓名</th>
                <th>照片</th>
                <th>视频</th>
                <th>简历</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" name="checkbox">01</td>
                <td>大学生课程</td>
                <td>照片</td>
                <td>视频</td>
                <td>简历</td>
                <td>
                  <a href="javascript:;" class="common_icon cmomon_mod_icon"></a>
                </td>
                <td>
                  <a href="javascript:;" class="common_icon cmomon_del_icon"></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>



    <div class="modal_wrapper" v-show="morefile">
      <transition name="fade">
        <div v-show="morefile" class="mask" @click="morefile = false"></div>
      </transition>
      <transition>
        <div v-show="morefile" class="modal_content">
          <h3>详情</h3>
          <div class="name">姓名:
            <span>123</span>
          </div>
          <div class="video">
            <span>视频:</span>
            <video src=""></video>
            <button class="videoDownload">下载</button>
          </div>
          <div class="resume">简历:
            <i></i>
          <button class="resumeDownload">下载</button>
          </div>
        </div>
      </transition>
    </div>




  </div>
</template>
<script>
  export default {
    name: "hello",
    data() {
      return {
        selectType: 0,
        morefile: false
      };
    },
    methods: {
      select(type) {
        this.selectType = type;
      }
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content_item {
    display: none;
  }

  .content_item.active {
    display: block;
  }

  .modal_wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .modal_wrapper .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.6);
  }

  .modal_wrapper .modal_content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 600px;
    z-index: 2;
    transform: translate(-50%, -50%);
    background: #fff;
    height: 700px;
    width: 750px;
  }

  .modal_wrapper .modal_content h3 {
    font-size: 26px;
    color: #656565;
    font-weight: 700;
    position: relative;
    display: inline-block;
    margin-right: 32px;
    position: relative;
    margin-left: 60px;
    margin-top: 40px;
  }

  .modal_wrapper .modal_content h3::before {
    content: " ";
    position: absolute;
    top: 0;
    left: -12px;
    display: block;
    width: 4px;
    height: 26px;
    background: #f8e71c;
  }

  .modal_wrapper .modal_content .name {
    position: absolute;
    top: 120px;
    left: 78px;
    font-size: 16px;
    color: #656565;
  }

  .modal_wrapper .modal_content .name span {
    margin-left: 20px;
  }

  .modal_wrapper .modal_content .video {
    position: absolute;
    top: 160px;
    left: 78px;
    font-size: 16px;
    color: #656565;
  }

  .modal_wrapper .modal_content .video span {
    position: absolute;
    top: 0;
    width: 40px;
  }

  .modal_wrapper .modal_content .video video {
    position: absolute;
    left: 40px;
    margin-left: 20px;
    width: 426px;
    height: 326px;
    background-color: #ccc;
    border-radius: 4px;
  }
  .modal_wrapper .modal_content .video .videoDownload{
    position: absolute;
    left: 516px;
    width: 100px;
    height: 50px;
    border: none;
    background-color: #f8e81c;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
  }
  .modal_wrapper .modal_content .resume{
    position: absolute;
    bottom: 100px;
    left: 78px;
    font-size: 16px;
    color: #656565;
  }
  .modal_wrapper .modal_content .resume i{
    position: absolute;
    left: 20px;
    top:-20px;
    display: block;
    width: 60px;
    height: 60px;
    margin-left: 40px;
    background: url("./../../assets/img/document@2x.png") center;
  }
  .modal_wrapper .modal_content  .resumeDownload{
    position: absolute;
    left: 516px;
    bottom: -15px;
    width: 100px;
    height: 50px;
    border: none;
    background-color: #f8e81c;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
  }
</style>
