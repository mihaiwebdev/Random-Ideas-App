import UsersApi from '../services/usersApi';

class Login {
    constructor() {
        this._formModal = document.getElementById('form-modal');
        this._form = '';
        this.render();
    }

    addEvents() {
        this._form.addEventListener('submit', this.login.bind(this));
    }

    async login(e) {
        e.preventDefault();

        const user = {
            email: this._form.elements.email.value,
            password: this._form.elements.password.value,
        }
      
        if (user.email && user.password) {
            try {
                const { data } = await UsersApi.login(user);
                
                if (data.success) {
                    localStorage.setItem('userInfo', JSON.stringify(data.data))
                    document.dispatchEvent(new Event('closemodal'));
                    location.reload();
                }

            } catch (error) {
                console.log(error)
            }
        }
    }

    render() {
        this._formModal.innerHTML = `<form id="login-form">
            <div class="form-control">
                <label for="email">Email: </label>
                <input type="email" name="email" id="email" required/>
            </div>
            <div class="form-control">
                <label for="password">Password:</label>
                <input type="password" name="password" id="password" />
            </div>
            <button class="btn" type="submit" id="submit">Log in</button>
        </form>`;

        this._form = document.getElementById('login-form');
        this.addEvents();
    }

}

export default Login;