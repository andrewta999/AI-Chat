import React, { useState, useEffect } from "react";
import { getChats, postMessage } from "../services/chatService";
import { Container, Form, Button, ListGroup } from "react-bootstrap";

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [currentChatID, setCurrentChatID] = useState<string>("");
  const [messages, setMessages] = useState<any>([])

  useEffect(() => {
    const fetchChats = async () => {
      const data = await getChats();
      if (data.length > 0) {
        const chat = data[0];
        setCurrentChatID(chat["_id"]);
        setMessages(chat["messages"]);
      }
    };
    fetchChats();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const chat = await postMessage(currentChatID, message);
    setMessages((prevMessages: any[]) => ([
      ...prevMessages,
      chat.userMessage,
      chat.aiMessage,
    ]));

    if (currentChatID === "") {
      setCurrentChatID(chat.userMessage["chatId"])
    }
  };

  return (
    <Container>
      <h2 className="my-4">Chat</h2>
      <div className="mb-3">
        <ListGroup>
          {currentChatID !== "" && messages.map((msg: any, index: number) => (
            <ListGroup.Item key={index}>
              <strong>{msg.role}:</strong> {msg.text}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <Form onSubmit={handleSendMessage}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default Chat;
