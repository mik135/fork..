<script>
    import { slide, fade } from 'svelte/transition';
    import QuestionEditor from './QuestionEditor.svelte';
    import { faqStore } from '$lib/stores/faqStore';
    
    export let category;
  </script>
  
  <div class="bg-white p-6 rounded-lg shadow mb-6" 
       in:slide out:fade>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        bind:value={category.name}
        on:input={(e) => faqStore.updateCategory(category.id, e.currentTarget.value)}
        placeholder="Enter category name"
        class="w-full p-2 border rounded"
      />
      <button
        on:click={() => faqStore.removeCategory(category.id)}
        class="ml-2 text-gray-400 hover:text-red-500"
      >
        ×
      </button>
    </div>
  
    {#each category.questions as question, index}
      <QuestionEditor
        {question}
        onUpdate={(q, a) => faqStore.updateQuestion(category.id, index, q, a)}
        onRemove={() => faqStore.removeQuestion(category.id, index)}
      />
    {/each}
  
    <button
      on:click={() => faqStore.addQuestion(category.id)}
      class="text-blue-600 hover:text-blue-700"
    >
      + Add Question
    </button>
  </div>