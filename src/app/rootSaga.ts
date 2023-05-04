import { all } from "redux-saga/effects";
import { watcherMakeFilter } from "../redux/Filter/FilterSaga";
import { watcherAuthAccount } from "../redux/Auth/AuthSaga";

export default function* rootSaga() {
    yield all([watcherMakeFilter(), watcherAuthAccount()])
}