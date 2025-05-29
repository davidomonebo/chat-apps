import React, { useContext, useEffect, useRef, useState } from 'react';
import assets from '../assets/assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const scrollEnd = useRef();
  const [input, setInput] = useState('');

  const currentUserId = authUser?._id || '680f50e10f3cd28382ef9'; // fallback

  // Fetch messages on user select
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  // Scroll to bottom on message update
  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending text message
  const handleSendTextMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    await sendMessage({ text: input.trim() });
    setInput('');
  };

  // Handle sending image message
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt="User avatar"
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt="Back"
          className="md:hidden max-w-7 cursor-pointer"
        />
        <img src={assets.help_icon} alt="Help" className="max-md:hidden max-w-5" />
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messages.map((msg, index) => {
          const isCurrentUser = msg.sender === currentUserId;

          return (
            <div
              key={index}
              className={`flex items-end mb-4 gap-2 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <img
                src={isCurrentUser ? assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon}
                alt="Avatar"
                className="w-7 h-7 rounded-full"
              />

              <div className="max-w-[70%]">
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt="Sent media"
                    className="w-full max-w-[230px] border border-gray-700 rounded-lg"
                  />
                ) : (
                  <p
                    className={`p-2 md:text-sm font-light rounded-lg break-words ${
                      isCurrentUser
                        ? 'bg-violet-500/30 text-white rounded-br-none text-right'
                        : 'bg-gray-200 text-black rounded-bl-none text-left'
                    }`}
                  >
                    {msg.text}
                  </p>
                )}
                <p
                  className={`text-xs mt-1 ${
                    isCurrentUser ? 'text-right text-gray-400' : 'text-left text-gray-500'
                  }`}
                >
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-black/30">
        <div className="flex-1 flex items-center bg-gray-100/10 px-3 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => e.key === 'Enter' && handleSendTextMessage(e)}
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none bg-transparent text-white placeholder-gray-400"
          />
          <label htmlFor="image" className="cursor-pointer">
            <img src={assets.gallery_icon} alt="Upload" className="w-5 mr-2" />
            <input id="image" type="file" accept="image/*" className="hidden" onChange={handleSendImage} />
          </label>
        </div>
        <img
          src={assets.send_button}
          alt="Send"
          className="w-7 cursor-pointer"
          onClick={handleSendTextMessage}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} className="max-w-16" alt="Logo" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
