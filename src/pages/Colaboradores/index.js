import 'rsuite/dist/styles/rsuite-default.css';
import moment from 'moment';
import util from '../../util';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  allColaboradores,
  updateColaborador,
  filterColaboradores,
  addColaborador,
  unlinkColaborador,
  allServicos,
  resetColaborador,
} from '../../store/modules/colaborador/actions';

import {
  Button,
  Drawer,
  Modal,
  Icon,
  TagPicker,
  Tag,
  Notification,
} from 'rsuite';
import Table from '../../components/Table';

const Colaborador = () => {
  const dispatch = useDispatch();
  const { colaboradores, colaborador, servicos, form, components, behavior } =
    useSelector((state) => state.colaborador);

  useEffect(() => {
    dispatch(allColaboradores());
    dispatch(allServicos());
  }, []);

  const setComponent = (component, state) => {
    dispatch(
      updateColaborador({
        components: { ...components, [component]: state },
      })
    );
  };

  const setColaborador = (key, value) => {
    dispatch(
      updateColaborador({
        colaborador: { ...colaborador, [key]: value },
      })
    );
  };

  const save = () => {
    if (
      !util.allFields(colaborador, [
        'email',
        'nome',
        'telefone',
        'dataNascimento',
        'sexo',
        'vinculo',
        'especialidades',
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
    dispatch(addColaborador());
  };

  const remove = () => {
    dispatch(unlinkColaborador());
  };

  return (
    <div className="col p-5 overflow-auto h-100">
      <Drawer
        show={components.drawer}
        sixe="sm"
        onHide={() => setComponent('drawer', false)}
      >
        <Drawer.Body>
          <h3>
            {behavior === 'create' ? 'Criar novo' : 'Atualizar'} Colaborador
          </h3>
          <div className="row mt-3">
            <div className="form-group col-12 mb-3">
              <b>E-mail</b>
              <div className="input-group">
                <input
                  type="email"
                  class="form-control"
                  disabled={behavior === 'update'}
                  placeholder="name@example.com"
                  value={colaborador.email}
                  onChange={(e) => setColaborador('email', e.target.value)}
                />
                {behavior === 'create' && (
                  <div className="input-group-append m-1">
                    <Button
                      appearance="primary"
                      loading={form.filtering}
                      disabled={form.filtering}
                      onClick={() => dispatch(filterColaboradores())}
                    >
                      Pesquisar
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="form-group col-6">
              <b className="">Nome</b>
              <input
                type="text"
                className="form-control"
                placeholder="Nome do colaborador"
                disabled={form.disabled}
                value={colaborador.nome}
                onChange={(e) => setColaborador('nome', e.target.value)}
              />
            </div>

            <div className="form-group col-6">
              <b className="">Status</b>
              <select
                className="form-control"
                disabled={form.disabled && behavior === 'create'}
                value={colaborador.vinculo}
                onChange={(e) => setColaborador('vinculo', e.target.value)}
              >
                <option value="A">Ativo</option>
                <option value="I">Inativo</option>
              </select>
            </div>
            <div className="form-group col-4">
              <b className="">Telefone / Whatsapp</b>
              <input
                type="text"
                className="form-control"
                placeholder="Telefone / Whatsapp do Cliente"
                disabled={form.disabled}
                value={colaborador.telefone}
                onChange={(e) => setColaborador('telefone', e.target.value)}
              />
            </div>
            <div className="form-group col-4">
              <b className="">Data de Nascimento</b>
              <input
                type="date"
                className="form-control"
                placeholder="Data de Nascimento do cliente"
                disabled={form.disabled}
                value={colaborador.dataNascimento}
                onChange={(e) =>
                  setColaborador('dataNascimento', e.target.value)
                }
              />
            </div>
            <div className="form-group col-4">
              <b className="">Sexo</b>
              <select
                className="form-control"
                disabled={form.disabled}
                value={colaborador.sexo}
                onChange={(e) => setColaborador('sexo', e.target.value)}
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>

            <div className="col-12 mb-3">
              <b>especialidades</b>
              <TagPicker
                size="lg"
                block
                data={servicos}
                disabled={form.disabled && behavior === 'create'}
                value={colaborador.especialidades}
                onChange={(especialidade) =>
                  setColaborador('especialidades', especialidade)
                }
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
            {behavior === 'create' ? 'Salvar' : 'Atualizar'} Colaborador
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
              Remover Colaborador
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
      <div className="row">
        <div className="col-12">
          <div className="w-10 d-flex justify-content-between">
            <h2 className="mb-4 mt-0">Barbeiros Cadastrados</h2>
            <div>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  dispatch(resetColaborador());
                  dispatch(
                    updateColaborador({
                      behavior: 'create',
                    })
                  );
                  setComponent('drawer', true);
                }}
              >
                <span className="mdi mdi-plus">Novo colaborador</span>
              </button>
            </div>
          </div>
          <Table
            loading={form.filtering}
            data={colaboradores}
            config={[
              { label: 'Nome', key: 'nome', width: 200, fixed: true },
              { label: 'E-mail', key: 'email', width: 200 },
              { label: 'Telefone', key: 'telefone', width: 200 },
              {
                label: 'Sexo',
                content: (colaborador) =>
                  colaborador.sexo === 'M' ? 'Masculino' : 'Feminino',
                width: 200,
              },
              {
                label: 'Status',
                content: (servico) => (
                  <Tag color={servico.status === 'A' ? 'green' : 'red'}>
                    {servico.status === 'A' ? 'Ativo' : 'Inativo'}
                  </Tag>
                ),
                width: 200,
              },
              {
                label: 'Data de Cadastro',
                content: (colaborador) =>
                  moment(colaborador.dataCadastro).format('DD/MM/YYYY HH:mm'),
                width: 200,
              },
            ]}
            actions={(colaborador) => (
              <Button color="blue" size="xs">
                Ver informações
              </Button>
            )}
            onRowClick={(colaborador) => {
              dispatch(
                updateColaborador({
                  behavior: 'update',
                })
              );
              dispatch(
                updateColaborador({
                  colaborador,
                })
              );
              setComponent('drawer', true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Colaborador;
