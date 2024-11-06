/*
<div class="row py-4 g-4">
    <div class="col-4">
        <div class="post-it bg-white p-3 position-relative">
            <img src="./img/placeholder.png" alt="img placeholder" class="w-100">
            <p class="text-left my-3 fw-light fst-italic opacity-75">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quam.</p>
            <img src="./img/pin.svg" alt ="pin" class="pin position-absolute top-0 start-50 translate-middle">
        </div>
    </div>
</div>
*/



function getPhotos() {
    const BASE_URL = 'https://jsonplaceholder.typicode.com/'
    let url_body = 'photos'
    const endpoint = BASE_URL + url_body;

    const photoList = document.getElementById("photo-list");

    axios
        .get(endpoint, {
            params: {
                _limit: 6,
            }
        })
        .then((res) => {
            console.log(res, res.data);

            const photos = res.data;
            displayPhotos(photos, photoList);
        })

}

function displayPhotos(list, root) {
    root.innerHTML = "";
    let rowEl = document.createElement("div");
    rowEl.classList.add("row", "pb-5", "gy-5", "justify-content-between");
    root.appendChild(rowEl);

    list.forEach((photo) => {
        const { title, url } = photo;

        const cardEl = `
            <div class="col-3 post-it bg-white mx-1 p-3 position-relative">
                    <img src="${url}" alt="img placeholder" class="w-100">
                    <p class="text-left my-3 fw-light fst-italic opacity-75">${title}</p>
                    <img src="./img/pin.svg" alt ="pin" class="pin position-absolute top-0 start-50 translate-middle">
            </div>
        `;
        rowEl.innerHTML += cardEl;
    });
}

getPhotos();