<template>
  <div class="not-found">
    <h1>404 - Página Não Encontrada</h1>
    <p>Desculpe, a página que você está procurando não existe.</p>
    <router-link to="/" class="home-link">Voltar para a página inicial</router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}

.not-found h1 {
  font-size: 3rem;
  color: #ff6347;
}

.not-found p {
  font-size: 1.2rem;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.home-link:hover {
  background-color: #0056b3;
}
</style>
