<template>
  <div class="courseList">
    <div class="conmon_nav">
      <ul class="common_list clearfix">
        <li class="common_item" @click="select(0)" :class="{active:selectType===0}"><a href="javascript:;">摩英熙计划</a></li>
        <li class="common_item" @click="select(1)" :class="{active:selectType===1}"><a href="javascript:;">助教</a></li>
      </ul>
      <div class="right_area">
        <a href="javascript:;" class="cmomon_add_icon common_icon"></a>
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
                <td><a href="javascript:;" class="common_icon cmomon_mod_icon"></a></td>
                <td><a href="javascript:;" class="common_icon cmomon_del_icon"></a></td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" name="checkbox">01</td>
                <td>姓名</td>
                <td>照片</td>
                <td>视频</td>
                <td>简历</td>
                <td><a href="javascript:;" class="common_icon cmomon_mod_icon"></a></td>
                <td><a href="javascript:;" class="common_icon cmomon_del_icon"></a></td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" name="checkbox">01</td>
                <td>姓名</td>
                <td>照片</td>
                <td>视频</td>
                <td>简历</td>
                <td><a href="javascript:;" class="common_icon cmomon_mod_icon"></a></td>
                <td><a href="javascript:;" class="common_icon cmomon_del_icon"></a></td>
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
                <td><a href="javascript:;" class="common_icon cmomon_mod_icon"></a></td>
                <td><a href="javascript:;" class="common_icon cmomon_del_icon"></a></td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" name="checkbox">01</td>
                <td>大学生课程</td>
                <td>照片</td>
                <td>视频</td>
                <td>简历</td>
                <td><a href="javascript:;" class="common_icon cmomon_mod_icon"></a></td>
                <td><a href="javascript:;" class="common_icon cmomon_del_icon"></a></td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" name="checkbox">01</td>
                <td>大学生课程</td>
                <td>照片</td>
                <td>视频</td>
                <td>简历</td>
                <td><a href="javascript:;" class="common_icon cmomon_mod_icon"></a></td>
                <td><a href="javascript:;" class="common_icon cmomon_del_icon"></a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hello',
  data() {
    return {
      selectType: 0
    }
  },
  methods: {
    select(type) {
      this.selectType = type;
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content_item {
  display: none;
}
.content_item.active {
  display: block;
}

</style>
