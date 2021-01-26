import React from 'react';
import "./style.css"

function Chat(props) {

    const { handleChange, handleClick, Message } = props;

    return (
        <>
            <div className="mesgs">
                <div className="msg_history">
                    <div className="incoming_msg">
                        <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                        <div className="received_msg">
                            <div className="received_withd_msg">
                                <p>Test which is a new approach to have all
                  solutions</p>
                                <span className="time_date"> 11:01 AM    |    June 9</span></div>
                        </div>
                    </div>

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

export default Chat;