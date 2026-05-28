
type Props = {
  formData: any;
  handleChange: any;
};

export default function TrekDetails({
  formData,
  handleChange,
}: Props) {

  return (

    <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 mt-8">

      {/* HEADER */}
      <div className="mb-10">

        <h2 className="text-3xl font-bold text-white">
          Trek Details
        </h2>

        <p className="text-zinc-400 mt-2">
          Add trek specifications and trip information
        </p>

      </div>

      {/* FORM */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* PRICE */}
        <div>

          <label className="block text-sm text-zinc-400 mb-2">
            Price
          </label>

          <input
            type="number"
            name="price"
            placeholder="1499"
            value={formData.price}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
          />

        </div>

        {/* DIFFICULTY */}
        <div>

          <label className="block text-sm text-zinc-400 mb-2">
            Difficulty
          </label>

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
          >

            <option value="">
              Select Difficulty
            </option>

            <option value="Easy">
              Easy
            </option>

            <option value="Moderate">
              Moderate
            </option>

            <option value="Hard">
              Hard
            </option>

          </select>

        </div>

        {/* DURATION */}
        <div>

          <label className="block text-sm text-zinc-400 mb-2">
            Duration
          </label>

          <input
            type="text"
            name="duration"
            placeholder="1 Day"
            value={formData.duration}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
          />

        </div>

        {/* DISTANCE */}
        <div>

          <label className="block text-sm text-zinc-400 mb-2">
            Distance
          </label>

          <input
            type="text"
            name="distance"
            placeholder="8 KM"
            value={formData.distance}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
          />

        </div>

        {/* ALTITUDE */}
        <div>

          <label className="block text-sm text-zinc-400 mb-2">
            Altitude
          </label>

          <input
            type="text"
            name="altitude"
            placeholder="2700 ft"
            value={formData.altitude}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
          />

        </div>

        {/* AGE LIMIT */}
        <div>

          <label className="block text-sm text-zinc-400 mb-2">
            Age Limit
          </label>

          <input
            type="text"
            name="ageLimit"
            placeholder="12+"
            value={formData.ageLimit}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
          />

        </div>

        {/* GROUP SIZE */}
        <div>

          <label className="block text-sm text-zinc-400 mb-2">
            Group Size
          </label>

          <input
            type="text"
            name="groupSize"
            placeholder="25 People"
            value={formData.groupSize}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
          />

        </div>

        {/* BEST SEASON */}
        <div>

          <label className="block text-sm text-zinc-400 mb-2">
            Best Season
          </label>

          <input
            type="text"
            name="bestSeason"
            placeholder="Monsoon & Winter"
            value={formData.bestSeason}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
          />

        </div>

        {/* TREK TYPE */}
        <div>

          <label className="block text-sm text-zinc-400 mb-2">
            Trek Type
          </label>

          <input
            type="text"
            name="trekType"
            placeholder="Fort Trek"
            value={formData.trekType}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
          />

        </div>

        {/* SEATS */}
        <div>

          <label className="block text-sm text-zinc-400 mb-2">
            Available Seats
          </label>

          <input
            type="number"
            name="seats"
            placeholder="30"
            value={formData.seats}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
          />

        </div>

      </div>

    </div>

  );

}
