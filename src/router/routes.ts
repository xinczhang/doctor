import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [{
			name: 'app.index',
			path: '',
			component: () => import('pages/IndexPage.vue'),
		}],
	},

	{
		name: 'app.small.casebook',
		path: '/casebook/small',
		component: () => import('pages/SmallCasebook/Page.vue'),
	},
	{
		name: 'app.interaction',
		path: '/interaction',
		component: () => import('pages/Interaction/Page.vue'),
	},
	{
		name: 'app.large.casebook',
		path: '/casebook/large',
		component: () => import('pages/LargeCasebook/Page.vue'),
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue'),
	},
];

export default routes;
