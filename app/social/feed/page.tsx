import dynamic from "next/dynamic";

const NewPostForm = dynamic(() => import("@/components/Forms/NewPostForm"));

export default function Feed() {
  return (
    <>
      <h1 className='self-start text-sm font-bold mb-2 sr-only'>
        This is your Feed
      </h1>
      <NewPostForm />
      <hr className='border-violet-400 w-full my-4' />
      <div className='flex flex-col items-center w-full'>
        <p className='text-sm text-gray-500 mb-2'>
          Here you can see the posts of the people that you follow.
        </p>
        <div className='flex flex-col items-center w-full'></div>
      </div>
    </>
  );
}
