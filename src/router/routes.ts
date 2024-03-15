import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [{
			name: 'app.index',
			path: '',
			component: () => import('pages/IndexPage.vue'),
		}, {
			name: 'app.diagnosis',
			path: 'diagnosis',
			component: () => import('pages/Diagnosis.vue'),
		}, {
			name: 'app.interaction',
			path: 'interaction',
			component: () => import('pages/Interaction.vue'),
		}],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue'),
	},
];

export default routes;
