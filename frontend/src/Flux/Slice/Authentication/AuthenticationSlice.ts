import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { removeRequest } from "../../../Flux";
import { IUser } from "../../../Model";

export interface IAuthenticationState {
  user?: IUser;
  openRequests: string[];
}

const initialState: IAuthenticationState = {
  user: undefined,
  openRequests: [],
};

const reducers = {
  loginRequest: (
    state: Draft<IAuthenticationState>,
    action: PayloadAction<{ email: string; password: string }>
  ) => {
    state.openRequests.push(action.type);
  },
  loginSuccess: (
    state: Draft<IAuthenticationState>,
    action: PayloadAction<{ user: IUser }>
  ) => {
    state.user = action.payload.user;
    state.openRequests = removeRequest(state, action);
  },
  loginFailure: (
    state: Draft<IAuthenticationState>,
    action: PayloadAction<{ error: Error }>
  ) => {
    state.openRequests = removeRequest(state, action);
  },
  registerRequest: (
    state: Draft<IAuthenticationState>,
    action: PayloadAction<{firstName: string; lastName: string; userName: string; email: string; password: string}>
  ) => {
    state.openRequests.push(action.type);
  },
  registerSuccess: (
    state: Draft<IAuthenticationState>,
    action: PayloadAction<{ user: IUser }>
  ) => {
    state.openRequests = removeRequest(state, action);
  },
  registerFailure: (
    state: Draft<IAuthenticationState>,
    action: PayloadAction<{ error: Error }>
  ) => {
    state.openRequests = removeRequest(state, action);
  },
  refreshAccessTokenRequest: (
    state: Draft<IAuthenticationState>,
    action: PayloadAction<{ refreshToken: string }>
  ) => {
    state.openRequests.push(action.type);
  },
  refreshAccessTokenSuccess: (
    state: Draft<IAuthenticationState>,
    action: PayloadAction<{ user: IUser }>
  ) => {
    state.user = action.payload.user;
    state.openRequests = removeRequest(state, action);
  },
  refreshAccessTokenFailure: (
    state: Draft<IAuthenticationState>,
    action: PayloadAction<{ error: Error }>
  ) => {
    state.openRequests = removeRequest(state, action);
  },
  reset: () => {
    return initialState;
  },
};

export const authenticationSlice = createSlice<
  IAuthenticationState,
  typeof reducers,
  "authentication"
>({
  name: "authentication",
  initialState,
  reducers,
});
