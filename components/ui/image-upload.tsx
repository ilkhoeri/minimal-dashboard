"use client";

import Image from "next/image";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetOptions
} from "next-cloudinary";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { Media } from "./media";

// cloudinary upload preset - beta
export const Cloudinary_UploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export type ExtendedCldUploadWidget = {
  maxFiles?: number;
  maxFileSize?: number;
  sources?: CloudinaryUploadWidgetOptions["sources"];
};

export function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
  maxFiles,
  maxFileSize = 2097152,
  sources = ["local", "camera", "url"]
}: ImageUploadProps & ExtendedCldUploadWidget) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative size-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="sm"
                className="px-2"
                aria-label="Delete Image"
                title="Delete Image"
              >
                <TrashIcon className="size-5" />
              </Button>
            </div>
            {/* <Image fill className="object-cover" alt="Image" src={url} /> */}
            <Media fill controls loop muted autoPlay playsInline src={url} className="object-cover" />
          </div>
        ))}
      </div>
      <CldUploadWidget
        uploadPreset={Cloudinary_UploadPreset} // when using upload preset
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={(result, { widget }) => {
          // @ts-ignore
          onChange(result?.info?.secure_url);
        }}
        onQueuesEnd={(result, { widget }) => {
          widget.close();
        }}
        options={{
          maxFiles,
          maxFileSize,
          sources
        }}
      >
        {({ open }) => {
          const onClick = () => {
            isMounted && open();
          };

          return (
            <Button
              type="button"
              disabled={disabled || !isMounted}
              variant="outline"
              onClick={onClick}
              className="text-app"
            >
              <PlusCircledIcon className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
