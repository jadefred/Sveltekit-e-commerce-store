<script lang="ts">
	import axios from 'axios';
	import { selectedProducts } from '../../store';
	//to generate random id for post request - to imitate random id generate by database
	import { v4 as uuidv4 } from 'uuid';
	import type { Iorder } from '../../interface';

	//input value of form
	let firstName: string = '';
	let lastName: string = '';
	let address: string = '';
	let email: string = '';

	//error message - default value is false, so the error message will be hidden
	let firstNameErrorMsg: boolean = false;
	let lastNameErrorMsg: boolean = false;
	let addressErrorMsg: boolean = false;
	let emailErrorMsg: boolean = false;
	let emailInvalidMsg: boolean = false;
	let serverErrorMsg: boolean = false;

	//regex to check email format
	const emailPattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	//onsubmit of form
	function submitForm() {
		//if any info is empty or email format is not valid, change value of error messages' variable to display message
		if (
			firstName == '' ||
			lastName == '' ||
			address == '' ||
			email == '' ||
			emailPattern.test(email) === false
		) {
			firstName == '' ? (firstNameErrorMsg = true) : (firstNameErrorMsg = false);
			lastName == '' ? (lastNameErrorMsg = true) : (lastNameErrorMsg = false);
			address == '' ? (addressErrorMsg = true) : (addressErrorMsg = false);
			email == '' ? (emailErrorMsg = true) : (emailErrorMsg = false);
			//invalid email format - propmt error message
			if (emailPattern.test(email) === false && email !== '') {
				emailInvalidMsg = true;
			} else {
				emailInvalidMsg = false;
			}
		} else {
			//object of all informations - selected products and contact info
			const order = {
				userId: uuidv4(),
				date: date(),
				products: $selectedProducts
			};
			//post order to json server
			postOrder(order);
			async function postOrder(order: Iorder) {
				try {
					const response = await axios.post('https://fakestoreapi.com/carts', order);
					//clear selectedProducts array in store
					selectedProducts.update(() => {
						return [];
					});
					if (serverErrorMsg) serverErrorMsg = false;
					//redirect user to confirmation page
					const confirmation = response.data.id
					window.location.href = `http://localhost:5173/cart/${confirmation}`
				} catch (error) {
					console.log(error);
					serverErrorMsg = true;
				}
			}
		}
	}

	function date() {
		const newDate = new Date();
		const dateObj = new Date(newDate.getTime());

		const year = newDate.getFullYear();
		const month = newDate.getMonth() + 1;
		const day = newDate.getDate();

		return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
	}
</script>

<div class="flex flex-col items-center">
	<p class="text-3xl font-semibold my-6 text-textBlack">Delivery Details</p>

	<!--delivery form-->
	<form
		on:submit|preventDefault={submitForm}
		class="flex flex-col w-11/12 sm:w-9/12 md:w-3/5 gap-y-5 bg-white border-2 border-blue-500 rounded-lg p-10 mb-10"
	>
		<!-- first name -->
		<div class="flex flex-col">
			<label for="firstName" class="font-semibold"> First Name : </label>
			<input
				type="text"
				name="firstName"
				bind:value={firstName}
				class="px-2 py-1 rounded border border-blue-300 text-textBlack"
			/>
			<p class={`${firstNameErrorMsg ? 'text-red-500' : 'hidden'}`}>
				Please fill in your first name
			</p>
		</div>

		<!-- last name -->
		<div class="flex flex-col">
			<label for="lastName" class="font-semibold"> Last Name : </label>
			<input
				type="text"
				name="lastName"
				bind:value={lastName}
				class="px-2 py-1 rounded border border-blue-300 text-textBlack"
			/>
			<p class={`${lastNameErrorMsg ? 'text-red-500' : 'hidden'}`}>Please fill in your last name</p>
		</div>

		<!-- address -->
		<div class="flex flex-col">
			<label for="address" class="font-semibold"> Address : </label>
			<input
				type="text"
				name="address"
				bind:value={address}
				class="px-2 py-1 rounded border border-blue-300 text-textBlack"
			/>
			<p class={`${addressErrorMsg ? 'text-red-500' : 'hidden'}`}>Please fill in your address</p>
		</div>

		<!-- email -->
		<div class="flex flex-col">
			<label for="email" class="font-semibold"> Email : </label>
			<input
				type="email"
				name="email"
				bind:value={email}
				class="px-2 py-1 rounded border border-blue-300 text-textBlack"
			/>
			<p class={`${emailErrorMsg ? 'text-red-500' : 'hidden'}`}>Please fill in your email</p>
			<p class={`${emailInvalidMsg ? 'text-red-500' : 'hidden'}`}>Invalid email</p>
		</div>

		<!-- server error message if post request is failed -->
		<p class={`${serverErrorMsg ? 'text-red-500' : 'hidden text-black'} text-center`}>
			Something went wrong, please try again later.
		</p>

		<!-- submit button -->
		<input
			type="submit"
			value="Place Order"
			class="bg-blue-500 text-white font-semibold py-2 px-5 rounded-md hover:bg-blue-800 cursor-pointer transition"
		/>
	</form>
</div>
