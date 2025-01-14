<script>
    import { fade, slide } from 'svelte/transition';
    
    export let question;
    export let onUpdate;
    export let onRemove;
  </script>
  
  <div class="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg" 
       in:slide out:fade>
    <div class="flex justify-between">
      <input
        type="text"
        bind:value={question.question}
        on:input={(e) => onUpdate(e.currentTarget.value, question.answer)}
        placeholder="Enter question"
        class="w-full p-2 border rounded"
      />
      <button
        on:click={onRemove}
        class="ml-2 text-gray-400 hover:text-red-500"
      >
        ×
      </button>
    </div>
    
    <textarea
      bind:value={question.answer}
      on:input={(e) => onUpdate(question.question, e.currentTarget.value)}
      placeholder="Enter answer"
      class="w-full p-2 border rounded"
      rows="3"
    />
  </div>