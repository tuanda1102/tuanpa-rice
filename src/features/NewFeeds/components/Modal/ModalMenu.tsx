import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  type ModalProps,
} from '@nextui-org/react';
import { FormProvider } from 'react-hook-form';
import { IoMdAdd } from 'react-icons/io';
import { memo, useEffect } from 'react';

import { type IUploadCloudinaryInfo } from '@/types/upload';
import CInputUploadFile from '@/components/Input/CInputUploadFile';
import CInputValidation from '@/components/Input/CInputValidation';
import { menuSchema } from '@/validations/menu.validation';
import { useUploadImage, useUploadImageEdit } from '@/apis/upload.api';
import appToast from '@/utils/toast.util';
import { type IMenu } from '@/types/menu';
import { useAddMenu, useUpdateMenu } from '@/apis/order.api';
import CNumberInput from '@/components/Input/CNumberInput';
import { useFetchUser } from '@/apis/user.api';
import { useFormWithYupSchema } from '@/hooks/useYupValidationResolver';
import { useNewFeedStoreActions } from '../../stores/newFeeds.store';
import CCheckbox from '@/components/Checkbox/CCheckbox';

interface IModalMenuProps extends Omit<ModalProps, 'children'> {
  dataMenu?: IMenu;
  isEdit?: boolean;
}

const defaultValues = {
  image: null,
  title: '',
  price: null,
  isSamePrice: false,
  priceSale: null,
  menuLink: null,
};

function ModalMenu({
  dataMenu,
  onClose,
  isEdit = false,
  ...passProps
}: IModalMenuProps) {
  const { authUser } = useFetchUser();
  const toggleMenu = useUpdateMenu();
  const uploadImageEdit = useUploadImageEdit();
  const uploadImage = useUploadImage();
  const addMenu = useAddMenu();
  const updateMenu = useUpdateMenu();

  const { setPriceMenu } = useNewFeedStoreActions();

  const methods = useFormWithYupSchema(menuSchema, {
    defaultValues,
    values: {
      ...dataMenu,
      isSamePrice: dataMenu?.isSamePrice || false,
      priceSale: dataMenu?.priceSale || false,
    },
    mode: 'onChange',
  });
  const { handleSubmit, reset, watch } = methods;

  const isSamePriceWatch = watch('isSamePrice');
  const price = watch('price');

  const handleUpdateMenu = (values: Partial<IMenu>) => {
    const data = {
      menuId: dataMenu ? dataMenu.id : '',
      body: { isBlocked: true, price },
    };
    const dataUpdate = {
      menuId: dataMenu?.id ? dataMenu.id : '',
      body: {
        title: values.title,
        image: dataMenu?.image,
        price: values.price || null,
        priceSale: values.priceSale || null,
        menuLink: values.menuLink || null,
        isSamePrice: values.isSamePrice,
        isBlocked: true,
        isDeleted: false,
        avatarThumbnail: (authUser?.picture as string) || null,
        createdByUser: authUser?.email as string,
        createdAt: dataMenu?.createdAt,
      },
    };

    updateMenu.mutate(dataUpdate, {
      onSuccess() {
        if (!dataMenu?.isBlocked && !dataMenu?.isSamePrice) {
          if (isEdit) {
            toggleMenu.mutate(data, {
              onSuccess() {
                appToast({
                  type: 'success',
                  props: {
                    text: 'Đóng menu thành công nà =))))',
                  },
                });
              },
              onError() {
                appToast({
                  type: 'error',
                  props: {
                    title: 'Cóa lỗi :((((',
                    text: 'Thử lại dùm mình chứ lỗi mất roài =))))',
                  },
                });
              },
            });
          }
        }
        appToast({
          type: 'success',
          props: {
            text: 'Sửa menu thành công nà =))))',
          },
        });
        reset(defaultValues);
        onClose?.();
      },
    });
  };

  const handleAddMenu = (values: Partial<IMenu>) => {
    const data = {
      title: values.title,
      image: values.image,
      price: values.price || null,
      priceSale: values.priceSale || null,
      menuLink: values.menuLink || null,
      isBlocked: false,
      isDeleted: false,
      isSamePrice: values.isSamePrice,
      avatarThumbnail: (authUser?.picture as string) || null,
      createdByUser: authUser?.email as string,
      createdAt: new Date(),
    };
    addMenu.mutate(data, {
      onSuccess() {
        appToast({
          type: 'success',
          props: {
            text: 'Thêm menu thành công nà =))))',
          },
        });
        reset(defaultValues);
        onClose?.();
      },
    });
  };

  const submitHandler = handleSubmit(async (values) => {
    if (dataMenu) {
      if (values.image?.length) {
        const uploadRes: IUploadCloudinaryInfo =
          await uploadImageEdit.mutateAsync(values.image as unknown as string, {
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
          });

        if (uploadRes) {
          handleUpdateMenu({ ...values, image: uploadRes.url });
        }
      } else {
        handleUpdateMenu({ ...values, image: null });
      }
    } else if (values.image?.length) {
      const uploadRes: IUploadCloudinaryInfo = await uploadImage.mutateAsync(
        values.image as unknown as FileList,
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

  useEffect(() => {
    if (price !== undefined) {
      setPriceMenu(price);
    }
  }, [price, setPriceMenu]);

  return (
    <div>
      <Modal
        size='3xl'
        onClose={() => (dataMenu ? reset({}) : reset(defaultValues))}
        {...passProps}
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            {dataMenu ? 'Sửa Menu' : 'Tạo Menu'}
          </ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form onSubmit={submitHandler}>
                <CInputValidation
                  isRequired
                  label='Nội dung'
                  name='title'
                  id='title'
                />

                <CCheckbox name='isSamePrice'>Đồng giá</CCheckbox>

                <CNumberInput
                  label='Giá món, nhập sau cũng được'
                  name='price'
                  id='price'
                />

                {isSamePriceWatch ? null : (
                  <CNumberInput
                    label='Giá sale nè'
                    name='priceSale'
                    id='priceSale'
                  />
                )}

                <CInputUploadFile
                  label='Up ảnh Menu cho mọi người dễ chọn nhóaaa'
                  name='image'
                  id='image'
                  disabled={!!dataMenu}
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
                    disabled={
                      uploadImage.isLoading ||
                      addMenu.isLoading ||
                      updateMenu.isLoading
                    }
                    isLoading={
                      uploadImage.isLoading ||
                      addMenu.isLoading ||
                      updateMenu.isLoading
                    }
                    type='submit'
                    color='primary'
                    startContent={<IoMdAdd />}
                  >
                    {dataMenu ? 'Sửa' : 'Tạo'}
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

export default memo(ModalMenu);
