
type Props = {
  formData: any;
  setFormData: any;
};

export default function ItinerarySection({
  formData,
  setFormData,
}: Props) {

  // ADD DAY
  const addDay = () => {

    setFormData({
      ...formData,
      itinerary: [
        ...formData.itinerary,
        {
          day: formData.itinerary.length + 1,
          title: "",
          description: "",
          distance: "",
          elevation: "",
        },
      ],
    });

  };

  // UPDATE DAY
  const updateDay = (
    index: number,
    field: string,
    value: string
  ) => {

    const updated =
      [...formData.itinerary];

    updated[index][field] = value;

    setFormData({
      ...formData,
      itinerary: updated,
    });

  };

  // REMOVE DAY
  const removeDay = (
    index: number
  ) => {

    const updated =
      formData.itinerary.filter(
        (_: any, i: number) =>
          i !== index
      );

    setFormData({
      ...formData,
      itinerary: updated,
    });

  };

  return (

    <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 mt-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Trek Itinerary
          </h2>

          <p className="text-zinc-400 mt-2">
            Add complete day-by-day trek schedule
          </p>

        </div>

        <button
          type="button"
          onClick={addDay}
          className="bg-green-600 hover:bg-green-500 transition px-5 py-3 rounded-2xl text-white font-semibold"
        >
          + Add Day
        </button>

      </div>

      {/* EMPTY STATE */}
      {formData.itinerary.length === 0 && (

        <div className="border border-dashed border-white/10 rounded-2xl p-10 text-center text-zinc-500">

          No Itinerary Added Yet

        </div>

      )}

      {/* DAYS */}
      <div className="space-y-8">

        {formData.itinerary.map(
          (
            item: any,
            index: number
          ) => (

            <div
              key={index}
              className="bg-black border border-white/10 rounded-3xl p-6"
            >

              {/* TOP */}
              <div className="flex items-center justify-between mb-6">

                <div>

                  <h3 className="text-2xl font-bold text-white">
                    Day {item.day}
                  </h3>

                  <p className="text-zinc-500 mt-1">
                    Trek Day Planning
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeDay(index)
                  }
                  className="bg-red-600 hover:bg-red-500 transition px-5 py-3 rounded-2xl text-white font-semibold"
                >
                  Remove
                </button>

              </div>

              {/* FORM */}
              <div className="grid md:grid-cols-2 gap-5">

                {/* TITLE */}
                <div>

                  <label className="block text-sm text-zinc-400 mb-2">
                    Day Title
                  </label>

                  <input
                    type="text"
                    placeholder="Example: Raigad Summit Trek"
                    value={item.title}
                    onChange={(e) =>
                      updateDay(
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    className="w-full h-14 px-5 rounded-2xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-green-500"
                  />

                </div>

                {/* DISTANCE */}
                <div>

                  <label className="block text-sm text-zinc-400 mb-2">
                    Distance
                  </label>

                  <input
                    type="text"
                    placeholder="Example: 8 KM"
                    value={item.distance}
                    onChange={(e) =>
                      updateDay(
                        index,
                        "distance",
                        e.target.value
                      )
                    }
                    className="w-full h-14 px-5 rounded-2xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-green-500"
                  />

                </div>

                {/* ELEVATION */}
                <div>

                  <label className="block text-sm text-zinc-400 mb-2">
                    Elevation
                  </label>

                  <input
                    type="text"
                    placeholder="Example: 2700 ft"
                    value={item.elevation}
                    onChange={(e) =>
                      updateDay(
                        index,
                        "elevation",
                        e.target.value
                      )
                    }
                    className="w-full h-14 px-5 rounded-2xl bg-zinc-900 border border-white/10 text-white outline-none focus:border-green-500"
                  />

                </div>

                {/* DESCRIPTION */}
                <div className="md:col-span-2">

                  <label className="block text-sm text-zinc-400 mb-2">
                    Day Description
                  </label>

                  <textarea
                    placeholder="Write detailed itinerary for this day..."
                    value={item.description}
                    onChange={(e) =>
                      updateDay(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full h-36 p-5 rounded-2xl bg-zinc-900 border border-white/10 text-white outline-none resize-none focus:border-green-500"
                  />

                </div>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

}
