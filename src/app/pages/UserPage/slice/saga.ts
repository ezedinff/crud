import { PayloadAction } from '@reduxjs/toolkit';
import api from 'api/apiCall';
import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import { userActions as actions } from '.';
import { User } from './types';

function* fetchUsers() {
  try{
    const response = yield call(api, {url: "/users", method: "GET"});
    yield put(actions.usersFetched(response.data))
  } catch(err: any) {
    yield put(actions.usersFetchingFailed(err.message));
  }
}

function* addUser(action: PayloadAction<User>) {
  try {
    const response = yield call(api, {url: "/users", method: "POST", data: {...action.payload}});
    yield put(actions.userRegistered(response.data));
  } catch(err) {
    yield put(actions.userRegistrationFailed(err.message));
  }
}

function* updateUser(action: PayloadAction<User>) {
  try {
    const {_id, ...user} = action.payload; 
    const response = yield call(api, {url: `/users/${action.payload._id}`, method: "PUT", data: user});
    yield put(actions.userUpdated(action.payload));
  } catch(err) {
    yield put(actions.userUpdateFailed(err.message));
  }
}

function* deleteUser(action: PayloadAction<string>) {
  try {
    const response = yield call(api, {url: `/users/${action.payload}`, method: "DELETE"});
    yield put(actions.userDeleted(action.payload));
  } catch(err) {
    yield put(actions.userDeletingFailed(err.message));
  }
}
export function* userSaga() {
  // @ts-ignore
  yield all([
    takeLatest(actions.fetchUsers.type, fetchUsers),
    takeLatest(actions.addUser.type, addUser),
    takeLatest(actions.updateUser.type, updateUser),
    takeLatest(actions.deleteUser.type, deleteUser),
  ]);
}
