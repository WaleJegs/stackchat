import { createStore } from 'redux';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

export const gotMessagesFromServer = (messages) => {
    return {
        type: GOT_MESSAGES_FROM_SERVER,
        messages: messages
    };
};

export const addNewMessage = (inputVal) => {
    return {
        type: ADD_NEW_MESSAGE,
        newMessage: inputVal
    }
}

export const gotNewMessageFromServer = (message) => {
    return {
        type: GOT_NEW_MESSAGE_FROM_SERVER,
        message: message
    }
}

const initialState = {
    messages: [],
    newMessage: ''
};

function reducer (state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
       return Object.assign({}, state, { messages: action.messages });
    case ADD_NEW_MESSAGE:
        return Object.assign({}, state, { newMessage: action.newMessage })
    case GOT_NEW_MESSAGE_FROM_SERVER:
        return Object.assign({}, state, { messages: [...state.messages, action.message] })   
    default:
       return state;
  }
}

const store = createStore(reducer);
export default store;
