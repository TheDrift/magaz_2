const $reg_card = document.querySelector('.reg_card')
const $btn_submit = document.querySelector('.btn_submit')
const $user_name = document.querySelector('.name_inp')
const $password = document.querySelector('.password')
const $see_password = document.querySelector('.see_password')
const base_url = 'https://pbasics.pythonanywhere.com'
const post = {
  POST: (base) =>{
    return fetch(base, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: $user_name.value.trim(),
				password: $password.value.trim(),
      }),
    }).then((r) =>{
      if(r.status < 400){
				return r.json()
      }
    })
  },
}
$reg_card.addEventListener('submit' , e =>{
  e.preventDefault()
  post.POST(`${base_url}/auth/token/login`).then((r) =>{
		localStorage.setItem('userToken', r.auth_token)
    open('./about.html', '_self')
  })
})
let see_password = false
$see_password.addEventListener('click' , e=>{
  e.preventDefault()
  see_password = !see_password
  if (!see_password) {
		$password.setAttribute('type', 'text')
	} else {
		$password.setAttribute('type', 'password')
	}
})