<template>
  <form>
    <input
      type="text"
      name="busca"
      id="busca"
      v-model="busca"
      placeholder="Buscar..."
    />
    <input
      type="submit"
      id="lupa"
      value="Buscar"
      @click.prevent="buscarProdutos"
    />
    <!-- {{ busca }} -->
  </form>
</template>

<script>
export default {
  data() {
    return {
      busca: "",
    };
  },
  methods: {
    buscarProdutos() {
      this.$router.push({ query: { q: this.busca } });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;

  #busca {
    width: 100%;
    padding: 20px;

    &:hover,
    &:focus {
      outline: none;
      box-shadow: var(--strong-shadow);
      border-color: var(--primary);
    }
  }

  #lupa {
    background: url(../assets/search.svg) no-repeat center center;
    width: 62px;
    height: 62px;
    text-indent: -150px;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: none;
  }
}
</style>
