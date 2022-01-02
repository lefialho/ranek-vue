<template>
  <div id="nav">
    <TheHeader />
    <main id="main">
      <router-view v-slot="{ Component }">
        <transition mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

body {
  font-family: var(--font);
  color: var(--gray);
  background: url("./assets/pattern.svg") repeat top;
}

a {
  color: var(--gray);
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}

.btn {
  display: block;
  padding: 10px 30px;
  background-color: var(--primary);
  border-radius: 4px;
  color: white;
  text-align: center;
  font-size: 1rem;
  box-shadow: var(--shadow);
  transition: all 0.3s;
  border: none;
  font-family: var(--font);
  cursor: pointer;
}

.btn:hover {
  background: var(--primary-light);
  transform: scale(1.1);
}

#nav {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#main {
  flex: 1;
  // margin-bottom: 75px;
}

label {
  margin-bottom: 5px;
}

input,
textarea {
  border-radius: 4px;
  border: 1px solid white;
  padding: 15px;
  box-shadow: var(--shadow);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: var(--font);
  margin-bottom: 15px;

  &:hover,
  &:focus {
    outline: none;
    box-shadow: var(--strong-shadow);
    border-color: var(--primary);
  }
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>
