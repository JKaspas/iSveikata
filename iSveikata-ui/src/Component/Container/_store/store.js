import { applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../_reducers/index'

const middleware = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
    //this is just a function that saves state to sessionsStorage
    sessionStorage.setItem("session", JSON.stringify(store.getState()))
});


