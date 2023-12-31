import React from "react";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatContent from "./ChatContent/ChatContent";
import ChatInputBox from "./ChatInputBox/ChatInputBox";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Message } from "./data";
import { useGetMessages } from "./hook/useGetMessages";

const Chat = () => {
  /** Simulate a hook fetching the data */
    const {
        messages: { data }
    } = useGetMessages();

  /** State to control new messages */
    const [chatMessages, setChatMessages] = React.useState<Message[]>(data);

    /**
     *
     * @param message
     * "Create" a new message
     */
    const sendANewMessage = (message: Message) => {
        setChatMessages((prevMessages) => [...prevMessages, message]);
    };

    /**
     * Reset chat to the default messages
     */
    const resetChat = () => {
        setChatMessages(data);
    };

    return (
        <div className="max-w-sm mx-auto mt-32 ">
            <div className="flex flex-row justify-between items-center py-2">
                <p className="text-md text-white bg-purple-500 px-2 py-1 font-semibold animate-pulse">
                Chăm sóc khách hàng
                </p>
                <button
                type="button"
                onClick={() => resetChat()}
                className="hover:bg-gray-100 rounded-full font-medium text-sm p-1.5 text-center inline-flex items-center"
                >
                <ArrowPathIcon className="text-gray-600 w-5 h-5" />
                </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow relative">
                <ChatHeader name={"Tư vấn"} numberOfMessages={chatMessages.length} />
                <ChatContent messages={chatMessages} />
                <ChatInputBox sendANewMessage={sendANewMessage} />
            </div>
        </div>
    );
};

export default Chat;
