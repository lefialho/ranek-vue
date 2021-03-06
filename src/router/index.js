import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Produto from '@/views/Produto.vue'
import Usuario from '@/views/usuario/Usuario.vue'
import UsuarioProdutos from '@/views/usuario/UsuarioProdutos.vue'
import UsuarioVendas from '@/views/usuario/UsuarioVendas.vue'
import UsuarioCompras from '@/views/usuario/UsuarioCompras.vue'
import UsuarioEditar from '@/views/usuario/UsuarioEditar.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/produto/:id',
    name: 'produto',
    component: Produto,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/usuario',
    component: Usuario,
    children: [
      {
        path: "",
        name: "usuario",
        component: UsuarioProdutos,
      },
      {
        path: "",
        name: "compras",
        component: UsuarioCompras,
      },
      {
        path: "",
        name: "vendas",
        component: UsuarioVendas,
      },
      {
        path: "",
        name: "usuario-editar",
        component: UsuarioEditar,
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

export default router
