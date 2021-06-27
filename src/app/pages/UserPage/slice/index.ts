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
      state.users.push(action.payload);
    }
  },
});

export const { actions: userActions } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useUserSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
