import UsersApi from '../services/usersApi';

class Register {
    constructor() {
        this._modalForm = document.getElementById('form-modal');
        this._form = '';
        this.render();
    }

    addEvents() {
        this._form.addEventListener('submit', this.register.bind(this));
    }

    async register(e) {
        e.preventDefault();

        const user = {
            name: this._form.elements.username.value,
            email: this._form.elements.email.value,
            password: this._form.elements.password.value,
        }

        if (user.name && user.email && user.password) {
            try {
                const { data } = await UsersApi.register(user);
                
                if (data.success) {
                    localStorage.setItem('userInfo', JSON.stringify(data.data));
                    document.dispatchEvent(new Event('closemodal'));
                    location.reload();
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    render() {

        this._modalForm.innerHTML = `<form id="register-form">
            <div class="form-control">
                <label for="username">Username: </label>
                <input type="text" name="username" id="username" required/>
            </div>
            <div class="form-control">
                <label for="email">Email: </label>
                <input type="email" name="email" id="email" required/>
            </div>
            <div class="form-control">
                <label for="password">Password:</label>
                <input type="password" name="password" id="password" />
            </div>
            <button class="btn" type="submit" id="submit">Register</button>
        </form>`;

        this._form = document.getElementById('register-form');
        this.addEvents();
    }
}

export default Register;