import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { removeRequest } from "../../../Flux";
import { IToken } from "../../../Model";

export interface ITokenState {
  token?: IToken;
  openRequests: string[];
  tokenStatus:string
}

const initialState: ITokenState = {
  token: undefined,
  openRequests: [],
  tokenStatus: ""
};

const reducers = {
  CreateTokenRequest: (
    state: Draft<ITokenState>,
    action: PayloadAction<{ id: string; allowedDigits: string }>
  ) => {
    state.openRequests.push(action.type);
  },
  CreateTokenSuccess: (
    state: Draft<ITokenState>,
    action: PayloadAction<{ data: IToken }>
  ) => {
    state.token = action.payload.data.data;
    state.openRequests = removeRequest(state, action);
  },
  CreateTokenFailure: (
    state: Draft<ITokenState>,
    action: PayloadAction<{ error: Error }>
  ) => {
    state.openRequests = removeRequest(state, action);
  },
  ValidateTokenRequest: (
    state: Draft<ITokenState>,
    action: PayloadAction<{ token: string;}>
  ) => {
    state.openRequests.push(action.type);
  },
  ValidateTokenSuccess: (
    state: Draft<ITokenState>,
    action: PayloadAction<{ data: IToken }>
  ) => {
    state.token = action.payload.data.data;
    state.tokenStatus = action.payload.data.data.validityStatus;
    state.openRequests = removeRequest(state, action);
  },
  ValidateTokenFailure: (
    state: Draft<ITokenState>,
    action: PayloadAction<{ error: Error }>
  ) => {
    state.openRequests = removeRequest(state, action);
  },
  reset: () => {
    return initialState;
  },
};

export const tokenSlice = createSlice<
  ITokenState,
  typeof reducers,
  "token"
>({
  name: "token",
  initialState,
  reducers,
});
