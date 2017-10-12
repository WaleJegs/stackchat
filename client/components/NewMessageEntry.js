import React, { Component } from 'react';
import store, { addNewMessage, gotNewMessageFromServer } from '../store';
import axios from 'axios';
import socket from '../socket';


export default class NewMessageEntry extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  handleChange(ev) {
    store.dispatch( addNewMessage(ev.target.value) )
  }

  handleSubmit(ev) {
    ev.preventDefault();
    axios.post('/api/messages', {
      content: this.state.newMessage,
      channelId: this.props.channelId
    })
    .then(res => res.data)
    .then(message => {
      store.dispatch(gotNewMessageFromServer(message))
      socket.emit('new-message', message)
    })
    store.dispatch(addNewMessage(''))
  }

  render () {
    // console.log(store.getState())
    return (
      <form id="new-message-form">
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.newMessage}
            placeholder="Say something nice..."
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button onClick={this.handleSubmit} className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
