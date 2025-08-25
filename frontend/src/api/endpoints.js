const Endpoints = {
    BASE_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL || "",

    Common: {
        getHomePage: "/api/home-page?populate[featuredProducts][populate]=*&populate[heroSlider][populate]=*&populate[experiences][populate]=*&populate[featuredCategories][populate]=*&populate[testimonials][populate]=*",
        getProductPage: "/api/products-page?populate=*",
        getCareerPage: "/api/career-page?populate=*",
        getContactPage: "/api/contact-page?populate[address][populate][emails]=true&populate[address][populate][phones]=true",
        getHeader: "/api/navigation?populate=*",
        getFooter: "/api/footer?populate[logo]=true&populate[socials]=true&populate[menus]=true&populate[address][populate][emails]=true&populate[address][populate][phones]=true",

        getProducts: "/api/products?populate=*",
        getCategories: "/api/categories?populate=*",
    },

    Auth: {
        register: "/api/auth/local/register",
        login: "/api/auth/local",
    },

    Authenticated: {
        getCustomerById: "/api/customers/{0}?populate[addresses][populate]=*&populate[user][populate]=*&populate[cart_items][populate][product][populate]=images",

        postAddress: "/api/addresses/{0}",
        updateAddress: "/api/addresses/{0}",
        deleteAddress: "/api/addresses/{0}",

        postCartitem: "/api/cart-items",
        getCartItemsByCustomerId: "/api/cart-items?filters[customer][id][$eq]={0}&populate=product",
        updateCartitem: "/api/cart-items/{0}",
        deleteCartitem: "/api/cart-items/{0}",

        postOrder: "/api/orders",
    }
}

export default Endpoints