'use stict'

let myContainer = document.querySelector('section');

let myButton = document.querySelector('section + div');

let pic1 = document.querySelector('section img:first-child');
let pic2 = document.querySelector('section img:nth-child(2)');
let pic3 = document.querySelector('section img:nth-child(3)');

let allProduct = [];
let itemArr = [];

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
let broom = new Product('broom');
let desk = new Product('desk');
let dvd = new Product('dvd');
let mug = new Product('mug');
let pot = new Product('pot');
let shoe = new Product('shoe');
let spoon = new Product('spoon');
let thicc = new Product('thicc');

allProduct = [boot, eatery, water, thicc, spoon, shoe, pot, mug, dvd, desk, broom];

function selectRandomItem() {
  return Math.floor(Math.random() * allProduct.length);
}

function renderItem() {

  while (itemArr.length < 6) {
    ranItem = selectRandomItem();

    if (!itemArr.includes(ranItem)) {
      itemArr.push(ranItem)
    }
  }

  let item1 = itemArr.shift();
  let item2 = itemArr.shift();
  let item3 = itemArr.shift();



  pic1.src = allProduct[item1].src;
  pic2.src = allProduct[item2].src;
  pic3.src = allProduct[item3].src;

  pic1.alt = allProduct[item1].name;
  pic2.alt = allProduct[item2].name;
  pic3.alt = allProduct[item3].name;

  allProduct[item1].views++
  allProduct[item2].views++
  allProduct[item3].views++

  numberOfmatchups++

}

// function selectResults() {
// let results = document.querySelector('ul')
// for (let i = 0; i < allProduct.length; i++) {
//   let li = document.createElement('li');
//   li.textContent = `${allProduct[i].name} had ${allProduct[i].views} views and ${allProduct[i].likes} likes.`;
//   results.appendChild(li)
// }
// }


function allowIDClick(event) {
  let clickedName = event.target.alt;
  for (let i = 0; i < allProduct.length; i++) {
    if (allProduct[i].name === clickedName) {
      allProduct[i].likes++;
    }
  }

  if (numberOfmatchups < numberOfmatchupsAllowed) {
    renderItem()
  } else {
    myContainer.removeEventListener('click', allowIDClick);
    // myButton.addEventListener('click', selectResults);
    // console.log(allProduct);
    renderChart();
  };

}



renderItem();

myContainer.addEventListener('click', allowIDClick)


function renderChart() {

  let productLikes = [];
  let productName = [];
  let productViews = [];

  for (let i = 0; i < allProduct.length; i++) {
    productLikes.push(allProduct[i].likes);
    productName.push(allProduct[i].name);
    productViews.push(allProduct[i].views);
  };
  // console.log(productLikes);
  // console.log(productName);


  const ctx = document.getElementById('myChart');

  let config = {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: '# of Likes',
        data: productLikes,
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: productViews,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };


  new Chart(ctx, config);
}
