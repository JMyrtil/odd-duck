'use stict'

let myContainer = document.querySelector('section');

let myButton = document.querySelector('section + div');

let pic1 = document.querySelector('section img:first-child');
let pic2 = document.querySelector('section img:nth-child(2)');



let numberOfmatchups = 0;
let numberOfmatchupsAllowed = 25;

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.likes = 0;

}

let boot = new Product('boots');
let eatery = new Product('Eatery');
let water = new Product('water');



let allProduct = [boot, eatery, water];
console.log(allProduct);

function selectRandomItem() {
  return Math.floor(Math.random() * allProduct.length);
}

function renderItem() {
  let itemArr = [];
  while (itemArr.length < 25) {
    ranItem = selectRandomItem();

    if (!itemArr.includes(ranItem)) {
      itemArr.push(ranItem)
    }
  }

  let item1 = itemArr[0];
  let item2 = itemArr[1];

  console.log(item1);

  pic1.src = allProduct[item1].src;
  pic2.src = allProduct[item2].src;
  pic1.alt = allProduct[item1].name;
  pic2.alt = allProduct[item2].name;
  allProduct[item1].views++
  allProduct[item2].views++
}

function selectResults() {
  let results = document.querySelector('ul')
  for (let i = 0; i < allProduct.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProduct[i].name} had ${allProduct[i].views} views and ${allProduct[i].likes} likes.`;
    results.appendChild(li)
  }
}


function allowIDClick(event) {
  let clickedName = event.target.alt;
  for (let i = 0; i < allProduct.length; i++) {
    if (allProduct[i].name === clickedName) {
      allProduct[i].like++;
    }
  }

  if (numberOfmatchups < numberOfmatchupsAllowed) {
    renderItem()
  } else {
    myContainer.removeEventListener('click', allowIDClick);
  }


}



renderItem()

myContainer.addEventListener('click', allowIDClick)