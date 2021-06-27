import { PayloadAction } from '@reduxjs/toolkit';
import api from 'api/apiCall';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { userActions as actions } from '.';
import { User } from './types';

function* fetchUsers() {
  try{
    const response = yield call(api, {url: "/users", method: "GET", body: ""});
    yield put(actions.usersFetched(response.data))
  } catch(err: any) {
    yield put(actions.usersFetchingFailed(err.message));
  }
}

function* addUser(action: PayloadAction<User>) {
  try {

  } catch(err) {}
}

export function* userSaga() {
  // @ts-ignore
  yield takeLatest(actions.fetchUsers.type, fetchUsers);
  yield takeLatest(actions.addUser.type, addUser);
}
