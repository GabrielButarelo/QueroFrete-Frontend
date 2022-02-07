import React from 'react';
import ReacFlashMessage from 'react-flash-message'
import './styles.css';

function FlashMessage(props) {
  const { duration, message, type } = props;

  return (
    <ReacFlashMessage duration={duration * 1000}>
      <div className={'message-' + type}>
        {message}
      </div>
    </ReacFlashMessage>
  )
}

export default FlashMessage;