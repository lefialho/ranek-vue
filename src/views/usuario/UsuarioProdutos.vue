<template>
  <section>
    <h2>Adicionar Produto</h2>
    <ProdutoAdicionar />
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <ProdutoItem :produto="produto"
          ><!-- passa a informação de produto para dentro do componente  produtoItem-->
          <p>{{ produto.descricao }}</p>
          <button class="deletar" @click="deletarProduto(produto.id)">
            Deletar
          </button>
        </ProdutoItem>
      </li>
    </transition-group>
    <!-- {{ usuario_produtos }} -->
  </section>
</template>

<script>
import ProdutoAdicionar from "@/components/ProdutoAdicionar.vue";
import ProdutoItem from "@/components/ProdutoItem.vue";
import { mapState, mapActions } from "vuex";
import { api } from "@/services.js";

export default {
  name: "UsuarioProdutos",
  components: {
    ProdutoAdicionar,
    ProdutoItem,
  },
  computed: {
    ...mapState(["login", "usuario", "usuario_produtos"]),
  },
  methods: {
    ...mapActions(["getUsuarioProdutos"]),
    deletarProduto(id) {
      const confirmar = window.confirm(
        "Deseja realmente remover este produto?"
      );
      if (confirmar) {
        api
          .delete(`/produto/${id}`)
          .then(() => {
            this.getUsuarioProdutos();
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },
  },
  watch: {
    login() {
      //Quando o login muda de false para verdadeiro, ativa a função
      this.getUsuarioProdutos();
    },
  },
  created() {
    if (this.login) {
      this.getUsuarioProdutos();
    }
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 20px;
}

.deletar {
  position: absolute;
  top: 0;
  right: 0;
  background: url(../../assets/remove.svg) no-repeat center center;
  width: 25px;
  height: 25px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  transform: scale(1);
  transition: 0.3s;

  &:hover {
    // transform: scale(1.2);
    background-color: var(--secondary);
  }
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translate3d(-30px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
</style>
