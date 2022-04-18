<template>
  <section class="produtos-container">
    <transition mode="out-in">
      <!-- out-in anima item um e depois o outro em sequência -->
      <div class="produtos" v-if="produtos && produtos.length" key="produtos">
        <!-- key para animação -->
        <div class="produto" v-for="produto in produtos" :key="produto.id">
          <router-link :to="{ name: 'produto', params: { id: produto.id } }">
            <img v-if="produto.fotos" :src="require(`@/assets/${produto.fotos}.jpg`)" :alt="produto.id" />
            <p class="preco">{{ $filters.currencyBR(produto.preco) }}</p>
            <h2 class="titulo">{{ produto.nome }}</h2>
            <p>{{ produto.descricao }}</p>
          </router-link>
        </div>
        <ProdutosPaginar
          :produtosTotal="produtosTotal"
          :produtosPorPagina="produtosPorPagina"
        />
      </div>
      <div
        class="sem-resultados"
        v-else-if="produtos && produtos.length === 0"
        key="sem-resultado"
      >
        <!-- key para animação -->
        <p>Busca sem resultado. Tente buscar outro termo</p>
      </div>
      <Loading key="carregando" v-else />
      <!-- key para animação -->
      <!-- {{ produtosTotal }} -->
      <!-- {{ url }} -->
    </transition>
  </section>
</template>

<script>
import ProdutosPaginar from "@/components/ProdutosPaginar.vue";
import { api } from "@/services.js";
import serialize from "@/helpers.js";

export default {
  name: "ProdutosLista",
  components: {
    ProdutosPaginar,
  },
  data() {
    return {
      produtos: null,
      produtosPorPagina: 9,
      produtosTotal: 0,
    };
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/produto?_limit=${this.produtosPorPagina}"${query}`;
    },
  },
  methods: {
    getProdutos() {
      this.produtos = null;
      setTimeout(() => {
        api.get(this.url).then((response) => {
          this.produtosTotal = Number(response.headers["x-total-count"]);
          this.produtos = response.data;
        });
      }, 500);
      fetch("http://localhost:3000/produto")
        .then((response) => response.json())
        .then((response) => (this.produtos = response));
    },

  },
  watch: {
    // Sempre q a url modifica ele busca o produto com o watch
    url() {
      this.getProdutos();
    },
  },
  created() {
    this.getProdutos();
  },
};
</script>

<style lang="scss" scoped>
.produtos-container {
  max-width: $size-app-max-width;
  margin: 0 auto;

  .produtos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    margin: 30px;

    .produto {
      box-shadow: var(--shadow);
      padding: 10px;
      background: white;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        box-shadow: var(--strong-shadow);
        transform: scale(1.1);
        position: relative;
        z-index: 1;
      }

      img {
        border-radius: 4px;
        margin-bottom: 20px;
      }
    }
  }
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  color: var(--secondary);
  font-weight: bold;
}

.sem-resultados {
  text-align: center;
}
</style>
