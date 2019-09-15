<template>
  <div>
    <div style="display: flex; width: 50%;">
      <h2>{{ texto }}</h2>
      <div class="voltar">
        <slot></slot>
        <button v-show="btnVoltar" type="button" class="btn btnVoltar" @click="voltar()">
          Voltar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    texto: {
      type: String,
      required: true
    },
    btnVoltar: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    voltar() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
.voltar {
  width: 50%;
  position: absolute;
  margin-top: 15px;
}

.btnVoltar {
  color: black;
  float: right;
  background-color: rgb(189, 189, 189);
}
</style>
