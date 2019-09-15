<template>
  <div id="app">
    <Nav />
    <div class="margemPrincipal">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import Nav from './components/_nav/Nav.vue';
import Alunos from './components/Aluno/Alunos.vue';
import Professor from './components/Professor/Professor.vue';
import Sobre from './components/Sobre/Sobre.vue';

export default {
  name: 'app',
  components: {
    Alunos,
    Professor,
    Nav,
    Sobre
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");

body{
  background-color: #eee;
  font-family: "Montserrat", sans-serif;
  display: grid;
  justify-items: center;
}

body, html {
  margin: 0;
  height: 100%;
}

#app {
  width: 100%;
}

.margemPrincipal {
  width: 50%;
  margin: auto;
}

.btn_Danger {
  font-size: 0.8em !important;
  background-color: #fa4430;
}

.btn {
  border: 1px solid #000;
  cursor: pointer;
  color: white;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 5px;
  border-bottom: 3px solid black;
  font-size: 1.2em;
}

.btn:hover {
  text-shadow: 1px 1px 1px black;
  border-bottom: 1px solid black;
  margin-top: 2px;
}

table {
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  width: 100%;
}

table tr td{
  padding: 20px;
  font-size: 1.3em;
  background-color: #e0edf4;
  margin-bottom: 2px;
  color: #3e5252;
}

table thead th{
  background-color: rgb(184, 208, 216) !important;
  font-size: 1.2em;
  padding: 10px 0px;
  text-align: center !important;
}

.colPequeno {
  width: 5%;
  text-align: right;
  background-color: rgb(125, 217, 245);
  font-weight: bold;
}
</style>
