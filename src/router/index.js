import { createRouter, createWebHistory } from 'vue-router'

// Views
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue' // Ensure this exists

// Lazy Load helper
const loadTool = (category, tool) => () => import(`../views/${category}/${tool}.vue`)

const routes = [
    // Public Marketing Home
    { path: '/', name: 'Home', component: Home },

    // Auth
    { path: '/apps/login', name: 'Login', component: Login },

    // Protected Dashboard
    {
        path: '/apps',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },

    // Tools (Protected) - Prefixed with /apps
    { path: '/apps/settings', name: 'Settings', component: () => import('../views/Settings.vue'), meta: { requiresAuth: true } },
    { path: '/apps/ekstra', name: 'Ekstra', component: () => import('../views/Ekstra.vue'), meta: { requiresAuth: true } },

    // Finance
    { path: '/apps/finance/invoice', name: 'InvoiceGenerator', component: loadTool('finance', 'InvoiceGenerator'), meta: { requiresAuth: true } },
    { path: '/apps/finance/products', name: 'ProductList', component: () => import('../views/finance/pos/ProductList.vue'), meta: { requiresAuth: true } },
    { path: '/apps/finance/pos', name: 'Cashier', component: () => import('../views/finance/pos/Cashier.vue'), meta: { requiresAuth: true } },
    { path: '/apps/finance/report', name: 'DailyReport', component: () => import('../views/finance/DailyReport.vue'), meta: { requiresAuth: true } },

    // Marketing
    { path: '/apps/marketing/whatsapp-link', name: 'WhatsAppLink', component: loadTool('marketing', 'WhatsAppLink'), meta: { requiresAuth: true } },
    { path: '/apps/marketing/food-delivery', name: 'FoodDeliveryPricing', component: () => import('../views/marketing/FoodDeliveryPricing.vue'), meta: { requiresAuth: true } },
    { path: '/apps/marketing/qr-menu', name: 'QRMenuMaker', component: () => import('../views/marketing/QRMenuMaker.vue'), meta: { requiresAuth: true } },
    { path: '/apps/marketing/business-card', name: 'BusinessCard', component: () => import('../views/marketing/BusinessCard.vue'), meta: { requiresAuth: true } },
    { path: '/apps/marketing/link-bio', name: 'LinkBio', component: () => import('../views/marketing/LinkBio.vue'), meta: { requiresAuth: true } },
    { path: '/apps/marketing/banner', name: 'BannerGenerator', component: () => import('../views/marketing/BannerGenerator.vue'), meta: { requiresAuth: true } },
    { path: '/apps/marketing/copywriting', name: 'CopywritingWA', component: () => import('../views/marketing/CopywritingWA.vue'), meta: { requiresAuth: true } },
    { path: '/apps/marketing/discount', name: 'DiscountPlanner', component: () => import('../views/marketing/DiscountPlanner.vue'), meta: { requiresAuth: true } },

    // Operations
    { path: '/apps/operations/hpp-calculator', name: 'HPPCalculator', component: loadTool('operations', 'HPPCalculator'), meta: { requiresAuth: true } },
    { path: '/apps/operations/stock-card', name: 'StockCard', component: () => import('../views/operations/StockCard.vue'), meta: { requiresAuth: true } },
    { path: '/apps/operations/shipping-label', name: 'ShippingLabel', component: () => import('../views/operations/ShippingLabel.vue'), meta: { requiresAuth: true } },
    { path: '/apps/operations/delivery-order', name: 'DeliveryOrder', component: () => import('../views/operations/DeliveryOrder.vue'), meta: { requiresAuth: true } },
    { path: '/apps/operations/recipe-scaler', name: 'RecipeConverter', component: () => import('../views/operations/RecipeConverter.vue'), meta: { requiresAuth: true } },
    { path: '/apps/operations/sop-checklist', name: 'SOPChecklist', component: () => import('../views/operations/SOPChecklist.vue'), meta: { requiresAuth: true } },

    // Utilities & Niche
    { path: '/apps/utilities/debt-manager', name: 'DebtManager', component: () => import('../views/utilities/DebtManager.vue'), meta: { requiresAuth: true } },
    { path: '/apps/utilities/qr-wifi', name: 'QRWifi', component: () => import('../views/utilities/QRWifi.vue'), meta: { requiresAuth: true } },
    { path: '/apps/utilities/kitchen-timer', name: 'KitchenTimer', component: () => import('../views/utilities/KitchenTimer.vue'), meta: { requiresAuth: true } },
    { path: '/apps/utilities/simple-todo', name: 'SimpleToDo', component: () => import('../views/utilities/SimpleToDo.vue'), meta: { requiresAuth: true } },
    { path: '/apps/utilities/bill-splitter', name: 'BillSplitter', component: () => import('../views/utilities/BillSplitter.vue'), meta: { requiresAuth: true } },
    { path: '/apps/utilities/credit-simulator', name: 'CreditSimulator', component: () => import('../views/utilities/CreditSimulator.vue'), meta: { requiresAuth: true } },
    { path: '/apps/utilities/random-picker', name: 'RandomPicker', component: () => import('../views/utilities/RandomPicker.vue'), meta: { requiresAuth: true } },
    { path: '/apps/utilities/fabric-calc', name: 'FabricCalculator', component: () => import('../views/utilities/FabricCalculator.vue'), meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('user_token');

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({ name: 'Login' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
