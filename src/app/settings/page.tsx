'use client';

import { Settings as SettingsIcon, ArrowLeft, Loader, ChevronUp, User, Key, Bot, Search, Palette  } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Switch } from '@headlessui/react';
import ThemeSwitcher from '@/components/theme/Switcher';
import { ImagesIcon, VideoIcon } from 'lucide-react';
import Link from 'next/link';
import { PROVIDER_METADATA } from '@/lib/providers';

interface SettingsType {
  chatModelProviders: {
    [key: string]: [Record<string, any>];
  };
  embeddingModelProviders: {
    [key: string]: [Record<string, any>];
  };
  openaiApiKey: string;
  groqApiKey: string;
  anthropicApiKey: string;
  geminiApiKey: string;
  ollamaApiUrl: string;
  lmStudioApiUrl: string;
  deepseekApiKey: string;
  customOpenaiApiKey: string;
  customOpenaiApiUrl: string;
  customOpenaiModelName: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isSaving?: boolean;
  onSave?: (value: string) => void;
}

const Input = ({ className, isSaving, onSave, ...restProps }: InputProps) => {
  return (
    <div className="relative group">
      <input
        {...restProps}
        className={cn(
          'w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-white placeholder-gray-400 transition-all duration-200 focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20 focus:outline-none',
          isSaving && 'pr-12',
          className,
        )}
        onBlur={(e) => onSave?.(e.target.value)}
      />
      {isSaving && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Loader
            size={16}
            className="animate-spin  text-[#f59e0b]"
          />
        </div>
      )}
    </div>
  );
};

interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  isSaving?: boolean;
  onSave?: (value: string) => void;
}

const Textarea = ({
  className,
  isSaving,
  onSave,
  ...restProps
}: TextareaProps) => {
  return (
  <div className="relative group">
    <textarea
      placeholder="Type your scientific instructions here..."
      className="w-full px-3 py-2 bg-gray-900/80 border border-gray-700 rounded-md text-gray-100 placeholder-gray-400 text-sm transition-all duration-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 focus:outline-none resize-none hover:border-gray-600 hover:bg-gray-900/90"
      rows={3}
      onBlur={(e) => onSave?.(e.target.value)}
      {...restProps}
    />
    {isSaving && (
      <div className="absolute right-2 top-2">
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-yellow-400/70 rounded-full animate-pulse delay-100"></div>
          <div className="w-1.5 h-1.5 bg-yellow-400/40 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    )}
  </div>
);
};

const Select = ({
  className,
  options,
  ...restProps
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string; disabled?: boolean }[];
}) => {
  return (
  <select
    {...restProps}
    className={cn(
      'bg-[#0a0a0a] px-4 py-3 flex items-center overflow-hidden border border-[#2a2a2a] text-[#e5e5e5] rounded-lg text-sm font-medium transition-all duration-300 focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/30 focus:outline-none hover:border-[#404040] hover:bg-[#0f0f0f] cursor-pointer',
      className,
    )}
  >
    {options.map(({ label, value, disabled }) => (
      <option 
        key={value} 
        value={value} 
        disabled={disabled}
        className="bg-[#0a0a0a] text-[#e5e5e5] py-2"
      >
        {label}
      </option>
    ))}
  </select>
);
};

const SettingsSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col space-y-4 p-6 bg-[#0f0f0f]/80 backdrop-blur-sm rounded-xl border border-[#2a2a2a] hover:border-[#404040] transition-all duration-300 relative overflow-hidden">
    {/* Subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/5 via-transparent to-transparent pointer-events-none"></div>
    
    {/* Title with accent underline */}
    <div className="relative">
      <h2 className="text-[#e5e5e5] font-semibold text-lg tracking-wide relative z-10">
        {title}
      </h2>
      <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#f59e0b] to-[#f59e0b]/40 rounded-full"></div>
    </div>
    
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

const Page = () => {
  const [config, setConfig] = useState<SettingsType | null>(null);
  const [chatModels, setChatModels] = useState<Record<string, any>>({});
  const [embeddingModels, setEmbeddingModels] = useState<Record<string, any>>(
    {},
  );
  const [selectedChatModelProvider, setSelectedChatModelProvider] = useState<
    string | null
  >(null);
  const [selectedChatModel, setSelectedChatModel] = useState<string | null>(
    null,
  );
  const [selectedEmbeddingModelProvider, setSelectedEmbeddingModelProvider] =
    useState<string | null>(null);
  const [selectedEmbeddingModel, setSelectedEmbeddingModel] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [automaticImageSearch, setAutomaticImageSearch] = useState(false);
  const [automaticVideoSearch, setAutomaticVideoSearch] = useState(false);
  const [systemInstructions, setSystemInstructions] = useState<string>('');
  const [savingStates, setSavingStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchConfig = async () => {
      const res = await fetch(`/api/config`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = (await res.json()) as SettingsType;
      setConfig(data);

      const chatModelProvidersKeys = Object.keys(data.chatModelProviders || {});
      const embeddingModelProvidersKeys = Object.keys(
        data.embeddingModelProviders || {},
      );

      const defaultChatModelProvider =
        chatModelProvidersKeys.length > 0 ? chatModelProvidersKeys[0] : '';
      const defaultEmbeddingModelProvider =
        embeddingModelProvidersKeys.length > 0
          ? embeddingModelProvidersKeys[0]
          : '';

      const chatModelProvider =
        localStorage.getItem('chatModelProvider') ||
        defaultChatModelProvider ||
        '';
      const chatModel =
        localStorage.getItem('chatModel') ||
        (data.chatModelProviders &&
        data.chatModelProviders[chatModelProvider]?.length > 0
          ? data.chatModelProviders[chatModelProvider][0].name
          : undefined) ||
        '';
      const embeddingModelProvider =
        localStorage.getItem('embeddingModelProvider') ||
        defaultEmbeddingModelProvider ||
        '';
      const embeddingModel =
        localStorage.getItem('embeddingModel') ||
        (data.embeddingModelProviders &&
          data.embeddingModelProviders[embeddingModelProvider]?.[0].name) ||
        '';

      setSelectedChatModelProvider(chatModelProvider);
      setSelectedChatModel(chatModel);
      setSelectedEmbeddingModelProvider(embeddingModelProvider);
      setSelectedEmbeddingModel(embeddingModel);
      setChatModels(data.chatModelProviders || {});
      setEmbeddingModels(data.embeddingModelProviders || {});

      setAutomaticImageSearch(
        localStorage.getItem('autoImageSearch') === 'true',
      );
      setAutomaticVideoSearch(
        localStorage.getItem('autoVideoSearch') === 'true',
      );

      setSystemInstructions(localStorage.getItem('systemInstructions')!);

      setIsLoading(false);
    };

    fetchConfig();
  }, []);

  const saveConfig = async (key: string, value: any) => {
    setSavingStates((prev) => ({ ...prev, [key]: true }));

    try {
      const updatedConfig = {
        ...config,
        [key]: value,
      } as SettingsType;

      const response = await fetch(`/api/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedConfig),
      });

      if (!response.ok) {
        throw new Error('Failed to update config');
      }

      setConfig(updatedConfig);

      if (
        key.toLowerCase().includes('api') ||
        key.toLowerCase().includes('url')
      ) {
        const res = await fetch(`/api/config`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch updated config');
        }

        const data = await res.json();

        setChatModels(data.chatModelProviders || {});
        setEmbeddingModels(data.embeddingModelProviders || {});

        const currentChatProvider = selectedChatModelProvider;
        const newChatProviders = Object.keys(data.chatModelProviders || {});

        if (!currentChatProvider && newChatProviders.length > 0) {
          const firstProvider = newChatProviders[0];
          const firstModel = data.chatModelProviders[firstProvider]?.[0]?.name;

          if (firstModel) {
            setSelectedChatModelProvider(firstProvider);
            setSelectedChatModel(firstModel);
            localStorage.setItem('chatModelProvider', firstProvider);
            localStorage.setItem('chatModel', firstModel);
          }
        } else if (
          currentChatProvider &&
          (!data.chatModelProviders ||
            !data.chatModelProviders[currentChatProvider] ||
            !Array.isArray(data.chatModelProviders[currentChatProvider]) ||
            data.chatModelProviders[currentChatProvider].length === 0)
        ) {
          const firstValidProvider = Object.entries(
            data.chatModelProviders || {},
          ).find(
            ([_, models]) => Array.isArray(models) && models.length > 0,
          )?.[0];

          if (firstValidProvider) {
            setSelectedChatModelProvider(firstValidProvider);
            setSelectedChatModel(
              data.chatModelProviders[firstValidProvider][0].name,
            );
            localStorage.setItem('chatModelProvider', firstValidProvider);
            localStorage.setItem(
              'chatModel',
              data.chatModelProviders[firstValidProvider][0].name,
            );
          } else {
            setSelectedChatModelProvider(null);
            setSelectedChatModel(null);
            localStorage.removeItem('chatModelProvider');
            localStorage.removeItem('chatModel');
          }
        }

        const currentEmbeddingProvider = selectedEmbeddingModelProvider;
        const newEmbeddingProviders = Object.keys(
          data.embeddingModelProviders || {},
        );

        if (!currentEmbeddingProvider && newEmbeddingProviders.length > 0) {
          const firstProvider = newEmbeddingProviders[0];
          const firstModel =
            data.embeddingModelProviders[firstProvider]?.[0]?.name;

          if (firstModel) {
            setSelectedEmbeddingModelProvider(firstProvider);
            setSelectedEmbeddingModel(firstModel);
            localStorage.setItem('embeddingModelProvider', firstProvider);
            localStorage.setItem('embeddingModel', firstModel);
          }
        } else if (
          currentEmbeddingProvider &&
          (!data.embeddingModelProviders ||
            !data.embeddingModelProviders[currentEmbeddingProvider] ||
            !Array.isArray(
              data.embeddingModelProviders[currentEmbeddingProvider],
            ) ||
            data.embeddingModelProviders[currentEmbeddingProvider].length === 0)
        ) {
          const firstValidProvider = Object.entries(
            data.embeddingModelProviders || {},
          ).find(
            ([_, models]) => Array.isArray(models) && models.length > 0,
          )?.[0];

          if (firstValidProvider) {
            setSelectedEmbeddingModelProvider(firstValidProvider);
            setSelectedEmbeddingModel(
              data.embeddingModelProviders[firstValidProvider][0].name,
            );
            localStorage.setItem('embeddingModelProvider', firstValidProvider);
            localStorage.setItem(
              'embeddingModel',
              data.embeddingModelProviders[firstValidProvider][0].name,
            );
          } else {
            setSelectedEmbeddingModelProvider(null);
            setSelectedEmbeddingModel(null);
            localStorage.removeItem('embeddingModelProvider');
            localStorage.removeItem('embeddingModel');
          }
        }

        setConfig(data);
      }

      if (key === 'automaticImageSearch') {
        localStorage.setItem('autoImageSearch', value.toString());
      } else if (key === 'automaticVideoSearch') {
        localStorage.setItem('autoVideoSearch', value.toString());
      } else if (key === 'chatModelProvider') {
        localStorage.setItem('chatModelProvider', value);
      } else if (key === 'chatModel') {
        localStorage.setItem('chatModel', value);
      } else if (key === 'embeddingModelProvider') {
        localStorage.setItem('embeddingModelProvider', value);
      } else if (key === 'embeddingModel') {
        localStorage.setItem('embeddingModel', value);
      } else if (key === 'systemInstructions') {
        localStorage.setItem('systemInstructions', value);
      }
    } catch (err) {
      console.error('Failed to save:', err);
      setConfig((prev) => ({ ...prev! }));
    } finally {
      setTimeout(() => {
        setSavingStates((prev) => ({ ...prev, [key]: false }));
      }, 500);
    }
  };

return (
  <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0e0e11] via-[#131417] to-[#232313] min-h-screen">
    <div className="flex flex-col pt-6 px-6">
      <div className="flex items-center space-x-3 mb-2">
        <Link href="/home" className="lg:hidden">
          <ArrowLeft className="text-yellow-100 hover:text-yellow-400 transition-colors duration-200" size={24} />
        </Link>
        <div className="flex flex-row space-x-3 items-center">
          <div className="p-2 bg-gradient-to-br from-yellow-400/20 to-yellow-400/10 rounded-lg backdrop-blur-sm border border-yellow-400/30">
            <SettingsIcon size={24} className="text-yellow-400" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent tracking-wide">
            Settings
          </h1>
        </div>
      </div>
      
      {/* Decorative divider with gradient */}
      <div className="relative w-full my-6">
        <hr className="border-t border-yellow-400/20 w-full" />
        <div className="absolute left-0 top-0 w-24 h-px bg-gradient-to-r from-yellow-400 to-transparent"></div>
      </div>
    </div>

    {isLoading ? (
      <div className="flex flex-row items-center justify-center min-h-[50vh]">
        <div className="relative">
          {/* Custom loading animation with ResearchIQ branding */}
          <div className="w-16 h-16 border-4 border-yellow-400/20 rounded-full animate-spin">
            <div className="absolute inset-0 border-4 border-transparent border-t-yellow-400 rounded-full"></div>
          </div>
          <div className="absolute inset-2 border-2 border-yellow-400/10 rounded-full">
            <div className="absolute inset-0 border-2 border-transparent border-b-yellow-400/60 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
        </div>
      </div>
    ) : (
      config && (
        <div className="flex flex-col space-y-8 pb-32 lg:pb-12 px-6">
          {/* <SettingsSection title="Appearance">
            <div className="flex flex-col space-y-2">
              <p className="text-yellow-100/70 text-sm font-medium">
                Theme Configuration
              </p>
              <div className="p-4 bg-black/30 rounded-lg border border-yellow-400/20 backdrop-blur-sm">
                <ThemeSwitcher />
              </div>
            </div>
          </SettingsSection> */}

          <SettingsSection title="Automatic Search">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/40 transition-all duration-300 border border-yellow-400/20 hover:border-yellow-400/30 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-400/20 to-yellow-400/10 rounded-lg border border-yellow-400/30">
                    <ImagesIcon
                      size={20}
                      className="text-yellow-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-yellow-100 font-semibold">
                      Automatic Image Search
                    </p>
                    <p className="text-xs text-yellow-100/70 mt-1 leading-relaxed">
                      Automatically search for relevant scientific images in chat responses
                    </p>
                  </div>
                </div>
                <Switch
                  checked={automaticImageSearch}
                  onChange={(checked) => {
                    setAutomaticImageSearch(checked);
                    saveConfig('automaticImageSearch', checked);
                  }}
                  className={cn(
                    automaticImageSearch
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-400/25'
                      : 'bg-yellow-400/20 border border-yellow-400/30',
                    'relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/50',
                  )}
                >
                  <span
                    className={cn(
                      automaticImageSearch
                        ? 'translate-x-6 bg-white'
                        : 'translate-x-1 bg-yellow-100',
                      'inline-block h-5 w-5 transform rounded-full shadow-lg transition-transform duration-300',
                    )}
                  />
                </Switch>
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/40 transition-all duration-300 border border-yellow-400/20 hover:border-yellow-400/30 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-400/20 to-yellow-400/10 rounded-lg border border-yellow-400/30">
                    <VideoIcon
                      size={20}
                      className="text-yellow-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-yellow-100 font-semibold">
                      Automatic Video Search
                    </p>
                    <p className="text-xs text-yellow-100/70 mt-1 leading-relaxed">
                      Automatically search for relevant educational videos in chat responses
                    </p>
                  </div>
                </div>
                <Switch
                  checked={automaticVideoSearch}
                  onChange={(checked) => {
                    setAutomaticVideoSearch(checked);
                    saveConfig('automaticVideoSearch', checked);
                  }}
                  className={cn(
                    automaticVideoSearch
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-400/25'
                      : 'bg-yellow-400/20 border border-yellow-400/30',
                    'relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/50',
                  )}
                >
                  <span
                    className={cn(
                      automaticVideoSearch
                        ? 'translate-x-6 bg-white'
                        : 'translate-x-1 bg-yellow-100',
                      'inline-block h-5 w-5 transform rounded-full shadow-lg transition-transform duration-300',
                    )}
                  />
                </Switch>
              </div>
            </div>
          </SettingsSection>

          <SettingsSection title="System Instructions">
            <div className="flex flex-col space-y-3">
              <p className="text-yellow-100/70 text-sm font-medium">
                Configure system behavior and instructions
              </p>
              <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                <Textarea
                  value={systemInstructions}
                  isSaving={savingStates['systemInstructions']}
                  onChange={(e) => {
                    setSystemInstructions(e.target.value);
                  }}
                  onSave={(value) => saveConfig('systemInstructions', value)}
                />
              </div>
            </div>
          </SettingsSection>

          <SettingsSection title="Model Configuration">
            {config.chatModelProviders && (
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2">
                  <p className="text-yellow-100/70 text-sm font-medium">
                    Chat Model Provider
                  </p>
                  <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                    <Select
                      value={selectedChatModelProvider ?? undefined}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedChatModelProvider(value);
                        saveConfig('chatModelProvider', value);
                        const firstModel =
                          config.chatModelProviders[value]?.[0]?.name;
                        if (firstModel) {
                          setSelectedChatModel(firstModel);
                          saveConfig('chatModel', firstModel);
                        }
                      }}
                      options={Object.keys(config.chatModelProviders).map(
                        (provider) => ({
                          value: provider,
                          label:
                            (PROVIDER_METADATA as any)[provider]?.displayName ||
                            provider.charAt(0).toUpperCase() +
                              provider.slice(1),
                        }),
                      )}
                    />
                  </div>
                </div>

                {selectedChatModelProvider &&
                  selectedChatModelProvider != 'custom_openai' && (
                    <div className="flex flex-col space-y-2">
                      <p className="text-yellow-100/70 text-sm font-medium">
                        Chat Model
                      </p>
                      <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                        <Select
                          value={selectedChatModel ?? undefined}
                          onChange={(e) => {
                            const value = e.target.value;
                            setSelectedChatModel(value);
                            saveConfig('chatModel', value);
                          }}
                          options={(() => {
                            const chatModelProvider =
                              config.chatModelProviders[
                                selectedChatModelProvider
                              ];
                            return chatModelProvider
                              ? chatModelProvider.length > 0
                                ? chatModelProvider.map((model) => ({
                                    value: model.name,
                                    label: model.displayName,
                                  }))
                                : [
                                    {
                                      value: '',
                                      label: 'No models available',
                                      disabled: true,
                                    },
                                  ]
                              : [
                                  {
                                    value: '',
                                    label:
                                      'Invalid provider, please check backend logs',
                                    disabled: true,
                                  },
                                ];
                          })()}
                        />
                      </div>
                    </div>
                  )}
              </div>
            )}

            {selectedChatModelProvider &&
              selectedChatModelProvider === 'custom_openai' && (
                <div className="flex flex-col space-y-6">
                  <div className="flex flex-col space-y-2">
                    <p className="text-yellow-100/70 text-sm font-medium">
                      Model Name
                    </p>
                    <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                      <Input
                        type="text"
                        placeholder="Enter custom model name"
                        value={config.customOpenaiModelName}
                        isSaving={savingStates['customOpenaiModelName']}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setConfig((prev) => ({
                            ...prev!,
                            customOpenaiModelName: e.target.value,
                          }));
                        }}
                        onSave={(value) =>
                          saveConfig('customOpenaiModelName', value)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <p className="text-yellow-100/70 text-sm font-medium">
                      Custom OpenAI API Key
                    </p>
                    <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                      <Input
                        type="password"
                        placeholder="Enter your custom OpenAI API key"
                        value={config.customOpenaiApiKey}
                        isSaving={savingStates['customOpenaiApiKey']}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setConfig((prev) => ({
                            ...prev!,
                            customOpenaiApiKey: e.target.value,
                          }));
                        }}
                        onSave={(value) =>
                          saveConfig('customOpenaiApiKey', value)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <p className="text-yellow-100/70 text-sm font-medium">
                      Custom OpenAI Base URL
                    </p>
                    <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                      <Input
                        type="text"
                        placeholder="Enter custom OpenAI base URL"
                        value={config.customOpenaiApiUrl}
                        isSaving={savingStates['customOpenaiApiUrl']}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setConfig((prev) => ({
                            ...prev!,
                            customOpenaiApiUrl: e.target.value,
                          }));
                        }}
                        onSave={(value) =>
                          saveConfig('customOpenaiApiUrl', value)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

            {config.embeddingModelProviders && (
              <div className="flex flex-col space-y-6 mt-6 pt-6 border-t border-yellow-400/20">
                <div className="flex flex-col space-y-2">
                  <p className="text-yellow-100/70 text-sm font-medium">
                    Embedding Model Provider
                  </p>
                  <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                    <Select
                      value={selectedEmbeddingModelProvider ?? undefined}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedEmbeddingModelProvider(value);
                        saveConfig('embeddingModelProvider', value);
                        const firstModel =
                          config.embeddingModelProviders[value]?.[0]?.name;
                        if (firstModel) {
                          setSelectedEmbeddingModel(firstModel);
                          saveConfig('embeddingModel', firstModel);
                        }
                      }}
                      options={Object.keys(config.embeddingModelProviders).map(
                        (provider) => ({
                          value: provider,
                          label:
                            (PROVIDER_METADATA as any)[provider]?.displayName ||
                            provider.charAt(0).toUpperCase() +
                              provider.slice(1),
                        }),
                      )}
                    />
                  </div>
                </div>

                {selectedEmbeddingModelProvider && (
                  <div className="flex flex-col space-y-2">
                    <p className="text-yellow-100/70 text-sm font-medium">
                      Embedding Model
                    </p>
                    <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                      <Select
                        value={selectedEmbeddingModel ?? undefined}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSelectedEmbeddingModel(value);
                          saveConfig('embeddingModel', value);
                        }}
                        options={(() => {
                          const embeddingModelProvider =
                            config.embeddingModelProviders[
                              selectedEmbeddingModelProvider
                            ];
                          return embeddingModelProvider
                            ? embeddingModelProvider.length > 0
                              ? embeddingModelProvider.map((model) => ({
                                  value: model.name,
                                  label: model.displayName,
                                }))
                              : [
                                  {
                                    value: '',
                                    label: 'No models available',
                                    disabled: true,
                                  },
                                ]
                            : [
                                {
                                  value: '',
                                  label:
                                    'Invalid provider, please check backend logs',
                                  disabled: true,
                                },
                              ];
                        })()}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </SettingsSection>

          <SettingsSection title="API Keys">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <p className="text-yellow-100/70 text-sm font-medium">
                  OpenAI API Key
                </p>
                <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                  <Input
                    type="password"
                    placeholder="Enter OpenAI API key"
                    value={config.openaiApiKey}
                    isSaving={savingStates['openaiApiKey']}
                    onChange={(e) => {
                      setConfig((prev) => ({
                        ...prev!,
                        openaiApiKey: e.target.value,
                      }));
                    }}
                    onSave={(value) => saveConfig('openaiApiKey', value)}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <p className="text-yellow-100/70 text-sm font-medium">
                  Ollama API URL
                </p>
                <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                  <Input
                    type="text"
                    placeholder="Enter Ollama API URL"
                    value={config.ollamaApiUrl}
                    isSaving={savingStates['ollamaApiUrl']}
                    onChange={(e) => {
                      setConfig((prev) => ({
                        ...prev!,
                        ollamaApiUrl: e.target.value,
                      }));
                    }}
                    onSave={(value) => saveConfig('ollamaApiUrl', value)}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <p className="text-yellow-100/70 text-sm font-medium">
                  GROQ API Key
                </p>
                <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                  <Input
                    type="password"
                    placeholder="Enter GROQ API key"
                    value={config.groqApiKey}
                    isSaving={savingStates['groqApiKey']}
                    onChange={(e) => {
                      setConfig((prev) => ({
                        ...prev!,
                        groqApiKey: e.target.value,
                      }));
                    }}
                    onSave={(value) => saveConfig('groqApiKey', value)}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <p className="text-yellow-100/70 text-sm font-medium">
                  Anthropic API Key
                </p>
                <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                  <Input
                    type="password"
                    placeholder="Enter Anthropic API key"
                    value={config.anthropicApiKey}
                    isSaving={savingStates['anthropicApiKey']}
                    onChange={(e) => {
                      setConfig((prev) => ({
                        ...prev!,
                        anthropicApiKey: e.target.value,
                      }));
                    }}
                    onSave={(value) => saveConfig('anthropicApiKey', value)}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <p className="text-yellow-100/70 text-sm font-medium">
                  Gemini API Key
                </p>
                <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                  <Input
                    type="password"
                    placeholder="Enter Gemini API key"
                    value={config.geminiApiKey}
                    isSaving={savingStates['geminiApiKey']}
                    onChange={(e) => {
                      setConfig((prev) => ({
                        ...prev!,
                        geminiApiKey: e.target.value,
                      }));
                    }}
                    onSave={(value) => saveConfig('geminiApiKey', value)}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <p className="text-yellow-100/70 text-sm font-medium">
                  Deepseek API Key
                </p>
                <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                  <Input
                    type="password"
                    placeholder="Enter Deepseek API key"
                    value={config.deepseekApiKey}
                    isSaving={savingStates['deepseekApiKey']}
                    onChange={(e) => {
                      setConfig((prev) => ({
                        ...prev!,
                        deepseekApiKey: e.target.value,
                      }));
                    }}
                    onSave={(value) => saveConfig('deepseekApiKey', value)}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <p className="text-yellow-100/70 text-sm font-medium">
                  LM Studio API URL
                </p>
                <div className="bg-black/30 border border-yellow-400/20 rounded-lg backdrop-blur-sm">
                  <Input
                    type="text"
                    placeholder="Enter LM Studio API URL"
                    value={config.lmStudioApiUrl}
                    isSaving={savingStates['lmStudioApiUrl']}
                    onChange={(e) => {
                      setConfig((prev) => ({
                        ...prev!,
                        lmStudioApiUrl: e.target.value,
                      }));
                    }}
                    onSave={(value) => saveConfig('lmStudioApiUrl', value)}
                  />
                </div>
              </div>
            </div>
          </SettingsSection>
        </div>
      )
    )}
  </div>
);

};

export default Page;
