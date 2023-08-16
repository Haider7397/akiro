import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { removeRequest } from "../../../Flux";
import { IToken } from "../../../Model";

export interface ITokenState {
  token?: IToken;
  openRequests: string[];
  tokenStatus:string
  tokens: IToken[]
}

const initialState: ITokenState = {
  token: undefined,
  openRequests: [],
  tokenStatus: "",
  tokens:[]
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
    state.token = action.payload.data;
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
    state.token = action.payload.data;
    state.tokenStatus = action.payload.data.validityStatus;
    state.openRequests = removeRequest(state, action);
  },
  ValidateTokenFailure: (
    state: Draft<ITokenState>,
    action: PayloadAction<{ error: Error }>
  ) => {
    state.openRequests = removeRequest(state, action);
  },
  GetAllTokenRequest: (
    state: Draft<ITokenState>,
    action: PayloadAction<{ userId: string;}>
  ) => {
    state.openRequests.push(action.type);
  },
  GetAllTokenSuccess: (
    state: Draft<ITokenState>,
    action: PayloadAction<{ data: IToken[]}>
  ) => {
    state.tokens = action.payload.data;
    state.openRequests = removeRequest(state, action);
  },
  GetAllTokenFailure: (
    state: Draft<ITokenState>,
    action: PayloadAction<{ error: Error }>
  ) => {
    state.openRequests = removeRequest(state, action);
  },
  GetTokenByStatusRequest: (
    state: Draft<ITokenState>,
    action: PayloadAction<{ userId: string; validityStatus:string}>
  ) => {
    state.openRequests.push(action.type);
  },
  GetTokenByStatusSuccess: (
    state: Draft<ITokenState>,
    action: PayloadAction<{ data: IToken[]}>
  ) => {
    state.tokens = action.payload.data;
    state.openRequests = removeRequest(state, action);
  },
  GetTokenByStatusFailure: (
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
