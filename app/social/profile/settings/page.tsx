import { Settings as SettingsIcon } from "@/public/icons";
import { Select } from "@/components/Inputs/Select";

export default async function Settings() {
  return (
    <section className='flex flex-col w-full my-4 rounded-md max-w-2xl p-4 bg-background h-full overflow-y-auto'>
      <div className='flex gap-x-2'>
        <SettingsIcon className='w-5 h-5' />
        <h1 className='text-md'>Your settings</h1>
      </div>
      <hr className='border-violet-400 w-full my-4' />

      <h2 className='text-sm font-bold mb-2'>General</h2>
      <ul className='flex flex-col gap-y-2'>
        <li className='flex gap-x-2 px-4 py-2 items-center text-sm'>
          Language
          <Select
            label='language'
            name='language'
            options={[
              {
                label: "English",
                value: "en",
              },
              {
                label: "Spanish",
                value: "es",
              },
            ]}
            defaultValue='en'
          />
        </li>
        <li className='flex gap-x-2 px-4 py-2 items-center text-sm'>
          Theme:{" "}
          <Select
            label='theme'
            name='theme'
            options={[
              {
                label: "Light",
                value: "light",
              },
              {
                label: "Dark",
                value: "dark",
              },
            ]}
            defaultValue='light'
          />
        </li>
      </ul>
      <hr className='border-violet-400 w-full my-4' />
      <h2 className='text-sm font-bold mb-2'>Account</h2>
      <ul className='flex flex-col gap-y-2'>
        <li className='flex gap-x-2 px-4 py-2 items-center text-sm'>
          Change password
        </li>
        <li className='flex gap-x-2 px-4 py-2 items-center text-sm'>
          Change username
        </li>
        <li className='flex gap-x-2 px-4 py-2 items-center text-sm text-red-500 font-semibold'>
          <button>Delete account</button>
        </li>
      </ul>
      <hr className='border-violet-400 w-full my-4' />
      <h2 className='text-sm font-bold mb-2'>About</h2>
      <ul className='flex flex-col gap-y-2'>
        <li className='flex gap-x-2 px-4 py-2 items-center text-sm'>
          About Meets
        </li>
        <li className='flex gap-x-2 px-4 py-2 items-center text-sm'>Contact</li>
      </ul>
    </section>
  );
}
