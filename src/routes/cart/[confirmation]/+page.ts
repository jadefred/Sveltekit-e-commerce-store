import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const confirmId = params.confirmation;
	return {confirmId};
};
