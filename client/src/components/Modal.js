import UpdateIdeaForm from "./updateIdeaForm";
import IdeaForm from "./IdeaForm";

class Modal {
    #modal;
    #modalBtn;
    

    constructor() {
        this.#modal = document.getElementById('modal');
        this.#modalBtn = document.getElementById('modal-btn');
        this.addEvents();
    }

    addEvents() {
        this.#modalBtn.addEventListener('click', this.open.bind(this));
        window.addEventListener('click', this.outsideClick.bind(this));
        document.addEventListener('closemodal', this.close.bind(this));
        document.addEventListener('openmodal', this.openUpdateForm.bind(this));
    }

    open() {
        new IdeaForm();
        this.#modal.style.display = 'block';
    }

    openUpdateForm() {
        new UpdateIdeaForm();
        this.#modal.style.display = 'block';
    }

    close() {
        this.#modal.style.display = 'none';
    }

    outsideClick(e) {
        if (e.target.classList.contains('modal')) {
            this.close();
        }
    }

}

export default Modal;