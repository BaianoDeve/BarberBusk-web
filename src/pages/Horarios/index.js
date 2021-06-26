import 'rsuite/dist/styles/rsuite-default.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import 'moment/locale/pt-br';
import util from '../../util';
import colors from '../../data/colors.json';

import {
  allHorarios,
  addHorario,
  updateHorario,
  removeHorario,
  filterColaboradores,
  allServicos,
  resetHorario,
  saveHorario,
} from '../../store/modules/horario/actions';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import {
  Button,
  Drawer,
  Modal,
  Icon,
  TagPicker,
  Checkbox,
  DatePicker,
  Notification,
} from 'rsuite';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const Horario = () => {
  const dispatch = useDispatch();
  const {
    horario,
    horarios,
    servicos,
    colaboradores,
    form,
    components,
    behavior,
  } = useSelector((state) => state.horario);

  const diasDaSemana = [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado',
  ];

  const diasSemanaData = [
    new Date(2021, 3, 11, 0, 0, 0, 0),
    new Date(2021, 3, 12, 0, 0, 0, 0),
    new Date(2021, 3, 13, 0, 0, 0, 0),
    new Date(2021, 3, 14, 0, 0, 0, 0),
    new Date(2021, 3, 15, 0, 0, 0, 0),
    new Date(2021, 3, 16, 0, 0, 0, 0),
    new Date(2021, 3, 17, 0, 0, 0, 0),
  ];

  const formatEvents = () => {
    let listaEventos = [];

    horarios.map((horario, index) => {
      horario.dias.map((dia) => {
        listaEventos.push({
          resource: { horario, backgroundColor: colors[index] },
          title: `${horario.especialidades.length} espec. e 
                  ${horario.colaboradores.length} colab. disponíveis`,
          start: new Date(
            diasSemanaData[dia].setHours(
              parseInt(moment(horario.inicio).format('HH')),
              parseInt(moment(horario.inicio).format('mm'))
            )
          ),
          end: new Date(
            diasSemanaData[dia].setHours(
              parseInt(moment(horario.fim).format('HH')),
              parseInt(moment(horario.fim).format('mm'))
            )
          ),
        });
      });
    });

    return listaEventos;
  };

  useEffect(() => {
    dispatch(allHorarios());
    dispatch(allServicos());
  }, []);

  useEffect(() => {
    dispatch(filterColaboradores());
  }, [horario.especialidades]);

  const setComponent = (component, state) => {
    dispatch(
      updateHorario({
        components: { ...components, [component]: state },
      })
    );
  };

  const setHorario = (key, value) => {
    dispatch(
      updateHorario({
        horario: { ...horario, [key]: value },
      })
    );
  };

  const save = () => {
    if (
      !util.allFields(horario, [
        'dias',
        'inicio',
        'fim',
        'especialidades',
        'colaboradores',
      ])
    ) {
      // DISPARAR O ALERTA
      Notification.error({
        placement: 'topStart',
        title: 'Calma lá!',
        description: 'Antes de prosseguir, preencha todos os campos!',
      });
      return false;
    }
    if (behavior === 'create') {
      dispatch(addHorario());
    } else {
      dispatch(saveHorario());
    }
  };

  const remove = () => {
    dispatch(removeHorario());
  };

  const onHorarioClick = (horario) => {
    dispatch(
      updateHorario({
        horario,
        behavior: 'update',
      })
    );
    setComponents('drawer', true);
  };

  return (
    <div className="col p-5 overflow-auto h-100">
      <Drawer
        show={components.drawer}
        sixe="sm"
        onHide={() => setComponent('drawer', false)}
      >
        <Drawer.Body>
          <h3>{behavior === 'create' ? 'Criar novo' : 'Atualizar'} Hórario</h3>
          <div className="row mt-3">
            <div className="col-12">
              <b>Dias da semana</b>
              <TagPicker
                size="lg"
                block
                value={horario.dias}
                data={diasDaSemana.map((label, value) => ({ label, value }))}
                onChange={(value) => {
                  setHorario('dias', value);
                }}
              />
            </div>

            <div className="col-6 mt-3">
              <b className="d-block">Horário Inicial</b>
              <DatePicker
                block
                format="HH:mm"
                hideMinutes={(min) => ![0, 30].includes(min)}
                value={horario.inicio}
                onChange={(e) => {
                  setHorario('inicio', e);
                }}
              />
            </div>

            <div className="col-6 mt-3">
              <b className="d-block">Horário Final</b>
              <DatePicker
                block
                format="HH:mm"
                hideMinutes={(min) => ![0, 30].includes(min)}
                value={horario.fim}
                onChange={(e) => {
                  setHorario('fim', e);
                }}
              />
            </div>

            <div className="col-12 mt-3">
              <b>Especialidades disponíveis</b>
              <TagPicker
                size="lg"
                block
                data={servicos}
                value={horario.especialidades}
                onChange={(e) => {
                  setHorario('especialidades', e);
                }}
              />
            </div>

            <div className="col-12 mt-3">
              <b>Colaboradores disponíveis</b>
              <TagPicker
                size="lg"
                block
                data={colaboradores}
                value={horario.colaboradores}
                onChange={(e) => {
                  setHorario('colaboradores', e);
                }}
              />
            </div>
          </div>

          <Button
            block
            className="mt-3"
            color={behavior === 'create' ? 'green' : 'primary'}
            size="lg"
            loading={form.saving}
            onClick={() => save()}
          >
            {behavior === 'create' ? 'Salvar' : 'Atualizar'} Hórario
          </Button>

          {behavior === 'update' && (
            <Button
              block
              className="mt-1"
              color="red"
              size="lg"
              loading={form.saving}
              onClick={() => setComponent('confirmDelete', true)}
            >
              Remover Hórario
            </Button>
          )}
        </Drawer.Body>
      </Drawer>
      <Modal
        show={components.confirmDelete}
        onHide={() => setComponent('confirmDelete', false)}
        size="xs"
      >
        <Modal.Header>
          <Modal.Title>
            <Icon
              icon="remind"
              style={{
                color: '#ffb300',
                fontSize: 24,
              }}
            />
            {'  '}Excluir Colaborador
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>Tem certeza que deseja excluir? Essa ação será irreversível!</b>
        </Modal.Body>
        <Modal.Footer>
          <Button loading={form.saving} onClick={() => remove()} color="red">
            Sim, tenho certeza!
          </Button>
          <Button
            onClick={() => setComponent('confirmDelete', false)}
            appearance="subtle"
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row col-12">
        <div className="w-10 d-flex justify-content-between">
          <h2 className="mb-4 mt-0">Hórarios de Atendimento</h2>
          <div>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                dispatch(resetHorario());
                dispatch(
                  updateHorario({
                    behavior: 'create',
                  })
                );
                setComponent('drawer', true);
              }}
            >
              <span className="mdi mdi-plus">Novo Hórario</span>
            </button>
          </div>
        </div>

        <Calendar
          localizer={localizer}
          popup
          selectable
          events={formatEvents()}
          date={diasSemanaData[moment().day()]}
          view={components.view}
          style={{ height: 600 }}
          toolbar={false}
          formats={{
            dateFormat: 'dd',
            dayFormat: (date, culture, localize) =>
              localize.format(date, 'dddd', culture),
          }}
          onSelectEvent={(e) => {
              const { horario } = e.resource;
              onHorarioClick(horario);
          }}
          onSelectSlot={(slotInfo) => {
            const { start, end } = slotInfo;
            dispatch(
              updateHorario({
                horario: {
                  ...horario,
                  dias: [moment(start).day()],
                  inicio: start,
                  fim: end,
                },
              })
            );
            setComponent('drawer', true);
          }}
          eventPropGetter={(event, start, end, isSelected) => {
            return {
              style: {
                backgroundColor: event.resource.backgroundColor,
                borderColor: event.resource.backgroundColor,
              },
            };
          }}
        />

        <div className="w-10 mb-4">
          <span className="m-4"></span>
        </div>
      </div>
    </div>
  );
};
export default Horario;
