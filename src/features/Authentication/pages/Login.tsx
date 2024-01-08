import { FormProvider, useForm } from 'react-hook-form';
import { Button, Image } from '@nextui-org/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useQueryClient } from '@tanstack/react-query';
import { FcGoogle } from 'react-icons/fc';

import CInputValidation from '@/components/Input/CInputValidation';
import appToast from '@/utils/toast.util';
import { setLocalStorage } from '@/utils/localStorage.util';

function Login() {
  const queryClient = useQueryClient();
  const methods = useForm();

  const loginWithGoogle = useGoogleLogin({
    onSuccess(tokenResponse) {
      if (tokenResponse.hd === 'liftsoft.vn') {
        setLocalStorage('google_access_token', tokenResponse.access_token);
        queryClient.invalidateQueries(['fetch-user']);
      } else {
        appToast({
          type: 'error',
          props: {
            title: 'Email không hợp lệ!',
            text: 'Vui lòng đăng nhập Email thuộc Liftsoft để truy cập vào ứng dụng!',
          },
        });
      }
    },
    onError(errorResponse) {
      // eslint-disable-next-line no-console
      console.log('LOGIN-WITH-GOOGLE-ERROR', errorResponse);
      appToast({
        type: 'error',
        props: {
          title: 'Đăng nhập thất bại!',
          text: 'Vui lòng thử lại, hoặc kiểm tra xem email có tồn tại hay không',
        },
      });
    },
  });

  return (
    <div className='flex flex-col items-center'>
      <Image
        className='mb-16'
        height={60}
        width={60}
        src='https://scontent.fdad1-4.fna.fbcdn.net/v/t1.6435-9/129351049_2943481109206930_5974791713550558502_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=M8VZemg_yFMAX9uoZ8e&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDCb849-N7znv7AQHu1QwGCc5eAKkx9EITZrtHo7CbN7w&oe=65B5FF54'
      />

      <div className='flex flex-col items-center'>
        <h1 className='text-5xl mb-6'>Đăng nhập!</h1>
        <p className='text-gray-400 italic text-sm max-w-[400px] text-center mb-10'>
          Sử dụng Email Liftsort để có thể đăng nhập. Nếu chưa có tài khoản,
          liên hệ TuanPA để được cấp tài khoản riêng.
        </p>
      </div>

      <FormProvider {...methods}>
        <form className='w-[400px]'>
          <CInputValidation
            variant='underlined'
            label='Email'
            name='email'
            id='email'
            placeholder='phamanhnuoi@liftsoft.vn'
          />

          <CInputValidation
            variant='underlined'
            type='password'
            label='Password'
            name='password'
            id='password'
            placeholder='liftsoft123@'
          />

          <Button
            type='submit'
            className='w-full font-semibold mt-4'
            color='primary'
            radius='full'
          >
            Đăng nhập
          </Button>
          <Button
            startContent={<FcGoogle size={20} />}
            className='w-full font-semibold mt-4 bg-white text-black'
            radius='full'
            onPress={() => {
              loginWithGoogle();
            }}
          >
            Đăng nhập bằng Google
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default Login;
