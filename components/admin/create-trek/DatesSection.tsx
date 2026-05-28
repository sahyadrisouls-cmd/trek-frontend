
type Props = {
  formData: any;
  setFormData: any;
};

export default function DatesSection({
  formData,
  setFormData,
}: Props) {

  // ADD DATE
  const addDate = () => {

    setFormData((prev: any) => ({
      ...prev,
      availableDates: [
        ...prev.availableDates,
        "",
      ],
    }));

  };

  // UPDATE DATE
  const updateDate = (
    index: number,
    value: string
  ) => {

    setFormData((prev: any) => {

      const updatedDates = [
        ...prev.availableDates,
      ];

      updatedDates[index] = value;

      return {
        ...prev,
        availableDates: updatedDates,
      };

    });

  };

  // REMOVE DATE
  const removeDate = (
    index: number
  ) => {

    setFormData((prev: any) => ({

      ...prev,

      availableDates:
        prev.availableDates.filter(
          (_: any, i: number) =>
            i !== index
        ),

    }));

  };

  return (

    <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 mt-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Available Dates
          </h2>

          <p className="text-zinc-400 mt-2">
            Add upcoming trek batch dates
          </p>

        </div>

        <button
          type="button"
          onClick={addDate}
          className="bg-green-600 hover:bg-green-500 transition px-5 py-3 rounded-2xl text-white font-semibold"
        >
          + Add Date
        </button>

      </div>

      {/* EMPTY STATE */}
      {formData.availableDates.length === 0 && (

        <div className="border border-dashed border-white/10 rounded-2xl p-10 text-center text-zinc-500">

          No Dates Added Yet

        </div>

      )}

      {/* DATES */}
      <div className="space-y-5">

        {formData.availableDates.map(
          (
            item: string,
            index: number
          ) => (

            <div
              key={index}
              className="flex items-center gap-4"
            >

              {/* DATE INPUT */}
              <input
                type="date"
                value={item || ""}
                onChange={(e) =>
                  updateDate(
                    index,
                    e.target.value
                  )
                }
                style={{
                  colorScheme: "dark",
                }}
                className="flex-1 h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
              />

              {/* REMOVE BUTTON */}
              <button
                type="button"
                onClick={() =>
                  removeDate(index)
                }
                className="h-14 px-5 rounded-2xl bg-red-600 hover:bg-red-500 transition text-white font-bold"
              >
                Remove
              </button>

            </div>

          )
        )}

      </div>

    </div>

  );

}
