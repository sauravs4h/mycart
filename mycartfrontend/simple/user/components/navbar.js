const navbar=()=>{
    return (
        `
        <div id="logo" class="logo">
            My-Cart
        </div>
        <div class="search-bar">
            <input type="text" placeholder="Search...">
            <button class="search-button">Search</button>
        </div>
        <div class="user-options">
            <div id="login" class="login">
                <span class="material-symbols-outlined">
                    person
                    </span>
                Login
            </div>
            <div id="cart" class="cart">
                <span class="material-symbols-outlined">
                    shopping_cart
                    </span>
                Cart
            </div>
            <div id="wish" class="wish">
                <span class="material-symbols-outlined">
                favorite
                </span>
                Wishlist
            </div>
        </div>
        `
    )
}

export {navbar}