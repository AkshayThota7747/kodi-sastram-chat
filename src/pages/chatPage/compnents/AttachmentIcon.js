export const AttachmentButton = ({ id, type, accept, handleOptionSelection, children }) => {
  return (
    <fieldset>
      <label htmlFor={id} className="flex items-center px-2 py-2 hover:bg-gray-100 w-full cursor-pointer">
        {children}
      </label>
      <input
        type="file"
        id={id}
        accept={accept}
        style={{ display: "none" }}
        onChange={(e) => handleOptionSelection(e, { type })}
      />
    </fieldset>
  );
};
