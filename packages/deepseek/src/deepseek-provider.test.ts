import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { createDeepSeek } from './deepseek-provider';
import { loadApiKey } from '@ai-toolkit/provider-utils';
import { OpenAICompatibleChatLanguageModel } from '@ai-toolkit/openai-compatible';

// Add type assertion for the mocked class
const OpenAICompatibleChatLanguageModelMock =
  OpenAICompatibleChatLanguageModel as unknown as Mock;

vi.mock('@ai-toolkit/openai-compatible', () => ({
  OpenAICompatibleChatLanguageModel: vi.fn(),
}));

vi.mock('@ai-toolkit/provider-utils', () => ({
  loadApiKey: vi.fn().mockReturnValue('mock-api-key'),
  withoutTrailingSlash: vi.fn(url => url),
}));

describe('DeepSeekProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createDeepSeek', () => {
    it('should create a DeepSeekProvider instance with default options', () => {
      const provider = createDeepSeek();
      const model = provider('model-id');

      const constructorCall =
        OpenAICompatibleChatLanguageModelMock.mock.calls[0];
      const config = constructorCall[2];
      config.headers();

      expect(loadApiKey).toHaveBeenCalledWith({
        apiKey: undefined,
        environmentVariableName: 'DEEPSEEK_API_KEY',
        description: 'DeepSeek API key',
      });
    });

    it('should create a DeepSeekProvider instance with custom options', () => {
      const options = {
        apiKey: 'custom-key',
        baseURL: 'https://custom.url',
        headers: { 'Custom-Header': 'value' },
      };
      const provider = createDeepSeek(options);
      provider('model-id');

      const constructorCall =
        OpenAICompatibleChatLanguageModelMock.mock.calls[0];
      const config = constructorCall[2];
      config.headers();

      expect(loadApiKey).toHaveBeenCalledWith({
        apiKey: 'custom-key',
        environmentVariableName: 'DEEPSEEK_API_KEY',
        description: 'DeepSeek API key',
      });
    });

    it('should return a chat model when called as a function', () => {
      const provider = createDeepSeek();
      const modelId = 'foo-model-id';
      const settings = { user: 'foo-user' };

      const model = provider(modelId, settings);
      expect(model).toBeInstanceOf(OpenAICompatibleChatLanguageModel);
    });
  });

  describe('chat', () => {
    it('should construct a chat model with correct configuration', () => {
      const provider = createDeepSeek();
      const modelId = 'deepseek-chat-model';
      const settings = { user: 'foo-user' };

      const model = provider.chat(modelId, settings);

      expect(model).toBeInstanceOf(OpenAICompatibleChatLanguageModel);
    });
  });
});
