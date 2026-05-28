
type Props = {
  title: string;
  field: string;
  formData: any;
  setFormData: any;
};

export default function IncludedExcluded({
  title,
  field,
  formData,
  setFormData,
}: Props) {

  // ADD ITEM
  const addItem = () => {

    setFormData({
      ...formData,
      [field]: [
        ...formData[field],
        "",
      ],
    });

  };

  // UPDATE ITEM
  const updateItem = (
    index: number,
    value: string
  ) => {

    const updated =
      [...formData[field]];

    updated[index] = value;

    setFormData({
      ...formData,
      [field]: updated,
    });

  };

  // REMOVE ITEM
  const removeItem = (
    index: number
  ) => {

    const updated =
      formData[field].filter(
        (_: any, i: number) =>
          i !== index
      );

    setFormData({
      ...formData,
      [field]: updated,
    });

  };

  return (

    <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 mt-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-white">
            {title}
          </h2>

          <p className="text-zinc-400 mt-2">

            {title === "Included"
              ? "Things included in this trek package"
              : "Things not included in this trek package"}

          </p>

        </div>

        {/* ADD BUTTON */}
        <button
          type="button"
          onClick={addItem}
          className="bg-green-600 hover:bg-green-500 transition px-5 py-3 rounded-2xl text-white font-semibold"
        >
          + Add Item
        </button>

      </div>

      {/* ITEMS */}
      <div className="space-y-5">

        {formData[field].map(
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
                  updateItem(
                    index,
                    e.target.value
                  )
                }
                placeholder={
                  title === "Included"
                    ? "Example: Breakfast Included"
                    : "Example: Personal Expenses"
                }
                className="flex-1 h-14 px-5 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-green-500"
              />

              {/* REMOVE BUTTON */}
              <button
                type="button"
                onClick={() =>
                  removeItem(index)
                }
                className="h-14 px-5 rounded-2xl bg-red-600 hover:bg-red-500 transition text-white font-bold"
              >
                Remove
              </button>

            </div>

          )
        )}

        {/* EMPTY STATE */}
        {formData[field].length === 0 && (

          <div className="border border-dashed border-white/10 rounded-2xl p-10 text-center text-zinc-500">

            No {title} Items Added Yet

          </div>

        )}

      </div>

    </div>

  );

}
