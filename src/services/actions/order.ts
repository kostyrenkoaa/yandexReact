import {BASE_URL} from '../../utils/constants';
import {ConstructorE} from './constructor';
import {fetchWithRefresh} from '../../utils/api-auth';
import {IngredientT} from "../../utils/types";

export enum OrderE {
    REQUEST = 'GET_ORDER_REQUEST',
    SUCCESS = 'GET_ORDER_SUCCESS',
    FAILED = 'GET_ORDER_FAILED',
    RESET = 'RESET_ORDER',
}

export function postOrder(ingredientData: IngredientT[], afterSend: () => void) {
    const ingredientsId = ingredientData.map(el => el._id);

    // @ts-ignore
    return function (dispatch) {
        dispatch({
            type: OrderE.REQUEST
        })

        fetchWithRefresh(`${BASE_URL}/orders`, {
            method: 'POST',
            body: JSON.stringify({
                ingredients: ingredientsId
            })
        })
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: OrderE.SUCCESS,
                        order: res.order.number
                    })
                    dispatch({
                        type: ConstructorE.RESET
                    });

                    afterSend()
                } else {
                    dispatch({
                        type: OrderE.FAILED
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: OrderE.FAILED,
                    payload: err
                })
            })
    }
}
