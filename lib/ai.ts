// lib/ai.ts
export function getAIClient(model: string) {
  return {
    chat: {
      completions: {
        create: async ({ messages }: { messages: any[] }) => {
          const res = await fetch("http://localhost:11434/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ model, messages }),
          });

          return await res.json();
        },
      },
    },
  };
}
