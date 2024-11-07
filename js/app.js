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
const overlayEl = document.getElementById("overlay")

overlayEl.classList.add("overlay", "d-none");
//mainLayerEl.classList.add("position-relative");

const mainLayerForegroundEl = document.createElement("div");

const closeBtnEl = document.createElement("button");
closeBtnEl.classList.add("position-absolute", "close-button", "d-none");
closeBtnEl.textContent = "CHIUDI";
overlayEl.appendChild(closeBtnEl);

const imgEl = document.createElement("img");
imgEl.classList.add("position-absolute", "img-overlay", "d-none");
imgEl.src = "./img/placeholder.png";//debug
overlayEl.appendChild(imgEl);

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
            //console.log(res, res.data);

            const photos = res.data;
            displayPhotos(photos, photoList);
        })

}

function displayPhotos(list, root) {
    root.innerHTML = "";
    let rowEl = document.createElement("div");
    rowEl.classList.add("row");
    root.appendChild(rowEl);

    list.forEach((photo) => {
        const { title, url, id } = photo;

        const cardEl = `
            <div class="col-3">
                <div class="card">
                    <img src="${url}" alt="img" class="card-img" id="${id}">
                    <p class="card-text">${title}</p>
                    <img src="./img/pin.svg" alt ="pin" class="card-pin">
                </div>
            </div>
        `;
        rowEl.innerHTML += cardEl;
    });
    imgOverlay(list);
}

function imgOverlay(list) {
    const cardList = document.querySelectorAll("div.card");
    //console.log(cardList);
    //console.log(list);

    if (closeBtnEl.classList.contains("d-none")) {
        cardList.forEach((card) => {
            card.classList.add("smooth");
            const pin = card.querySelector(".card-pin");
            card.addEventListener("click", function () {
                overlayEl.classList.remove("d-none");
                closeBtnEl.classList.remove("d-none");
                imgEl.classList.remove("d-none");

                const cardImgEl = card.querySelector("img");
                const imgId = cardImgEl.getAttribute("id") - 1;
                imgEl.src = list[imgId].url;
                bodyEl.classList.add("overflow-y-hidden");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            card.addEventListener("mouseover", function () {
                card.classList.add("rotate-10", "shadow-light");
                pin.classList.add("d-none");

            })
            card.addEventListener("mouseleave", function () {
                card.classList.remove("rotate-10", "shadow-light");
                pin.classList.remove("d-none");
            })
        });
    }

    closeBtnEl.addEventListener("click", function () {
        closeBtnEl.classList.add("d-none");
        imgEl.classList.add("d-none");
        overlayEl.classList.add("d-none");
        bodyEl.classList.remove("overflow-y-hidden");
    })
}

getPhotos();

