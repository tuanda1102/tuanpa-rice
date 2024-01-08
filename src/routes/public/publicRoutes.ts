import { type IRoute } from '@/types/routes';
import authenticationRoutes from '@/features/Authentication/routes/authentication.route';

const publicRoutes: IRoute[] = [...authenticationRoutes];

export default publicRoutes;
