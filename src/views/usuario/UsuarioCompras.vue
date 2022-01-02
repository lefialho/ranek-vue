<template>
  <section>
    <div v-if="compras === null">
      <h2>Compras</h2>
      <p>Este usuário ainda não fez compras</p>
    </div>
    <div v-else>
      <h2>Compras</h2>
      <div
        class="produtos-wrapper"
        v-for="(compra, index) in compras"
        :key="index"
      >
        <produtoItem v-if="compra.produto" :produto="compra.produto">
          <p class="vendedor">
            <span><b>Vendedor:</b></span>
            {{ compra.vendedor_id }}
          </p>
        </produtoItem>
      </div>
    </div>
  </section>
</template>

<script>
import ProdutoItem from "@/components/ProdutoItem";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  components: {
    ProdutoItem,
  },
  data() {
    return {
      compras: null,
    };
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getCompras() {
      api.get(`/transacao?comprador_id=${this.usuario.id}`).then((response) => {
        this.compras = response.data;
      });
    },
  },
  watch: {
    login() {
      this.getCompras();
    },
  },
  created() {
    if (this.login) {
      this.getCompras();
    }
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 20px;
}
.produtos-wrapper {
  margin-bottom: 40px;

  .vendedor span {
    color: var(--secondary);
  }
}
</style>
