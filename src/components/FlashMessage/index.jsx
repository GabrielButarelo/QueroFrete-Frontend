import React from 'react';
import ReacFlashMessage from 'react-flash-message'
import './styles.css';

class FlashMessage extends React.Component {
  render() {
    const { duration, message, type } = this.props;

    return (
      <ReacFlashMessage duration={duration * 1000}>
        <div className={'message-' + type}>
          {message}
        </div>
      </ReacFlashMessage>
    )
  }
}

export default FlashMessage;