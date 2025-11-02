import { useState, useEffect, useRef } from "react";
import { API_URL } from "../config";

export default function GameChat({ gameId, gameName }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem("token");

  // Get current user info from token
  const getCurrentUser = () => {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  };

  const currentUser = getCurrentUser();

  // Fetch messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/chat/game/${gameId}`, {
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }

      });
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch(`${API_URL}/chat/game/${gameId}`, {
        method: 'POST',
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: newMessage })
      });

      if (res.ok) {
        const savedMessage = await res.json();
        setMessages(prev => [...prev, savedMessage]);
        setNewMessage("");
        scrollToBottom();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // Delete message
  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      const res = await fetch(`${API_URL}/chat/${messageId}`, {
        method: 'DELETE',
        headers: { "Authorization": token }
      });

      if (res.ok) {
        setMessages(prev => prev.filter(m => m._id !== messageId));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete message");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [gameId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'developer': return '#a259ff';
      case 'admin': return '#ff6b9d';
      default: return '#4CAF50';
    }
  };

  const getRoleLabel = (role) => {
    switch(role) {
      case 'developer': return '👨‍💻 Dev';
      case 'admin': return '👑 Admin';
      default: return '🎮 User';
    }
  };

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '20px',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(10px)',
      height: '600px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: 'white',
          marginBottom: '0.5rem'
        }}>
          💬 Game Discussion
        </h2>
        <p style={{
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.6)'
        }}>
          Chat with other players and the developer
        </p>
      </div>

      {/* Messages Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        paddingRight: '0.5rem'
      }}>
        {loading && messages.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)' }}>
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)' }}>
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => {
            const isOwnMessage = currentUser && msg.userId === currentUser.id;
            return (
              <div
                key={msg._id}
                style={{
                  alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
                  maxWidth: '70%'
                }}
              >
                <div style={{
                  backgroundColor: isOwnMessage 
                    ? 'rgba(162, 89, 255, 0.2)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: `1px solid ${isOwnMessage ? 'rgba(162, 89, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: 'white'
                    }}>
                      {msg.userName}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      backgroundColor: `${getRoleBadgeColor(msg.userRole)}33`,
                      color: getRoleBadgeColor(msg.userRole),
                      fontWeight: '600'
                    }}>
                      {getRoleLabel(msg.userRole)}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '0.5rem',
                    wordWrap: 'break-word'
                  }}>
                    {msg.message}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.4)'
                    }}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                    {isOwnMessage && (
                      <button
                        onClick={() => handleDeleteMessage(msg._id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ff4444',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          padding: '0.25rem'
                        }}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} style={{
        display: 'flex',
        gap: '0.75rem'
      }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={sending}
          maxLength={1000}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'all 0.3s'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#a259ff';
            e.target.style.backgroundColor = 'rgba(162, 89, 255, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          }}
        />
        <button
          type="submit"
          disabled={!newMessage.trim() || sending}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            border: 'none',
            background: (!newMessage.trim() || sending)
              ? 'rgba(255, 255, 255, 0.1)'
              : 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
            color: 'white',
            fontWeight: '700',
            cursor: (!newMessage.trim() || sending) ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            fontSize: '0.95rem'
          }}
        >
          {sending ? '📤' : '📨'} Send
        </button>
      </form>
    </div>
  );
}