import {
  Modal,
  ModalBody,
  ModalContent,
  Button,
  Image,
  useDisclosure,
  Avatar,
} from '@nextui-org/react';
import { FcDonate } from 'react-icons/fc';
import { FormProvider } from 'react-hook-form';
import { FaArrowDown } from 'react-icons/fa6';

import { useFetchUser } from '@/apis/user.api';
import APP_IMAGES from '@/assets/images';
import CNumberInput from '@/components/Input/CNumberInput';
import { useFormWithYupSchema } from '@/hooks/useYupValidationResolver';
import { useAddDonate } from '@/apis/donate.api';
import appToast from '@/utils/toast.util';
import { type IDonate } from '@/types/donates';
import { donateSchema } from '@/features/NewFeeds/validations/donate.validation';

function ModalDonate() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { authUser } = useFetchUser();
  const addDonate = useAddDonate();

  const methods = useFormWithYupSchema(donateSchema);
  const { handleSubmit, reset } = methods;

  const submitHandler = handleSubmit((values: Partial<IDonate>) => {
    addDonate.mutate(
      {
        userEmail: authUser?.email as string,
        price: values.price,
      },
      {
        onSuccess() {
          appToast({
            type: 'success',
            props: {
              text: 'Cảm ơn ,Donate thành công <3 !',
            },
          });
          reset();
          onClose();
        },
        onError() {
          appToast({
            type: 'error',
            props: {
              text: 'Donate thất bại, vui lòng thử lại!',
            },
          });
        },
      },
    );
  });

  return (
    <div>
      <Button
        onPress={onOpen}
        size='lg'
        radius='full'
        color='danger'
        className='text-white'
        startContent={<FcDonate />}
      >
        Góp tiền nuôi Xoăn cùng TuanPA
      </Button>
      <Modal size='md' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalBody>
            <div>
              <div className='flex flex-row  justify-center  items-center '>
                <Avatar
                  isBordered
                  as='button'
                  className='transition-transform'
                  src={authUser?.picture}
                />
                <div className='p-4 font-medium'>{authUser?.name}</div>
              </div>

              <div>
                <Image
                  width={400}
                  className='rounded-3xl'
                  src={APP_IMAGES.qrCodeBanking}
                  alt='QRcode'
                />
              </div>
              <FormProvider {...methods}>
                <form onSubmit={submitHandler} className=''>
                  <div className='flex flex-row p-4 justify-center  items-center '>
                    <p className='px-2 font-medium text-xl'>
                      Nơi đón nhận lòng tốt
                    </p>
                    <FaArrowDown className='animate-bounce' size={22} />
                  </div>

                  <CNumberInput
                    classNameWrapper='mb-0 '
                    label='Số tiền Donate '
                    name='price'
                    id='price'
                  />
                  <div className=' m-8  flex justify-between'>
                    <Button onPress={onClose}>Close</Button>
                    <Button
                      type='submit'
                      startContent={<FcDonate />}
                      color='primary'
                    >
                      Donate
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
export default ModalDonate;
