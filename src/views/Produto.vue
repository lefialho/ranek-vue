<template>
  <section>
    <div v-if="produto" class="produto">
      <div class="fotos" v-if="produto.fotos">
        <img :src="require(`@/assets/${produto.fotos}.jpg`)" :alt="produto.id" />
      </div>
      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="preco">{{ $filters.currencyBR(produto.preco) }}</p>
        <p class="descricao">{{ produto.descricao }}</p>
        <transition mode="out-in" v-if="produto.vendido === 'false'">
          <button class="btn" v-if="!finalizar" @click="finalizar = true">
            Comprar
          </button>
          <FinalizarCompra v-else :produto="produto" />
        </transition>
        <button class="btn" v-else disabled>Produto Vendido</button>
      </div>
    </div>
    <loading v-else />
  </section>
</template>

<script>
import { api } from "@/services.js";
import FinalizarCompra from "@/components/FinalizarCompra.vue";

export default {
  name: "Produto",
  props: ["id"],
  components: {
    FinalizarCompra,
  },
  data() {
    return {
      produto: null,
      finalizar: false,
    };
  },
  methods: {
    getProduto() {
      api.get(`/produto/${this.id}`).then((response) => {
        return (this.produto = response.data);
      });
    },
  },
  created() {
    this.getProduto();
  },
};
</script>

<style lang="scss" scoped>
.produto {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;

  .preco {
    color: var(--secondary);
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 40px;
  }

  .descricao {
    font-size: 1.2rem;
  }

  .btn {
    margin-top: 60px;
    width: 200px;
  }
}
</style>
