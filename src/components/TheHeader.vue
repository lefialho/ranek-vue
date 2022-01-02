<template>
  <header>
    <nav>
      <router-link to="/" class="logo">
        <img src="@/assets/logo.svg" alt="logo" />
      </router-link>
      <router-link class="btn" v-if="$store.state.login" to="/usuario">
        {{ nome }}
      </router-link>
      <router-link class="btn" v-else to="/login">Vender / Login</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  computed: {
    nome() {
      return this.$store.state.usuario.nome.replace(/ .*/, "");
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: var(--light-shadow);
}

.logo {
  padding: 10px 0;
}

.logo img {
  width: 90px;
}
</style>
