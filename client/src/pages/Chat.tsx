import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useRef, useState, useEffect } from "react";

import {
  ChatBubbleBottomCenterTextIcon,
  MicrophoneIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

type Message = {
  sender: "user" | "bot";
  content: string;
  time: string;
};

type Fruit = {
  id: number;
  name: string;
  image: string;
};

const initialMessages: Message[] = [
  {
    sender: "bot",
    content: "This is sample message",
    time: new Date().toLocaleTimeString(),
  },
  {
    sender: "user",
    content: "yup, i'd like to get hired!",
    time: new Date().toLocaleTimeString(),
  },
  {
    sender: "bot",
    content: "hired!!",
    time: new Date().toLocaleTimeString(),
  },
];

const serverUrl = import.meta.env.VITE_SERVER_URL;

function Chat() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();
  const [messages, setMessages] =
    useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [fruits, setFruits] = useState<Fruit[]>([]);

  useEffect(() => {
    fetch(`${serverUrl}/fruits`)
      .then(async (res) => {
        const data = await res.json();
        setFruits(data);
      })
      .catch((error) =>
        console.error("Error fetching fruits:", error)
      );
  }, []);

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      setMessages([
        ...messages,
        {
          sender: "user",
          content: inputValue,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setInputValue("");
    }
  };

  return (
    <div
      className={`dark:bg-gray-900 dark:text-white ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white text-black"
      }`}
    >
      <div className='flex h-screen'>
        <div className='w-1/3 border-r h-full hidden md:flex flex-col gap-4 items-start justify-center pl-10 text-4xl font-bold dark:border-gray-700'>
          <span>
            <ChatBubbleBottomCenterTextIcon className='size-10 text-purple-500' />
          </span>
          <span className='font-thin text-4xl'>Hello</span>
          <span className='text-purple-500 font-bold text-6xl'>
            Chat.
          </span>
          <span className='text-sm text-gray-800'>
            The last chat app you'll ever need.
          </span>
        </div>
        <div
          className={`w-full md:w-2/3 ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
          }`}
        >
          <div className='flex flex-col h-full'>
            <div className='flex justify-between border-b w-full items-center mb-4 p-4 dark:border-gray-700'>
              <div className='flex w-full items-center'>
                <a href='/'>
                  <div className='pr-4'>
                    <ArrowLeftIcon />
                  </div>
                </a>
                <div className='w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-300'>
                  <img src='https://avatar.iran.liara.run/public/38' />
                </div>
                <div className='ml-4'>
                  <div className='text-lg font-bold'>John Doe</div>
                  <div className='text-gray-500 dark:text-gray-400'>
                    Online
                  </div>
                </div>
              </div>
              <div
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className='cursor-pointer'
              >
                <SunIcon />
              </div>
            </div>
            <div className='p-4 flex-1 overflow-y-auto'>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 flex flex-col ${
                    message.sender === "bot"
                      ? "items-start"
                      : "items-end"
                  }`}
                >
                  <div
                    className={`p-4 rounded-lg ${
                      message.sender === "bot"
                        ? "bg-gray-200 text-black rounded-bl-none dark:bg-gray-700 "
                        : "bg-purple-500 rounded-br-none"
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className='text-gray-500 text-sm mt-1 dark:text-gray-400'>
                    {message.time}
                  </div>
                </div>
              ))}
            </div>
            <div className='p-4 flex gap-4 overflow-x-auto'>
              {fruits.map((fruit) => (
                <div
                  key={fruit.id}
                  className='flex-shrink-0 w-32 h-32 rounded-lg shadow-md p-4 flex flex-col items-center justify-center'
                >
                  <img
                    src={fruit.image}
                    alt={fruit.name}
                    className='w-16 h-16 rounded-full mb-2'
                  />
                  <div className='text-center text-sm font-semibold'>
                    {fruit.name}
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-4 flex gap-4 p-4 border-t dark:border-gray-700'>
              <div className='w-full relative'>
                <Input
                  type='text'
                  className='w-full relative border border-gray-300 rounded-lg p-6 text-lg pl-8 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                  placeholder='Type your message...'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div
                  onClick={() => fileInputRef?.current?.click()}
                  className='flex h-full items-center justify-center absolute bottom-0 left-2'
                >
                  <PaperClipIcon className=' size-5 dark:text-white' />
                </div>
                <input
                  className='hidden'
                  ref={fileInputRef}
                  type='file'
                />
                <div className='h-full flex items-center justify-center absolute right-3 top-0'>
                  <MicrophoneIcon className='size-5 dark:text-white' />
                </div>
              </div>
              <Button className='h-full' onClick={handleSubmit}>
                <ArrowRightIcon className='' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
