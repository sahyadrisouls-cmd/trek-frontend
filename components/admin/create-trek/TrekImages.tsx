
type Props = {
  formData: any;

  handleImageUpload: any;

  handleTrekImagesUpload: any;
  removeTrekImage: any;

  handleGalleryUpload: any;
  removeGalleryImage: any;

  heroUploading: boolean;
  trekUploading: boolean;
  galleryUploading: boolean;

  heroProgress: number;
  trekProgress: number;
  galleryProgress: number;
};

export default function TrekImages({

  formData,

  handleImageUpload,

  handleTrekImagesUpload,
  removeTrekImage,

  handleGalleryUpload,
  removeGalleryImage,

  heroUploading,
  trekUploading,
  galleryUploading,

  heroProgress,
  trekProgress,
  galleryProgress,

}: Props) {

  return (

    <div className="bg-zinc-950 border border-white/10 rounded-[35px] p-8 mt-8">

      {/* HEADER */}
      <div className="mb-14">

        <h2 className="text-4xl font-black text-white">
          Trek Images
        </h2>

        <p className="text-zinc-500 mt-3">
          Upload banners, trek locations and trekking memories
        </p>

      </div>

      {/* HERO IMAGE */}
      <div className="mb-16">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h3 className="text-2xl font-bold text-white">
              Hero Image
            </h3>

            <p className="text-zinc-500 text-sm mt-1">
              Homepage banner & trek card image
            </p>

          </div>

          {heroUploading && (
            <span className="text-green-400 font-bold">
              {heroProgress}%
            </span>
          )}

        </div>

        <label className="border-2 border-dashed border-white/10 hover:border-green-500 transition rounded-3xl p-10 flex flex-col items-center justify-center bg-black/40 cursor-pointer">

          <div className="text-5xl mb-4">
            🏔️
          </div>

          <p className="text-white font-semibold text-lg">
            Upload Hero Image
          </p>

          <p className="text-zinc-500 text-sm mt-2">
            Click to browse image
          </p>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              handleImageUpload(e, "heroImage")
            }
          />

        </label>

        {heroUploading && (

          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden mt-5">

            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{
                width: `${heroProgress}%`
              }}
            />

          </div>

        )}

        {formData.heroImage?.url && (

          <div className="mt-6 relative">

            <img
              src={formData.heroImage.url}
              className="w-full h-80 object-cover rounded-3xl border border-white/10"
            />

            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-sm text-green-400 font-semibold">
              Hero Preview
            </div>

          </div>

        )}

      </div>

      {/* TREK LOCATION IMAGES */}
      <div className="mb-16">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h3 className="text-2xl font-bold text-white">
              Trek Location Images
            </h3>

            <p className="text-zinc-500 text-sm mt-1">
              Official trek destination images
            </p>

          </div>

          {trekUploading && (
            <span className="text-green-400 font-bold">
              {trekProgress}%
            </span>
          )}

        </div>

        <label className="border-2 border-dashed border-white/10 hover:border-green-500 transition rounded-3xl p-10 flex flex-col items-center justify-center bg-black/40 cursor-pointer">

          <div className="text-5xl mb-4">
            📍
          </div>

          <p className="text-white font-semibold text-lg">
            Upload Trek Images
          </p>

          <p className="text-zinc-500 text-sm mt-2">
            Multiple images supported
          </p>

          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleTrekImagesUpload}
          />

        </label>

        {trekUploading && (

          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden mt-5">

            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{
                width: `${trekProgress}%`
              }}
            />

          </div>

        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">

          {formData.trekImages.map((img: any, index: number) => (

            <div
              key={index}
              className="relative group overflow-hidden rounded-3xl border border-white/10"
            >

              <img
                src={img.url}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300" />

              <button
                type="button"
                onClick={() => removeTrekImage(index)}
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-500 h-10 w-10 rounded-full text-white font-bold opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>

              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs text-white">
                Trek Image
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* GALLERY IMAGES */}
      <div>

        <div className="flex items-center justify-between mb-5">

          <div>

            <h3 className="text-2xl font-bold text-white">
              Trek Memory Gallery
            </h3>

            <p className="text-zinc-500 text-sm mt-1">
              Group moments, camping and memories
            </p>

          </div>

          {galleryUploading && (
            <span className="text-green-400 font-bold">
              {galleryProgress}%
            </span>
          )}

        </div>

        <label className="border-2 border-dashed border-white/10 hover:border-green-500 transition rounded-3xl p-10 flex flex-col items-center justify-center bg-black/40 cursor-pointer">

          <div className="text-5xl mb-4">
            🖼️
          </div>

          <p className="text-white font-semibold text-lg">
            Upload Gallery Images
          </p>

          <p className="text-zinc-500 text-sm mt-2">
            Upload trekking memories
          </p>

          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleGalleryUpload}
          />

        </label>

        {galleryUploading && (

          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden mt-5">

            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{
                width: `${galleryProgress}%`
              }}
            />

          </div>

        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">

          {formData.galleryImages.map((img: any, index: number) => (

            <div
              key={index}
              className="relative group overflow-hidden rounded-3xl border border-white/10"
            >

              <img
                src={img.url}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300" />

              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-500 h-10 w-10 rounded-full text-white font-bold opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>

              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs text-white">
                Gallery Image
              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

