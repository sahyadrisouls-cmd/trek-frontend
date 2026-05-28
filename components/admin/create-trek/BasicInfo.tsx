
type Props = {
  formData: any;
  handleChange: any;
};

export default function BasicInfo({
  formData,
  handleChange,
}: Props) {

  return (

    <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8">

      {/* TITLE */}
      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          Basic Information
        </h2>

        <p className="text-zinc-400 mt-2">
          Add main trek details and description
        </p>

      </div>

      {/* FORM */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* TREK NAME */}
        <div>

          <label className="block text-sm text-zinc-400 mb-2">
            Trek Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Example: Raigad Fort Trek"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
          />

        </div>

        {/* LOCATION */}
        <div>

          <label className="block text-sm text-zinc-400 mb-2">
            Location
          </label>

          <input
            type="text"
            name="location"
            placeholder="Example: Raigad, Maharashtra"
            value={formData.location}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
          />

        </div>

        {/* DESCRIPTION */}
        <div className="md:col-span-2">

          <label className="block text-sm text-zinc-400 mb-2">
            Full Description
          </label>

          <textarea
            name="description"
            placeholder="Write detailed trek description..."
            value={formData.description}
            onChange={handleChange}
            className="w-full h-44 p-5 rounded-2xl bg-black border border-white/10 text-white outline-none resize-none focus:border-green-500"
          />

        </div>

        {/* SHORT DESCRIPTION */}
        <div className="md:col-span-2">

          <label className="block text-sm text-zinc-400 mb-2">
            Short Description
          </label>

          <textarea
            name="shortDescription"
            placeholder="Small short description for trek card..."
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full h-28 p-5 rounded-2xl bg-black border border-white/10 text-white outline-none resize-none focus:border-green-500"
          />

        </div>

      </div>

    </div>

  );

}
