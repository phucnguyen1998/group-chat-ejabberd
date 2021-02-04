import React from 'react';

function ChatLine(props) {
    const { listMessage } = props
    return (
        <>
            {
                listMessage && listMessage.map((item, index) => (
                    <div className="incoming_msg" key={index.toString()}>
                        <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                        <div className="received_msg">
                            <div className="received_withd_msg">
                                <p className="msg_line">{item.from.resource} : {item.body}</p>
                                <span className="time_date"> </span>
                            </div>
                        </div>
                    </div>
                ))

            }</>
    );
}

export default ChatLine;