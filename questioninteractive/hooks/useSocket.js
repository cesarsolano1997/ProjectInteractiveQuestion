import { useEffect, useState } from "react";
import {io} from "socket.io-client";

const socket = io('http://localhost:8000', {transports : ['websocket']})

export default function useSocket(cb) {
	const [activeSocket, setActiveSocket] = useState(null);

	useEffect(() => {
		// debug("Socket updated", { socket, activeSocket });
		if (activeSocket || !socket) return;
		cb && cb(socket);
		setActiveSocket(socket);
		console.log('Activando socket')
		return function cleanup() {
			// debug("Running useSocket cleanup", { socket });
			socket.off("message.chat1", cb);
		};
	
	}, [socket]);

	return activeSocket;
}