import Vue from 'vue';
import VueRouter from 'vue-router';

import Alunos from './components/Aluno/Alunos.vue';
import Professor from './components/Professor/Professor.vue';
import Sobre from './components/Sobre/Sobre.vue';
import AlunoDetalhe from './components/Aluno/AlunoDetalhe.vue';

Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{
			path: '/professores',
      nome: 'Professores',
      component: Professor
		},
    {
			path: '/todosalunos',
      nome: 'Alunos',
      component: Alunos
		},
    {
			path: '/alunos/:prof_id',
      nome: 'Alunos',
      component: Alunos
		},
    {
			path: '/sobre',
      nome: 'Sobre',
      component: Sobre
		},
    {
      path: '/alunodetalhe/:id',
      nome: 'Detalhes do aluno',
      component: AlunoDetalhe
    }
	]
});
