
type Props = {
  formData: any;
  setFormData: any;
};

export default function HighlightsSection({
  formData,
  setFormData,
}: Props) {

  // ADD HIGHLIGHT
  const addHighlight = () => {

    setFormData({
      ...formData,
      highlights: [
        ...formData.highlights,
        "",
      ],
    });

  };

  // UPDATE HIGHLIGHT
  const updateHighlight = (
    index: number,
    value: string
  ) => {

    const updated =
      [...formData.highlights];

    updated[index] = value;

    setFormData({
      ...formData,
      highlights: updated,
    });

  };

  // REMOVE HIGHLIGHT
  const removeHighlight = (
    index: number
  ) => {

    const updated =
      formData.highlights.filter(
        (_: any, i: number) =>
          i !== index
      );

    setFormData({
      ...formData,
      highlights: updated,
    });

  };

  return (

    <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 mt-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Trek Highlights
          </h2>

          <p className="text-zinc-400 mt-2">
            Add exciting points about this trek
          </p>

        </div>

        <button
          type="button"
          onClick={addHighlight}
          className="bg-green-600 hover:bg-green-500 transition px-5 py-3 rounded-2xl text-white font-semibold"
        >
          + Add Highlight
        </button>

      </div>

      {/* HIGHLIGHTS */}
      <div className="space-y-5">

        {formData.highlights.map(
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
                  updateHighlight(
                    index,
                    e.target.value
                  )
                }
                placeholder="Example: Beautiful Sunrise View"
                className="flex-1 h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
              />

              {/* REMOVE BUTTON */}
              <button
                type="button"
                onClick={() =>
                  removeHighlight(index)
                }
                className="h-14 px-5 rounded-2xl bg-red-600 hover:bg-red-500 transition text-white font-bold"
              >
                Remove
              </button>

            </div>

          )
        )}

        {/* EMPTY STATE */}
        {formData.highlights.length === 0 && (

          <div className="border border-dashed border-white/10 rounded-2xl p-10 text-center text-zinc-500">

            No Highlights Added Yet

          </div>

        )}

      </div>

    </div>

  );

}
