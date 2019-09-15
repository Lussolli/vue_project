<template>
  <div>
    <Titulo :texto="professorId != undefined ? 'Professor: ' + professor.nome : titulo" />
    <div v-if="professorId != undefined">
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
          <td class="colPequeno">{{ aluno.id }}</td>
          <router-link tag="td" :to="'/alunodetalhe/' + aluno.id" style="cursor: pointer;">
            {{ aluno.nome + ' ' + aluno.sobrenome }}
          </router-link>
          <td class="colPequeno">
            <button type="button" class="btn btn_Danger" @click="remover(aluno)">
              Remover
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot v-else>
        <tr>
          <td colspan="3" style="text-align: center;">
            Nenhum aluno encontrado.
          </td>
        </tr>
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
      titulo: 'Todos os alunos',
      professorId: this.$route.params.prof_id,
      professor: {},
      nome: '',
      alunos: []
    }
  },
  methods: {
    remover(aluno) {
      this.$http
        .delete(`http://localhost:5000/api/aluno/${aluno.id}`)
        .then(() => {
          let indice = this.alunos.indexOf(aluno);
          this.alunos.splice(indice, 1);
        });
    },
    addAluno() {
      let _aluno = {
        nome: this.nome,
        sobrenome: '',
        dataNascimento: '',
        professorId: this.professor.id
      };
      
      this.$http
        .post('http://localhost:5000/api/aluno', _aluno)
        .then(res => {
          this.alunos.push(res.body);
        });
      
      this.nome = '';
    },
    carregarProfessores() {
      this.$http
      .get('http://localhost:5000/api/professor/' + this.professorId)
      .then(resposta => {
        this.professor = resposta.body;
      });
    }
  },
  created() {
    if (this.professorId) {
      this.carregarProfessores();
      this.$http
        .get('http://localhost:5000/api/aluno/ByProfessor/' + this.professorId)
        .then(resposta => {
          this.alunos = resposta.body;
        });
    } else {
      this.$http
        .get('http://localhost:5000/api/aluno')
        .then(resposta => {
          this.alunos = resposta.body;
        });
    }
  }
}
</script>

<style scoped>
input {
  width: calc(100% - 195px);
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  color: #687f7f;
}

.btnInput {
  width: 150px;
  border: 0px;
  padding: 20px;
  font-size: 1.3em;
  background-color: rgb(116, 115, 115);
}

.btnInput:hover {
  padding: 20px;
  margin: 0px;
  border: 0px;
}
</style>
