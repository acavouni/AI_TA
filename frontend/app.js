const App = () => {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(true); // Dark mode is now default
  const [menuOpen, setMenuOpen] = React.useState(false);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    // Add human message
    setMessages(prev => [...prev, { id: prev.length + 1, role: 'human', content: inputValue.trim() }]);
    setInputValue('');
    
    // Simulate AI typing with a small delay
    setTimeout(() => {
      setMessages(prev => [...prev, { id: prev.length + 1, role: 'ai', content: 'I\'m here to help with your Purdue University questions.', isTyping: true }]);
      
      // Then replace with complete message
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.isTyping ? { ...msg, content: 'I\'m here to help with your Purdue University questions.', isTyping: false } : msg
        ));
      }, 1500);
    }, 500);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const messagesEndRef = React.useRef(null);
  
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Purdue P logo in SVG format
  const PurdueLogo = () => (
    <svg className="purdue-p" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M70 0C31.34 0 0 31.34 0 70s31.34 70 70 70 70-31.34 70-70S108.66 0 70 0" fill="#000"/>
      <path d="M50.5 40.5h15.17c14.1 0 21.91 9.1 21.91 20.9 0 11.17-8.37 19.97-22.01 19.97H50.5V40.5zm13.47 30.55c6.83 0 9.89-4.57 9.89-9.68 0-5.19-3.07-10.34-9.88-10.34h-.58v20.02h.57z" fill="#CEB888"/>
    </svg>
  );
  
  return (
    <div className={`flex h-full overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 overlay" 
          onClick={toggleMenu}
          style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
        ></div>
      )}
      
      {/* Sidebar - Hidden on mobile but shown when menu toggled */}
      <div className={`md:relative fixed inset-y-0 left-0 z-50 md:flex md:flex-col md:w-64 bg-white border-r border-gray-200 sidebar ${menuOpen ? 'active' : 'transform -translate-x-full md:transform-none'}`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PurdueLogo />
              <span className="font-semibold text-lg">Purdue AI</span>
            </div>
            <button className="md:hidden p-2 rounded-md" onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Login/Signup */}
        <div className="p-4 space-y-3">
          <button className="w-full flex items-center justify-center space-x-2 bg-black hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-colors duration-200">
            <span>Log In</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200">
            <span>Sign Up</span>
          </button>
        </div>
        
        <div className="p-4">
          <button className="w-full flex items-center justify-center space-x-2 purdue-gradient hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>New Chat</span>
          </button>
        </div>
        
        {/* Light Mode Toggle (previously Dark Mode) */}
        <div className="px-4 py-3 border-t border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="font-medium">Light Mode</span>
            <label className="dark-toggle">
              <input type="checkbox" checked={!darkMode} onChange={toggleDarkMode} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 pl-2">Recent Chats</div>
          {[1].map(n => (
            <div key={n} className="p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200">
              <div className="font-medium text-gray-800 truncate">Chat Session {n}</div>
              <div className="text-xs text-gray-500 truncate">Last message preview...</div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium">U</span>
            </div>
            <div>
              <div className="font-medium text-gray-800">User</div>
              <div className="text-xs text-gray-500">Settings</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <button className="p-2 rounded-md hover:bg-gray-100" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="flex items-center space-x-2">
            <PurdueLogo />
            <span className="font-semibold text-lg">Purdue AI</span>
          </div>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Chat Header */}
        <div className="hidden md:flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-semibold text-gray-800">New Conversation</h1>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-white">
          {messages.map(message => (
            <div key={message.id} className={`max-w-3xl mx-auto ${message.role === 'human' ? 'ml-12' : 'mr-12'}`}>
              {message.role === 'ai' && (
                <div className="message-ai p-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                      <PurdueLogo />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-black mb-1">Purdue AI</div>
                      {message.isTyping ? (
                        <div className="typing-dots flex space-x-1">
                          <span className="w-2 h-2 rounded-full inline-block bg-gray-500"></span>
                          <span className="w-2 h-2 rounded-full inline-block bg-gray-500"></span>
                          <span className="w-2 h-2 rounded-full inline-block bg-gray-500"></span>
                        </div>
                      ) : (
                        <div className="text-gray-800 leading-relaxed">{message.content}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex mt-3 ml-11 space-x-2">
                    <button className="text-gray-500 hover:text-gray-700 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                      </svg>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                        <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
              {message.role === 'human' && (
                <div className="message-human p-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-gray-700 font-medium">U</span>
                    </div>
                    <div>
                      <div className="font-medium text-black mb-1">You</div>
                      <div className="text-gray-800 leading-relaxed">{message.content}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          {/* Centered text entry box */}
          <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Welcome to Purdue AI</h2>
              
              <form onSubmit={handleSubmit} className="w-full">
                <div className="relative">
                  <div className="gold-border flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-opacity-40 transition duration-200">
                    <textarea
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Message Purdue AI..."
                      className="flex-1 py-3 px-4 outline-none text-gray-700 placeholder-gray-400 resize-none h-12 max-h-40 overflow-auto"
                      style={{ minHeight: '48px' }}
                      rows="1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          if (inputValue.trim() !== '') handleSubmit(e);
                        }
                      }}
                    ></textarea>
                    <div className="pr-3 flex items-center">
                      <button 
                        type="submit" 
                        className={`p-2 rounded-md ${inputValue.trim() === '' ? 'text-gray-300 cursor-not-allowed' : 'purdue-gradient text-white'}`}
                        disabled={inputValue.trim() === ''}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-center mt-2 text-gray-500">
                  Purdue AI is designed to assist with university-related questions. Press Enter to send.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));