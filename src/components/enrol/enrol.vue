<template>
  <div v-show="display" class="enrol">
    <div class="enrol_wrapper">
      <register></register>
    </div>
    <div class="mask" @click="enrolDisplay(false)"></div>
  </div>

</template>

<script>
  import register from "@/components/register/register";
  export default {
    name: "enrol",
    data() {
      return {
        display: true
      };
    },
    components: {
      register
    },
    mounted() {
      let _this = this;
      eventBus.$on("enrolDisplay", function (val) {
        _this.display = val;
      });
    },
    methods: {
      enrolDisplay: function (state) {
        this.display = state;
        eventBus.$emit("enrolDisplay", state);
      }
    }
  };

</script>

<style>

  .enrol_wrapper {
    z-index: 15;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 11;
  }

</style>
