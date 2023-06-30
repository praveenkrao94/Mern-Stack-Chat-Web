import React, { useContext, useEffect, useState } from 'react';
import Avatar from './Avatar';
import Logo from './Logo';

import { UserContext } from '../UserContext';

function Chat() {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { username, id } = useContext(UserContext);
  const [onlinePeopleExcludingOurUser, setOnlinePeopleExcludingOurUser] = useState({});

  const[newMessageText , setNewMessageText] = useState('')

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4040');
    setWs(ws);                                                          //setting up ws in front end

    ws.addEventListener('message', handleMessage);

   
  }, []);


  useEffect(() => {
    const peopleExcludingUser = { ...onlinePeople };    // delete the current username of the user
    delete peopleExcludingUser[id];
    setOnlinePeopleExcludingOurUser(peopleExcludingUser);
  }, [onlinePeople, id]);



  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  }

 
  // reterive message from backend

  function handleMessage(e) {
    const messageData = JSON.parse(e.data);
    if ('online' in messageData) {
      showOnlinePeople(messageData.online);
    }else{
      console.log(messageData)
    }
  }

  // handler// and sends message 

  function sendMessage(e){
    e.preventDefault();
    ws.send(JSON.stringify(
      {
        recipient:selectedUserId,
        text: newMessageText,
      }
    ));
  }

  return (
    <div className='flex h-screen'>
      <div className='w-1/3 bg-white pt-2'>
        <Logo />

        {Object.keys(onlinePeopleExcludingOurUser).map((userId) => (
          <div
            key={userId}
            onClick={() => setSelectedUserId(userId)}
            className={'border-b border-gray-100  flex items-center gap-3 cursor-pointer ' + (userId === selectedUserId ? 'bg-gray-200' : '')}
          >
            {userId === selectedUserId &&(
              <div className='w-1 bg-blue-500 h-12 rounded-r-md' ></div>
            )}
            <div className='flex gap-2 py-2 pl-4 items-center'>
            <Avatar username={onlinePeopleExcludingOurUser[userId]} userId={userId} />
            <span className='text-gray-800'>{onlinePeopleExcludingOurUser[userId]}</span>
          </div>
            </div>
            
        ))}
      </div>
      <div className='flex flex-col bg-blue-100 w-2/3 p-2'>
        <div className='flex-grow'>
          {!selectedUserId && (
            <div className='flex h-full items-center justify-center'>
              <div className='text-gray-400'>
              &larr; No Chat Selected
              </div>
            </div>
          )}
        </div>
        {!!selectedUserId && (
     <form className='flex gap-2' onSubmit={sendMessage}>
     <input type='text' className='bg-white border p-2 flex-grow rounded-sm' value={newMessageText} 
     onChange={e => setNewMessageText(e.target.value)} placeholder='Type your message here' />
     <button type='submit' className='bg-blue-400 p-2 text-white rounded-sm'>
       <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
         <path strokeLinecap='round' strokeLinejoin='round' d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5' />
       </svg>
     </button>
      </form>
        )}
   
      </div>
    </div>
  );
}

export default Chat;
