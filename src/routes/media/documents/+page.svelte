<script>
  import MediaPage from "../../../components/media/mediaPage.svelte";
  export let data
</script>

<MediaPage activeTypes={["pdf","txt"]} data={data}/>
