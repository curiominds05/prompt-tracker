import { useState } from 'react';
import { FileText, Image, Film } from 'lucide-react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [imagePrompts, setImagePrompts] = useState<string[]>([]);
  const [scriptPrompts, setScriptPrompts] = useState<string[]>([]);

  const processText = (text: string) => {
    const lines = text.split('\n');
    const images: string[] = [];
    const scripts: string[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('Image Prompt:')) {
        const prompt = trimmedLine.replace('Image Prompt:', '').trim();
        if (prompt) {
          images.push(prompt);
        }
      } else if (trimmedLine.startsWith('Script:')) {
        const prompt = trimmedLine.replace('Script:', '').trim();
        if (prompt) {
          scripts.push(prompt);
        }
      }
    }

    setImagePrompts(images);
    setScriptPrompts(scripts);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    processText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Prompt Extractor
          </h1>
          <p className="text-slate-600 text-lg">
            Paste your text to extract Image Prompts and Scripts
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-800">Input Text</h2>
            </div>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Paste your text here...&#10;&#10;Example:&#10;SCENE #37 | [04:09 - 04:15]&#10;Image Prompt: A sunset over mountains&#10;Script: The hero walks into the distance"
              className="w-full h-[500px] p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
            />
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {/* Image Prompts */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Image className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-semibold text-slate-800">
                  Image Prompts
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    ({imagePrompts.length})
                  </span>
                </h2>
              </div>
              {imagePrompts.length === 0 ? (
                <p className="text-slate-400 italic">No image prompts found</p>
              ) : (
                <div className="space-y-4">
                  {imagePrompts.map((prompt, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                    >
                      <div className="text-xs font-semibold text-purple-600 mb-1">
                        #{index + 1}
                      </div>
                      <p className="text-slate-700">{prompt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Script Prompts */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Film className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">
                  Scripts
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    ({scriptPrompts.length})
                  </span>
                </h2>
              </div>
              {scriptPrompts.length === 0 ? (
                <p className="text-slate-400 italic">No scripts found</p>
              ) : (
                <div className="space-y-4">
                  {scriptPrompts.map((prompt, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
                    >
                      <div className="text-xs font-semibold text-blue-600 mb-1">
                        #{index + 1}
                      </div>
                      <p className="text-slate-700">{prompt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
