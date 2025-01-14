import { writable } from 'svelte/store';

function createFaqStore() {
  const { subscribe, set, update } = writable({
    title: '',
    categories: []
  });

  return {
    subscribe,
    setTitle: (title) => update(faq => ({ ...faq, title })),
    addCategory: () => update(faq => ({
      ...faq,
      categories: [...faq.categories, { id: Date.now(), name: '', questions: [] }]
    })),
    updateCategory: (id, name) => update(faq => ({
      ...faq,
      categories: faq.categories.map(c => 
        c.id === id ? { ...c, name } : c
      )
    })),
    removeCategory: (id) => update(faq => ({
      ...faq,
      categories: faq.categories.filter(c => c.id !== id)
    })),
    addQuestion: (categoryId) => update(faq => ({
      ...faq,
      categories: faq.categories.map(c => 
        c.id === categoryId 
          ? { ...c, questions: [...c.questions, { question: '', answer: '' }] }
          : c
      )
    })),
    updateQuestion: (categoryId, index, question, answer) => 
      update(faq => ({
        ...faq,
        categories: faq.categories.map(c => 
          c.id === categoryId 
            ? {
                ...c,
                questions: c.questions.map((q, i) => 
                  i === index ? { question, answer } : q
                )
              }
            : c
        )
      })),
    removeQuestion: (categoryId, index) => update(faq => ({
      ...faq,
      categories: faq.categories.map(c => 
        c.id === categoryId 
          ? { ...c, questions: c.questions.filter((_, i) => i !== index) }
          : c
      )
    })),
    reset: () => set({ title: '', categories: [] })
  };
}

export const faqStore = createFaqStore();