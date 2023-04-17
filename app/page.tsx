import Image from "next/image";
import { Montserrat, Dancing_Script } from "next/font/google";

const monserrat = Montserrat({
  subsets: ["latin"],
  weight: "500",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "700",
});

export default function Home() {
  return (
    <main className='flex overflow-x-hidden max-w-screen min-h-screen md:flex-row flex-col'>
      <div className='w-full md:w-1/2 min-h-screen flex flex-col items-center justify-center border-none md:border-r-2 border-violet-600 space-y-1 py-4'>
        <h1
          className={`${dancingScript.className} text-8xl font-bold drop-shadow-lg drop-shadow-purple-100 text-violet-600`}>
          Meets
        </h1>
        <h2
          className={`${monserrat.className} text-lg font-semibold text-center`}>
          Share what you are
        </h2>
        <div className='flex flex-row mx-auto space-x-4 pt-5'>
          <div className='w-1 h-4 bg-violet-600 rounded-full animate-[pulse_3s_ease-in-out_infinite]'></div>
          <div className='w-1 h-4 bg-violet-400 rounded-full animate-[pulse_3s_ease-in-out_infinite]'></div>
          <div className='w-1 h-4 bg-violet-600 rounded-full animate-[pulse_3s_ease-in-out_infinite]'></div>
        </div>
        {/** Collage of avatar images animated */}
        <div className='flex-row gap-x-4 md:gap-x-8 gap-y-4 py-28 flex flex-wrap justify-center px-2'>
          <span className='relative w-28 h-28 md:w-32 md:h-32'>
            <Image
              src='https://i.pravatar.cc/280?img=38'
              alt='Gravatar'
              className='flex-initial rounded-full border-2 border-violet-600 shadow-md shadow-violet-200 hover:scale-105 transform transition-all duration-500 ease-in-out'
              sizes='100vw'
              fill
            />
          </span>
          <span className='relative w-28 h-28 md:w-32 md:h-32'>
            <Image
              src='https://i.pravatar.cc/280?img=24'
              alt='Gravatar'
              className='rounded-full border-2 border-green-600 shadow-md shadow-green-200 hover:scale-105 transform transition-all duration-500 ease-in-out'
              sizes='100vw'
              fill
            />
          </span>
          <span className='relative w-28 h-28 md:w-32 md:h-32'>
            <Image
              src='https://i.pravatar.cc/280?img=11'
              alt='Gravatar'
              className='rounded-full border-2 border-violet-600 shadow-md shadow-violet-200 hover:scale-105 transform transition-all duration-500 ease-in-out'
              sizes='100vw'
              fill
            />
          </span>
        </div>
        {/**Social media phrase */}
        <p className={`${monserrat.className} text-lg font-semibold space-x-6`}>
          <span className='text-violet-600'>#</span>Meet
          <span className='text-green-600'>#</span>Share
          <span className='text-violet-600'>#</span>Connect
        </p>
      </div>
      <div className='w-full md:w-1/2  min-h-screen flex flex-col items-center justify-center border-l-2 border-violet-500/30'>
        <p>This is the place to sign in or sign up</p>
      </div>
    </main>
  );
}
