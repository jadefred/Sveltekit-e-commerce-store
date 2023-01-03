<script lang="ts">
	import type { Iconfirmation } from '../../../interface';
	export let data: Iconfirmation;

	const id = data.confirmId;
</script>

<div class="text-xl flex flex-col items-center gap-y-10 mt-20">
	<p class="text-2xl">Thank you for your purchase</p>
	<p>Your order ID : <span class="font-semibold" data-cy="confirmationId">{id}</span></p>
	<!-- back to store button -->
	<a
		href="/"
		class="bg-blue-500 text-white font-semibold py-2 px-5 rounded-md hover:bg-blue-800 transition"
		>Back to Store</a
	>
</div>
