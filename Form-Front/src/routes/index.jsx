import { createBrowserRouter } from 'react-router-dom';

// project import
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
// import CommonRoutes from './CommonRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([
    PublicRoutes,
    PrivateRoutes,
    // CommonRoutes
]);

export default router;