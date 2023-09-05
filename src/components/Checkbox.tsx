interface Checkboxprops {
    children:React.ReactNode;
    disabled?:boolean;
    checked:boolean;
    onChange:(checked:boolean)=>void;
    
}

export default function Checkbox({children, disabled, checked, onChange}:Checkboxprops) {
    return (
        <label className="flex items-center text-2xl mt-4 space-x-2">
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