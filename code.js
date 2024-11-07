// Fetch all data

const fetchAllpets = () => {
  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("mainsection").classList.add("hidden");
  setTimeout(async function () {
    document.getElementById("spinner").classList.add("hidden");

    const res = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await res.json();
    document.getElementById("mainsection").classList.remove("hidden");
    showPets(data.pets);
  }, 2000);
};

// fetch Category
const fetchCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();

  setCategory(data.categories);
};

function setCategory(category) {
  const container = document.getElementById("category_container");
  category?.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add(
      "rounded-md",
      "flex",
      "gap-3",
      "items-center",
      "justify-center",
      "p-4",
      "buttons"
    );
    div.innerHTML = `
    <button class="flex gap-2 items-center px-16 py-3 border-2 rounded-lg" id="button-${item.id}" onclick="categorybtn('${item.category}','${item.id}')">
    <img
              class="w-12 h-12"
              src="${item.category_icon}"
              alt=""
            />
            <p class="font-inter text-2xl font-bold">${item.category}</p>
    </button>
     `;
    container.append(div);
  });
}

fetchCategory();
let currentActiveButtonId = null;

function categorybtn(name, id) {
  const btn = document.getElementById(`button-${id}`);

  // Remove 'activebtn' class from the previously active button
  if (currentActiveButtonId !== null) {
    const previousBtn = document.getElementById(
      `button-${currentActiveButtonId}`
    );
    if (previousBtn) {
      previousBtn.classList.remove("activebtn", "rounded-[60px]");
    }
  }

  // Add 'activebtn' class to the current button
  btn.classList.add("activebtn", "rounded-[60px]");
  currentActiveButtonId = id; // Update the current active button ID

  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("mainsection").classList.add("hidden");

  setTimeout(async function () {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${name}`
    );
    const data = await res.json();

    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("mainsection").classList.remove("hidden");
    showPets(data.data);

    setCategory(data.categories);
  }, 2000);
}

// function categorybtn(name, id) {
//   const btn = document.getElementById(`button-${id}`);
//   btn.classList.add("activebtn");

//   document.getElementById("spinner").classList.remove("hidden");
//   document.getElementById("mainsection").classList.add("hidden");

//   setTimeout(async function () {
//     const res = await fetch(
//       `https://openapi.programming-hero.com/api/peddy/category/${name}`
//     );
//     const data = await res.json();
//     // console.log(data.data);
//     document.getElementById("spinner").classList.add("hidden");
//     document.getElementById("mainsection").classList.remove("hidden");
//     showPets(data.data);

//     setCategory(data.categories);
//   }, 2000);
// }
// fetchby Category

// common function
const showPets = (pets) => {
  const sort = document.getElementById("sort_btn");
  const p = pets;

  const maincardContainer = document.getElementById("left_container");
  maincardContainer.innerText = "";

  if (pets.length == 0) {
    maincardContainer.classList.remove(
      "grid",
      "md:grid-cols-3",
      "lg:grid-cols-3"
    );

    maincardContainer.innerHTML = `
    <div class="flex flex-col gap-5 justify-center items-center  bg-[#13131308] py-32 rounded-lg">
    <img  src="./images/error.webp">
    <p class="text-3xl font-bold font-inter text-center ">No Information Available</p>
    <p class="text-center text-lg font-bold font-inter  text-[#131313B3]">Currently there is no pets under this category. But soon bird will be added in this category. <br>Stay with us, thank you.</p>
    </div>`;
    sort.disabled = true;
    return;
  } else {
    maincardContainer.classList.add("grid", "md:grid-cols-2", "lg:grid-cols-3");
    sort.disabled = false;
  }

  for (const pet of pets) {
    const card = document.createElement("div");
    card.classList.add("p-5", "rounded-xl", "border-2");
    card.innerHTML = `
    <img
                  class="w-full h-[200px] object-cover rounded-lg"
                  src="${pet.image}"
                  alt=""
                />
                <div class="py-4">
                  <h1 class="font-inter font-bold text-xl text-">${
                    pet.pet_name
                  }</h1>
                  <div class="flex gap-2 items-center">
                    <img
                      class="w-3 h-3"
                      src="https://cdn-icons-png.flaticon.com/128/2948/2948037.png"
                      alt=""
                    />
                    <p class="font-lato text-sm md:text-lg text-[#131313B3]">
                      Breed: ${pet.breed ? pet.breed : "Not Available"}
                    </p>
                  </div>
                  <div class="flex gap-2 items-center">
                    <img
                      class="w-3 h-3"
                      src="https://cdn-icons-png.flaticon.com/128/2948/2948088.png"
                      alt=""
                    />
                    <p class="font-lato text-sm md:text-lg text-[#131313B3]">
                      Birth: ${
                        pet.date_of_birth ? pet.date_of_birth : "Not Available"
                      }
                    </p>
                  </div>

                  <div class="flex gap-2 items-center">
                    <img
                      class="w-3 h-3"
                      src="https://cdn-icons-png.flaticon.com/128/866/866954.png"
                      alt=""
                    />
                    <p class="font-lato text-sm md:text-lg text-[#131313B3]">
                      Gender: ${pet.gender ? pet.gender : "Not Available"}
                    </p>
                  </div>
                  <div class="flex gap-2 items-center">
                    <img
                      class="w-3 h-3"
                      src="https://cdn-icons-png.flaticon.com/128/991/991952.png"
                      alt=""
                    />
                    <p class="font-lato text-sm md:text-lg text-[#131313B3]">
                      Price: ${pet.price ? pet.price : "Not Available"}
                    </p>
                  </div>

                  <div class="border-t-2 my-4"></div>
                  <div
                    class="flex flex-col 2xl:flex-row gap-2 justify-between items-center"
                  >
                    <button id="likebtn" onclick="liked('${pet.image}'
                    )" class="btn btn-outline btn-accent">
                      <img
                        class="w-4 h-4"
                        src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                        alt=""
                      />
                    </button>
                    <button id="adopt-${pet.petId}" onclick="toast('${
      pet.petId
    }')" class="btn btn-outline btn-accent">
                      Adopt
                    </button>
                    <button id="detailsbtn" onclick="petDetails('${
                      pet.petId
                    }')" class="btn btn-outline btn-accent">
                      Details
                    </button>
                  </div>
                </div>
    `;
    maincardContainer.append(card);
  }

  sort.addEventListener("click", function () {
    pets.sort((a, b) => {
      const priceA = parseFloat(a.price) || 0;
      const priceB = parseFloat(b.price) || 0;
      return priceB - priceA; // Ascending order (for descending, use priceB - priceA)
    });
    maincardContainer.innerText = "";
    for (const pet of pets) {
      const card = document.createElement("div");
      card.classList.add("p-5", "rounded-xl", "border-2");
      card.innerHTML = `
      <img
                    class="w-full h-[200px] object-cover rounded-lg"
                    src="${pet.image}"
                    alt=""
                  />
                  <div class="py-4">
                    <h1 class="font-inter font-bold text-xl text-">${
                      pet.pet_name
                    }</h1>
                    <div class="flex gap-2 items-center">
                      <img
                        class="w-3 h-3"
                        src="https://cdn-icons-png.flaticon.com/128/2948/2948037.png"
                        alt=""
                      />
                      <p class="font-lato text-sm md:text-lg text-[#131313B3]">
                        Breed: ${pet.breed ? pet.breed : "Not Available"}
                      </p>
                    </div>
                    <div class="flex gap-2 items-center">
                      <img
                        class="w-3 h-3"
                        src="https://cdn-icons-png.flaticon.com/128/2948/2948088.png"
                        alt=""
                      />
                      <p class="font-lato text-sm md:text-lg text-[#131313B3]">
                        Birth: ${
                          pet.date_of_birth
                            ? pet.date_of_birth
                            : "Not Available"
                        }
                      </p>
                    </div>
  
                    <div class="flex gap-2 items-center">
                      <img
                        class="w-3 h-3"
                        src="https://cdn-icons-png.flaticon.com/128/866/866954.png"
                        alt=""
                      />
                      <p class="font-lato text-sm md:text-lg text-[#131313B3]">
                        Gender: ${pet.gender ? pet.gender : "Not Available"}
                      </p>
                    </div>
                    <div class="flex gap-2 items-center">
                      <img
                        class="w-3 h-3"
                        src="https://cdn-icons-png.flaticon.com/128/991/991952.png"
                        alt=""
                      />
                      <p class="font-lato text-sm md:text-lg text-[#131313B3]">
                        Price: ${pet.price ? pet.price : "Not Available"}
                      </p>
                    </div>
  
                    <div class="border-t-2 my-4"></div>
                    <div
                      class="flex flex-col lg:flex-row gap-2 justify-between items-center"
                    >
                      <button id="likebtn" onclick="liked('${pet.image}'
                      )" class="btn btn-outline btn-accent">
                        <img
                          class="w-4 h-4"
                          src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                          alt=""
                        />
                      </button>
                      <button id="adopt-${pet.petId}" onclick="toast('${
        pet.petId
      }')" class="btn btn-outline btn-accent">
                        Adopt
                      </button>
                      <button id="detailsbtn" onclick="petDetails('${
                        pet.petId
                      }')" class="btn btn-outline btn-accent">
                        Details
                      </button>
                    </div>
                  </div>
      `;
      maincardContainer.append(card);
    }
  });
};
// common function
fetchAllpets();

// Fetch all data

// toast function

const toast = (id) => {
  const btn = document.getElementById(`adopt-${id}`);
  btn.innerText = "Adopted";
  btn.disabled = true;
  let c = 3;

  // let btn = document.getElementById(`adopt-${id}`);
  // // btn.innerText = "adopted";
  // console.log(btn);
  // console.log(id);
  const modalcontainer = document.getElementById("countdownmodel");
  const div = document.createElement("div");
  div.innerHTML = `
  <dialog id="my_modal_3" class="modal">
        <div class="flex flex-col justify-center items-center gap-4 bg-white rounded-lg p-10">
        <img class="w-16 h-16" src="https://cdn-icons-gif.flaticon.com/17357/17357914.gif">
          <p class="text-3xl font-inter font-extrabold">Congrates</p>
          <p class="text-sm font-lato">Adoption Process is Start for Your Pet</p>
          <p id="count" class="font-bold font-inter text-2xl">${c}</p>

        </div>
      </dialog>
  `;
  modalcontainer.append(div);
  document.getElementById("my_modal_3").showModal();

  const close = setInterval(function () {
    c--;
    document.getElementById("count").innerText = c;
    if (c === 1) {
      clearInterval(close);
      setTimeout(() => {
        document.getElementById("my_modal_3").close(); // Close the modal
        div.remove(); // Optionally remove the modal from the DOM
      }, 1000);
    }
  }, 1000);
};

// toast function

// details functin
const petDetails = async (id) => {
  console.log(id);

  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const dataa = await res.json();
  const data = dataa.petData;
  console.log(data);
  const detailContainer = document.getElementById("detailsModal");
  detailContainer.innerText = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <dialog id="my_modal_4" class=" rounded-lg p-4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] mx-auto">
    <div>
      <img src="${data.image}" class="border-2 w-full rounded-lg mb-3" alt="">
      <p class="text-2xl font-inter font-bold mb-3">${data.pet_name}</p>
      <div class="flex border-b-2 mb-4" >
          <div class="flex-1">
            <div class="flex gap-2 items-center">
              <img
                class="w-3 h-3"
                src="https://cdn-icons-png.flaticon.com/128/2948/2948037.png"
                alt=""
              />
              <p class="font-lato text-sm md:text-lg text-[#131313B3]">
                Breed:${data.breed ? data.breed : "N/A"} 
              </p>
            </div>
            <div class="flex gap-2 items-center">
              <img
                class="w-3 h-3"
                src="https://cdn-icons-png.flaticon.com/128/866/866954.png"
                alt=""
              />
              <p class="font-lato text-sm md:text-lg text-[#131313B3]">
                Gender: ${data.gender ? data.gender : "N/A"}
              </p>
            </div>
            
            <div class="flex gap-2 items-center">
              <img
                class="w-3 h-3"
                src="https://cdn-icons-png.flaticon.com/128/7408/7408330.png"
                alt=""
              />
              <p class="font-lato text-sm md:text-lg text-[#131313B3]">
                Vaccinated: ${
                  data.vaccinated_status ? data.vaccinated_status : "N/A"
                }
              </p>
            </div>
          </div> 
          
          <div class="flex-1">
            <div class="flex gap-2 items-center">
              <img
                class="w-3 h-3"
                src="https://cdn-icons-png.flaticon.com/128/2948/2948088.png"
                alt=""
              />
              <p class="font-lato text-sm md:text-lg text-[#131313B3]">
                Birth: ${data.date_of_birth ? data.date_of_birth : "N/A"}
              </p>
            </div>
  
            <div class="flex gap-2 items-center">
              <img
                class="w-3 h-3"
                src="https://cdn-icons-png.flaticon.com/128/991/991952.png"
                alt=""
              />
              <p class="font-lato text-sm md:text-lg text-[#131313B3]">
                Price: ${data.price ? data.price : "N/A"}
              </p>
            </div>
          </div>
      </div>
  
      <p class="font-inter text-lg mb-3">Details Information</p>
      <p class="font-lato text-sm md:text-lg mb-3 text-[#131313B3]">${
        data.pet_details ? data.pet_details : "N/A"
      }</p>
    </div>
  
    <form method="dialog">
      <!-- if there is a button, it will close the modal -->
      <button class="btn w-full bg-[#0E7A811A] border-[#0E7A8133]">Cancel</button>
    </form>
  
  </dialog>`;
  detailContainer.append(div);
  document.getElementById("my_modal_4").showModal();
};
// details functin

// liked function
const liked = (image) => {
  const likeContainer = document.getElementById("rightContainer");
  likeContainer.classList.remove("hidden");
  const likecard = document.createElement("div");

  likecard.innerHTML = ` 
  <div class="border-2 p-2 rounded-lg"  >
  <img

                class="object-cover rounded-lg"
                src="${image}"
                alt=""
              />
  </div>
  `;
  likeContainer.append(likecard);
  console.log(image);
};
// liked function

// sort

// sort
// spinner function
// function spinner() {
//   document.getElementById("spinner").classList.remove("hidden");
//   setTimeout(function () {
//     fetchAllpets();
//   }, 2000);
// }
// spinner();
// spinner function
