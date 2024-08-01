<script>
	import { getContext, onMount } from 'svelte';
	import PageLayout from '../../../components/pageLayout.svelte';
	import { StorageService } from '../../../lib/supabase';
	export let data;
	let storageService;
	let athletes = getContext('athletes');

	const getImageURL = async (path) => {
		const url = await storageService.createSignedURL(path);
		return url;
	};

	const fetchAllImages = () => {
		let images = [];
		$athletes.forEach((e) => {
			if (e?.profile_image_guid) {
				images = [
					...images,
					{
						id: e.id,
						url: getImageURL(e.profile_image_guid)
					}
				];
			}
		});

		Promise.all([...images.map((e) => e.url)]).then((urls) => {
			urls.forEach((url, i) => {
				images[i].url = url;
			});

			$athletes = $athletes.map((e) => {
				const { url } = images.find((x) => x.id == e.id);

				if (url) {
					return {
						...e,
						profile_image_guid: url
					};
				}

				return e;
			});
		});
	};

	onMount(() => {
		storageService = new StorageService(data.supabase, 'athletes');
		fetchAllImages();
	});
</script>

<PageLayout>
	<slot />
</PageLayout>
