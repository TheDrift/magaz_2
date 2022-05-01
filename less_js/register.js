const $reg_card = document.querySelector('.reg_card')
const $btn_submit = document.querySelector('.btn_submit')
const $user_name = document.querySelector('.name_inp')
const $email = document.querySelector('.email')
const $password = document.querySelector('.password')
const $see_password = document.querySelector('.see_password')
const base_url = 'https://pbasics.pythonanywhere.com'
const post = {
  POST: (base) => {
		return fetch(base, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				email: $email.value.trim(),
				username: $user_name.value.trim(),
				password: $password.value.trim(),
			}),
		}).then((r) => r.json())
	},
}
$reg_card.addEventListener('submit' , e =>{
  e.preventDefault()
  post.POST(`${base_url}/auth/users/`).then((res) =>{
    open('./login.html' , '_self')
  })
})
let fal = false
$see_password.addEventListener('click' , e =>{
  e.preventDefault()
  fal = !fal
  if(!fal){
		$password.setAttribute('type', 'text')
  }else{
		$password.setAttribute('type', 'password')
  }
})