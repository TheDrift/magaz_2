const $leave = document.querySelector('.leave')
const $add = document.querySelector('.add')
const $container = document.querySelector('.container')
const $row = document.querySelector('.row')
const base_url = 'https://pbasics.pythonanywhere.com'
const token = localStorage.getItem('userToken')
window.addEventListener('load' , () =>{
  get(base_url)
})
function get(){
  fetch(`${base_url}/products`)
    .then(r => r.json())
    .then(res => cards(res))
}
function cards(base){
  const mape = base.map(({id,description,title,price,image,image_url}) =>{
    return` 
      <div class="card">
        <div class="card-header">
          <h1>${title}</h1>
        </div>
        <div class="card-body">
          <img src="${image ? image : image_url}">
        </div>
        <div class="card-footer">
          <p>Цена: ${price}</p>
        </div>
        <div class="btn">
          <button type="button" class="delete" onclick="deleteId('${id}')">Удалить</button>
        </div>
      </div>
    `
  }).reverse().join('')
  $container.innerHTML = mape
}
$add.addEventListener('click' , e =>{
  e.preventDefault()
  fetch(`${base_url}/products/create/` , {
    method:"POST",
    headers:{
      'Content-type': 'application/json',
      'Authorization' : `Token${token}`
    },
    body:JSON.stringify({
      title: prompt('Имя'),
      description: prompt('Описание'),
      price: +prompt('Цена'),
      image_url:prompt('Ссылка на картинку'),
      category: +prompt('Категория, от 0 до 4'),
    }),
  })
  .then(r => r.json())
  .then(get)
})
$leave.addEventListener('click' , e =>{
  e.preventDefault()
  localStorage.clear()
  window.open('./register.html' , '_self')
})
function deleteId(id){
  fetch(`${base_url}/products/delete/${id}`, {
    method:'DELETE',
      headers:{
          'Content-type': 'application/json',
          'Authorization': `Token ${token}`
    }
  }).then(get)
}