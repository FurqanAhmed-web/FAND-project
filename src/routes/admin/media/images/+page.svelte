<script>
  import MediaPage from "../../../../components/media/mediaPage.svelte";
  export let data
</script>

<MediaPage activeTypes={["jpg","png"]} data={data}/>
