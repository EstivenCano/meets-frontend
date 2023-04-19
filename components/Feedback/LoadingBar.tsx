export const LoadingBar = () => {
  return (
    <div className='flex flex-row mx-auto space-x-4 pt-5'>
      <div className='w-1 h-4 bg-violet-600 rounded-full animate-[pulse_2s_ease-in-out_infinite] delay-100' />
      <div className='w-1 h-4 bg-violet-400 rounded-full animate-[pulse_2s_ease-in-out_infinite] delay-150' />
      <div className='w-1 h-4 bg-violet-600 rounded-full animate-[pulse_2s_ease-in-out_infinite] delay-200' />
    </div>
  );
};
