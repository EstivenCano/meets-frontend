import { ProfileImage } from "@/components/ProfileImage";
import { MeetsTitle } from "@/components/MeetsTitle";
import { LoadingBar } from "@/components/LoadingBar";

const TitleSection = () => {
  return (
    <section className='w-full md:w-2/3 min-h-screen flex flex-col items-center justify-center space-y-1 py-4 bg-gradient-to-b md:bg-gradient-to-tr from-background via-violet-600/20 to-background shadow-lg shadow-violet-500 lg:rounded-r-full'>
      <MeetsTitle size='lg' />
      <h2 className='text-lg font-semibold text-center'>Share what you are</h2>
      <LoadingBar />
      <div className='flex-row gap-x-4 md:gap-x-8 gap-y-4 py-28 flex flex-wrap justify-center px-2'>
        <ProfileImage
          src='https://i.pravatar.cc/280?img=38'
          alt='Profile picture of user 38'
          size='lg'
        />
        <ProfileImage
          src='https://i.pravatar.cc/280?img=24'
          alt='Profile picture of user 24'
          size='lg'
          state='online'
        />
        <ProfileImage
          src='https://i.pravatar.cc/280?img=11'
          alt='Profile picture of user 11'
          size='lg'
        />
      </div>
      <p className={`text-lg font-semibold space-x-6`}>
        <span className='text-violet-600'>#</span>Meet
        <span className='text-green-600'>#</span>Share
        <span className='text-violet-600'>#</span>Connect
      </p>
    </section>
  );
};

const LoginSection = () => {
  return (
    <section className='w-full md:w-1/2 min-h-screen flex flex-col items-center justify-center space-y-6'>
      <h2 className='text-lg font-semibold'>Sign in with your account</h2>
      <form className='flex flex-col items-center justify-center space-y-4'>
        <input
          type='email'
          placeholder='Email'
          className='w-64 px-4 py-2 rounded-md border-2 border-violet-600 focus:outline-none focus:border-violet-600 text-black'
        />
        <input
          type='password'
          placeholder='Password'
          className='w-64 px-4 py-2 rounded-md border-2 border-violet-600 focus:outline-none focus:border-violet-600 text-black'
        />
        <button className='w-64 px-4 py-2 rounded-md bg-violet-600 text-white font-semibold'>
          Sign in
        </button>
      </form>
      <div className='flex items-center space-x-4'>
        <path className='w-20 h-0.5 bg-violet-600' />
        <p className='text-lg font-semibold'>Or</p>
        <path className='w-20 h-0.5 bg-violet-600' />
      </div>
      <button className='flex flex-row items-center justify-center space-x-2 px-4 py-2 rounded-md bg-violet-600 text-white font-semibold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M4 8v1a3 3 0 003 3h10a3 3 0 003-3V8M4 4h16M15 3v2M9 3v2'
          />
        </svg>
        <span>Sign in with Google</span>
      </button>
      <p className='text-lg font-semibold'>
        {"Don't have an account? "}
        <a
          href='#'
          className='text-violet-600 hover:underline hover:text-violet-800'>
          Sign up
        </a>
      </p>
    </section>
  );
};

export default function Home() {
  return (
    <main className='relative flex overflow-x-hidden max-w-screen min-h-screen md:flex-row flex-col'>
      <TitleSection />
      <LoginSection />
    </main>
  );
}
