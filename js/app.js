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

const bodyEl = document.getElementById("body");
const mainLayerEl = document.getElementById("main-layer");

bodyEl.classList.add("position-relative");
mainLayerEl.classList.add("position-relative");

const mainLayerForegroundEl = document.createElement("div");
mainLayerForegroundEl.classList.add("w-100", "h-100", "bg-dark", "position-absolute", "top-0", "start-0", "opacity-50", "d-none");
mainLayerEl.appendChild(mainLayerForegroundEl);

const closeBtnEl = document.createElement("button");
closeBtnEl.classList.add("position-absolute", "close-button", "start-50", "translate-middle", "d-none");
closeBtnEl.textContent = "CHIUDI";
bodyEl.appendChild(closeBtnEl);

const imgEl = document.createElement("img");
imgEl.classList.add("position-absolute", "img-overlay", "d-none", "start-50", "translate-middle");
imgEl.src = "./img/placeholder.png";//debug
bodyEl.appendChild(imgEl);

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
        const { title, url, id } = photo;

        const cardEl = `
            <div class="col-12 col-lg-3 col-sm-5 mx-1">
                <div class="card bg-white h-100 p-3 position-relative">
                    <img src="${url}" alt="img placeholder" class="w-100 id="${id}">
                    <p class="text-left my-3 fw-light fst-italic opacity-75">${title}</p>
                    <img src="./img/pin.svg" alt ="pin" class="pin position-absolute top-0 start-50 translate-middle">
                </div>
            </div>
        `;
        rowEl.innerHTML += cardEl;
    });
    postItCreate(list);
}

function postItCreate(list) {
    const cardList = document.querySelectorAll("div.card");
    console.log(cardList);
    console.log(list);

    if (closeBtnEl.classList.contains("d-none")) {
        cardList.forEach((card) => {
            card.addEventListener("click", function () {
                mainLayerForegroundEl.classList.remove("d-none");
                closeBtnEl.classList.remove("d-none");
                imgEl.classList.remove("d-none");
            });
        });
    }

    closeBtnEl.addEventListener("click", function () {
        closeBtnEl.classList.add("d-none");
        imgEl.classList.add("d-none");
        mainLayerForegroundEl.classList.add("d-none");
    })
}

getPhotos();

