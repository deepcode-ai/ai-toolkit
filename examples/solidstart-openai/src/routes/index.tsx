import { For, Show } from 'solid-js';
import { useChat } from '@ai-toolkit/solid';

export default function Chat() {
  const {
    error,
    input,
    status,
    handleInputChange,
    handleSubmit,
    messages,
    reload,
    stop,
  } = useChat({
    onFinish(message, { usage, finishReason }) {
      console.log('Usage', usage);
      console.log('FinishReason', finishReason);
    },
  });

  return (
    <div class="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <For each={messages()}>
        {m => (
          <div class="whitespace-pre-wrap">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        )}
      </For>

      <Show when={status() === 'submitted' || status() === 'streaming'}>
        <div class="mt-4 text-gray-500">
          <Show when={status() === 'submitted'}>
            <div>Loading...</div>
          </Show>
          <button
            type="button"
            class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md"
            onClick={stop}
          >
            Stop
          </button>
        </div>
      </Show>

      <Show when={error()}>
        <div class="mt-4">
          <div class="text-red-500">An error occurred.</div>
          <button
            type="button"
            class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md"
            onClick={() => reload()}
          >
            Retry
          </button>
        </div>
      </Show>

      <form onSubmit={handleSubmit}>
        <input
          class="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input()}
          placeholder="Say something..."
          onInput={handleInputChange}
          disabled={status() !== 'ready'}
        />
      </form>
    </div>
  );
}
