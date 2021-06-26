import produce from 'immer';
import types from './types';

const INITIAL_STATE = {
  behavior: 'create',
  components: {
    drawer: false,
    confirmDelete: false,
  },
  form: {
    filtering: false,
    disabled: true,
    saving: false,
  },
  colaboradores: [],
  servicos: [],
  colaborador: {
    email: '',
    nome: '',
    telefone: '',
    dataNascimento: '',
    sexo: 'M',
    vinculo: 'A',
    especialidades: [],
  },
};

function colaborador(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_COLABORADOR: {
      return produce(state, (draft) => {
        draft = { ...draft, ...action.payload };
        return draft;
      });
    }

    // case types.FILTER_CLIENTES: {
    //   return produce(state, (draft) => {
    //     draft.form.filtering = true;
    //     return draft;
    //   });
    // }

    case types.RESET_COLABORADOR: {
      return produce(state, (draft) => {
        draft.colaborador = INITIAL_STATE.colaborador;
        return draft;
      });
    }

    default:
      return state;
  }
}

export default colaborador;
