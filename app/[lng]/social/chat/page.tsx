import { Loading } from "@/public/icons";
import dynamic from "next/dynamic";

const ChatComponent = dynamic(() => import("@/components/Display/Chat"), {
  loading: () => (
    <div className='flex w-full h-full items-center justify-center'>
      <Loading className='stroke-current w-6 h-6' />
    </div>
  ),
});

export default function Chat() {
  return (
    <main className='flex md:flex-row flex-col w-full h-full'>
      <ChatComponent />
    </main>
  );
}
