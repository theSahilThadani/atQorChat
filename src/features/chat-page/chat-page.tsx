"use client";
import { ChatInput } from "@/features/chat-page/chat-input/chat-input";
import { chatStore, useChat } from "@/features/chat-page/chat-store";
import { ChatLoading } from "@/features/ui/chat/chat-message-area/chat-loading";
import { ChatMessageArea } from "@/features/ui/chat/chat-message-area/chat-message-area";
import ChatMessageContainer from "@/features/ui/chat/chat-message-area/chat-message-container";
import ChatMessageContentArea from "@/features/ui/chat/chat-message-area/chat-message-content";
import { useChatScrollAnchor } from "@/features/ui/chat/chat-message-area/use-chat-scroll-anchor";
import { useSession } from "next-auth/react";
import { FC, useEffect, useRef } from "react";
import { ExtensionModel } from "../extensions-page/extension-services/models";
import { Cloud, File, Loader2 } from 'lucide-react'
import { ChatHeader } from "./chat-header/chat-header";
import {
  ChatDocumentModel,
  ChatMessageModel,
  ChatThreadModel,
} from "./chat-services/models";
import MessageContent from "./message-content";

interface ChatPageProps {
  messages: Array<ChatMessageModel>;
  chatThread: ChatThreadModel;
  chatDocuments: Array<ChatDocumentModel>;
  extensions: Array<ExtensionModel>;
}

export const ChatPage: FC<ChatPageProps> = (props) => {
  const { data: session } = useSession();

  useEffect(() => {
    chatStore.initChatSession({
      chatThread: props.chatThread,
      messages: props.messages,
      userName: session?.user?.name!,
    });
  }, [props.messages, session?.user?.name, props.chatThread]);

  const { messages, loading } = useChat();
  let ismsg = !(messages.length>1);
  
  const current = useRef<HTMLDivElement>(null);

  useChatScrollAnchor({ ref: current });
  
  return (
    <main className="flex flex-1 relative flex-col">
      <ChatHeader
        chatThread={props.chatThread}
        chatDocuments={props.chatDocuments}
        extensions={props.extensions}
      />


      {ismsg && <div className=" relative left-[48rem] top-16 border h-[14rem] w-[35rem] m-4 border-dashed border-[#0070f3] rounded-lg">
        <div className="flex flex-col items-center justify-center h-full w-full">
        <svg width="3em" height="3em" viewBox="0 0 56 56" fill="#0070f3"><path d="M18.9265 8.5C19.8781 8.5 20.8 8.81661 21.5488 9.39592L21.7486 9.56039L24.7042 12.1465C24.9213 12.3364 25.1896 12.4553 25.4732 12.4896L25.645 12.5H45.4286C47.7192 12.5 49.59 14.297 49.7083 16.5581L49.7143 16.7857L49.7153 25.7073C48.8539 24.9362 47.8944 24.2723 46.8579 23.7368L46.8571 16.7857C46.8571 16.046 46.295 15.4377 45.5746 15.3645L45.4286 15.3571L25.5399 15.3559L23.1091 18.3454C22.3496 19.2802 21.2346 19.8492 20.04 19.9209L19.7829 19.9286L6.85714 19.9274V38.5C6.85714 39.2397 7.41929 39.848 8.13965 39.9212L8.28571 39.9286L27.4498 39.9291C27.7563 40.9357 28.1755 41.8932 28.6926 42.7869L8.28571 42.7857C5.99513 42.7857 4.12426 40.9887 4.00594 38.7276L4 38.5V12.7857C4 10.4951 5.79698 8.62426 8.0581 8.50594L8.28571 8.5H18.9265ZM18.9265 11.3571H8.28571C7.54605 11.3571 6.93768 11.9193 6.86452 12.6397L6.85714 12.7857V17.0703L19.7829 17.0714C20.1594 17.0714 20.5182 16.923 20.7838 16.6622L20.8917 16.5437L22.76 14.2429L19.8672 11.7106C19.6502 11.5207 19.3819 11.4019 19.0982 11.3675L18.9265 11.3571ZM40.5714 24.5C46.8833 24.5 52 29.6167 52 35.9286C52 42.2404 46.8833 47.3571 40.5714 47.3571C34.2596 47.3571 29.1429 42.2404 29.1429 35.9286C29.1429 29.6167 34.2596 24.5 40.5714 24.5ZM40.5714 29.0714C39.9853 29.0714 39.5023 29.5126 39.4363 30.081L39.4286 30.2143V34.7857H34.8571C34.271 34.7857 33.788 35.2269 33.722 35.7953L33.7143 35.9286C33.7143 36.5147 34.1555 36.9977 34.7239 37.0637L34.8571 37.0714H39.4286V41.6429C39.4286 42.229 39.8698 42.712 40.4381 42.778L40.5714 42.7857C41.1575 42.7857 41.6406 42.3445 41.7066 41.7761L41.7143 41.6429V37.0714H46.2857C46.8718 37.0714 47.3549 36.6302 47.4209 36.0619L47.4286 35.9286C47.4286 35.3425 46.9874 34.8594 46.419 34.7934L46.2857 34.7857H41.7143V30.2143C41.7143 29.6282 41.2731 29.1451 40.7047 29.0791L40.5714 29.0714Z" fill="#0070f3"></path></svg>
        <p className=' mt-4 text-sm '>
                  <span className='font-semibold'>
                    Click to Upload PDF/DOC here
                  </span>
                </p>
                <div className='mb-2 mt-3 text-sm '>
                <button className=" flex  p-2 shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"> Upload Files </button>
                </div>
        </div>
      </div>}

      <ChatMessageContainer ref={current}>
        <ChatMessageContentArea>
          {messages.map((message) => {
            return (
              <ChatMessageArea
                key={message.id}
                profileName={message.name}
                role={message.role}
                onCopy={() => {
                  navigator.clipboard.writeText(message.content);
                }}
                profilePicture={
                  message.role === "assistant"
                    ? "/ai-icon.ico"
                    : session?.user?.image
                }
              >
                <MessageContent message={message} />
              </ChatMessageArea>
            );
          })}
          {loading === "loading" && <ChatLoading />}
        </ChatMessageContentArea>
      </ChatMessageContainer>
      <ChatInput />
    </main>
  );
};
