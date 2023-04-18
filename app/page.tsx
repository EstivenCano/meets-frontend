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
          enable-background='new 0 0 32 32'
          version='1.1'
          viewBox='0 0 32 32'
          width={24}
          xmlSpace='preserve'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'>
          <g id='Flat_copy'>
            <g>
              <g>
                <path
                  d='M16.005,31.625C7.39,31.625,0.38,24.615,0.38,16S7.39,0.375,16.005,0.375S31.63,7.385,31.63,16     S24.62,31.625,16.005,31.625z'
                  fill='#FFFFFF'
                />
                <path
                  d='M16.005,0.75c8.409,0,15.25,6.841,15.25,15.25s-6.841,15.25-15.25,15.25S0.755,24.409,0.755,16     S7.596,0.75,16.005,0.75 M16.005,0c-8.837,0-16,7.163-16,16c0,8.836,7.163,16,16,16s16-7.164,16-16     C32.005,7.163,24.842,0,16.005,0L16.005,0z'
                  fill='#E5E5E5'
                />
              </g>
            </g>
            <path
              d='M24.482,14.344c0.111,0.59,0.171,1.209,0.171,1.854c0,5.044-3.377,8.631-8.476,8.631   c-4.878,0-8.83-3.952-8.83-8.83s3.952-8.83,8.83-8.83c2.384,0,4.376,0.877,5.905,2.301l-2.489,2.489v-0.006   c-0.927-0.883-2.102-1.336-3.416-1.336c-2.914,0-5.281,2.461-5.281,5.375c0,2.913,2.368,5.381,5.281,5.381   c2.644,0,4.442-1.512,4.813-3.587h-4.813v-3.444L24.482,14.344L24.482,14.344z'
              fill='#333333'
            />
          </g>
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
