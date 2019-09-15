<template>
  <div>
    <Titulo texto="Professores" />
    <table>
      <thead>
        <th>Cód.</th>
        <th>Nome</th>
        <th>Alunos</th>
      </thead>
      <tbody v-if="professores.length">
        <tr v-for="(professor, index) in professores" :key="index">
          <td class="colPequeno">{{ professor.id }}</td>
          <router-link :to="'/alunos/' + professor.id" tag="td" style="cursor: pointer">{{ professor.nome }}</router-link>
          <td class="colPequeno">{{ professor.qtdAlunos }}</td>
        </tr>
      </tbody>
      <tfoot v-else>
        Nenhum professor encontrado.
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
  data() {
    return {
      professores: [],
      alunos: []
    }
  },
  methods: {
    pegarQtdAlunosPorProfessor() {
      this.professores.forEach((professor, index) => {
        professor = {
          id: professor.id,
          nome: professor.nome,
          qtdAlunos: this.alunos.filter(aluno => aluno.professor.id 
          == professor.id).length
        }
        this.professores[index] = professor;
      });
    },
    carregarProfessores() {
      this.$http
      .get('http://localhost:3000/professores')
      .then(resposta => {
        this.professores = resposta.body;
        this.pegarQtdAlunosPorProfessor();
      });
    }
  },
  created() {
    this.$http
      .get('http://localhost:3000/alunos')
      .then(resposta => {
        this.alunos = resposta.body;
        this.carregarProfessores();
      });
  }
}
</script>

<style scoped>
.colPequeno {
  text-align: center;
  width: 20%;
}
</style>
