import { all, takeLatest, call, put } from 'redux-saga/effects';

import types from './types';
import { updateAgendamento } from './actions';

import api from '../../../services/api';
import { notification } from '../../../services/rsuite';
import consts from '../../../consts';

export function* filterAgendamento({ start, end }) {
  try {
    const { data: res } = yield call(api.post, '/agendamento/filter', {
      salaoId: consts.salaoId,
      periodo: {
        inicio: start,
        final: end,
      },
    });

    if (res.error) {
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return false;
    }

    yield put(updateAgendamento(res.agendamentos));
  } catch (err) {
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export default all([takeLatest(types.FILTER_AGENDAMENTOS, filterAgendamento)]);
