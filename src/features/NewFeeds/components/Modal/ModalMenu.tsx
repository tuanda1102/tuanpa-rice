import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  type ModalProps,
} from '@nextui-org/react';
import { Controller, FormProvider } from 'react-hook-form';
import { IoMdAdd } from 'react-icons/io';
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { type IUploadCloudinaryInfo } from '@/types/upload';
import CInputUploadFile from '@/components/Input/CInputUploadFile';
import CInputValidation from '@/components/Input/CInputValidation';
import { menuSchema } from '@/validations/menu.validation';
import { useUploadImage } from '@/apis/upload.api';
import appToast from '@/utils/toast.util';
import { type IMenu } from '@/types/menu';
import { useAddMenu, useUpdateMenu } from '@/apis/order.api';
import CNumberInput from '@/components/Input/CNumberInput';
import { useFetchUser } from '@/apis/user.api';
import { useFormWithYupSchema } from '@/hooks/useYupValidationResolver';

interface IModalMenuProps extends Omit<ModalProps, 'children'> {
  dataMenu?: IMenu;
}

const defaultValues = {
  image: null,
  title: '',
  price: null,
  isSamePrice: false,
  priceSale: null,
  menuLink: null,
};

//  change file to FileList
function FileToFileList(file: File | null) {
  const fileList = new DataTransfer();
  if (file !== null) {
    fileList.items.add(file);
    return fileList.files;
  }
  return null;
}

function ModalMenu({ dataMenu, onClose, ...passProps }: IModalMenuProps) {
  const { authUser } = useFetchUser();

  const toggleMenu = useUpdateMenu();
  const uploadImage = useUploadImage();
  const [fileImage, setFileImage] = useState<File | null>(null);
  const listImage = FileToFileList(fileImage);
  const addMenu = useAddMenu();
  const updateMenu = useUpdateMenu();

  const methods = useFormWithYupSchema(menuSchema, {
    defaultValues,
    values: { ...dataMenu, image: dataMenu?.image === null ? null : listImage },
    mode: 'onChange',
    resolver: yupResolver(menuSchema),
  });
  const { handleSubmit, reset, control, watch } = methods;

  const isSamePriceWatch = watch('isSamePrice');
  const handleUpdateMenu = (values: Partial<IMenu>) => {
    const data = {
      menuId: dataMenu ? dataMenu.id : '',
      body: { isBlocked: !dataMenu?.isBlocked },
    };
    const dataUpdate = {
      menuId: dataMenu?.id ? dataMenu.id : '',
      body: {
        title: values.title,
        image: values.image,
        price: values.price || null,
        priceSale: isSamePriceWatch ? null : values.priceSale,
        menuLink: values.menuLink || null,
        isSamePrice: values.isSamePrice,
        isBlocked: false,
        isDeleted: false,
        avatarThumbnail: (authUser?.picture as string) || null,
        createdByUser: authUser?.email as string,
        createdAt: new Date(),
      },
    };
    updateMenu.mutate(dataUpdate, {
      onSuccess() {
        if (!dataMenu?.isBlocked) {
          if (!dataMenu?.isSamePrice) {
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
      priceSale: isSamePriceWatch ? null : values.priceSale,
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
    // change image url to file
    const imageUrl = dataMenu?.image;
    if (imageUrl !== null && imageUrl !== undefined) {
      const urlToObject = async () => {
        if (imageUrl === null && imageUrl === undefined) {
          throw new Error('Image URL is null.');
        }
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const urlObject = new URL(imageUrl);
          const filename = urlObject?.pathname?.split('/').pop() || 'image.jpg';
          const file = new File([blob], filename, { type: blob.type });
          setFileImage(file);
          return file;
        } catch (error) {
          return null;
        }
      };
      urlToObject();
    }
  }, [dataMenu?.image]);

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

                <Controller
                  control={control}
                  name='isSamePrice'
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      defaultSelected={false}
                      onChange={onChange}
                      value={value}
                      isSelected={value}
                      className='mb-1'
                    >
                      Đồng giá
                    </Checkbox>
                  )}
                />

                <CNumberInput
                  label='Giá món, nhập sau cũng được'
                  name='price'
                  id='price'
                />

                {isSamePriceWatch === true ? null : (
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

export default ModalMenu;
