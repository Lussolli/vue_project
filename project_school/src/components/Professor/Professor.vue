<template>
  <div>
    <Titulo texto="Professores" :btnVoltar="true"/>
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
        <tr>
          <td colspan="3" style="text-align: center;">
            Nenhum professor encontrado.
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
      .get('http://localhost:5000/api/professor')
      .then(resposta => {
        this.professores = resposta.body;
        this.pegarQtdAlunosPorProfessor();
      });
    }
  },
  created() {
    this.$http
      .get('http://localhost:5000/api/aluno')
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
