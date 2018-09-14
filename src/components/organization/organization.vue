<template>
  <div class="subMechanism">
    <div class="conmon_nav">
      <ul class="common_list clearfix">
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
      </ul>
      <div class="right_area">
        <a href="javascript:;" class="cmomon_add_icon common_icon" @click="showOrg_Edit()"></a>
        <a href="javascript:;" class="cmomon_mod_icon common_icon"></a>
        <a href="javascript:;" class="cmomon_del_icon common_icon"></a>
      </div>
    </div>
    <div class="common_wrapper">
      <div class="common_table">
        <table class="table">
          <thead>
          <tr>
            <th><input type="checkbox" name="checkbox"> 序号</th>
            <th>机构名称</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(m,index) in Org_Items">
            <td><input type="checkbox" name="checkbox">&nbsp;{{index + 1}}</td>
            <td v-text="m.OrgName"></td>
            <td></td>
            <td></td>
            <td><a href="javascript:;" class="common_icon cmomon_mod_icon" @click="showOrg_Edit(m)"></a></td>
            <td><a href="javascript:;" class="common_icon cmomon_del_icon" @click="Org_Del(m)"></a></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal_wrapper" v-show="showOrgEdit">
      <transition name="fade">
        <div v-show="showOrgEdit" class="mask"></div>
      </transition>
      <transition name="course-fade-con">
        <div v-show="showOrgEdit" class="modal_content">
          <div class="modal_header">
            <div class="title">子机构编辑/新增 </div>
            <a href="javascript:;" class="modal_header_close" @click="showOrgEdit=false"></a>
          </div>
          <div class="modal_middle" style="height: 500px;overflow-y: scroll;">
            <div class="modal_row">
              <div class="row_left">
                名称:
              </div>
              <div class="row_right">
                <input type="text" v-model="Org.OrgName">
              </div>
            </div>
            <div class="modal_row">
              <div class="row_left">
                图片:
              </div>
              <div class="row_right">
                <div>
                  <file-upload v-on:listenFileUpload="GetFileID" :FilePath="Org.FilePath"></file-upload>
                </div>
              </div>
            </div>
            <div class="modal_row">
              <div class="row_left">
                简介
              </div>
              <div class="row_right">
                <!-- 富文本 start -->
                <editor v-on:listenCourseBrief="GetBrief" :Brief="Brief"></editor>
                <UEditor :defaultMsg=defaultMsg :config=config ref="ue"></UEditor>
                <!-- 富文本 end -->
              </div>
            </div>
          </div>
          <div class="modal_bottom">
            <a class="btn confirm_btn" href="javascript:;" @click="Org_Edit()"> 确定</a>
            <a class="btn close_btn" href="javascript:;" @click="showOrgEdit=false"> 取消</a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import UEditor from "@/components/ueditor/ueditor";
import Editor from "../Editor/Editor.vue";
import fileUpload from "@/components/fileUpload/fileUpload";

export default {
  name: "hello",
  data() {
    return {
      defaultMsg: "",
      config: {
        // initialFrameWidth: null,
        // initialFrameHeight: 350
      },
      Brief: "",
      showOrgEdit: false,
      Org: { OrgName: "", FilePath: "", FileID: 0, Brief: "" },
      Org_Items: []
    };
  },
  methods: {
    Org_List: function() {
      this.$http.get(this.ApiUrl + "me/Organization/Organization_List").then(
        response => {
          this.Org_Items = response.data.data[0];
        },
        response => {
          // error callback
        }
      );
    },
    showOrg_Edit: function(m) {
      this.showOrgEdit = true;
      this.Org = { OrgName: "", FilePath: "", FileID: 0, Brief: "", OrgID: 0 };
      this.Brief = "";
      if (m) {
        this.Org = m;
        this.Brief = m.Brief;
        // UE.setContent(m.Brief);
      }
    },
    GetBrief(data) {
      this.Org.Brief = data;
    },
    GetFileID(data) {
      this.Org.FileID = data.Data[0];
    },
    Org_Edit: function() {
      this.showOrgEdit = false;
      console.log(this.Org);
      this.$http
        .post(this.ApiUrl + "me/Organization/Organization_Edit", this.Org)
        .then(
          response => {
            this.Org_List();
          },
          response => {
            // error callback
          }
        );
    },
    //删除子机构
    Org_Del: function(m) {
      let obj = this;
      obj.$layer.confirm("确定他要删除吗?", function() {
        obj.$http
          .post(obj.ApiUrl + "me/Organization/Organization_Del", m)
          .then(
            res => {
              obj.Org_List();
              obj.$layer.closeAll();
            },
            res => {}
          );
      });
    },
    getUEContent() {
      let content = this.$refs.ue.getUEContent();
      console.log(content);
    }
  },
  mounted() {
    this.Org_List();
  },
  components: {
    editor: Editor,
    fileUpload: fileUpload,
    UEditor
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  width: 900px;
  /*min-width: 760px;*/
  z-index: 2;
  transform: translate(-50%, -50%);
  background: #fff;
}

.modal_wrapper .modal_content .modal_header {
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 18px;
  background: #098fe7;
  padding: 0 25px;
  position: relative;
}

.modal_wrapper .modal_header_close {
  position: absolute;
  top: 10px;
  right: 20px;
  display: inline-block;
  width: 40px;
  height: 40px;
  opacity: 0.8;
}

.modal_wrapper .modal_header_close:hover {
  opacity: 1;
}

.modal_wrapper .modal_header_close:after {
  content: " ";
  display: block;
  width: 2px;
  height: 22px;
  background: #fff;
  position: absolute;
  left: 50%;
  transform: rotate(45deg);
}

.modal_wrapper .modal_header_close:before {
  content: " ";
  display: block;
  width: 2px;
  height: 22px;
  background: #fff;
  position: absolute;
  left: 50%;
  transform: rotate(-45deg);
}

.modal_wrapper .modal_content .modal_middle {
  padding: 25px;
}

.modal_wrapper .modal_row {
  display: flex;
  margin-bottom: 30px;
}

.modal_wrapper .modal_row .row_left {
  flex: 0 0 60px;
}

.modal_wrapper .modal_row .row_right {
  flex: 1;
}

.modal_wrapper .modal_row .row_right input {
  height: 40px;
  line-height: 40px;
  width: 100%;
  border-radius: 8px;
  outline: none;
  border: none;
  border: 1px solid #d8d8d8;
  padding-left: 15px;
}

.modal_wrapper .common_select {
  box-sizing: border-box;
  display: inline-block;
  /*background: #eee;*/
  outline: none;
  border: none;
  border: 1px solid #d8d8d8;
  padding-left: 20px;
  border-radius: 8px;
  height: 40px;
  line-height: 40px;
  width: 120px;
  background-image: url("./../../assets/img/downArrow.png");
  background-position: 90% center;
  background-repeat: no-repeat;
  -webkit-appearance: none;
  min-width: 200px;
  color: #656565;
}

.modal_bottom {
  text-align: center;
  padding-bottom: 30px;
}

.modal_bottom .btn {
  display: inline-block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #fff;
  background: #adadad;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin: 0 15px;
}

.modal_bottom .btn:hover {
  background: #068fe7;
}
</style>
