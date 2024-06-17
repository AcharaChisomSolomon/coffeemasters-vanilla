const Router = {
    init: () => {
        document.querySelectorAll('a.navlink').forEach((link) => { 
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const url = link.getAttribute('href');
                Router.go(url);
            });
        });

        window.addEventListener('popstate', (event) => { 
            Router.go(event.state.route, false);
        });

        Router.go(location.pathname);
    },
    go: (route, addToHistory = true) => {
        if (addToHistory) {
            window.history.pushState({ route }, '', route);
        }

        let pageElement = null

        switch (route) {
            case "/":
                pageElement = document.createElement("menu-page");
                break;
            case "/order":
                pageElement = document.createElement("order-page");
                break;
            default:
                if (route.startsWith("/product-")) {
                    pageElement = document.createElement("details-page");
                    const paramId = route.substring(route.lastIndexOf("-")+1);
                    pageElement.dataset.productId = paramId;
                }
        }

        const cache = document.querySelector('main');
        cache.innerHTML = '';
        cache.appendChild(pageElement);
        window.scrollX = 0;
        window.scrollY = 0;
    }
}

export default Router;