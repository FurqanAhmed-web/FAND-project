export let paginateData = (data, currentPage, itemsPerPage) => {
	let startIndex = (currentPage - 1) * itemsPerPage;
	return data.slice(startIndex, startIndex + itemsPerPage);
};
