<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    // import { supabase } from '$lib/supabase';
    import { faqStore } from '$lib/stores/faqStore';
    import CategoryEditor from '$lib/components/CategoryEditor.svelte';
    
    let email = '';
    let showPreview = false;
    let loading = false;
    let error = '';
    let saved = false;
    
    $: isValid = $faqStore.title && 
      $faqStore.categories.length > 0 && 
      $faqStore.categories.every(c => 
        c.name && c.questions.length > 0 && 
        c.questions.every(q => q.question && q.answer)
      );
  
    // async function publishFaq() {
    //   try {
    //     loading = true;
    //     error = '';
        
    //     const { data, error: insertError } = await supabase
    //       .from('faq_pages')
    //       .insert([{
    //         title: $faqStore.title,
    //         email,
    //         content: $faqStore.categories
    //       }])
    //       .select()
    //       .single();
          
    //     if (insertError) throw insertError;
        
    //     saved = true;
    //     setTimeout(() => {
    //       goto(`/faq/${data.id}`);
    //     }, 1500);
        
    //   } catch (e) {
    //     error = e.message;
    //   } finally {
    //     loading = false;
    //   }
    // }
  
    onMount(() => {
      if (browser) {
        email = sessionStorage.getItem('userEmail') || '';
        if (!email) goto('/');
      }
    });
  </script>
  
  <main class="max-w-4xl mx-auto p-6">
    {#if !showPreview}
      <div class="space-y-8" in:fade>
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold">Create Your FAQ Page</h1>
          {#if saved}
            <div class="text-green-600" in:fade>Saved successfully!</div>
          {/if}
        </div>
          
        
        <div class="bg-white p-6 rounded-lg shadow">
          <label class="block mb-2">Page Title</label>
          <input
            type="text"
            bind:value={$faqStore.title}
            placeholder="Enter page title"
            class="w-full p-2 border rounded"
          />
        </div>
  
        {#each $faqStore.categories as category (category.id)}
          <CategoryEditor {category} />
        {/each}
  
        <button
          on:click={() => faqStore.addCategory()}
          class="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
        >
          + Add Category
        </button>
  
        {#if error}
          <p class="text-red-500 text-sm">{error}</p>
        {/if}
  
        <div class="flex justify-between">
          <button
            on:click={() => showPreview = true}
            class="px-6 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Preview
          </button>
          <button
            on:click={() => alert("Published")}
            class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={!isValid || loading}
          >
            {loading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
    {:else}
      <div class="bg-white p-8 rounded-lg shadow" in:fade>
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">{$faqStore.title}</h1>
          
        </div>
  
        {#each $faqStore.categories as category}
          {#if category.name && category.questions.length > 0}
            <div class="mb-8">
              <h2 class="text-xl font-semibold mb-4">{category.name}</h2>
              <div class="join join-vertical bg-base-100 space-y-4 w-full">
                {#each category.questions as question}
                  {#if question.question && question.answer}
                  <div class="collapse collapse-arrow join-item border-base-300 border w-full">
                    <input type="radio" name="my-accordion-4" checked="checked" />
                    <div class="collapse-title font-semibold">{question.question}</div>
                    <div class="collapse-content text-sm">{question.answer}</div>
                  </div>
                  {/if}
                {/each}
              </div>
            </div>
          {/if}
        {/each}
      </div>
      <button
            on:click={() => showPreview = false}
            class="btn btn-neutral mt-4"
          >
            Back to Editor
          </button>
    {/if}
  </main>