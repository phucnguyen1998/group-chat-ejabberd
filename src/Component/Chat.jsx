import React from 'react';
import "./style.css";
import ChatLine from './ChatLine';

function Chat(props) {

    const { handleChange, handleClick, Message, listMessage } = props;

    return (
        <>
            <div className="mesgs">
                <div className="msg_history">
                    <ChatLine
                        listMessage={listMessage}
                    />
                </div>
                <div className="type_msg">
                    <div className="input_msg_write">
                        <input type="text" name="message" className="write_msg" placeholder="Type a message" value={Message}
                            onChange={handleChange}
                        />
                        <button className="msg_send_btn" type="button" onClick={handleClick}><i className="fa fa-paper-plane-o" aria-hidden="true" /></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo(Chat);