import { Checkboxprops } from "../types/ComponentsTypes";

export default function Checkbox({children, disabled, checked, onChange}:Checkboxprops) {
    return (
        <label className="flex items-center text-3xl mt-4 space-x-2">
          <input
            className="w-8 h-8"
            type="checkbox"
            disabled={disabled}
            checked={checked}
            onChange={({ target: { checked } }) => onChange(checked)}
          />
          <span>{children}</span>
        </label>
      );
}