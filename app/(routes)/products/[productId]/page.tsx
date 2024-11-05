import { RatingStars } from "@/components/rating/rating";
import { Input } from "@/components/ui/input";
import { Media } from "@/components/ui/media";
import { getProductById } from "@/lib/get-product";
import { price } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon
} from "@radix-ui/react-icons";

export default async function ViewProductPage({
  params
}: {
  params: { productId: string };
}) {
  const { productId } = await params;
  const product = await getProductById(productId);

  return (
    <section className="relative">
      <div className="container mx-auto px-4 mt-4">
        <div className="flex flex-wrap -mx-4">
          <div className="mx-auto px-4 relative lg:w-6/12 w-full md:w-full">
            <div className="relative flex items-center justify-center">
              <div className="relative w-full overflow-hidden">
                {product?.images &&
                  product.images.map(({ id, url }) => (
                    <div
                      key={id}
                      className="relative align-middle aspect-square rounded-lg overflow-hidden p-12 transform duration-500 transition-all ease-in-out mx-auto"
                    >
                      <Media
                        fill
                        controls
                        loop
                        muted
                        autoPlay
                        playsInline
                        src={url}
                        className="object-cover rounded-lg size-full mx-auto"
                      />
                    </div>
                  ))}
              </div>
              <button
                type="button"
                className="left-4 absolute z-1 flex items-center justify-center size-9 text-center opacity-75 hover:opacity-100 transition-opacity duration-150 ease-linear text-sm bg-black dark:bg-white text-white dark:text-black active:scale-95 rounded-full"
              >
                <ChevronLeftIcon className="size-8" />
                <span className="sr-only">Previous</span>
              </button>

              <button
                type="button"
                className="right-4 absolute z-1 flex items-center justify-center size-9 text-center opacity-75 hover:opacity-100 transition-opacity duration-150 ease-linear text-sm bg-black dark:bg-white text-white dark:text-black active:scale-95 rounded-full"
              >
                <ChevronRightIcon className="size-8" />
                <span className="sr-only">Next</span>
              </button>
            </div>
          </div>

          <div className="mr-auto px-4 relative max-lg:mt-8 lg:w-6/12 w-full md:w-full">
            {product?.name && (
              <h2 className="text-3xl font-bold leading-tight mt-0 mb-0">
                {product.name}
              </h2>
            )}

            <div className="pt-2">
              <div className="text-black dark:text-white inline-flex items-center">
                <RatingStars rating={4} />
                <span className="inline text-sm ml-1 text-blueGray-700 hover:text-blueGray-500">
                  (76 customer reviews)
                </span>
              </div>
            </div>
            {product?.price && (
              <h2 className="text-2xl font-normal mt-2 mb-2">
                {price.format(Number(product.price))}
              </h2>
            )}
            {product?.description && (
              <p className="text-muted-foreground text-justify text-wrap [white-space:pre-line]">
                {product.description}
              </p>
            )}
            <div className="mt-12 mb-6 grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="relative w-full mb-3">
                <label className="inline-block mb-2">Color</label>
                <Input placeholder="Select color" list="colorsSuggest" />

                <datalist id="colorsSuggest">
                  <option value="Blue" />
                  <option value="Green" />
                  <option value="Teal" />
                  <option value="Red" />
                  <option value="Orange" />
                  <option value="White" />
                </datalist>
              </div>

              <div className="relative w-full mb-3">
                <label className="inline-block mb-2">Size</label>
                <Input placeholder="Select size" list="sizesSuggest" />

                <datalist id="sizesSuggest">
                  <option value="XS" />
                  <option value="S" />
                  <option value="M" />
                  <option value="L" />
                  <option value="XL" />
                  <option value="XXL" />
                </datalist>
              </div>

              <div className="relative w-full mb-6 flex flex-wrap">
                <label className="inline-block mb-2">Quantity</label>
                <div className="relative inline-flex items-center flex-row w-full gap-2 mb-3">
                  <button
                    type="button"
                    className="inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold bg-black dark:bg-white text-white dark:text-black active:scale-95 text-sm px-4 py-2 shadow hover:shadow-lg rounded-md"
                  >
                    <MinusIcon className="size-4" />
                    <span className="sr-only hidden">Minus</span>
                  </button>

                  <Input placeholder="1" aria-label="text" />

                  <button
                    type="button"
                    className="inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold bg-black dark:bg-white text-white dark:text-black active:scale-95 text-sm px-4 py-2 shadow hover:shadow-lg rounded-md"
                  >
                    <PlusIcon className="size-4" />
                    <span className="sr-only hidden">Plus</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold last:mr-0 mr-2 bg-black dark:bg-white text-white dark:text-black active:scale-95 text-sm px-6 py-2 shadow hover:shadow-lg rounded-md"
            >
              Add to Cart <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}