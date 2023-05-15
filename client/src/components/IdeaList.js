import IdeasApi from "../services/ideasApi";

class IdeaList {
    #ideaList;
    #ideas;
    #validTags;

    constructor() {
        this.#ideaList = document.getElementById('idea-list');
        this.#ideas = [];
        this.getIdeas();

        this.#validTags = new Set();
        this.#validTags.add('technology');
        this.#validTags.add('education');
        this.#validTags.add('health');
        this.#validTags.add('inventions');
        this.#validTags.add('business');
    }

    addEvents() {       
        const deleteBtns = document.querySelectorAll('.delete');
        deleteBtns.forEach(btn => { 
            btn.addEventListener('click', this.deleteIdea.bind(this, btn.parentElement.id));
        });

        const editBtns = document.querySelectorAll('.edit');
        editBtns.forEach(btn => { 
            btn.addEventListener('click', this.updateIdea.bind(this, btn.parentElement.id));
        });
    }

    async getIdeas() {
        try {
            const { data } = await IdeasApi.getIdeas();
            if (data.success) {
                this.#ideas = data.data;
                this.render();
            }

        } catch (error) {   
            console.log(error);
        }
    }

    async deleteIdea(id) {
        
        if (window.confirm('Are you sure?')) {
            try {
                const { data } = await IdeasApi.deleteIdea(id);
                if (data.success) {
                    this.getIdeas();
                }

            } catch (error) {
                console.log(error)
                alert('Not Authorized');
            }
        }
    }

    updateIdea(ideaId) {
        const idea = this.#ideas.find(idea => idea._id === ideaId);
        localStorage.setItem('updateIdea', JSON.stringify(idea));
        document.dispatchEvent(new Event('openmodal'));
    }

    getTagsClass(tag) {
        tag = tag.toLowerCase();
        let tagClass = '';

        if (this.#validTags.has(tag)) {
            tagClass = `tag-${tag}`
        } else {
            tagClass = ''
        }

        return tagClass;
    }

    render() {
        this.#ideaList.innerHTML = this.#ideas.map(idea => {
            const tagClass = this.getTagsClass(idea.tag);
            const user = JSON.parse(localStorage.getItem('userInfo'));
            let displayBtn = 'd-none';
            if (user && user._id === idea.user) {
                displayBtn = ''
            };

            return `<div class="card" id=${idea._id}>
                <button class="${displayBtn} delete"><i class="fas fa-times"></i></button>
                <button class="${displayBtn} edit"><i class="far fa-pen-to-square"></i></button>
                <h3>${idea.text}</h3>
                <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
                <p>
                Posted on <span class="date">
                    ${idea.date.split('T')[0]} ${idea.date.split('T')[1].split('.')[0]}
                </span> by
                <span class="author">${idea.username}</span>
                </p>
                </div>
            `
        }).join('');

       this.addEvents();
    }
}

export default IdeaList;