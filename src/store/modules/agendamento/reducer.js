import types from './types';
import produce from 'immer';

const INICIAL_STATE = {
  agendamentos: [],
};

function agendamento(state = INICIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_AGENDAMENTO: {
      return produce(state, (draft) => {
        draft.agendamentos = action.agendamentos;
      });
    }
    default:
      return state;
  }
}

export default agendamento;
