class Modal {
    #modal;
    #modalBtn;

    constructor() {
        this.#modal = document.getElementById('modal');
        this.#modalBtn = document.getElementById('modal-btn');
        this.addEventListeners();
    }

    addEventListeners() {
        this.#modalBtn.addEventListener('click', this.open.bind(this));
        window.addEventListener('click', this.outsideClick.bind(this));
        document.addEventListener('closemodal', this.close.bind(this));
    }

    open() {
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