<template>
  <div>
    <Titulo :texto="titulo" />
    <div>
      <input type="text" placeholder="Nome do aluno" v-model="nome" @keyup.enter="addAluno">
      <button type="button" class="btn btnInput" @click="addAluno">Adicionar</button>
    </div>
    
    <table>
      <thead>
        <th>Mat.</th>
        <th>Nome</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="alunos.length">
        <tr v-for="(aluno, index) in alunos" :key="index">
          <td>{{ aluno.id }}</td>
          <td>{{ aluno.nome + ' ' + aluno.sobrenome }}</td>
          <td>
            <button type="button" class="btn btn_Danger" @click="remover(aluno)">
              Remover
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot v-else>
        Nenhum aluno encontrado.
      </tfoot>
    </table>
  </div>
</template>

<script>
import Titulo from '../_shared/Titulo.vue';

export default {
  components: {
    Titulo
  },
  props: {
    
  },
  data() {
    return {
      titulo: 'Aluno',
      nome: '',
      alunos: []
    }
  },
  methods: {
    remover(aluno) {
      this.$http
        .delete(`http://localhost:3000/alunos/${aluno.id}`)
        .then(() => {
          let indice = this.alunos.indexOf(aluno);
          this.alunos.splice(indice, 1);
        });
    },
    addAluno() {
      let _aluno = {
        nome: this.nome,
        sobrenome: ''
      };
      
      this.$http
        .post('http://localhost:3000/alunos', _aluno)
        .then(res => {
          this.alunos.push(res.body);
        });
      
      this.nome = '';
    }
  },
  created() {
    this.$http
      .get('http://localhost:3000/alunos')
      .then(resposta => {
        this.alunos = resposta.body;
      });
  }
}
</script>

<style scoped>
input {
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  color: #687f7f;
  display: inline;
}

.btnInput {
  width: 150px;
  border: 0px;
  padding: 20px;
  font-size: 1.3em;
  display: inline;
  background-color: rgb(116, 115, 115);
}

.btnInput:hover {
  padding: 20px;
  margin: 0px;
  border: 0px;
}
</style>
