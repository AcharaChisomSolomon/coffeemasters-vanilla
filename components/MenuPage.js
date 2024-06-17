export class MenuPage extends HTMLElement { 
    constructor() {
        super()
        this.root = this.attachShadow({ mode: 'open' })

        const styles = document.createElement('style')
        this.root.appendChild(styles)

        async function loadCSS() {
            const response = await fetch('./components/MenuPage.css')
            const text = await response.text()
            styles.textContent = text
        }
        loadCSS()
    }

    connectedCallback() {
        const template = document.getElementById('menu-page-template')
        const content = template.content.cloneNode(true)
        this.root.appendChild(content)

        window.addEventListener('menu-updated', () => {
            this.render()
        })
        this.render()
    }

    render() {
        const menuCache = this.root.querySelector('#menu')
        if (app.store.menu) {
            menuCache.innerHTML = ''
            app.store.menu.forEach((category) => {
                const liCategory = document.createElement("li");
                liCategory.innerHTML = `
                    <h3>${category.name}</h3>
                    <ul class='category'>                    
                    </ul>
                `;
                menuCache.appendChild(liCategory);

                category.products.forEach(product => {
                    const item = document.createElement("product-item");
                    item.dataset.product = JSON.stringify(product);
                    liCategory.querySelector("ul").appendChild(item);
                });
            })
        } else {
            menuCache.innerHTML = 'Loading...'
        }
    }
}

customElements.define('menu-page', MenuPage)