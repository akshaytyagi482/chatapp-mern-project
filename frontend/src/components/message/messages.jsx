import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetmessage";
import MessageSkeleton from "../skeletons/messsageskeleton";
import Message from "./message";
import useListenMessages from "../../hooks/useListeenmessage";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();
  
	useEffect(() => {
	  if (!loading && messages.length > 0) {
		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
	  }
	}, [messages, loading]);
  
	// Debugging: Log messages state
	// console.log("Messages state:", messages);
  
	return (
	  <div className='px-4 flex-1 overflow-auto'>
		{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
  
		{!loading && messages.length > 0 &&
		  messages.map((message, index) => {
			const isLastMessage = index === messages.length - 1;
			return (
			  <div key={message._id} ref={isLastMessage ? lastMessageRef : null}>
				<Message message={message} />
			  </div>
			);
		  })
		}
  
		{!loading && messages.length === 0 && (
		  <p className='text-center'>Send a message to start the conversation</p>
		)}
	  </div>
	);
  };
  
  export default Messages;