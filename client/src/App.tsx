function App() {
  return (
    <div className='w-screen h-screen bg-gradient-to-r from-purple-500 to-blue-400 flex gap-3 flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold text-secondary hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-md'>
        Fruit.ai
      </h1>
      <h2 className='text-secondary hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-md'>
        "Be healthy"
      </h2>
      <div className='grid grid-cols-2 gap-4 p-4 sm:grid-cols-3'>
        <a href='/chat'>
          <div className='bg-pastelOrange flex items-center justify-center text-3xl font-bold text-purple-500 w-40 h-40 rounded-3xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-md relative'>
            <div className='absolute inset-0 rounded-3xl border-2 border-white opacity-20'></div>
            Chat.
          </div>
        </a>
        <a href='/login'>
          <div className='bg-pastelGreen flex items-center justify-center text-3xl font-bold text-purple-500 w-40 h-40 rounded-3xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-md relative'>
            <div className='absolute inset-0 rounded-3xl border-2 border-white opacity-20'></div>
            Login
          </div>
        </a>
        <a href='/aboutus'>
          <div className='bg-pastelPink flex items-center justify-center text-3xl font-bold text-purple-500 w-40 h-40 rounded-3xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-md relative'>
            <div className='absolute inset-0 rounded-3xl border-2 border-white opacity-20'></div>
            About.
          </div>
        </a>
        <a href='/translate'>
          <div className='relative bg-pastelBlue flex items-center justify-center w-40 h-40 rounded-3xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-md'>
            <div className='absolute inset-0 rounded-3xl border-2 border-white opacity-20'></div>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png'
              width={70}
              height={70}
              alt='Translate'
            />
          </div>
        </a>
        <a href='/faq'>
          <div className='bg-pastelPurple flex items-center justify-center text-3xl font-bold text-slate-700 w-40 h-40 rounded-3xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-md relative'>
            <div className='absolute inset-0 rounded-3xl border-2 border-white opacity-20'></div>
            FAQs
          </div>
        </a>
        <div className='bg-pastelYellow w-40 h-40 rounded-3xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-md blur-sm relative'>
          <div className='absolute inset-0 rounded-3xl border-2 border-white opacity-20'></div>
        </div>
      </div>
    </div>
  );
}

export default App;
