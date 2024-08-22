<script>
  export let hidden = true;

  const handleClose = () => {
    hidden = true;
  };

  const handleInputChange = () => {
    // TODO
  };
</script>

<div
  id="overlay"
  class:hidden
  class="absolute top-0 left-0 bottom-0 right-0 m-auto w-full h-screen z-100 bg-overlay min-w-[1280px]"
>
  <div
    class="absolute top-0 right-0 bottom-0 left-0 m-auto bg-bg-2 w-[70%] h-fit rounded-[16px] p-16 min-w-[924px] min-h-[398px] max-w-[996px]"
  >
    <div class="flex flex-col gap-14 justify-between">
      <div class="flex flex-row justify-between items-center">
        <h1
          class="text-[30px] xl:text-[36px] font-h1 leading-[30px] xl:leading-[36px] p-0"
        >
          Upload CSV
        </h1>
        <button id="close-btn" on:click={handleClose}
          ><img src="/images/icons/close.svg" alt="close" /></button
        >
      </div>
      <div id="upload-container" class="flex flex-col gap-6 pointer">
        <label
          class="border-[1px] border-dashed border-bc-7 rounded-[8px] flex-grow bg-white min-h-[200px] h-[30vh] max-h-[216px] p-12"
          for="upload-csv"
          ondragover="preventDefaultBehavior(event)"
          ondrop="handleFileDrop(event)"
        >
          <div class="w-full flex flex-col gap-4 justify-center items-center">
            <img src="/images/icons/upload-2.svg" alt="upload" />
            <span class="text-color-9 font-semibold leading-8 text-[24px]"
              >Click to upload or drag and drop CSV file here</span
            >
          </div>
          <input
            type="file"
            id="upload-csv"
            class="hidden custom-drop-file"
            on:change={handleInputChange}
          />
        </label>
      </div>
      <div
        id="upload-btn"
        class="hidden py-3 px-8 border-[1px] border-black bg-bg-2 rounded-[8px] w-fit mx-auto text-black font-[14px] leading-4 tracking-tight font-semibold"
      >
        Upload
      </div>
    </div>
  </div>
</div>