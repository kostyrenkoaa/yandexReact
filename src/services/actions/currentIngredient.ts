export enum ModalE {
    OPEN = 'OPEN_MODAL',
    CLOSE = 'CLOSE_MODAL',
}

export function getCurrentIngredient(cardData: any) {
  return function (dispatch: (arg0: { type: string; payload: any; }) => void) {
    dispatch({
      type: ModalE.OPEN,
      payload: cardData
    })
  };
}
