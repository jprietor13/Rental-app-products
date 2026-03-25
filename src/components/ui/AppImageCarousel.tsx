import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useCallback, useState } from "react";
import type { AppImageCarouselProps } from "../../models/ui";

export const AppImageCarousel = ({ images, alt }: AppImageCarouselProps) => {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1)),
    [images.length],
  );

  const next = useCallback(
    () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length],
  );

  if (images.length === 0) return null;

  return (
    <div className="mt-5 flex flex-col gap-3">
      <div className="relative flex h-82.5 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-100">
        <img
          src={images[current]}
          alt={`${alt} - ${current + 1}`}
          className="h-full w-full object-contain p-4 transition-opacity duration-300"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand-700 shadow-md transition-all hover:bg-white hover:shadow-lg"
            >
              <ChevronLeftIcon fontSize="small" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand-700 shadow-md transition-all hover:bg-white hover:shadow-lg"
            >
              <ChevronRightIcon fontSize="small" />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    i === current
                      ? "w-5 bg-brand-600"
                      : "w-2 bg-slate-400/50 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                i === current
                  ? "border-brand-500 opacity-100"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <img
                src={url}
                alt={`Thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
