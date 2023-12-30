import { type IRoute } from '@/types/routes';
import homeRoutes from '@/features/Home/routes/home.routes';
import orderRoutes from '@/features/Order/routes/order.route';

const publicRoutes: IRoute[] = [...homeRoutes, ...orderRoutes];

export default publicRoutes;
