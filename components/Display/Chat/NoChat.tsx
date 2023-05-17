export const NoChat = () => {
  return (
    <div className='hidden md:flex flex-col items-center w-full h-full justify-center gap-y-4 px-4'>
      <h2 className='text-xl font-bold'>No chat selected</h2>
      <p className='text-center'>
        Please, select one of your chats or start a new conversation with a user
        that you follow!
      </p>
    </div>
  );
};
