import IdeaList from "./IdeaList";
import IdeasApi from '../services/ideasApi';

class UpdateIdeaForm {
    #form;
    #modalForm;    

    constructor() {
        this.#modalForm = document.getElementById('form-modal');
        this.idea = JSON.parse(localStorage.getItem('updateIdea'));
        this.#form = '';
        this.render();
    }

    addEvents() {
        this.#form.addEventListener('submit', this.updateIdea.bind(this));
       
    }

    async updateIdea(e) {
        e.preventDefault();
        
        const updatedIdea = {
            tag: this.#form.elements.tag.value,
            text: this.#form.elements.text.value
        } 
        
        if (updatedIdea.tag || updatedIdea.text) {
            try {
                const { data } = await IdeasApi.updateIdea(this.idea._id, updatedIdea)
                
                if (data.success) {
                    new IdeaList();
                }

            } catch (error) {
                console.log(error)
            }
        }
        
        document.dispatchEvent(new Event('closemodal'));
    }

    render() {
        this.#modalForm.innerHTML = 
        `<form id="update-idea-form">
            <div class="form-control">
                <label for="idea-text">User: <span id=username>mihai</span></label>
            </div>
            <div class="form-control">
                <label for="idea-text">Update idea</label>
                <textarea name="text" id="idea-text"></textarea>
            </div>
            <div class="form-control">
                <label for="tag">Update Tag</label>
                <input type="text" name="tag" id="tag" />
            </div>
            <button class="btn" type="submit" id="submit">Submit</button>
        </form>`;

        this.#form = document.getElementById('update-idea-form');
        this.#form.elements.tag.value = this.idea.tag;
        this.#form.elements.text.value = this.idea.text;
        this.addEvents();
    }
}

export default UpdateIdeaForm;