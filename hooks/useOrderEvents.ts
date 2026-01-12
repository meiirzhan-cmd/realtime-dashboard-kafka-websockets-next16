"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export type OrderEvent = {
  orderId: string;
  userId: string;
  status: string;
  timestamp?: string;
};

export function useOrderEvents(userId: string) {
  const socketRef = useRef<Socket | null>(null);
  const [orderEvents, setOrderEvents] = useState<OrderEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io("http://localhost:4000", {
      transports: ["websocket", "polling"],
    });

    socketRef.current = socketInstance;

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket hub");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from WebSocket hub");
      setIsConnected(false);
    });

    socketInstance.on("order-event", (event: OrderEvent) => {
      console.log("Received order event:", event);
      if (event.userId === userId) {
        setOrderEvents((prev) => [...prev, event]);
      }
    });

    return () => {
      socketInstance.disconnect();
      socketRef.current = null;
    };
  }, [userId]);

  // Safe to access ref inside callbacks (not during render)
  const emit = useCallback((event: string, data: unknown) => {
    socketRef.current?.emit(event, data);
  }, []);

  return { orderEvents, isConnected, emit };
}
