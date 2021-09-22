const items = ['a', 'b', 'c', 'd'];
const sitem = ['b', 'e', 'd', 'c'];
const products = items.filter((item) => sitem.some((citem) => citem === item));
console.log(products);
