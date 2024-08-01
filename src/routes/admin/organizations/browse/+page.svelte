<script>
	import { getContext, onMount } from 'svelte';
	import BrowsePage from '../../../../components/layouts/BrowsePage.svelte';
	// Helper
	import {
		formatOrganization,
		getOrganizationFields,
		headers
	} from '../../../../helpers/organizations';
	import { populateDBToFields, uploadFileFromFields } from '../../../../helpers/form';
	import { SupabaseService } from '$lib/supabase';
	import { asyncTryCatchToast } from '$lib/utils';

	export let data;
	let { supabase } = data;

	let organizationService;

	let organizations = getContext('organizations');
	let plans = getContext('plans');

	let fields = [];
	let records = [];

	// Formatting for table data
	const formatOrganizations = (arr) => {
		return arr
			.map((e) => {
				return formatOrganization(e);
			})
			.sort((a, b) => b.id - a.id);
	};

	$: {
		if ($organizations) {
			records = formatOrganizations($organizations);
		}
	}

	const handleEditClicked = ({ detail: { id } }) => {
		fields = populateDBToFields(
			getOrganizationFields({ subscriptions: $plans }),
			$organizations.find((e) => e.id == id)
		);
	};

	const handleUploadFile = async (_data) => {
		const { name, path, error } = await uploadFileFromFields({
			fields,
			bucket: 'media/organizations',
			supabase: supabase,
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
				await organizationService.update(editID, { ...data, updated_at: new Date().toISOString() });
				organizations.set(await organizationService.get());
				onComplete();
			},
			{
				message: 'Organization Information Updated'
			}
		);

	const handleDelete = async ({ detail: { deleteID } }) => {
		await organizationService.delete(deleteID);
		organizations.set(await organizationService.get());
	};

	const handleSearch = async ({ detail: { keyword } }) => {
		if (keyword) {
			$organizations = await organizationService.search(keyword, 'name');
		} else {
			$organizations = await organizationService.get();
		}
	};

	onMount(async () => {
		organizationService = new SupabaseService(supabase, 'organizations');
	});
</script>

<BrowsePage
	{headers}
	title="Organizations"
	description="Empowering Athletes: Unleash Potential, Defy Limits. Train, Compete, Triumph."
	options={{
		updateModalTitle: 'Edit Organization',
		deleteSuccessText: 'Organization Deleted',
		searchPlaceholder: 'Search Organization Name'
	}}
	bind:records
	bind:fields
	isBreadcrumb={false}
	on:clickedit={handleEditClicked}
	on:update={handleUpdate}
	on:delete={handleDelete}
	on:search={handleSearch}
/>
