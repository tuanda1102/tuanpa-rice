import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  type ModalProps,
  useDisclosure,
} from '@nextui-org/react';
import { FormProvider } from 'react-hook-form';
import { IoMdAdd } from 'react-icons/io';

import { type IUploadCloudinaryInfo } from '@/types/upload';
import CInputUploadFile from '@/components/Input/CInputUploadFile';
import CInputValidation from '@/components/Input/CInputValidation';
import { useMenuForm } from '@/validations/menu.validation';
import { useUploadImage } from '@/apis/upload.api';
import appToast from '@/utils/toast.util';
import { type IMenu } from '@/types/menu';
import { useAddMenu } from '@/apis/order.api';
import CNumberInput from '@/components/Input/CNumberInput';
import { useFetchUser } from '@/apis/user.api';

interface IModalMenuProps extends Omit<ModalProps, 'children'> {}

function ModalMenu({ ...passProps }: IModalMenuProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { authUser } = useFetchUser();

  const uploadImage = useUploadImage();
  const addMenu = useAddMenu();

  const methods = useMenuForm();
  const { handleSubmit, reset } = methods;

  const handleAddMenu = (values: Partial<IMenu>) => {
    addMenu.mutate(
      {
        title: values.title,
        image: values.image,
        price: values.price || null,
        menuLink: values.menuLink || null,
        isDeleted: false,
        avatarThumbnail: (authUser?.picture as string) || null,
        createdByUser: authUser?.email as string,
        createdAt: new Date(),
      },
      {
        onSuccess() {
          appToast({
            type: 'success',
            props: {
              text: 'Thêm menu thành công nà =))))',
            },
          });
          onClose();
          reset({});
        },
      },
    );
  };

  const submitHandler = handleSubmit(async (values) => {
    if (values.image?.length) {
      const uploadRes: IUploadCloudinaryInfo = await uploadImage.mutateAsync(
        values.image as FileList,
        {
          onError(error) {
            appToast({
              type: 'error',
              props: {
                title: 'Cóa lỗi :((((',
                text: 'Thử lại dùm mình chứ lỗi mất roài =))))',
              },
            });

            // eslint-disable-next-line no-console
            console.log('UPLOAD-IMAGE-ERROR');
            throw error;
          },
        },
      );

      if (uploadRes) {
        handleAddMenu({ ...values, image: uploadRes.url });
      }
    } else {
      handleAddMenu({ ...values, image: null });
    }
  });

  return (
    <div>
      <Button
        size='md'
        onPress={onOpen}
        radius='full'
        color='primary'
        startContent={<IoMdAdd />}
      >
        Tạo Menu
      </Button>

      <Modal
        size='3xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          reset({});
        }}
        {...passProps}
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Tạo menu</ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form onSubmit={submitHandler}>
                <CInputValidation
                  isRequired
                  label='Nội dung'
                  name='title'
                  id='title'
                />

                <CNumberInput
                  label='Giá món, nhập sau cũng được'
                  name='price'
                  id='price'
                />

                <CInputUploadFile
                  label='Up ảnh Menu cho mọi người dễ chọn nhóaaa'
                  name='image'
                  id='image'
                />

                <CInputValidation
                  label='Link Menu (nếu không có hình thì bỏ link zô nha mn)'
                  name='menuLink'
                  id='menuLink'
                />

                <div className='flex justify-end gap-1'>
                  <Button variant='light' onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    disabled={uploadImage.isLoading || addMenu.isLoading}
                    isLoading={uploadImage.isLoading || addMenu.isLoading}
                    type='submit'
                    color='primary'
                    startContent={<IoMdAdd />}
                  >
                    Thêm
                  </Button>
                </div>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalMenu;
