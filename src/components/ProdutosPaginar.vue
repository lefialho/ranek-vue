<template>
  <nav>
    <ul v-if="paginasTotal > 1" ref="paginacao">
      <li>
        <router-link :to="{ query: query(1) }"> &#8592; </router-link>
      </li>
      <li v-for="pagina in paginas" :key="pagina">
        <router-link :to="{ query: query(pagina) }">{{ pagina }}</router-link>
      </li>
      <li>
        <router-link :to="{ query: query(paginasTotal) }"> &#8594;</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    produtosPorPagina: {
      type: Number,
      default: 1,
    },
    produtosTotal: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    query(pagina) {
      return {
        ...this.$route.query,
        _page: pagina,
      };
    },
    ativarPaginacao() {
      const $$item = this.$refs.paginacao?.querySelectorAll("a");
      const number = window.location.href.split("").splice(-1).join("");

      $$item?.forEach(($item) => {
        $item.classList.remove("router-link-exact-active");
        $$item[1].classList.add("router-link-exact-active");
      });

      if ($$item[number] || undefined) {
        $$item[1].classList.remove("router-link-exact-active");
        $$item[number].classList.add("router-link-exact-active");
      }
      return $$item;
    },
  },
  computed: {
    paginas() {
      const current = Number(this.$route.query._page);
      const range = 9;
      const offSet = Math.ceil(range / 2);
      const total = this.paginasTotal;
      const pagesArray = [];

      for (let i = 1; i <= total; i++) {
        pagesArray.push(i);
      }
      pagesArray.splice(total, current - offSet);
      pagesArray.splice(range, total);
      // console.log(pagesArray);
      return pagesArray;
    },
    paginasTotal() {
      const total = this.produtosTotal / this.produtosPorPagina;
      return total !== Infinity ? Math.ceil(total) : 0; // verifica se é o valor é diferente de infinito e arredonda pra cima com Math.ceil
    },
  },
  mounted() {
    this.ativarPaginacao();
  },
};
</script>

<style lang="scss" scoped>
nav {
  grid-column: 1 / -1;
}

li {
  display: inline-block;

  a {
    padding: 2px 8px;
    border-radius: 2px;
    margin: 4px;

    &.router-link-exact-active,
    &:hover {
      background-color: var(--primary);
      color: white;
    }
  }
}
</style>
