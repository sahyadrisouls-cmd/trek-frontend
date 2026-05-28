
type Props = {
  formData: any;
  setFormData: any;
};

export default function ImportantInfo({
  formData,
  setFormData,
}: Props) {

  // ADD INFO
  const addInfo = () => {

    setFormData({
      ...formData,
      importantInfo: [
        ...formData.importantInfo,
        "",
      ],
    });

  };

  // UPDATE INFO
  const updateInfo = (
    index: number,
    value: string
  ) => {

    const updated =
      [...formData.importantInfo];

    updated[index] = value;

    setFormData({
      ...formData,
      importantInfo: updated,
    });

  };

  // REMOVE INFO
  const removeInfo = (
    index: number
  ) => {

    const updated =
      formData.importantInfo.filter(
        (_: any, i: number) =>
          i !== index
      );

    setFormData({
      ...formData,
      importantInfo: updated,
    });

  };

  return (

    <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 mt-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Important Information
          </h2>

          <p className="text-zinc-400 mt-2">
            Add safety instructions and trek guidelines
          </p>

        </div>

        <button
          type="button"
          onClick={addInfo}
          className="bg-green-600 hover:bg-green-500 transition px-5 py-3 rounded-2xl text-white font-semibold"
        >
          + Add Info
        </button>

      </div>

      {/* INFO LIST */}
      <div className="space-y-5">

        {formData.importantInfo.map(
          (
            item: string,
            index: number
          ) => (

            <div
              key={index}
              className="flex items-center gap-4"
            >

              {/* INPUT */}
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  updateInfo(
                    index,
                    e.target.value
                  )
                }
                placeholder="Example: Carry Raincoat During Monsoon"
                className="flex-1 h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
              />

              {/* REMOVE BUTTON */}
              <button
                type="button"
                onClick={() =>
                  removeInfo(index)
                }
                className="h-14 px-5 rounded-2xl bg-red-600 hover:bg-red-500 transition text-white font-bold"
              >
                Remove
              </button>

            </div>

          )
        )}

        {/* EMPTY STATE */}
        {formData.importantInfo.length === 0 && (

          <div className="border border-dashed border-white/10 rounded-2xl p-10 text-center text-zinc-500">

            No Important Information Added Yet

          </div>

        )}

      </div>

    </div>

  );

}
