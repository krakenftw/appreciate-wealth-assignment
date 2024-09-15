import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel } from "@/components/ui/select";
import translate from "translate";

translate.engine = "deepl";
translate.key = "10b9c600-d37a-4eca-8413-c30f085525c1:fx";

const languages = [
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "nl", name: "Dutch" },
  { code: "ru", name: "Russian" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
];

function Translate() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("es");

  const handleTranslate = async () => {
    try {
      const result = await translate(inputText, targetLanguage);
      setTranslatedText(result);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-400'>
      <div className='w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow dark:bg-gray-800'>
        <h1 className='text-5xl font-bold text-center text-gray-900 dark:text-white'>
          Translate
        </h1>
        <div className='space-y-4'>
          <Textarea
            placeholder='Enter text to translate'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className='border-purple-700 focus:ring-purple-700'
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {languages.map((language) => (
                  <SelectItem onClick={()=>setTargetLanguage(language.code)} key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            className='bg-purple-700 text-white hover:bg-purple-800'
            onClick={handleTranslate}
          >
            Translate
          </Button>
          {translatedText && (
            <div className='mt-4 p-4 bg-gray-100 rounded-lg dark:bg-gray-700'>
              <h2 className='text-2xl font-semibold text-purple-700'>
                Translated Text
              </h2>
              <p className='mt-2 text-gray-700 dark:text-gray-300'>
                {translatedText}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Translate;
