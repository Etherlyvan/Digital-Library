'use client';

import { Image as NextUIImage, type ImageProps as NextUIImageProps } from '@nextui-org/image';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

type ImageProps = {
  children: React.ReactNode;
} & NextUIImageProps &
  NextImageProps;

const Image = ({ children, ...props }: ImageProps) => {
  return (
    <NextUIImage as={NextImage} {...props}>
      {children}
    </NextUIImage>
  );
};

export default Image;
