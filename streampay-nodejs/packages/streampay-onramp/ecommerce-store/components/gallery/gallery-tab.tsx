import NextImage from "next/image";
import { Tab } from "@headlessui/react";

import { cn } from "@/lib/utils";
import { Image } from "@/types";

// Define the props for the GalleryTab component
interface GalleryTabProps {
  image: Image; // The image data to be displayed
}

const GalleryTab: React.FC<GalleryTabProps> = ({
  image
}) => {
  return ( 
    <Tab
      className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white"
    >
      {({ selected }) => (
        <div>
          {/* Display the image */}
          <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
            <NextImage 
              fill 
              src={image.url} 
              alt="" 
              className="object-cover object-center" 
            />
          </span>
          {/* Apply a ring highlight around the image if selected */}
          <span
            className={cn(
              'absolute inset-0 rounded-md ring-2 ring-offset-2',
              selected ? 'ring-black' : 'ring-transparent',
            )}
          />
        </div>
      )}
    </Tab>
  );
}

export default GalleryTab;
