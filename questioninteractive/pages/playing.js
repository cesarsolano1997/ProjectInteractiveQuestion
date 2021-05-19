import { useState,useEffect } from "react"
import useSocket from "../hooks/useSocket"
import {io} from "socket.io-client"

const socket = io('http://localhost:8000', {transports : ['websocket']})

export default function Blah() {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState([]);
	// const socket = useSocket();

	// useEffect(() => {
	// 	if (socket) {
	// 		socket.on("message.chat1", message => {
	// 			setMessages(messages => [...messages, message]);
	// 		});
	// 	}
	// }, [socket]);

	// function submit(e) {
	// 	e.preventDefault();
	// 	console.log(message)
	// 	socket &&
	// 		socket.emit("message.chat1", {
	// 			id: new Date().getTime(),
	// 			value: message
	// 		});
	// }

	const handlePost = e => {
		e.preventDefault()
		socket.emit("sendMessage", {post: message})
	}


	return (
		<div>
			<form onSubmit={handlePost}>
				<input
					value={message}
					className="bg-fixed border-black"
					onChange={e => setMessage(e.target.value)}
				/>
				<button>submit</button>
			</form>
			<ul>
				{messages.map(msg => (
					<li key={msg.id}>{msg.value}</li>
				))}
			</ul>
		</div>
	);
}