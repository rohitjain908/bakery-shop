import { createStore } from "redux";
import reducer from "./reducers";

const initalState = {};

const store = createStore(reducer, initalState);

export default store;
