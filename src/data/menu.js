// Fadi's Bites — menu data
// Images served from /public/items/

const menuItems = [
    {
        id: 1,
        name: 'Banoco Bite',
        category: 'Banana Snacks',
        tag: 'Banana Based Fillings',
        desc: 'Crispy golden-crumbed banana bites — a Kerala classic reinvented.',
        badge: 'Signature',
        image: '/items/Banoco Bite.png',
    },
    {
        id: 2,
        name: 'Nana Disc',
        category: 'Banana Snacks',
        tag: 'Banana Based Fillings',
        desc: 'Soft disc-shaped banana snacks with a crisp, spiced outer layer.',
        badge: 'Popular',
        image: '/items/Nana Disc.png',
    },
    {
        id: 3,
        name: 'Chicken Pie',
        category: 'Chicken Snacks',
        tag: 'Ready to Cook',
        desc: 'Golden-fried chicken-filled pastry pies — juicy inside, crunchy outside.',
        badge: 'Best Seller',
        image: '/items/Chicken Pie.png',
    },
    {
        id: 4,
        name: 'Poovada',
        category: 'Traditional',
        tag: 'Traditional',
        desc: 'Delicate traditional Kerala pastry with authentic sweet fillings.',
        badge: 'Traditional',
        image: '/items/Poovada.png',
    },
    {
        id: 5,
        name: 'Unnakkai',
        category: 'Traditional',
        tag: 'Traditional',
        desc: "Malabar's beloved stuffed banana fritters with aromatic filling.",
        badge: 'Heritage',
        image: '/items/Unnakkai.png',
    },
    {
        id: 6,
        name: 'Masala Nuggets',
        category: 'Chicken Snacks',
        tag: 'Ready to Cook',
        desc: 'Boldly spiced crispy nuggets for the adventurous palate.',
        badge: 'Spicy 🌶️',
        image: '/items/Masala Nuggets.png',
    },
    {
        id: 7,
        name: 'Chicken Samosa',
        category: 'Chicken Snacks',
        tag: 'Ready to Cook',
        desc: 'Classic triangle samosas packed with seasoned chicken and herbs.',
        badge: 'Favourite',
        image: '/items/Chicken samosa.png',
    },
    {
        id: 8,
        name: 'Chicken Roll',
        category: 'Chicken Snacks',
        tag: 'Ready to Cook',
        desc: 'Crispy breadcrumb rolls hiding succulent chicken inside.',
        badge: 'New',
        image: '/items/Chicken Roll.png',
    },
    {
        id: 9,
        name: 'Pocket Samosa',
        category: 'Chicken Snacks',
        tag: 'Ready to Cook',
        desc: 'Envelope-shaped samosas bursting with spiced filling.',
        badge: 'Trending',
        image: '/items/Pocket Samosa.png',
    },
    {
        id: 10,
        name: 'Kozhi Ada',
        category: 'Traditional',
        tag: 'Traditional',
        desc: 'Traditional Kerala dumpling with spiced chicken in a pastry shell.',
        badge: 'Traditional',
        image: '/items/Kozhi Ada.png',
    },
    {
        id: 11,
        name: 'Bread Bite',
        category: 'Veg Snacks',
        tag: 'Ready to Cook',
        desc: 'Golden-fried bread pockets with a savoury vegetable filling.',
        badge: 'Veg',
        image: '/items/Bread Bite.png',
    },
    {
        id: 12,
        name: 'Egg Pocket',
        category: 'Egg Snacks',
        tag: 'Ready to Cook',
        desc: 'Soft pastry pockets filled with a rich, spiced egg mixture.',
        badge: 'Egg',
        image: '/items/Egg Pocket.png',
    },
    {
        id: 13,
        name: 'Irachi Pathiri',
        category: 'Traditional',
        tag: 'Traditional',
        desc: 'Beloved Malabar flatbread with spiced minced meat — pure heritage.',
        badge: 'Heritage',
        image: '/items/Irachi pathiri.png',
    },
]

export const categories = [
    'All',
    'Chicken Snacks',
    'Banana Snacks',
    'Traditional',
    'Veg Snacks',
    'Egg Snacks',
]

export const stats = [
    { num: '13+', label: 'Menu Items' },
    { num: '1,000+', label: 'Happy Customers' },
    { num: '100%', label: 'Halal Certified' },
    { num: 'FSSAI', label: 'Licensed & Safe' },
]

export const whyUs = [
    { icon: '🌿', title: 'All-Natural Ingredients', desc: 'Only the finest natural ingredients — no artificial preservatives.' },
    { icon: '🔥', title: 'Authentic Kerala Taste', desc: 'Traditional Malabar recipes passed through generations.' },
    { icon: '❄️', title: 'Ready to Cook', desc: 'Frozen fresh, delivered to your door — restaurant quality in minutes.' },
    { icon: '✅', title: 'FSSAI Certified', desc: 'License No. 11325004000143 — quality & hygiene certified.' },
    { icon: '💛', title: 'Baked with Love', desc: 'Each product crafted with care and passion.' },
    { icon: '🚚', title: 'Fast Delivery', desc: 'Quick delivery across Kerala and beyond.' },
]

export default menuItems
