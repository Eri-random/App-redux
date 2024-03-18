import { Action, createReducer, on } from '@ngrx/store';
import { borrar, crear,editar,limpiarTodos,toggle, toggleAll } from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial:Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Comprar traje de Ironman'),
    new Todo('Robar escudo del Capitán América')
];

export const _todoReducer = createReducer(
    estadoInicial,
    on(limpiarTodos, (state) => {
        return state.filter(t => !t.completado)
    }),
  on(crear, (state,{texto}) => [...state, new Todo(texto)]),
  on(toggle, (state,{id}) => {
    return state.map(todo => {
        if(todo.id === id){
            return {
                ...todo,
                completado: !todo.completado
            }
        }else{
            return todo;
        }
    })
  }),
  on(editar, (state,{id,texto}) => {
    return state.map(todo => {
        if(todo.id === id){
            return {
                ...todo,
                texto: texto
            }
        }else{
            return todo;
        }
    })
  }),
  on(borrar, (state,{id}) => state.filter(todo => todo.id != id)),
  on(toggleAll, (state,{completado}) => {
    return state.map(todo => {
            return {
                ...todo,
                completado: completado
            }
    })
  }),
);

export function todoReducer(state:Todo[] | undefined,action:Action){
    return _todoReducer(state,action)
}