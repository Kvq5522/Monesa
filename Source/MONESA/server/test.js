// let item1 = {
//     id: 1,
//     name: '1'
// }

// let item2 = {
//     id: 2,
//     name: '2'
// }

// let item3 = {
//     id: 3,
//     name: '3'
// }

// const arr = [item1, item2, item3];

// function check(id) {
//     return
// };



// let obj = arr.find(function (key) {
//     if (key.id == 1) {
//         return 1
//     }
//     else {
//         return 0
//     }
// })

// let index = arr.indexOf(obj)

// arr[index].id = 3
// arr[index].name = 'hello'

// console.log(arr)


// var id = 1;
// var list = [{
//     Id: 1,
//     Name: 'a'
// }, {
//     Id: 2,
//     Name: 'b'
// }, {
//     Id: 3,
//     Name: 'c'
// }];
// var index = list.map(x => {
//     return x.Id;
// }).indexOf(id);

// list.splice(index, 1);
// console.log(list);

const workspace = require('./src/model/Workspace.model')

let check = new workspace.Workspace();

console.log(check)