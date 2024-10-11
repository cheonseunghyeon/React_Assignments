import { NewProductDTO } from '@/api/dtos/productDTO';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ALL_CATEGORY_ID, categories } from '@/constants';
import { createNewProduct } from '@/helpers/product';
import { useAddProduct } from '@/hooks/useaddProduct';
import { useToastStore } from '@/store/toast/toastStore';
import { uploadImage } from '@/utils/imageUpload';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProductRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

export const ProductRegistrationModal: React.FC<
  ProductRegistrationModalProps
> = ({ isOpen, onClose, onProductAdded }) => {
  const showToast = useToastStore((state) => state.showToast);
  const {
    mutate: registerProduct,
    isPending,
    isError,
    error,
  } = useAddProduct();
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewProductDTO>(); // NewProductDTO 타입을 폼 데이터로 사용

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const onSubmit = async (data: NewProductDTO): Promise<void> => {
    try {
      if (!image) {
        throw new Error('이미지를 선택해야 합니다.');
      }

      const imageUrl = await uploadImage(image as File);
      if (!imageUrl) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      const newProduct = createNewProduct({ ...data }, imageUrl);
      registerProduct(newProduct, {
        onSuccess: () => {
          showToast('성공적으로 물품을 등록했습니다');
          reset();
          setImage(null);
          onClose();
          onProductAdded();
        },
        onError: (error) => {
          console.error('물품 등록에 실패했습니다.', error);
        },
      });
    } catch (error) {
      console.error('물품 등록에 실패했습니다.', error);
    }
  };

  const handleCategoryChange = (value: string): void => {
    const selectedCategory = categories.find(
      (category) => category.id === value
    );
    if (selectedCategory) {
      setValue('category', selectedCategory);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>상품 등록</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            {...register('title', { required: '상품명을 입력해야 합니다.' })}
            placeholder="상품명"
          />
          {errors.title && (
            <p style={{ color: 'red', fontWeight: 'bold' }}>
              {errors.title.message as string}
            </p>
          )}
          <Input
            {...register('price', { required: '상품 가격을 입력해야 합니다.' })}
            placeholder="가격"
            type="number"
          />
          {errors.price && (
            <p style={{ color: 'red', fontWeight: 'bold' }}>
              {errors.price.message as string}
            </p>
          )}
          <Textarea
            {...register('description')}
            className="resize-none"
            placeholder="상품 설명"
          />
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {categories
                .filter((category) => category.id !== ALL_CATEGORY_ID)
                .map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Input
            className="cursor-pointer"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit(onSubmit)} disabled={isPending}>
            {isPending ? '등록 중...' : '등록'}
          </Button>
          {isError && (
            <p style={{ color: 'red', fontWeight: 'bold' }}>{error?.message}</p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
