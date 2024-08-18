import type { RouteObject } from 'react-router-dom';
import ResetPasswordPage from '../pages/resetpassword.page';
import ThankYouPage from '../pages/thankyou.page';

const routes: RouteObject[] = [
  {
    path: '*',
    children: [
      {
        path: 'resetpassword',
        element: <ResetPasswordPage />,
      },
      {
        path: 'thankyou',
        element: <ThankYouPage />,
      },
    ],
  },
];

export default routes;
