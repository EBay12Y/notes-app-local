class NoteList extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
    }

    _updateStyle() {
        this._style.textContent = `
            :host {
                display: block;
                width: 100%;
            }

            div.note-list {
                display: grid;
                grid-template-columns: repeat(1, 1fr);
                gap: 24px;
            }

            @media (min-width: 600px) {
                div.note-list {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media (min-width: 1024px) {
                div.note-list {
                    grid-template-columns: repeat(3, 1fr);
                }
            }
        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `      
            <div class="note-list">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('note-list', NoteList);
