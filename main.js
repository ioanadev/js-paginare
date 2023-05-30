const limit = 6;
let currentPage = 1;
let skip = 0;
let totalPage = false;

const buildPagination = () => {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  let previousPage = document.createElement("button");
  previousPage.innerHTML = "<";
  pagination.appendChild(previousPage);
  previousPage.addEventListener("click", () => {
    goToPage((currentPage = currentPage - 1));
    //console.log(currentPage - 1);
  });
  if (currentPage === 1) {
    previousPage.disabled = true;
  }
  for (let i = 1; i <= totalPage; i++) {
    // console.log(i);
    const nrPage = document.createElement("button");
    nrPage.innerHTML = i;
    if (currentPage === i) {
      nrPage.classList.add("active");
    } else {
      nrPage.addEventListener("click", () => {
        goToPage(i);
        currentPage = i;

        //console.log(currentPage);
        //nrPage = currentPage;
      });
    }

    pagination.appendChild(nrPage);
  }
  let nextPage = document.createElement("button");
  nextPage.innerHTML = ">";
  pagination.appendChild(nextPage);
  nextPage.addEventListener("click", () => {
    goToPage((currentPage = currentPage + 1));
  });
  if (currentPage === totalPage) {
    nextPage.disabled = true;
  }
};

const makeProductsList = products => {
  const productsList = document.querySelector(".products-list");
  productsList.innerHTML = "";
  products.forEach(product => {
    const elementProducts = document.createElement("div");
    elementProducts.innerHTML = `(${product.id})${product.title}`;
    productsList.appendChild(elementProducts);
  });
};
const fetchFunction = () => {
  fetch("https://dummyjson.com/products?limit=" + limit + "&skip=" + skip)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const { total, products } = data;
      makeProductsList(products);
      // console.log(total);
      //  console.log(products);
      if (totalPage === false) {
        totalPage = Math.ceil(total / limit);
      }
      buildPagination();
    });
};
fetchFunction();

const goToPage = nrPage => {
  console.log(nrPage);
  skip = limit * (nrPage - 1);
  // nrPage.classList.add("active");
  fetchFunction();
};

//******* */
//const dogList = document.querySelector(".dogs");
//console.log(dogList);
//const gallery = document.querySelector(".gallery-list");
//console.log(gallery);
//const createResource = (title, iconName) => {
//  const element = document.createElement("div");
//  element.classList.add("resource");
//  console.log(element);
//  const titlu = document.createElement("span");
//  titlu.innerHTML = title;
// element.appendChild(titlu);
//  const button = document.createElement("button");
//  element.classList.add("delete");
//const icon = document.createElement("i");
//  icon.classList.add("fa");
//  icon.classList.add("fa-" + iconName);
// button.appendChild(icon);
//  element.appendChild(button);
//  return element;
//};
//const listaUseri = document.getElementById("users");
//listaUseri.innerHTML = "se incarca userii....";

//fetch("https://jsonplaceholder.typicode.com/users")
//  .then(resp => {
//    return resp.json();
//  })
//  .then(useri => {
//    listaUseri.innerHTML = "am primit userii";
//    useri.forEach(user => {
//      const elementNou = createResource(user.name, "user");
//      listaUseri.appendChild(elementNou);
//      fetch("https://jsonplaceholder.typicode.com/posts?userId=" + user.id)
//        .then(r => r.json())
//        .then(postari => {
//          console.log(postari);
//        });
//    });
//    console.log(useri);
//  })
//  .catch(error => {
//    listaUseri.innerHTML = "nu s-au putut incarca userii.....";
//  });
