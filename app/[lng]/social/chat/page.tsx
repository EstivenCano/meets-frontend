import dynamic from "next/dynamic";

const ChatComponent = dynamic(() => import("@/components/Display/Chat"));

export default function Chat() {
  return <ChatComponent />;
}
