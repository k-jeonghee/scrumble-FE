import { getOAuthUrl } from '@/apis';
import { useUserCookie } from '@/hooks';
import { pcMediaQuery } from '@/styles/breakpoints';
import { css } from '@emotion/react';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { user } = useUserCookie();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleGoogleLogin = async () => {
    try {
      const response = await getOAuthUrl('GOOGLE');
      window.location.href = `${response.data.redirectUrl}`;
    } catch (error) {
      console.error('Failed to fetch Google OAuth URL', error);
    }
  };

  return (
    <div>
      <div css={loginContainer}>
        <img css={loginHomeImgStyle} src="/images/login.png" alt="login_image" />
        <button onClick={handleGoogleLogin} aria-label="Login with Google">
          <img css={googleLoginImgStyle} src="/images/google_login.png" alt="google_login" />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

const loginContainer = css`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  overflow: auto;
`;

const loginHomeImgStyle = css`
  width: 70%;

  ${pcMediaQuery(css`
    width: 80%;
  `)}
`;

const googleLoginImgStyle = css`
  height: 48px;
  flex: 1;

  ${pcMediaQuery(css`
    height: 64px;
  `)}
`;
