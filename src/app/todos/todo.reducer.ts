import { Action, createReducer, on } from '@ngrx/store';
import { crear,toggle } from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial:Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Comprar traje de Ironman'),
    new Todo('Robar escudo del Capitán América')
];

export const _todoReducer = createReducer(
    estadoInicial,
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

);

export function todoReducer(state:Todo[] | undefined,action:Action){
    return _todoReducer(state,action)
}