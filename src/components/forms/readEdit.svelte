<script>
	import { onMount } from 'svelte';
	import CustomSelect from '../customSelect.svelte';
	import { currComponent } from '$lib/store';

	let isDrag = false;
	let fileArr = [];

	onMount(() => {
		const checkbox = document.querySelectorAll('.toggle input');
		const radio = document.querySelectorAll('.radio input');
		const timeInput = document.querySelectorAll('#time');
		const selectBirthday = document.querySelectorAll('#select-birthday select');
		const currentDate = new Date();

		timeInput.forEach((input) => {
			input.addEventListener('input', () => {
				if (input.value.length > 2) {
					input.value = input.value.slice(0, 2);
				}
			});
		});

		checkbox.forEach((cb) => {
			cb.addEventListener('change', () => {
				cb.checked
					? cb.parentElement.classList.replace('bg-gray-10', 'bg-black')
					: cb.parentElement.classList.replace('bg-black', 'bg-gray-10');
			});
		});

		radio.forEach((radio) => {
			const parent = radio.parentElement;
			const span = parent.querySelector('span');

			radio.addEventListener('change', () => {
				radio.checked
					? span.classList.remove('before:hidden')
					: span.classList.add('before:hidden');

				if (radio.checked) {
					radio.parentElement.parentElement.querySelectorAll('span').forEach((otherSpan) => {
						if (otherSpan !== span) {
							otherSpan.classList.add('before:hidden');
						}
					});
				}
			});
		});

		selectBirthday.forEach((select) => {
			if (select.name === 'month') {
				for (let i = 0; i <= 12; i++) {
					const option = document.createElement('option');
					option.textContent = i;
					option.value = i;
					select.appendChild(option);
				}
			} else if (select.name === 'day') {
				for (let i = 0; i <= 31; i++) {
					const option = document.createElement('option');
					if (i == '20') {
						option.setAttribute('selected', 'selected');
					}
					option.textContent = i;
					option.value = i;
					select.appendChild(option);
				}
			} else if (select.name === 'year') {
				for (let i = 1990; i <= currentDate.getFullYear(); i++) {
					const option = document.createElement('option');
					option.textContent = i;
					option.value = i;
					select.appendChild(option);
				}
			}
		});
	});

	//for upload/drag and drop
	const formatFileSize = (size) => {
		if (size < 1024) {
			return size + ' B';
		} else if (size < 1024 * 1024) {
			return (size / 1024).toFixed(2) + ' KB';
		} else if (size < 1024 * 1024 * 1024) {
			return (size / (1024 * 1024)).toFixed(2) + ' MB';
		} else {
			return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
		}
	};
	const handleDragOver = (event) => {
		event.preventDefault();
		isDrag = true;
	};
	const handleDragLeave = () => {
		isDrag = false;
	};
	const handleDrop = (event) => {
		event.preventDefault();
		isDrag = false;

		const file = event.dataTransfer.files[0];
		if (file) {
			const fileName = file.name;
			const fileType = file.type;
			const id = Date.now();
			fileArr = [...fileArr, { id, fileName, fileType, formattedSize: formatFileSize(file.size) }];
		}
	};
	const handleClick = (event) => {
		event.preventDefault();
		isDrag = false;

		const file = event.target.files[0];

		if (file) {
			const fileName = file.name;
			const fileType = file.type;
			const id = Date.now();
			fileArr = [...fileArr, { id, fileName, fileType, formattedSize: formatFileSize(file.size) }];
		}
	};
	const handleDelete = (id) => {
		fileArr = fileArr.filter((file) => file.id !== id);
	};

	//for submit/save
	const handleSubmit = () => {
		const inputFields = document.querySelectorAll('form input');

		const errorMessages = {
			'athlete-name': "Please enter the athlete's name",
			email: 'Please enter a valid email address.',
			'mobile-number': 'Please enter a valid phone number',
			'instagram-username': 'Please enter your username',
			'follower-count': 'Please enter your instagram follower count',
			hometown: 'Please enter your hometown',
			conference: 'Please enter your conference',
			university: 'Please enter your university'
		};

		inputFields.forEach((input) => {
			const parent = input.parentElement;
			const existingErrorText = parent.querySelector('#error-text');
			if (existingErrorText) {
				parent.removeChild(existingErrorText);
			}
		});

		inputFields.forEach((input) => {
			const parent = input.parentElement;
			const inputName = input.name;

			if (input.value === '' && errorMessages[inputName]) {
				const errorText = document.createElement('span');
				errorText.setAttribute('id', 'error-text');
				errorText.classList.add('text-[#F04438]', 'leading-5');
				errorText.textContent = errorMessages[inputName];
				parent.appendChild(errorText);
			}
		});
	};
	//for modal cancel
	const showModalCancel = () => {
		const cancelModal = document.getElementById('cancel-modal');
		cancelModal.classList.remove('hidden');
	};
	const hideModalCancel = () => {
		const cancelModal = document.getElementById('cancel-modal');
		cancelModal.classList.add('hidden');
	};
	const handleConfirm = () => {
		currComponent.set('readOnly');
	};

	//for custom select
	const genderOptions = [
		{ value: 'M', label: 'M' },
		{ value: 'F', label: 'F' }
	];
	const clothingOptions = [
		{ value: 'XS', label: 'XS' },
		{ value: 'S', label: 'S' },
		{ value: 'M', label: 'M' },
		{ value: 'L', label: 'L' },
		{ value: 'XL', label: 'XL' },
		{ value: 'XXL', label: 'XXL' },
		{ value: '4XL', label: '4XL' }
	];
	const shoeOptions = [
		{ value: '5', label: '5' },
		{ value: '5.5', label: '5.5' },
		{ value: '6', label: '6' },
		{ value: '6.5', label: '6.5' },
		{ value: '7', label: '7' },
		{ value: '7.5', label: '7.5' },
		{ value: '8', label: '8' },
		{ value: '8.5', label: '8.5' },
		{ value: '9', label: '9' },
		{ value: '9.5', label: '9.5' },
		{ value: '10', label: '10' },
		{ value: '10.5', label: '10.5' },
		{ value: '11', label: '11' },
		{ value: '11.5', label: '11.5' },
		{ value: '12', label: '12' },
		{ value: '12.5', label: '12.5' },
		{ value: '13', label: '13' },
		{ value: '14.', label: '14' },
		{ value: '15', label: '15' },
		{ value: '16.', label: '16' }
	];
	const timeFormat = [
		{ value: 'AM', label: 'AM' },
		{ value: 'PM', label: 'PM' }
	];
	const yesNoOption = [
		{ value: 'Yes', label: 'Yes' },
		{ value: 'No', label: 'No' }
	];
	const classOptions = [
		{ value: 'Incoming', label: 'Incoming' },
		{ value: 'Freshman', label: 'Freshman' },
		{ value: 'Sophomore', label: 'Sophomore' },
		{ value: 'Junior', label: 'Junior' },
		{ value: 'Senior', label: 'Senior' },
		{ value: 'Graduate Student', label: 'Graduate Student' }
	];
	const birthDay = [];
	const birthMonth = [];
	const birthYear = [];

	const daysInMonth = 31;
	const months = 12;
	const yearNow = new Date();

	for (let day = 1; day <= daysInMonth; day++) {
		birthDay.push({ value: day, label: day.toString() });
	}
	for (let month = 1; month <= months; month++) {
		birthMonth.push({ value: month, label: month.toString() });
	}
	for (let year = 1995; year <= yearNow.getFullYear(); year++) {
		birthYear.push({ value: year, label: year.toString() });
	}
</script>

<form on:submit={handleSubmit} class="flex flex-col gap-8 p-12" novalidate>
	<div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
		<button class="text-gray-3">Athlete</button>
		<span><img src="/images/icons/slash-divider.svg" alt="divider" /></span>
		<button class="text-black">Athlete Data</button>
	</div>
	<div class="flex flex-row justify-between items-start w-full gap-20">
		<span class="text-[36px] font-semibold leading-8 w-full">Athlete Data</span>
		<div class="flex flex-row gap-3 text-[13px] font-semibold leading-normal w-full justify-end">
			<button
				on:click={showModalCancel}
				class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-inherit border-[1px] bg-black rounded-md"
			>
				Cancel
			</button>
			<button
				type="submit"
				class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-yellow rounded-md"
			>
				Save
			</button>
		</div>
	</div>
	<div class="flex flex-col gap-10">
		<span class="text-[24px] leading-8 font-semibold">Personal Information</span>
		<fieldset class="flex flex-col gap-8">
			<div class="flex flex-col gap-3">
				<label for="athlete-name" class="text-[14px] font-bold leading-5 text-gray-11"
					>Athlete Name</label
				>
				<input
					type="text"
					name="athlete-name"
					class="py-2 px-3 text-gray-13 border-[1px] border-gray-2 rounded-lg"
					id="athlete-name"
					value="Jamie Jackson"
				/>
			</div>
			<div class="flex flex-col gap-3">
				<label for="email" class="text-[14px] font-bold leading-5 text-gray-11">Email</label>
				<input
					name="email"
					type="email"
					class="py-2 px-3 text-gray-13 border-[1px] border-gray-2 rounded-lg"
					id="email"
					value="jamiejackson@.com"
				/>
			</div>
			<div class="flex flex-col gap-3">
				<label for="number" class="text-[14px] font-bold leading-5 text-gray-11"
					>Mobile Number</label
				>
				<input
					name="mobile-number"
					type="number"
					inputmode="numeric"
					class="py-2 px-3 text-gray-13 border-[1px] border-gray-2 rounded-lg appearance-none"
					id="number"
					value="9801234567"
				/>
			</div>
			<div class="flex flex-col gap-3">
				<label for="instagram-username" class="text-[14px] font-bold leading-5 text-gray-11"
					>Instagram Username</label
				>
				<input
					name="instagram-username"
					type="text"
					class="py-2 px-3 text-gray-13 border-[1px] border-gray-2 rounded-lg"
					id="instagram-username"
					value="jjamie"
				/>
			</div>
			<div class="flex flex-col gap-3">
				<label for="follower-count" class="text-[14px] font-bold leading-5 text-gray-11"
					>Instagram Follower Count</label
				>
				<input
					name="follower-count"
					type="text"
					class="py-2 px-3 text-gray-13 border-[1px] border-gray-2 rounded-lg"
					id="follower-count"
					value="1.2M"
				/>
			</div>
			<div class="flex flex-col gap-3">
				<span for="birthday" class="text-[14px] font-bold leading-5 text-gray-11">Birthday</span>
				<div class="flex flex-col gap-1">
					<span>Choose month, date, and year.</span>
					<div id="select-birthday" class="flex flex-row gap-5 font-poppins">
						<div class="relative w-full max-w-[68px]">
							<CustomSelect id="month" options={birthMonth} />
						</div>
						<div class="relative w-full max-w-[68px]">
							<CustomSelect id="day" options={birthDay} />
						</div>
						<div class="relative w-full max-w-[80px]">
							<CustomSelect id="year" options={birthYear} />
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-3">
				<label for="hometown" class="text-[14px] font-bold leading-5 text-gray-11">Hometown</label>
				<input
					name="hometown"
					class="py-2 px-3 text-gray-13 border-[1px] border-gray-2 rounded-lg"
					id="hometown"
					value="Boston, USA"
				/>
			</div>
			<div class="flex flex-col gap-3">
				<label for="conference" class="text-[14px] font-bold leading-5 text-gray-11"
					>Conference</label
				>
				<input
					name="conference"
					class="py-2 px-3 text-gray-13 border-[1px] border-gray-2 rounded-lg"
					id="conference"
					value="Label"
				/>
			</div>
			<div class="flex flex-col gap-3">
				<label for="university" class="text-[14px] font-bold leading-5 text-gray-11"
					>University</label
				>
				<input
					name="university"
					class="py-2 px-3 text-gray-13 border-[1px] border-gray-2 rounded-lg"
					id="university"
					value="Duke University"
				/>
			</div>
			<div class="flex flex-col gap-3">
				<label for="class" class="text-[14px] font-bold leading-5 text-gray-11">Class</label>
				<div class="relative w-full">
					<CustomSelect id="class" options={classOptions} />
					<img
						class="z-10 absolute right-3 top-0 bottom-0 m-auto pointer-events-none"
						src="/images/icons/select-down-arrow.svg"
						alt="down arrow"
					/>
				</div>
			</div>
			<div id="athlete-status" class="flex flex-col gap-4 w-full">
				<span class="flex flex-col text-[14px] font-bold leading-5 text-gray-11"
					>Athlete Status</span
				>
				<div class="flex flex-row gap-2 items-center">
					<label
						class="transition ease-in duration-150 toggle relative w-[36px] h-5 max-h-[20px] cursor-pointer bg-gray-10 border-[1px] border-gray-2 rounded-[12px]"
					>
						<input type="checkbox" id="toggleButton" hidden />
						<span
							class="transition ease-in duration-150 rounded-full bg-gray-2 w-[16px] h-[16px] z-10 absolute top-0 left-0.5 bottom-0 m-auto"
						/>
					</label>
					<span class="text-gray-11 text-[14px] font-medium leading-5">Injured</span>
				</div>
				<div class="flex flex-row gap-2 items-center">
					<label
						class="transition ease-in duration-150 toggle relative w-[36px] h-5 max-h-[20px] cursor-pointer bg-gray-10 border-[1px] border-gray-2 rounded-[12px]"
					>
						<input type="checkbox" id="toggleButton" hidden />
						<span
							class="transition ease-in duration-150 rounded-full bg-gray-2 w-[16px] h-[16px] z-10 absolute top-0 left-0.5 bottom-0 m-auto"
						/>
					</label>
					<span class="text-gray-11 text-[14px] font-medium leading-5">On Vacation</span>
				</div>
				<div class="flex flex-row gap-2 items-center">
					<label
						class="transition ease-in duration-150 toggle relative w-[36px] h-5 max-h-[20px] cursor-pointer bg-gray-10 border-[1px] border-gray-2 rounded-[12px]"
					>
						<input type="checkbox" id="toggleButton" hidden />
						<span
							class="transition ease-in duration-150 rounded-full bg-gray-2 w-[16px] h-[16px] z-10 absolute top-0 left-0.5 bottom-0 m-auto"
						/>
					</label>
					<span class="text-gray-11 text-[14px] font-medium leading-5">Training</span>
				</div>
			</div>
			<div id="sports-idol" class="flex flex-col gap-3">
				<span class="flex flex-col text-[14px] font-bold leading-5 text-gray-11"
					>Choose your number 1 sports idol.</span
				>
				<div
					class="font-medium leading-6 text-gray-11 flex flex-row flex-wrap gap-y-4 gap-x-2 w-full max-w-[696px]"
				>
					<label class="radio flex flex-row gap-2 items-center w-full max-w-[344px]">
						<span
							class="relative block border-[1px] border-black w-5 h-5 rounded-full
              before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:m-auto before:w-2 before:h-2 before:bg-black before:rounded-full before:hidden"
						/>
						<input type="radio" name="group" value="option1" hidden />Remember Me
					</label>
					<label class="radio flex flex-row gap-2 items-center w-full max-w-[344px]">
						<span
							class="relative block border-[1px] border-black w-5 h-5 rounded-full
              before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:m-auto before:w-2 before:h-2 before:bg-black before:rounded-full before:hidden"
						/>
						<input type="radio" name="group" value="option1" hidden />Remember Me
					</label>
					<label class="radio flex flex-row gap-2 items-center w-full max-w-[344px]">
						<span
							class="relative block border-[1px] border-black w-5 h-5 rounded-full
              before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:m-auto before:w-2 before:h-2 before:bg-black before:rounded-full before:hidden"
						/>
						<input type="radio" name="group" value="option1" hidden />Remember Me
					</label>
					<label class="radio flex flex-row gap-2 items-center w-full max-w-[344px]">
						<span
							class="relative block border-[1px] border-black w-5 h-5 rounded-full
              before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:m-auto before:w-2 before:h-2 before:bg-black before:rounded-full before:hidden"
						/>
						<input type="radio" name="group" value="option1" hidden />Remember Me
					</label>
					<label class="radio flex flex-row gap-2 items-center w-full max-w-[344px]">
						<span
							class="relative block border-[1px] border-black w-5 h-5 rounded-full
              before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:m-auto before:w-2 before:h-2 before:bg-black before:rounded-full before:hidden"
						/>
						<input type="radio" name="group" value="option1" hidden />Remember Me
					</label>
					<label class="radio flex flex-row gap-2 items-center w-full max-w-[344px]">
						<span
							class="relative block border-[1px] border-black w-5 h-5 rounded-full
              before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:m-auto before:w-2 before:h-2 before:bg-black before:rounded-full before:hidden"
						/>
						<input type="radio" name="group" value="option1" hidden />Remember Me
					</label>
				</div>
			</div>
			<div id="favorite-brand" class="flex flex-col gap-3">
				<span for="class" class="text-[14px] font-bold leading-5 text-gray-11 max-w-[238px]"
					>Choose your your favorite sports brand.</span
				>
				<div
					class="font-medium leading-6 text-gray-11 flex flex-row flex-wrap gap-y-4 gap-x-2 w-full max-w-[696px]"
				>
					<label class="flex flex-row items-center gap-3 w-full max-w-[344px]" for="brand-1">
						<input value="adidas" class="checkbox-brand w-5 h-5" type="checkbox" id="brand-1" />
						Adidas
					</label>
					<label class="flex flex-row items-center gap-3 w-full max-w-[344px]" for="brand-2">
						<input
							value="new balance"
							class="checkbox-brand w-5 h-5"
							type="checkbox"
							id="brand-2"
						/>
						New Balance
					</label>
					<label class="flex flex-row items-center gap-3 w-full max-w-[344px]" for="brand-3">
						<input
							value="under armour"
							class="checkbox-brand w-5 h-5"
							type="checkbox"
							id="brand-3"
						/>
						Under Armour
					</label>
					<label class="flex flex-row items-center gap-3 w-full max-w-[344px]" for="brand-4">
						<input value="fila" class="checkbox-brand w-5 h-5" type="checkbox" id="brand-4" />
						Fila
					</label>
					<label class="flex flex-row items-center gap-3 w-full max-w-[344px]" for="brand-5">
						<input value="rebook" class="checkbox-brand w-5 h-5" type="checkbox" id="brand-5" />
						Reebook
					</label>
					<label class="flex flex-row items-center gap-3 w-full max-w-[344px]" for="brand-6">
						<input value="champion" class="checkbox-brand w-5 h-5" type="checkbox" id="brand-6" />
						Champion
					</label>
					<label class="flex flex-row items-center gap-3 w-full max-w-[344px]" for="brand-7">
						<input value="nike" class="checkbox-brand w-5 h-5" type="checkbox" id="brand-7" />
						Nike
					</label>
					<label class="flex flex-row items-center gap-3 w-full max-w-[344px]" for="brand-8">
						<input value="jordan" class="checkbox-brand w-5 h-5" type="checkbox" id="brand-8" />
						Jordan
					</label>
				</div>
			</div>
			<div class="flex flex-col gap-3">
				<label for="class" class="text-[14px] font-bold leading-5 text-gray-11"
					>Clothing Gender</label
				>
				<CustomSelect id="1" options={genderOptions} />
			</div>
			<div class="flex flex-col gap-3">
				<label for="class" class="text-[14px] font-bold leading-5 text-gray-11">Clothing Top</label>
				<CustomSelect id="2" options={clothingOptions} />
			</div>
			<div class="flex flex-col gap-3">
				<label for="class" class="text-[14px] font-bold leading-5 text-gray-11"
					>Clothing Bottom</label
				>
				<CustomSelect id="3" options={clothingOptions} />
			</div>
			<div class="flex flex-col gap-3">
				<label for="class" class="text-[14px] font-bold leading-5 text-gray-11">Clothing Shoe</label
				>
				<CustomSelect id="4" options={shoeOptions} />
			</div>
			<div class="flex flex-col gap-3">
				<span for="class" class="text-[14px] font-bold leading-5 text-gray-11">Description</span>
				<div class="relative w-full">
					<textarea
						class="p-3 border-[1px] border-gray-2 w-full resize-none rounded-lg outline-none"
						name=""
						id=""
						cols="30"
						rows="10"
						placeholder="Enter a description..."
					/>
				</div>
			</div>
			<div class="flex flex-col gap-3 text-[14px] text-gray-11 leading-5">
				<span class="font-bold leading-5 max-w-[238px]">What is the best time to reach you?</span>
				<div class="flex flex-col gap-6">
					<div class="flex flex-col gap-2">
						<span class="font-semibold">Start Time</span>
						<div class="flex flex-row gap-5 font-poppins text-gray-13">
							<input
								class="border-[1px] border-gray-2 w-full max-w-[64px] min-h-[40px] text-center rounded-md"
								id="time"
								type="number"
								maxlength="2"
								placeholder="00"
							/>
							<input
								class="border-[1px] border-gray-2 w-full max-w-[64px] min-h-[40px] text-center rounded-md"
								id="time"
								type="number"
								maxlength="2"
								placeholder="00"
							/>
							<div class="relative w-full max-w-[64px]">
								<CustomSelect id="time-start" options={timeFormat} />
								<img
									class="w-3 z-10 absolute right-2.5 top-0 bottom-0 m-auto pointer-events-none"
									src="/images/icons/select-down-arrow.svg"
									alt="down arrow"
								/>
							</div>
						</div>
					</div>
					<div class="flex flex-col gap-2">
						<span class="font-semibold">End Time</span>
						<div class="flex flex-row gap-5 font-poppins text-gray-13">
							<input
								class="border-[1px] border-gray-2 w-full max-w-[64px] min-h-[40px] text-center rounded-md"
								id="time"
								type="number"
								maxlength="2"
								placeholder="00"
							/>
							<input
								class="border-[1px] border-gray-2 w-full max-w-[64px] min-h-[40px] text-center rounded-md"
								id="time"
								type="number"
								maxlength="2"
								placeholder="00"
							/>
							<div class="relative w-full max-w-[64px]">
								<CustomSelect id="time-end" options={timeFormat} />
								<img
									class="w-3 z-10 absolute right-2.5 top-0 bottom-0 m-auto pointer-events-none"
									src="/images/icons/select-down-arrow.svg"
									alt="down arrow"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-3">
				<label for="class" class="text-[14px] font-bold leading-5 text-gray-11"
					>Would you like to be added to our data base to receive messages from brands?</label
				>
				<div class="relative w-full">
					<CustomSelect id="5" options={yesNoOption} />
					<img
						class="z-10 absolute right-3 top-0 bottom-0 m-auto pointer-events-none"
						src="/images/icons/select-down-arrow.svg"
						alt="down arrow"
					/>
				</div>
			</div>
			<div class="flex flex-col gap-3">
				<label for="class" class="text-[14px] font-bold leading-5 text-gray-11"
					>Do you prefer email or text notifications?</label
				>
				<div class="relative w-full">
					<CustomSelect id="6" options={yesNoOption} />
					<img
						class="z-10 absolute right-3 top-0 bottom-0 m-auto pointer-events-none"
						src="/images/icons/select-down-arrow.svg"
						alt="down arrow"
					/>
				</div>
			</div>
			<div class="flex flex-col gap-8">
				<label
					for="file-drop"
					class="rounded-lg cursor-pointer flex flex-col items-center text-center justify-center gap-3 px-6 py-8 w-full border-[1px] border-gray-2"
					on:dragover={handleDragOver}
					on:dragleave={handleDragLeave}
					on:drop={handleDrop}
				>
					<div
						class="flex items-center justify-center rounded-full w-full h-[40px] max-w-[40px] border-[6px] border-gray-20 bg-gray-4"
					>
						<img class="" src="/images/icons/upload.svg" alt="upload" />
					</div>
					<div class="flex flex-col gap-1 text-gray-5">
						<div class="text-[14px] leading-5">
							<span class="text-black font-bold">Click to Upload</span> or drag and drop
						</div>
						<p class="text-[12px] leading-4">Image, Video, Audio or Document (max. 50mb)</p>
					</div>
					<input type="file" name="" id="file-drop" accept="" hidden on:change={handleClick} />
				</label>
				<div class="flex flex-col gap-3">
					{#each fileArr as files}
						{#if files.fileType.includes('image')}
							<div
								class="text-[14px] leading-5 flex flex-row items-start gap-4 p-4 rounded-[12px] border-[1px] border-black-3 w-full"
							>
								<div
									class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-gray-20 bg-gray-4"
								>
									<img src="/images/icons/image.svg" alt="file" />
								</div>
								<div class="flex flex-row gap-3 w-full">
									<div class="flex flex-col gap-[10px] w-full text-[14px] leading-5">
										<div class="flex flex-col">
											<span class="font-medium">{files.fileName}</span>
											<span>{files.formattedSize}</span>
										</div>
										<span class="h-2 w-full bg-black rounded-md" />
									</div>
									<div class="flex flex-col h-auto justify-between items-end">
										<button on:click={handleDelete(files.id)} class="w-fit"
											><img
												class="w-[20px] h-[20px]"
												src="/images/icons/delete.svg"
												alt="delete"
											/></button
										>
										<span class="relative top-1.5 text-[14px] leading-5 font-medium">100%</span>
									</div>
								</div>
							</div>
						{:else if files.fileType.includes('video')}
							<div
								class="text-[14px] leading-5 flex flex-row items-start gap-4 p-4 rounded-[12px] border-[1px] border-black-3 w-full"
							>
								<div
									class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-gray-20 bg-gray-4"
								>
									<img src="/images/icons/video.svg" alt="file" />
								</div>
								<div class="flex flex-row gap-3 w-full">
									<div class="flex flex-col gap-[10px] w-full text-[14px] leading-5">
										<div class="flex flex-col">
											<span class="font-medium">{files.fileName}</span>
											<span>{files.formattedSize}</span>
										</div>
										<span class="h-2 w-full bg-black rounded-md" />
									</div>
									<div class="flex flex-col h-auto justify-between items-end">
										<button on:click={handleDelete(files.id)} class="w-fit"
											><img
												class="w-[20px] h-[20px]"
												src="/images/icons/delete.svg"
												alt="delete"
											/></button
										>
										<span class="relative top-1.5 text-[14px] leading-5 font-medium">100%</span>
									</div>
								</div>
							</div>
						{:else if files.fileType.includes('audio')}
							<div
								class="text-[14px] leading-5 flex flex-row items-start gap-4 p-4 rounded-[12px] border-[1px] border-black-3 w-full"
							>
								<div
									class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-gray-20 bg-gray-4"
								>
									<img src="/images/icons/audio.svg" alt="file" />
								</div>
								<div class="flex flex-row gap-3 w-full">
									<div class="flex flex-col gap-[10px] w-full text-[14px] leading-5">
										<div class="flex flex-col">
											<span class="font-medium">{files.fileName}</span>
											<span>{files.formattedSize}</span>
										</div>
										<span class="h-2 w-full bg-black rounded-md" />
									</div>
									<div class="flex flex-col h-auto justify-between items-end">
										<button on:click={handleDelete(files.id)} class="w-fit"
											><img
												class="w-[20px] h-[20px]"
												src="/images/icons/delete.svg"
												alt="delete"
											/></button
										>
										<span class="relative top-1.5 text-[14px] leading-5 font-medium">100%</span>
									</div>
								</div>
							</div>
						{:else}
							<div
								class="text-[14px] leading-5 flex flex-row items-start gap-4 p-4 rounded-[12px] border-[1px] border-black-3 w-full"
							>
								<div
									class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-gray-20 bg-gray-4"
								>
									<img src="/images/icons/file.svg" alt="file" />
								</div>
								<div class="flex flex-row gap-3 w-full">
									<div class="flex flex-col gap-[10px] w-full text-[14px] leading-5">
										<div class="flex flex-col">
											<span class="font-medium">{files.fileName}</span>
											<span>{files.formattedSize}</span>
										</div>
										<span class="h-2 w-full bg-black rounded-md" />
									</div>
									<div class="flex flex-col h-auto justify-between items-end">
										<button type="button" on:click={handleDelete(files.id)} class="w-fit"
											><img
												class="w-[20px] h-[20px]"
												src="/images/icons/delete.svg"
												alt="delete"
											/></button
										>
										<span class="relative top-1.5 text-[14px] leading-5 font-medium">100%</span>
									</div>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</fieldset>
	</div>
</form>

<div id="cancel-modal" class="hidden absolute top-0 left-0 m-auto w-full h-screen bg-black-3 z-50">
	<div
		class="rounded-[12px] bg-white w-full max-w-[366px] h-fit flex flex-col gap-8 top-0 left-0 right-0 bottom-0 absolute m-auto p-6"
	>
		<div class="flex flex-col">
			<span class="text-[18px] text-gray-13 leading-7 font-semibold">Cancel</span>
			<span class="text-[14px] text-gray-12 leading-5"
				>Are you sure you want to cancel editing this record?</span
			>
		</div>
		<div class="flex flex-row gap-3 text-black font-semibold items-center w-full">
			<button
				on:click={hideModalCancel}
				id="hide-modal"
				class="rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] border-black-3"
				>Decline</button
			>
			<button
				on:click={handleConfirm}
				class="rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] bg-yellow border-yellow"
				>Confirm</button
			>
		</div>
	</div>
</div>

<!--If upload success
<div class="text-[14px] leading-5 flex flex-row items-start gap-4 p-4 rounded-[12px] border-[1px] border-black-3 w-full">  
  <div class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-gray-20 bg-gray-4">
    <img src="/images/icons/file.svg" alt="file">
  </div>
  <div class="flex flex-row gap-3 w-full">
    <div class="flex flex-col gap-[10px] w-full text-[14px] leading-5">
      <div class="flex flex-col">
        <span class="font-medium">{files.fileName}</span>
        <span>{files.formattedSize}</span>
      </div>
      <span class="h-2 w-full bg-black rounded-md"></span>
    </div>
    <div class="flex flex-col h-auto justify-between items-end">
      <button type="button" on:click={handleDelete(files.id)} class="w-fit"><img class="w-[20px] h-[20px]" src="/images/icons/delete.svg" alt="delete"></button>
      <span class="relative top-1.5 text-[14px] leading-5 font-medium">100%</span>
    </div>
  </div>
</div>
-->

<!--If file still uploading
<div class="text-[14px] leading-5 flex flex-row items-start gap-4 p-4 rounded-[12px] border-[1px] border-gray-2 w-full">  
  <div class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-gray-20 bg-gray-4">
    <img src="/images/icons/file.svg" alt="file">
  </div>
  <div class="flex flex-row gap-3 w-full">
    <div class="flex flex-col gap-[10px] w-full text-[14px] leading-5">
      <div class="flex flex-col">
        <span class="font-medium">{files.fileName}</span>
        <span>{files.formattedSize}</span>
      </div>
      <span class="h-2 w-full bg-black rounded-md"></span>
    </div>
    <div class="flex flex-col h-auto justify-between items-end">
      <button type="button" on:click={handleDelete(files.id)} class="w-fit"><img class="w-[20px] h-[20px]" src="/images/icons/delete.svg" alt="delete"></button>
      <span class="relative top-1.5 text-[14px] leading-5 font-medium">100%</span>
    </div>
  </div>
</div>
-->

<!--If upload failed
<div class="text-[14px] text-error-3 leading-5 flex flex-row items-start gap-4 p-4 rounded-[12px] border-[1px] border-error w-full bg-[#FFFBFA]">  
  <div class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-error-4 bg-error-4">
    <img src="/images/icons/image-fail.svg" alt="file">
  </div>
  <div class="flex flex-row gap-3 w-full">
    <div class="flex flex-col gap-[10px] w-full text-[14px] leading-5">
      <div class="flex flex-col">
        <span class="font-medium">Upload Failed. Please try again.</span>
        <span class="text-error-2">File type</span>
      </div>
      <button class="font-semibold leading-5 w-fit">Try Again</button>
    </div>
    <div class="flex flex-col h-auto justify-between items-end">
      <button type="button" on:click={handleDelete(files.id)} class="w-fit"><img class="w-[20px] h-[20px]" src="/images/icons/delete-fail.svg" alt="delete"></button>
      <span class="hidden relative top-1.5 text-[14px] leading-5 font-medium">Try</span>
    </div>
  </div>
</div>
-->
