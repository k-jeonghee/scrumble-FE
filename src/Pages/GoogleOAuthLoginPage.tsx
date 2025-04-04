import { signInOrSignUp } from '@/apis/auth';
import { useUserCookie } from '@/hooks';
import { OAuthRequestParams } from '@/types/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleOAuthCallbackPage = () => {
  const navigate = useNavigate();
  const { setCookie } = useUserCookie();

  useEffect(() => {
    const handleGoogleOAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const scope = params.get('scope');

      if (code === null || scope === null) {
        // TODO: Toast 표시로 alert 대체
        alert('다시 시도해주세요.');
        navigate('/');
        return;
      }

      const authData: OAuthRequestParams = {
        oauthType: 'GOOGLE',
        code,
        scope,
      };

      try {
        const response = await signInOrSignUp(authData);
        if (response.status === 200) {
          const { id, name } = response.data.data;
          setCookie(
            'user',
            { id, name },
            {
              path: '/',
              sameSite: 'strict',
            },
          );
          navigate('/');
        }
      } catch (error) {
        console.error('로그인 실패:', error);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        navigate('/login');
      }
    };

    handleGoogleOAuth();
  }, [navigate]);

  return null;
};

export default GoogleOAuthCallbackPage;
