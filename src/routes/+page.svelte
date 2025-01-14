<script>
  import { enhance } from "$app/forms"
  import { goto } from "$app/navigation"
	import { preventDefault } from "svelte/legacy";
  let loading = $state(false)

  let email = $state("")

  async function handleEmailSubmit(e) {
    e.preventDefault()
    loading = true
    setTimeout(() => {
      if (!email) return;
      sessionStorage.setItem('userEmail', email);
      goto('/create');
    }, 2500)
    
    
  }
</script>

<section>
    <div class="hero bg-base-200 min-h-screen">
        <div class="hero-content text-center flex flex-col">
          <div class="max-w-xl">
            <h1 class="text-5xl font-bold">Create <span class="font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">the perfect FAQ page</span> in minutes</h1>
            <p class="py-6 text-lg">
                Turn your scattered whatsapp messages into sleek, organized FAQ pages. Finally, a tool for people who hate having to repeat themselves everytime.
            </p>
            <form class="w-full" onsubmit={(e) => handleEmailSubmit(e)}>
                <div class="md:flex md:gap-3 md:mx-auto">
                    <label class="input validator w-full h-12 md:ml-auto">
                        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                        <input type="email" placeholder="Enter your email" name="email" required bind:value={email} />
                      </label>
                      <div class="validator-hint hidden">Enter valid email address</div>
                
                    <button class="rounded-md bg-gradient-to-r from-blue-600 to-purple-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 w-full mt-2 md:mr-auto md:mt-0 md:w-32" type="submit">
                      {#if loading}
                      <span class="loading loading-spinner loading-md"></span>
                      {:else}
                        Get Started
                      {/if}
                    </button>
                </div>
                <div class="mt-0 text-sm text-gray-600">
                    No credit card required • Set up in 5 minutes
                </div>
            </form>
          </div>
          <div class="mt-5 md:mt-10 mb-0 flex items-center justify-center gap-x-6">
            <button class="text-sm font-semibold text-gray-900">
              View Examples <span aria-hidden="true">→</span>
            </button>
          </div>
          
        </div>
      </div>
</section>



<style>
</style>