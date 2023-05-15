import Register from "./Register";
import Login from "./Login";
import UpdateIdeaForm from "./updateIdeaForm";
import IdeaForm from "./IdeaForm";

class Modal {
    constructor() {
        this._modal = document.getElementById('modal');
        this._modalBtn = document.getElementById('modal-btn');
        this._registerBtn = document.getElementById('register-btn');
        this._loginBtn = document.getElementById('login-btn');
        this._logoutBtn = document.getElementById('logout-btn');
        this._user = JSON.parse(localStorage.getItem('userInfo'));
        this.addEvents();
    }

    addEvents() {
        if (this._user) {
            this._modalBtn.style.display = 'block';
            this._logoutBtn.style.display = 'd-block';
            this._registerBtn.style.display = 'none';
            this._loginBtn.style.display = 'none';
        } else {
            this._logoutBtn.style.display = 'none';
            this._modalBtn.style.display = 'none';
            this._registerBtn.style.display = 'inline-block';
            this._loginBtn.style.display = 'inline-block';
        }
        
        this._modalBtn.addEventListener('click', this.open.bind(this));
        this._registerBtn.addEventListener('click', this.openRegisterForm.bind(this));
        this._loginBtn.addEventListener('click', this.openLoginForm.bind(this));
        this._logoutBtn.addEventListener('click', this.logout);
        window.addEventListener('click', this.outsideClick.bind(this));
        document.addEventListener('closemodal', this.close.bind(this));
        document.addEventListener('openmodal', this.openUpdateForm.bind(this));
    }

    open() {
        new IdeaForm();
        this._modal.style.display = 'block';
    }

    openRegisterForm() {
        new Register;
        this._modal.style.display = 'block';
    }

    openLoginForm() {
        new Login;
        this._modal.style.display = 'block';
    }

    logout() {
        localStorage.clear();
        location.reload();
    }

    openUpdateForm() {
        new UpdateIdeaForm();
        this._modal.style.display = 'block';
    }

    close() {
        this._modal.style.display = 'none';
    }

    outsideClick(e) {
        if (e.target.classList.contains('modal')) {
            this.close();
        }
    }

}

export default Modal;