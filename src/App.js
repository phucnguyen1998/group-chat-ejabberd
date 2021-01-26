/* eslint-disable react-hooks/exhaustive-deps */
import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import * as XMPP from 'stanza.io';
import axios from 'axios';
import Chat from './Component/Chat'

function App() {
  let roomchat = 'roomchat4@conference.172.16.1.173'
  const [Message, setMessage] = useState('');

  let client = XMPP.createClient({
    jid: "phuc1@172.16.1.173",
    password: 'phuc1',
    transport: 'websocket',
    wsURL: 'ws://172.16.1.173:5280/websocket'
  });

  function handleChange(e) {
    setMessage(e.target.value)
  }

  function JoinRoom() {
    client.joinRoom(roomchat, 'phuc1@172.16.1.173', {
      status: 'This will be my status in the MUC',
      joinMuc: {
        password: '',
        history: {
          maxstanzas: 20
        }
      }
    });
  }

  function UnSubscribe() {
    axios.post('http://172.16.1.173:5280/api/unsubscribe_room', {
      "user": "phuc1@172.16.1.173",
      "room": roomchat
    }).then(function (response) {
      // console.log('Un Subscribe success');
    }).catch(function (error) {
      console.log('Un Subscribe Fail');
      console.log(error);
    });
  }

  function sendMessage() {
    axios.post('http://172.16.1.173:5280/api/send_message', {
      "type": "groupchat",
      "from": "phuc1@172.16.1.173",
      "to": roomchat,
      "subject": "No",
      "body": Message
    }).then(function (response) {
      UnSubscribe()
      setMessage("")
    }).catch(function (error) {
      console.log(error);
    });
  }

  function handleClick() {
    axios.post('http://172.16.1.173:5280/api/subscribe_room', {
      "user": "phuc1@172.16.1.173",
      "nick": "Tommy",
      "room": roomchat,
      "nodes": "urn:xmpp:mucsub:nodes:messages,urn:xmpp:mucsub:nodes:affiliations"
    }).then(function (response) {
      sendMessage()
    }).catch(function (error) {
      console.log('Subscribe fail');
      console.log(error);
    });
  }

  function leaveRoom() {
    client.leaveRoom(roomchat, 'phuc1@172.16.1.173', {});
  }

  function ConnectServer() {
    client.on('session:started', () => {
      client.getRoster(() => {
        client.sendPresence();
      });
      client.enableCarbons((err) => {
        if (err) {
          console.log('Server does not support carbons', err);
        }
      });
    });

    client.on('groupchat', (a) => {

      console.log(a.from.resource + ' say: ' + a.body);
    })

    client.on('muc:leave', (a) => {
      console.log(a.from.resource + " left the room");
    })

    client.on('muc:join', (a) => {
      console.log(a.from.resource + " entered the room");
    })


    // client.on('carbon:sent', (msg) => {
    //   console.log('carbon', msg);
    // })

    // client.on('chat', (msg) => {
    //   console.log('chat', msg.body);
    // });

    // client.on('receipt', (msg) => {
    //   console.log('receipt', msg)
    // });
    client.connect();
  }

  useEffect(() => {
    ConnectServer()
  }, [])

  return (
    <div className="App d-flex">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button onClick={JoinRoom}>Join Room</button>
        <button onClick={leaveRoom}>Leave Room</button>
      </header>
      <Chat
        Message={Message}
        handleChange={handleChange}
        handleClick={handleClick}
      />
    </div>
  );
}

export default React.memo(App);
