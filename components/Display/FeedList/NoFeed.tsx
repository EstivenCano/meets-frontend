export const NoFeed = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-y-4'>
      <h2 className='text-xl font-bold'>
        Welcome to <span className='text-violet-400'>Meets</span>
      </h2>
      <p className='text-sm text-gray-500 text-center'>
        {
          "We doesn't have post for you yet. Follow some people to see their posts here or create a new post, and let's get started!"
        }
      </p>
    </div>
  );
};
