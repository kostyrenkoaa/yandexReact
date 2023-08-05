export enum WSE {
  START = 'WS_CONNECTION_START',
  SUCCESS = 'WS_CONNECTION_SUCCESS',
  ERROR = 'WS_CONNECTION_ERROR',
  CLOSED = 'WS_CONNECTION_CLOSED',
  GET_MESSAGE = 'WS_GET_MESSAGE',
}

export interface StartAction {
  readonly type: typeof WSE.START;
  readonly payload: string;
}

export interface SuccessAction {
  readonly type: typeof WSE.SUCCESS;
  readonly payload: Event;
}

export interface ErrorAction {
  readonly type: typeof WSE.ERROR;
  readonly payload: Event;
}

export interface ClosedAction {
  readonly type: typeof WSE.CLOSED;
}

export interface GetMessageAction {
  readonly type: typeof WSE.GET_MESSAGE;
  readonly payload: string;
}

export type WSActionsT =
  | StartAction
  | SuccessAction
  | ErrorAction
  | ClosedAction
  | GetMessageAction;
