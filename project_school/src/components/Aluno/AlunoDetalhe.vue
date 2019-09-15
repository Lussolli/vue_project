<template>
  <div>
    <Titulo :texto="`Aluno: ${aluno.nome}`" :btnVoltar="!visualizando">
      <button v-show="visualizando" type="button" @click="editar" class="btn btnEditar">Editar</button>
    </Titulo>
    <table>
      <tbody>
        <tr>
          <td class="colPequeno">Matrícula:</td>
          <td>
            <label>{{ aluno.id }}</label>
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Nome:</td>
          <td>
            <label v-if="visualizando">{{ aluno.nome }}</label>
            <input v-else type="text" v-model="aluno.nome"></input>
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Sobrenome:</td>
          <td>
            <label v-if="visualizando">{{ aluno.sobrenome }}</label>
            <input v-else type="text" v-model="aluno.sobrenome"></input>
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Data nascimento:</td>
          <td>
            <label v-if="visualizando">{{ aluno.dataNascimento }}</label>
            <input v-else type="text" v-model="aluno.dataNascimento"></input>
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Professor:</td>
          <td>
            <label v-if="visualizando">{{ aluno.professor.nome }}</label>
            <select v-else v-model="aluno.professor">
              <option v-for="(professor, index) in professores" 
              :key="index" :value="professor">
                {{ professor.nome }}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div style="margin-top: 10px;">
      <div v-if="!visualizando">
        <button type="button" class="btn btnSalvar" @click="salvar">Salvar</button>
        <button type="button" class="btn btnCancelar" @click="cancelar">Cancelar</button>
      </div>
    </div>
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
      aluno: {},
      idAluno: this.$route.params.id,
      visualizando: true
    }
  },
  methods: {
    editar() {
      this.visualizando = !this.visualizando;
    },
    salvar() {
      let _alunoEditar = {
        id: this.aluno.id,
        nome: this.aluno.nome,
        sobrenome: this.aluno.sobrenome,
        dataNascimento: this.aluno.dataNascimento,
        professor: this.aluno.professor
      }
      
      this.$http
        .put('http://localhost:3000/alunos/' + _alunoEditar.id, 
        _alunoEditar);
      this.editar();
    },
    cancelar() {
      this.visualizando = !this.visualizando;
    }
  },
  created() {
    this.$http
      .get('http://localhost:3000/alunos/' + this.idAluno)
      .then(resposta => {
        this.aluno = resposta.body;
      });
      
    this.$http
      .get('http://localhost:3000/professores')
      .then(resposta => {
        this.professores = resposta.body;
      });
  }
}
</script>

<style scoped>
.colPequeno {
  width: 20%;
}

input, select {
  margin: 0;
  padding: 5px 10px;
  font-size: 0.9em;
  font-family: 'Montserrat';
  border-radius: 5px;
  border: 1px solid silver;
  background-color: rgb(245, 245, 245);
  width: 95%;
}

select {
  height: 38px;
  width: 100%;
}

.btnEditar {
  color: black;
  float: right;
  background-color: rgb(76, 186, 249);
}

.btnSalvar {
  color: black;
  float: right;
  background-color: rgb(76, 196, 68);
}

.btnCancelar {
  color: black;
  float: left;
  background-color: rgb(249, 186, 92);
}
</style>
