import { LanguageModelV1FinishReason } from '@ai-toolkit/provider';

export function mapAnthropicStopReason(
  finishReason: string | null | undefined,
): LanguageModelV1FinishReason {
  switch (finishReason) {
    case 'end_turn':
    case 'stop_sequence':
      return 'stop';
    case 'tool_use':
      return 'tool-calls';
    case 'max_tokens':
      return 'length';
    default:
      return 'unknown';
  }
}
