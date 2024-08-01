<script>
	import { getContext, onMount } from 'svelte';
	import BrowsePage from '../../../../components/layouts/BrowsePage.svelte';
	// Helper
	import { formatAthlete, getAthleteFields, headers } from '../../../../helpers/athletes';
	import { populateDBToFields, uploadFileFromFields } from '../../../../helpers/form';
	import { SupabaseService } from '$lib/supabase';
	import { asyncTryCatchToast } from '$lib/utils';

	export let data;

	let athleteService;

	let athletes = getContext('athletes');

	let fields = [];
	let records = [];

	// Formatting for table data
	const formatAthletes = (arr) => {
		return arr
			.map((e) => {
				return formatAthlete(e);
			})
			.sort((a, b) => b.id - a.id);
	};

	$: {
		if ($athletes) {
			records = formatAthletes($athletes);
		}
	}

	const handleEditClicked = ({ detail: { id } }) => {
		fields = populateDBToFields(
			getAthleteFields(),
			$athletes.find((e) => e.id == id)
		);
	};

	const handleUploadFile = async (_data) => {
		const { name, path, error } = await uploadFileFromFields({
			fields,
			bucket: 'athletes',
			supabase: data.supabase,
			setFields: (value) => (fields = value)
		});
		if (error) {
			throw error;
		}
		if (name) {
			if (path) {
				_data[name] = path;
			} else {
				delete _data[name];
			}
		}

		return _data;
	};

	const handleUpdate = async ({ detail }) =>
		asyncTryCatchToast(
			async () => {
				let { editID, data, onComplete } = detail;
				data = await handleUploadFile(data); // Handle file upload
				console.log(data);
				await athleteService.update(editID, { ...data, updated_at: new Date().toISOString() });
				athletes.set(await athleteService.get());
				onComplete();
			},
			{
				message: 'Athlete Information Updated'
			}
		);

	const handleDelete = async ({ detail: { deleteID } }) => {
		await athleteService.delete(deleteID);
		athletes.set(await athleteService.get());
	};

	const handleSearch = async ({ detail: { keyword } }) => {
		if (keyword) {
			$athletes = await athleteService.search(keyword, 'full_name');
		} else {
			$athletes = await athleteService.get();
		}
	};

	onMount(async () => {
		athleteService = new SupabaseService(data.supabase, 'athletes');
	});
</script>

<BrowsePage
	{headers}
	title="Athletes"
	description="Championing athletes' feats, training, and passion. Inspiration awaits in their victorious stories."
	options={{
		updateModalTitle: 'Edit Athlete',
		deleteSuccessText: 'Athlete Deleted',
		searchPlaceholder: 'Search Athlete Name'
	}}
	bind:records
	bind:fields
	isBreadcrumb={false}
	on:clickedit={handleEditClicked}
	on:update={handleUpdate}
	on:delete={handleDelete}
	on:search={handleSearch}
/>
