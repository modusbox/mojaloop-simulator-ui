import React from 'react';
import { Icon } from '../index';
import { composeClassName } from '../../utils/html';
import './MessageBox.css';


const splitLines = (prev, curr) => ([
  ...prev,
  ...curr.split(`\n`)
]);
const MessageBox = ({ kind = 'default', icon, message, center, size = 20, fontSize = 13 }) => {
  if (!message) {
    return null;
  }

  const messageBoxClassName = composeClassName([
    'message-box',
    `message-box--${kind}`,
    center && 'message-box--centered',
  ]);
  const messagesClassName = composeClassName([
    'message-box__messages',
    center && 'message-box__messages--centered',
  ]);

  const messageMessages = typeof message === 'string' ? [message] : message;
  const messages = messageMessages.reduce(splitLines, []).map((message, index) => (
    <div key={index} className="message-box__message">
      {message}
    </div>
  ));

  let iconComponent = null;
  if (icon) {
    iconComponent = (
      <div className="message-box__icon-box">
        <Icon className="message-box__icon" name={icon} size={size} />
      </div>
    );
  }

  return (
    <div className={messageBoxClassName}>
      {iconComponent}
      <div className={messagesClassName} style={{ fontSize: `${fontSize}px` }}>
        {messages}
      </div>
    </div>
  );
};

export default MessageBox;
