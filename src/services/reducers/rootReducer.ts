import {combineReducers} from 'redux';
import {ingredientsReducer} from "./ingredientsReducer";
import {currentIngredientReducer} from "./currentIngredientReducer";
import {constructorReducer} from "./constructorReducer";
import {orderReducer} from "./orderReducer";
import {requestReducer} from "./requests";
import {wsReducer} from "./wsReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  currentIngredient: currentIngredientReducer,
  items: constructorReducer,
  requests: requestReducer,
  ws: wsReducer,
});
