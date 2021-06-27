import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userSaga } from './saga';
import { User, UserState } from './types';

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsers (state) {
      state.loading = true;
      state.error = null;
    },
    usersFetched (state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.loading = false;
    },
    usersFetchingFailed (state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addUser (state, action: PayloadAction<User>) {
      state.loading = true;
      state.error = null;
    },
    userRegistered (state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      state.loading = false;
    },
    userRegistrationFailed (state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUser (state, action: PayloadAction<User>) {
      state.loading = true;
    },
    userUpdated (state, action: PayloadAction<User>) {
      state.loading = false;
      state.users = state.users.map((user) => user._id !== action.payload._id ? user : action.payload);
    },
    userUpdateFailed (state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUser (state, action: PayloadAction<string>) {
      state.loading = true;
    },
    userDeleted (state, action: PayloadAction<string>) {
      state.users = state.users.filter((user) => user._id !== action.payload);
      state.loading = false;
    },
    userDeletingFailed (state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions: userActions } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userSaga });
  return { actions: slice.actions };
};